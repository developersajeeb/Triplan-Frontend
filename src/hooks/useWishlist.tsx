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
    if (isLoggedIn) {
      const guest = getGuestWishlist();
      const db = userData?.data?.wishlist || [];
      const merged = Array.from(new Set([...db, ...guest]));
      setGuestWishlist(merged);
      setWishlist(merged);
    }
  }, [isLoggedIn, userData]);

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

    try {
      await toggleWishlist(id).unwrap();

      const updated = exists ? wishlist.filter(w => w !== id) : [...wishlist, id];
      setGuestWishlist(updated);
      setWishlist(updated);
    } catch {
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