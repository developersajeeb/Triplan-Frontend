import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "sonner";

import {
  getGuestWishlist,
  setGuestWishlist,
  clearGuestWishlist,
  GUEST_LIMIT,
} from "@/components/utilities/guestWishlist";

import {
  useToggleWishlistMutation,
  useUserInfoQuery,
} from "@/redux/features/user/user.api";

const USER_LIMIT = 50;

export const useWishlist = () => {
  const navigate = useNavigate();
  const { data: userData, isSuccess } = useUserInfoQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });

  const [toggleWishlist] = useToggleWishlistMutation();
  const isLoggedIn = Boolean(userData?.data?._id);

  const [wishlist, setWishlist] = useState<string[]>([]);

  /* -------------------------------
     SYNC WISHLIST ON LOGIN
  --------------------------------*/
  useEffect(() => {
    if (!isSuccess) return;

    if (isLoggedIn) {
      const guest = getGuestWishlist();
      const db = userData?.data?.wishlist || [];

      const merged = Array.from(new Set([...db, ...guest])).slice(
        0,
        USER_LIMIT
      );

      setWishlist(merged);
      setGuestWishlist(merged); // localStorage becomes single source
    } else {
      setWishlist(getGuestWishlist());
    }
  }, [isLoggedIn, isSuccess, userData]);

  const isInWishlist = (id: string) => wishlist.includes(id);

  /* -------------------------------
     TOGGLE LOGIC
  --------------------------------*/
  const toggle = async (id: string) => {
    const exists = wishlist.includes(id);

    /* -------- GUEST MODE -------- */
    if (!isLoggedIn) {
      if (!exists && wishlist.length >= GUEST_LIMIT) {
        toast.error("Guest wishlist limit reached. Please login.");
        navigate("/login");
        return;
      }

      const updated = exists
        ? wishlist.filter(w => w !== id)
        : [...wishlist, id];

      setWishlist(updated);
      setGuestWishlist(updated);
      return;
    }

    /* -------- USER MODE -------- */
    if (!exists && wishlist.length >= USER_LIMIT) {
      toast.error("Wishlist limit reached (50 items max).");
      return;
    }

    // ✅ INSTANT UI UPDATE (Optimistic)
    const optimistic = exists
      ? wishlist.filter(w => w !== id)
      : [...wishlist, id];

    setWishlist(optimistic);
    setGuestWishlist(optimistic);

    try {
      await toggleWishlist(id).unwrap();
    } catch {
      toast.error("Failed to update wishlist. Reverting...");
      setWishlist(wishlist);
      setGuestWishlist(wishlist);
    }
  };

  const onLogoutCleanup = () => {
    clearGuestWishlist();
    setWishlist([]);
  };

  return {
    wishlist,
    isInWishlist,
    toggle,
    onLogoutCleanup,
  };
};