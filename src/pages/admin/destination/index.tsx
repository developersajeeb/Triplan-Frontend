import { useMemo, useState } from 'react';
import { useSearchParams } from 'react-router';
import { toast } from 'sonner';
import PaginationComponent from '@/components/ui/PaginationComponent';
import { useGetDivisionsQuery, useRemoveDivisionMutation } from '@/redux/features/destination/destination.api';
import { AddDestinationModal } from './AddDestinationModal';
import { EditDestinationModal } from './EditDestinationModal';
import TableFilter from './TableFilter';
import DestinationsDataTable, { type DestinationRow } from './DestinationsDataTable';

interface DestinationItem {
    _id: string;
    name: string;
    description?: string;
    thumbnail?: string;
    totalTourListing?: number;
    createdAt?: string;
}

type DestinationQueryResponse = {
    data?: DestinationItem[];
    meta?: {
        totalPages?: number;
        totalPage?: number;
    };
};

const Destination = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [editingDestination, setEditingDestination] = useState<DestinationItem | null>(null);

    const page = parseInt(searchParams.get('page') || '1');
    const search = searchParams.get('search') || '';

    const { data, isLoading, isFetching } = useGetDivisionsQuery({
        page: page.toString(),
        limit: '10',
        search,
    }) as { data?: DestinationQueryResponse; isLoading: boolean; isFetching: boolean };

    const [removeDivision] = useRemoveDivisionMutation();

    const items: DestinationItem[] = useMemo(() => {
        if (!data?.data || !Array.isArray(data.data)) return [];
        return data.data;
    }, [data]);

    const totalPages = useMemo(() => {
        return data?.meta?.totalPages || data?.meta?.totalPage || 1;
    }, [data]);

    const handleFiltersChange = (filters: { search: string }) => {
        const params = new URLSearchParams(searchParams);
        params.set('page', '1');

        if (filters.search?.trim()) {
            params.set('search', filters.search.trim());
        } else {
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

    const handleRemoveDestination = async (id: string) => {
        const toastId = toast.loading('Removing...');
        try {
            const res = await removeDivision(id).unwrap();
            if (res.success) {
                toast.success('Destination removed successfully', { id: toastId });
            }
        } catch (error) {
            console.error(error);
            toast.error('Failed to remove destination', { id: toastId });
        }
    };

    return (
        <>
            <div className="flex flex-wrap justify-between items-center gap-4 mb-5">
                <div>
                    <h2 className="text-2xl font-bold">All Destinations</h2>
                    <p className="text-base font-medium text-gray-600 mb-0">Manage all destinations from one place.</p>
                </div>
                <AddDestinationModal />
            </div>

            <div className="border border-gray-200 rounded-xl pb-6 bg-white">
                <TableFilter onChange={handleFiltersChange} initialSearch={search} />

                <DestinationsDataTable
                    data={items as DestinationRow[]}
                    isLoading={isLoading || isFetching}
                    onEdit={(item) => setEditingDestination(item)}
                    onDelete={handleRemoveDestination}
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

            {editingDestination && (
                <EditDestinationModal
                    destination={editingDestination}
                    onClose={() => setEditingDestination(null)}
                />
            )}
        </>
    );
};

export default Destination;