import { useMemo, useState } from 'react';
import { useSearchParams } from 'react-router';
import { useGetTourTypesQuery, useRemoveTourTypeMutation } from "@/redux/features/tour/tour.api";
import { AddTourTypeModal } from "./AddTourTypeModal";
import { EditTourTypeModal } from "./EditTourTypeModal";
import { toast } from "sonner";
import PaginationComponent from "@/components/ui/PaginationComponent";
import TableFilter from './TableFilter';
import TourTypesDataTable, { type TourTypeRow } from './TourTypesDataTable';

interface TourTypeItem {
  _id: string;
  name: string;
  createdAt?: string;
}

type TourTypeQueryResponse =
  | TourTypeItem[]
  | {
      data?: TourTypeItem[];
      meta?: {
        totalPages?: number;
        totalPage?: number;
      };
    };

export default function TourTypes() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [editingType, setEditingType] = useState<TourTypeItem | null>(null);
  
  const page = parseInt(searchParams.get("page") || "1");
  const search = searchParams.get("search") || "";

  const { data, isLoading, isFetching } = useGetTourTypesQuery({
    page: page.toString(),
    limit: "10",
    search: search,
  }) as { data?: TourTypeQueryResponse; isLoading: boolean; isFetching: boolean };

  const [removeTourType] = useRemoveTourTypeMutation();

  // Normalize response shapes: some callers return { data, meta }, others return array directly
  const items: TourTypeItem[] = useMemo(() => {
    if (!data) return [];
    if (Array.isArray(data)) return data as unknown as TourTypeItem[];
    // data may be { data: [...], meta: {...} }
    if (Array.isArray(data.data)) return data.data;
    return [];
  }, [data]);

  const totalPages = useMemo(() => {
    if (!data || Array.isArray(data)) return 1;
    return data.meta?.totalPages || data.meta?.totalPage || 1;
  }, [data]);

  const handleFiltersChange = (filters: { search: string }) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', '1');

    if (filters.search?.trim()) {
      params.set('search', filters.search.trim());
    }
    else {
      params.delete('search');
    }

    setSearchParams(params);
  };

  const handlePageChange = (newPage: number) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', String(newPage));
    setSearchParams(params);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleRemoveTourType = async (tourId: string) => {
    const toastId = toast.loading("Removing...");
    try {
      const res = await removeTourType(tourId).unwrap();
      if (res.success) {
        toast.success("Tour type removed successfully", { id: toastId });
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to remove tour type", { id: toastId });
    }
  };

  return (
    <>
      <div className="flex flex-wrap justify-between items-center gap-4 mb-5">
        <div>
          <h2 className="text-2xl font-bold">All Tour Types</h2>
          <p className="text-base font-medium text-gray-600 mb-0">Manage all tour categories from one place.</p>
        </div>
        <AddTourTypeModal />
      </div>

      <div className="border border-gray-200 rounded-xl pb-6 bg-white">
        <TableFilter
          onChange={handleFiltersChange}
          initialSearch={search}
        />

        <TourTypesDataTable
          data={items as TourTypeRow[]}
          isLoading={isLoading || isFetching}
          onEdit={(item) => setEditingType(item)}
          onDelete={handleRemoveTourType}
        />

        {totalPages > 1 && (
          <div className="mt-8 flex justify-center px-5">
            <PaginationComponent
              currentPage={page}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </div>
        )}
      </div>

      {/* Edit Modal */}
      {editingType && (
        <EditTourTypeModal
          tourType={editingType}
          onClose={() => setEditingType(null)}
        />
      )}
    </>
  );
}