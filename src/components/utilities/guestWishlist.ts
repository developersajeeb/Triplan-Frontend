const WISHLIST_KEY = "wishlist_ids";
export const GUEST_LIMIT = 5;

export const getGuestWishlist = (): string[] => {
  if (typeof window === "undefined") return [];
  return JSON.parse(localStorage.getItem(WISHLIST_KEY) || "[]");
};

export const setGuestWishlist = (wishlist: string[]) => {
  localStorage.setItem(WISHLIST_KEY, JSON.stringify(wishlist));
};

export const clearGuestWishlist = () => {
  localStorage.removeItem(WISHLIST_KEY);
};