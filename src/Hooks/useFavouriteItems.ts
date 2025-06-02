"use client";

import { useState, useEffect, useCallback, useMemo, useRef } from "react";
import { getItemByItemNo, getItemStatus } from "@/Services/itemServices";
import { Item, GetItemDto, ItemStatuses } from "@/types/apiTypes";

const ITEMS_PER_PAGE = 30;

const getStoredFavouriteNos = (): string[] => {
  try {
    return JSON.parse(localStorage.getItem("favoriteItems") || "[]");
  } catch {
    console.error("❌ Failed to parse favorite items");
    return [];
  }
};

const mapDtoToItem = (dto: GetItemDto, status?: ItemStatuses): Item => {
  const base = process.env.NEXT_PUBLIC_API_URL || "";
  const placeholder = `${base}/UploadedImages/no-image.png`;

  const image = dto.images?.[0]?.trim();
  const fullImage = image?.startsWith("http")
    ? image
    : image
    ? `${base}/UploadedImages/${image}`
    : placeholder;

  return {
    itemNo: dto.itemNo,
    name: dto.name,
    firstImage: fullImage,
    description: dto.description,
    groupId: `GROUP_FOR_${dto.itemNo}`,
    subOneId: `SUBONE_FOR_${dto.itemNo}`,
    status: status,
  };
};



const useFavouriteItems = () => {
  const [originalItems, setOriginalItems] = useState<Item[]>([]);
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchLoading, setSearchLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);

  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const fetchItems = useCallback(async () => {
  setLoading(true);
  setError(null);
  setPage(1);

  const itemNos = getStoredFavouriteNos();
  if (!itemNos.length) {
    setOriginalItems([]);
    setItems([]);
    setLoading(false);
    return;
  }

  try {
    const results = await Promise.all(
      itemNos.map(async (no) => {
        const dto = await getItemByItemNo(no);
        const status = await getItemStatus(no); 
        return mapDtoToItem(dto, status);
      })
    );

    setOriginalItems(results);
    setItems(results);
  } catch (err) {
    console.error("❌ Failed to fetch favorite items:", err);
    setError("حدث خطأ أثناء جلب المنتجات المفضلة.");
    setOriginalItems([]);
    setItems([]);
  } finally {
    setLoading(false);
  }
}, []);


  useEffect(() => {
    fetchItems();

    const onStorage = (e: StorageEvent) => {
      if (e.key === "favoriteItems" || e.key === null) fetchItems();
    };

    window.addEventListener("storage", onStorage);
    window.addEventListener("favourites-updated", fetchItems);

    return () => {
      window.removeEventListener("storage", onStorage);
      window.removeEventListener("favourites-updated", fetchItems);
    };
  }, [fetchItems]);

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    setSearchLoading(true);

    debounceRef.current = setTimeout(() => {
      const term = query.trim().toLowerCase();
      const filtered = term
        ? originalItems.filter(
            (item) =>
              item.name.toLowerCase().includes(term) ||
              item.itemNo.toLowerCase().includes(term)
          )
        : originalItems;

      setItems(filtered);
      setPage(1);
      setSearchLoading(false);
    }, 400);

    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [query, originalItems]);

  const paginated = useMemo(() => {
    const start = (page - 1) * ITEMS_PER_PAGE;
    return items.slice(start, start + ITEMS_PER_PAGE);
  }, [items, page]);
  const clearFavourites = () => {
    localStorage.removeItem("favoriteItems");
    window.dispatchEvent(new Event("favourites-updated"));
  };
  return {
    items: paginated,
    loading: loading || searchLoading,
    error,
    query,
    setQuery,
    page,
    setPage,
    total: items.length,
    refetch: fetchItems,
    clearFavourites,
  };
};
export default useFavouriteItems;
