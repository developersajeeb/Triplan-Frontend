import { useEffect, useState } from "react";
import { getGuestWishlist } from "@/components/utilities/guestWishlist";

export const useGuestWishlist = () => {
  const [wishlist, setWishlist] = useState<string[]>([]);

  useEffect(() => {
    setWishlist(getGuestWishlist());
  }, []);

  const refreshWishlist = () => {
    setWishlist(getGuestWishlist());
  };

  return { wishlist, refreshWishlist };
};