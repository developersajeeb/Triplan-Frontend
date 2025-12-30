import { useEffect } from "react";
import { setGuestWishlist } from "@/components/utilities/guestWishlist";

export const useHydrateWishlist = (isLoggedIn: boolean, dbWishlist: string[]) => {
  useEffect(() => {
    if (!isLoggedIn) return;
    if (!dbWishlist?.length) return;

    setGuestWishlist(dbWishlist);
  }, [dbWishlist, isLoggedIn]);
};