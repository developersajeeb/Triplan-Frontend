const KEY = "wishlist_ids";

const toUniqueStringIds = (wishlist: unknown): string[] => {
  if (!Array.isArray(wishlist)) {
    return [];
  }

  return Array.from(
    new Set(
      wishlist
        .map((item) => (typeof item === "string" ? item : ""))
        .filter(Boolean)
    )
  );
};

export const getGuestWishlist = (): string[] => {
  try {
    return toUniqueStringIds(JSON.parse(localStorage.getItem(KEY) || "[]"));
  } catch {
    return [];
  }
};

export const setGuestWishlist = (wishlist: string[]) => {
  localStorage.setItem(KEY, JSON.stringify(toUniqueStringIds(wishlist)));
};

export const canAddMoreGuestWishlist = () => {
  return getGuestWishlist().length < 5;
};