/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { useSearchParams } from 'react-router';
import { toast } from 'sonner';
import TableFilter from './TableFilter';
import TourDataTable from './TourDataTable';
import { Skeleton } from '@/components/ui/skeleton';
import {
    Table,
    TableHeader,
    TableBody,
    TableRow,
    TableHead,
    TableCell,
} from '@/components/ui/table';
import ConfirmationDialog from '@/components/utilities/ConfirmationDialog';
import { useGetAllToursQuery, useUpdateTourMutation, useDeleteTourMutation } from '@/redux/features/tour/tour.api';
import PaginationComponent from '@/components/ui/PaginationComponent';

type TourStatus = 'active' | 'draft';

type PendingStatusChange = {
    id: string;
    title: string;
    nextStatus: TourStatus;
};

type PendingDeleteChange = {
    id: string;
    title: string;
};

type ApiResponse = {
    data: Array<{
        _id: string;
        title: string;
        slug: string;
        divisionName?: string;
        arrivalLocation?: string;
        sellingPrice?: number;
        costFrom?: number;
        isDraft: boolean;
        totalBookings?: number;
        bookingsCount?: number;
        bookingCount?: number;
        isTrending: boolean;
        batches?: Array<{
            endDate: string;
        }>;
    }>;
    meta: {
        page: number;
        totalPages: number;
        total: number;
    };
};

const TourListing: React.FC = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const page = parseInt(searchParams.get('page') || '1');
    const search = searchParams.get('search') || '';
    const status = searchParams.get('status') || 'all';
    const sort = searchParams.get('sort') || 'newest';
    const [updateTour, { isLoading: isUpdatingTour }] = useUpdateTourMutation();
    const [deleteTour, { isLoading: isDeletingTour }] = useDeleteTourMutation();
    const [pendingStatusChange, setPendingStatusChange] = React.useState<PendingStatusChange | null>(null);
    const [pendingDeleteChange, setPendingDeleteChange] = React.useState<PendingDeleteChange | null>(null);
    const [disabledTourIds, setDisabledTourIds] = React.useState<Set<string>>(new Set());

    const queryParams: Record<string, string> = {
        page: String(page),
        limit: '10',
        search,
    };

    // Always pass status param - even "all" so backend knows admin is requesting
    queryParams.status = status;
    queryParams.sort = sort;

    const { data, isLoading, isFetching } = useGetAllToursQuery(queryParams) as { data?: ApiResponse; isLoading: boolean; isFetching: boolean };

    // Check tours with active/upcoming batches on data load
    React.useEffect(() => {
        if (data?.data && Array.isArray(data.data)) {
            const now = new Date();
            const disabledIds = new Set<string>();

            data.data.forEach((tour) => {
                if (tour.batches && Array.isArray(tour.batches)) {
                    const hasActiveBatch = tour.batches.some((batch) => {
                        return new Date(batch.endDate) > now;
                    });
                    if (hasActiveBatch && !tour.isDraft) {
                        disabledIds.add(tour._id);
                    }
                }
            });

            setDisabledTourIds(disabledIds);
        }
    }, [data]);

    const toursData = (data?.data || []).map((t) => ({
        id: t._id,
        title: t.title,
        slug: t.slug,
        location: t.divisionName || t.arrivalLocation || '',
        price: t.sellingPrice ?? t.costFrom ?? 0,
        isDraft: Boolean(t.isDraft),
        totalBookings: Number(t.totalBookings ?? t.bookingsCount ?? t.bookingCount ?? 0),
        isTrending: Boolean(t.isTrending),
        isDisabled: disabledTourIds.has(t._id),
    }));

    const handlePageChange = (pageNum: number) => {
        const params = new URLSearchParams(searchParams);
        params.set('page', String(pageNum));
        setSearchParams(params);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleFiltersChange = (filters: { search: string; status: string; sort: string }) => {
        const params = new URLSearchParams(searchParams);
        params.set('page', '1');
        params.set('search', filters.search || '');
        params.set('status', filters.status || 'all');
        params.set('sort', filters.sort || 'newest');
        setSearchParams(params);
    };

    const handleStatusChangeRequest = (tour: { id: string; title: string; isDraft: boolean }, nextStatus: TourStatus) => {
        if ((tour.isDraft && nextStatus === 'draft') || (!tour.isDraft && nextStatus === 'active')) {
            return;
        }

        // Prevent drafting if tour is disabled (has ongoing bookings)
        if (nextStatus === 'draft' && disabledTourIds.has(tour.id)) {
            toast.error('This tour has ongoing bookings and cannot be marked as draft.');
            return;
        }

        setPendingStatusChange({
            id: tour.id,
            title: tour.title,
            nextStatus,
        });
    };

    const handleTrendingChange = async (tour: { id: string; title?: string }, nextTrending: boolean) => {
        const toastId = toast.loading(`${nextTrending ? 'Enabling' : 'Disabling'} trending...`);
        try {
            await updateTour({ id: tour.id, isTrending: nextTrending }).unwrap();
            toast.success(`Trending ${nextTrending ? 'enabled' : 'disabled'} for tour.`, { id: toastId });
        }
        catch (error: any) {
            toast.error(error?.data?.message || 'Failed to update trending flag.', { id: toastId });
        }
    };

    const handleDeleteRequest = (tour: { id: string; title: string }) => {
        setPendingDeleteChange({
            id: tour.id,
            title: tour.title,
        });
    };

    const handleConfirmStatusChange = async () => {
        if (!pendingStatusChange) {
            return;
        }

        const toastId = toast.loading(`Updating to ${pendingStatusChange.nextStatus}...`);
        try {
            await updateTour({
                id: pendingStatusChange.id,
                isDraft: pendingStatusChange.nextStatus === 'draft',
            }).unwrap();

            toast.success(`Tour marked as ${pendingStatusChange.nextStatus}.`, { id: toastId });
            setPendingStatusChange(null);
        }
        catch (error: any) {
            const errorMessage = error?.data?.message || 'Failed to update tour status.';
            toast.error(errorMessage, { id: toastId });

            // If error is about active/upcoming batches, disable this tour's status switch
            if (errorMessage.includes('active') || errorMessage.includes('upcoming') || errorMessage.includes('batches')) {
                setDisabledTourIds(prev => new Set([...prev, pendingStatusChange.id]));
            }
        }
    };

    const handleConfirmDelete = async () => {
        if (!pendingDeleteChange) {
            return;
        }

        const toastId = toast.loading('Deleting tour...');
        try {
            await deleteTour(pendingDeleteChange.id).unwrap();
            toast.success(`Tour "${pendingDeleteChange.title}" deleted successfully.`, { id: toastId });
            setPendingDeleteChange(null);
        }
        catch (error: any) {
            toast.error(error?.data?.message || 'Failed to delete tour.', { id: toastId });
        }
    };

    return (
        <>
            <h2 className="text-2xl font-bold">Tour Listing</h2>
            <p className="text-base font-medium text-gray-600 mb-5">
                Manage all your tours here.
            </p>

            <div className="border border-gray-200 rounded-xl pb-6 bg-white">
                <TableFilter onChange={handleFiltersChange} />

                <div className="mt-4">
                    {(isLoading || isFetching) ? (
                        <div className="overflow-x-auto">
                            <Table className="min-w-[700px]">
                                <TableHeader>
                                    <TableRow className="bg-primary-50 hover:bg-primary-50">
                                        <TableHead className="min-w-[60px] max-w-[60px] text-sm font-bold py-3 pl-6">No.</TableHead>
                                        <TableHead className="min-w-[200px] text-sm font-bold py-3">Title</TableHead>
                                        <TableHead className="min-w-[80px] text-sm font-bold py-3">Location</TableHead>
                                        <TableHead className="min-w-[80px] text-sm font-bold py-3">Price</TableHead>
                                        <TableHead className="min-w-[80px] text-sm font-bold py-3">Bookings</TableHead>
                                        <TableHead className="min-w-[80px] text-sm font-bold py-3">Status</TableHead>
                                        <TableHead className="min-w-[80px] text-sm font-bold py-3">Trending</TableHead>
                                        <TableHead className="text-sm font-bold py-3 pr-6 text-right">Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {[...Array(5)].map((_, i) => (
                                        <TableRow key={i}>
                                            <TableCell className="pl-6 py-3"><Skeleton className="h-5 w-8" /></TableCell>
                                            <TableCell className="py-3"><Skeleton className="h-5 w-40" /></TableCell>
                                            <TableCell className="py-3"><Skeleton className="h-5 w-24" /></TableCell>
                                            <TableCell className="py-3"><Skeleton className="h-5 w-20" /></TableCell>
                                            <TableCell className="py-3"><Skeleton className="h-5 w-14" /></TableCell>
                                            <TableCell className="py-3"><Skeleton className="h-8 w-14 rounded-full" /></TableCell>
                                            <TableCell className="py-3"><Skeleton className="h-8 w-14 rounded-full" /></TableCell>
                                            <TableCell className="py-3 pr-6">
                                                <div className="flex justify-end gap-2">
                                                    <Skeleton className="h-8 w-16 rounded-md" />
                                                    <Skeleton className="h-8 w-14 rounded-md" />
                                                    <Skeleton className="h-8 w-16 rounded-md" />
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>
                    ) : (
                        <TourDataTable data={toursData} onStatusChange={handleStatusChangeRequest} onTrendingChange={handleTrendingChange} onDelete={handleDeleteRequest} />
                    )}
                </div>

                {data?.meta && data.meta.total > 10 ? (
                    <div className="mt-8 flex justify-center">
                        <PaginationComponent
                            currentPage={data?.meta?.page || 1}
                            totalPages={Math.ceil((data?.meta?.total || 0) / 10)}
                            paginationItemsToDisplay={2}
                            onPageChange={handlePageChange}
                        />
                    </div>
                ) : null}
            </div>

            <ConfirmationDialog
                isOpen={Boolean(pendingStatusChange)}
                title={pendingStatusChange?.nextStatus === 'draft' ? 'Save as draft?' : 'Publish tour?'}
                description={pendingStatusChange?.nextStatus === 'draft'
                    ? `Saving as draft will hide ${pendingStatusChange?.title || 'this tour'} from public. You can only do this after all batches have ended.`
                    : `Publishing will make ${pendingStatusChange?.title || 'this tour'} visible to the public.`}
                confirmText={pendingStatusChange?.nextStatus === 'draft' ? 'Save Draft' : 'Publish'}
                cancelText="Cancel"
                isLoading={isUpdatingTour}
                onConfirm={handleConfirmStatusChange}
                onCancel={() => setPendingStatusChange(null)}
            />

            <ConfirmationDialog
                isOpen={Boolean(pendingDeleteChange)}
                title="Delete tour?"
                description={`Are you sure you want to delete "${pendingDeleteChange?.title || 'this tour'}"? This action cannot be undone.`}
                confirmText="Delete"
                cancelText="Cancel"
                isLoading={isDeletingTour}
                onConfirm={handleConfirmDelete}
                onCancel={() => setPendingDeleteChange(null)}
            />
        </>
    );
};

export default TourListing;