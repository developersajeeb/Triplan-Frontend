const GUEST_WISHLIST_KEY = "guest_wishlist";
const MAX_GUEST_WISHLIST = 5;

export const getGuestWishlist = (): string[] => {
  return JSON.parse(localStorage.getItem(GUEST_WISHLIST_KEY) || "[]");
};

export const setGuestWishlist = (wishlist: string[]) => {
  localStorage.setItem(GUEST_WISHLIST_KEY, JSON.stringify(wishlist));
};

export const canAddMoreGuestWishlist = (): boolean => {
  const wishlist = getGuestWishlist();
  return wishlist.length < MAX_GUEST_WISHLIST;
};

export const clearGuestWishlist = () => {
  localStorage.removeItem(GUEST_WISHLIST_KEY);
};