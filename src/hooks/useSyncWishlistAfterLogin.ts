import { useEffect } from "react";
import { useToggleWishlistMutation } from "@/redux/features/user/user.api";
import { clearGuestWishlist, getGuestWishlist } from "@/components/utilities/guestWishlist";

export const useSyncWishlistAfterLogin = (isLoggedIn: boolean) => {
  const [toggleWishlist] = useToggleWishlistMutation();

  useEffect(() => {
    if (!isLoggedIn) return;

    const guestWishlist = getGuestWishlist();
    if (!guestWishlist.length) return;

    const sync = async () => {
      for (const tourId of guestWishlist) {
        try {
          await toggleWishlist(tourId).unwrap();
        } catch (err) {
          console.error(err);
        }
      }
      clearGuestWishlist();
    };

    sync();
  }, [isLoggedIn, toggleWishlist]);
};