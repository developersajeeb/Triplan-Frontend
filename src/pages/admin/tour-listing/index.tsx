import React from 'react';
import { useSearchParams } from 'react-router';
import { toast } from 'sonner';
import TableFilter from './TableFilter';
import TourDataTable from './TourDataTable';
import { Skeleton } from '@/components/ui/skeleton';
import ConfirmationDialog from '@/components/utilities/ConfirmationDialog';
import { useGetAllToursQuery, useUpdateTourMutation } from '@/redux/features/tour/tour.api';
import PaginationComponent from '@/components/ui/PaginationComponent';

type TourStatus = 'active' | 'draft';

type PendingStatusChange = {
    id: string;
    title: string;
    nextStatus: TourStatus;
};

const TourListing: React.FC = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const page = parseInt(searchParams.get('page') || '1');
    const search = searchParams.get('search') || '';
    const status = searchParams.get('status') || 'all';
    const [updateTour, { isLoading: isUpdatingTour }] = useUpdateTourMutation();
    const [pendingStatusChange, setPendingStatusChange] = React.useState<PendingStatusChange | null>(null);
    const [disabledTourIds, setDisabledTourIds] = React.useState<Set<string>>(new Set());

    const queryParams: Record<string, string> = {
        page: String(page),
        limit: '10',
        search,
    };

    // Always pass status param - even "all" so backend knows admin is requesting
    queryParams.status = status;

    const { data, isLoading, isFetching } = useGetAllToursQuery(queryParams);

    // Check tours with active/upcoming batches on data load
    React.useEffect(() => {
        if (data?.data && Array.isArray(data.data)) {
            const now = new Date();
            const disabledIds = new Set<string>();

            (data.data as any[]).forEach((tour: any) => {
                if (tour.batches && Array.isArray(tour.batches)) {
                    const hasActiveBatch = tour.batches.some((batch: any) => {
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

    const toursData = (data?.data || []).map((t: any) => ({
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

    const meta = data?.meta || {};

    const handlePageChange = (pageNum: number) => {
        const params = new URLSearchParams(searchParams);
        params.set('page', String(pageNum));
        setSearchParams(params);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleFiltersChange = (filters: { search: string; status: string }) => {
        const params = new URLSearchParams(searchParams);
        params.set('page', '1');
        params.set('search', filters.search || '');
        params.set('status', filters.status || 'all');
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

    return (
        <>
            <h1 className="text-2xl font-semibold mb-4">Tour Listing</h1>

            <div className="border border-gray-200 rounded-xl pb-6 bg-white">
                <TableFilter onChange={handleFiltersChange} />

                <div className="mt-4">
                    {(isLoading || isFetching) ? (
                        <div className="space-y-3 p-6">
                            <Skeleton className="h-6 w-1/3" />
                            {[...Array(5)].map((_, i) => (
                                <div key={i} className="grid grid-cols-6 gap-4 items-center">
                                    <Skeleton className="h-6 w-full col-span-1" />
                                    <Skeleton className="h-6 w-full col-span-2" />
                                    <Skeleton className="h-6 w-full col-span-1" />
                                    <Skeleton className="h-6 w-full col-span-1" />
                                    <Skeleton className="h-6 w-full col-span-1" />
                                </div>
                            ))}
                        </div>
                    ) : (
                        <TourDataTable data={toursData} onStatusChange={handleStatusChangeRequest} onTrendingChange={handleTrendingChange} />
                    )}
                </div>

                {meta.total > 10 ? (
                    <div className="mt-8 flex justify-center">
                        <PaginationComponent
                            currentPage={meta.page || 1}
                            totalPages={meta.totalPages}
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
        </>
    );
};

export default TourListing;