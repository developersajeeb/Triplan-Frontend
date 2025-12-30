const WISHLIST_KEY = "wishlist_ids";
const MAX_WISHLIST = 5;

export const getGuestWishlist = (): string[] => {
  return JSON.parse(localStorage.getItem(WISHLIST_KEY) || "[]");
};

export const setGuestWishlist = (wishlist: string[]) => {
  localStorage.setItem(WISHLIST_KEY, JSON.stringify(wishlist));
};

export const canAddMoreGuestWishlist = (): boolean => {
  const wishlist = getGuestWishlist();
  return wishlist.length < MAX_WISHLIST;
};

export const clearGuestWishlist = () => {
  localStorage.removeItem(WISHLIST_KEY);
};