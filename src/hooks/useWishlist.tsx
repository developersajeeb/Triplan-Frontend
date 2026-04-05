import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "sonner";

import {
  canAddMoreGuestWishlist,
  getGuestWishlist,
  setGuestWishlist,
} from "@/components/utilities/guestWishlist";
import { useToggleWishlistMutation, useUserInfoQuery } from "@/redux/features/user/user.api";

const GUEST_LIMIT = 5;
const USER_LIMIT = 50;

let guestWishlistSyncInProgress = false;
const syncedGuestWishlistIdsByUser = new Map<string, Set<string>>();

const normalizeWishlist = (items: string[], limit: number) => {
  return Array.from(new Set(items)).slice(0, limit);
};

const getWishlistId = (item: unknown) => {
  if (typeof item === "string") {
    return item;
  }

  if (item && typeof item === "object" && "_id" in item) {
    const value = (item as { _id?: unknown })._id;
    return typeof value === "string" ? value : "";
  }

  return "";
};

const toWishlistIds = (items: unknown): string[] => {
  if (!Array.isArray(items)) {
    return [];
  }

  return Array.from(new Set(items.flat(Infinity).map(getWishlistId).filter(Boolean)));
};

export const useWishlist = () => {
  const navigate = useNavigate();
  const { data: userData } = useUserInfoQuery(undefined, { refetchOnMountOrArgChange: true });
  const [toggleWishlist] = useToggleWishlistMutation();

  const isLoggedIn = Boolean(userData?.data?._id);
  const userId = userData?.data?._id;
  const hydratedUserIdRef = useRef<string | null>(null);

  const [wishlist, setWishlist] = useState<string[]>(normalizeWishlist(getGuestWishlist(), GUEST_LIMIT));

  const updateWishlistState = (items: string[]) => {
    const normalized = normalizeWishlist(items, isLoggedIn ? USER_LIMIT : GUEST_LIMIT);
    setGuestWishlist(normalized);
    setWishlist(normalized);
    window.dispatchEvent(new Event("wishlist:updated"));
    return normalized;
  };

  useEffect(() => {
    const syncFromStorage = () => {
      const limit = isLoggedIn ? USER_LIMIT : GUEST_LIMIT;
      setWishlist(normalizeWishlist(getGuestWishlist(), limit));
    };

    syncFromStorage();
    window.addEventListener("wishlist:updated", syncFromStorage);
    window.addEventListener("storage", syncFromStorage);

    return () => {
      window.removeEventListener("wishlist:updated", syncFromStorage);
      window.removeEventListener("storage", syncFromStorage);
    };
  }, [isLoggedIn]);

  useEffect(() => {
    if (isLoggedIn && userId && hydratedUserIdRef.current !== userId) {
      const guest = getGuestWishlist();
      const db = toWishlistIds(userData?.data?.wishlist || []);
      const merged = normalizeWishlist([...db, ...guest], USER_LIMIT);
      const guestItemsToSync = merged.filter((id) => guest.includes(id) && !db.includes(id));
      const syncedGuestItems = userId ? syncedGuestWishlistIdsByUser.get(userId) ?? new Set<string>() : new Set<string>();
      const pendingGuestItems = guestItemsToSync.filter((id) => !syncedGuestItems.has(id));

      setGuestWishlist(merged);
      setWishlist(merged);

      if (
        !pendingGuestItems.length ||
        guestWishlistSyncInProgress
      ) {
        hydratedUserIdRef.current = userId;
        return;
      }

      guestWishlistSyncInProgress = true;

      (async () => {
        try {
          for (const id of pendingGuestItems) {
            await toggleWishlist(id).unwrap();
            if (userId) {
              syncedGuestItems.add(id);
              syncedGuestWishlistIdsByUser.set(userId, syncedGuestItems);
            }
          }
          hydratedUserIdRef.current = userId;
        } catch {
          toast.error("We could not sync your guest wishlist to your account. Please try again.");
        } finally {
          guestWishlistSyncInProgress = false;
        }
      })();
    }
  }, [isLoggedIn, toggleWishlist, userData?.data?.wishlist, userId]);

  const isInWishlist = (id: string) => wishlist.includes(id);

  const toggle = async (id: string) => {
    const exists = wishlist.includes(id);

    if (!isLoggedIn) {
      if (!exists && !canAddMoreGuestWishlist()) {
        toast.error("Guest wishlist limit reached. Login to save more than 5 items.");
        navigate("/login");
        return;
      }

      const guestWishlist = getGuestWishlist();
      const updated = exists
        ? guestWishlist.filter((w) => w !== id)
        : normalizeWishlist([...guestWishlist, id], GUEST_LIMIT);
      updateWishlistState(updated);
      return;
    }

    if (!exists && wishlist.length >= USER_LIMIT) {
      toast.error("Wishlist limit reached. You can save up to 50 items only.");
      return;
    }

    const previousWishlist = wishlist;
    const updatedWishlist = exists ? wishlist.filter((w) => w !== id) : [...wishlist, id];

    updateWishlistState(updatedWishlist);

    try {
      await toggleWishlist(id).unwrap();
    } catch {
      updateWishlistState(previousWishlist);
      toast.error("Something went wrong. Please try again.");
    }
  };

  const onLogoutCleanup = () => {
    setGuestWishlist([]);
    setWishlist([]);
    window.dispatchEvent(new Event("wishlist:updated"));
    syncedGuestWishlistIdsByUser.clear();
    hydratedUserIdRef.current = null;
  };

  return {
    wishlist,
    isInWishlist,
    toggle,
    onLogoutCleanup,
  };
};