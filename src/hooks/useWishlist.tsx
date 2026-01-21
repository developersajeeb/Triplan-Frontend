import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "sonner";

import { getGuestWishlist, setGuestWishlist } from "@/components/utilities/guestWishlist";
import { useToggleWishlistMutation, useUserInfoQuery } from "@/redux/features/user/user.api";

const GUEST_LIMIT = 5;
const USER_LIMIT = 50;

export const useWishlist = () => {
  const navigate = useNavigate();
  const { data: userData } = useUserInfoQuery(undefined, { refetchOnMountOrArgChange: true });
  const [toggleWishlist] = useToggleWishlistMutation();

  const isLoggedIn = Boolean(userData?.data?._id);

  const [wishlist, setWishlist] = useState<string[]>(getGuestWishlist());

  useEffect(() => {
    if (!isLoggedIn) return;

    const syncWishlist = async () => {
      const guest = getGuestWishlist();
      const db = userData?.data?.wishlist || [];
      const merged = Array.from(new Set([...db, ...guest]));

      // Persist locally for instant UI
      setGuestWishlist(merged);
      setWishlist(merged);

      // Push only the guest-only items to backend so server stays in sync
      const toAdd = merged.filter(id => !db.includes(id));
      if (toAdd.length === 0) return;

      try {
        await Promise.all(toAdd.map(id => toggleWishlist(id).unwrap()));
      } catch {
        // If sync fails, revert to server copy to avoid mismatch
        setGuestWishlist(db);
        setWishlist(db);
        toast.error("Could not sync wishlist. Please try again.");
      }
    };

    syncWishlist();
  }, [isLoggedIn, userData, toggleWishlist]);

  const isInWishlist = (id: string) => wishlist.includes(id);

  const toggle = async (id: string) => {
    const exists = wishlist.includes(id);

    if (!isLoggedIn) {
      const guestWishlist = getGuestWishlist();

      if (!exists && guestWishlist.length >= GUEST_LIMIT) {
        toast.error("Guest wishlist limit reached. Login to save more than 5 items.");
        navigate("/login");
        return;
      }

      const updated = exists ? guestWishlist.filter(w => w !== id) : [...guestWishlist, id];
      setGuestWishlist(updated);
      setWishlist(updated);
      return;
    }

    if (!exists && wishlist.length >= USER_LIMIT) {
      toast.error("Wishlist limit reached. You can save up to 50 items only.");
      return;
    }

    const previous = wishlist;
    const updated = exists ? wishlist.filter(w => w !== id) : [...wishlist, id];

    // Optimistic update for instant UI feedback
    setGuestWishlist(updated);
    setWishlist(updated);

    try {
      await toggleWishlist(id).unwrap();
    } catch {
      // Revert on failure
      setGuestWishlist(previous);
      setWishlist(previous);
      toast.error("Something went wrong. Please try again.");
    }
  };

  const onLogoutCleanup = () => {
    setGuestWishlist([]);
    setWishlist([]);
  };

  return {
    wishlist,
    isInWishlist,
    toggle,
    onLogoutCleanup,
  };
};