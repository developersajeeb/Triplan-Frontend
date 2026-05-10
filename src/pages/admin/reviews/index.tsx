import { useMemo, useState } from 'react';
import { format } from 'date-fns';
import { toast } from 'sonner';
import { useSearchParams } from 'react-router';
import { Save, UploadCloud, X } from 'lucide-react';
import PaginationComponent from '@/components/ui/PaginationComponent';
import ConfirmationDialog from '@/components/utilities/ConfirmationDialog';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import MultipleImageUploader from '@/components/shared/uploaders/MultipleImageUploader';
import type { FileMetadata } from '@/hooks/use-file-upload';
import type { IAdminReview } from '@/types';
import {
    useDeleteAdminReviewMutation,
    useGetAdminReviewsQuery,
    useUpdateAdminReviewMutation,
} from '@/redux/features/review/review.api';
import TableFilter from './TableFilter';
import ReviewsDataTable from './ReviewsDataTable';

type AdminReviewsResponse = {
    data?: IAdminReview[];
    meta?: {
        page?: number;
        total?: number;
        totalPages?: number;
    };
};

const defaultEditForm = {
    guideRating: 5,
    serviceRating: 5,
    transportationRating: 5,
    organizationRating: 5,
    comment: '',
    tourSlug: '',
    tourTitle: '',
};

const Reviews = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const page = Math.max(1, Number(searchParams.get('page') || '1'));
    const search = searchParams.get('search') || '';
    const sort = searchParams.get('sort') || 'newest';

    const { data, isLoading, isFetching } = useGetAdminReviewsQuery({
        page,
        limit: 10,
        ...(search ? { search } : {}),
        ...(sort ? { sort } : {}),
    }) as {
        data?: AdminReviewsResponse;
        isLoading: boolean;
        isFetching: boolean;
    };

    const [updateAdminReview, { isLoading: isUpdating }] = useUpdateAdminReviewMutation();
    const [deleteAdminReview, { isLoading: isDeleting }] = useDeleteAdminReviewMutation();

    const [viewingReview, setViewingReview] = useState<IAdminReview | null>(null);
    const [editingReview, setEditingReview] = useState<IAdminReview | null>(null);
    const [deletingReview, setDeletingReview] = useState<IAdminReview | null>(null);

    const [editForm, setEditForm] = useState(defaultEditForm);
    const [existingEditImages, setExistingEditImages] = useState<string[]>([]);
    const [newEditImages, setNewEditImages] = useState<(File | FileMetadata)[] | []>([]);

    const reviews = useMemo(() => (Array.isArray(data?.data) ? data.data : []), [data?.data]);

    const handleFiltersChange = (filters: { search: string; sort: string }) => {
        const params = new URLSearchParams(searchParams);
        params.set('page', '1');

        if (filters.search?.trim()) {
            params.set('search', filters.search.trim());
        } else {
            params.delete('search');
        }

        if (filters.sort && filters.sort !== 'newest') {
            params.set('sort', filters.sort);
        } else {
            params.delete('sort');
        }

        setSearchParams(params);
    };

    const handlePageChange = (pageNum: number) => {
        const params = new URLSearchParams(searchParams);
        params.set('page', String(pageNum));
        setSearchParams(params);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const startEdit = (review: IAdminReview) => {
        setEditingReview(review);
        setEditForm({
            guideRating: review.guideRating,
            serviceRating: review.serviceRating,
            transportationRating: review.transportationRating,
            organizationRating: review.organizationRating,
            comment: review.comment,
            tourSlug: review.tourSlug,
            tourTitle: review.tourTitle,
        });
        setExistingEditImages(review.images || []);
        setNewEditImages([]);
    };

    const closeEdit = () => {
        setEditingReview(null);
        setEditForm(defaultEditForm);
        setExistingEditImages([]);
        setNewEditImages([]);
    };

    const handleSaveEdit = async () => {
        if (!editingReview) {
            return;
        }

        if (!editForm.comment.trim()) {
            toast.error('Review comment is required.');
            return;
        }

        try {
            const payload = new FormData();
            payload.append('guideRating', String(editForm.guideRating));
            payload.append('serviceRating', String(editForm.serviceRating));
            payload.append('transportationRating', String(editForm.transportationRating));
            payload.append('organizationRating', String(editForm.organizationRating));
            payload.append('comment', editForm.comment.trim());
            payload.append('tourSlug', editForm.tourSlug);
            payload.append('tourTitle', editForm.tourTitle);
            payload.append('existingImages', JSON.stringify(existingEditImages));

            const fileList = newEditImages.filter((item) => item instanceof File) as File[];
            fileList.slice(0, Math.max(0, 3 - existingEditImages.length)).forEach((file) => {
                payload.append('images', file);
            });

            await updateAdminReview({
                reviewId: editingReview._id,
                payload,
            }).unwrap();

            toast.success('Review updated successfully.');
            closeEdit();
        } catch (error: unknown) {
            const message = (error as { data?: { message?: string } })?.data?.message || 'Failed to update review.';
            toast.error(message);
        }
    };

    const handleDelete = async () => {
        if (!deletingReview) {
            return;
        }

        try {
            await deleteAdminReview(deletingReview._id).unwrap();
            toast.success('Review deleted successfully.');
            setDeletingReview(null);
        } catch (error: unknown) {
            const message = (error as { data?: { message?: string } })?.data?.message || 'Failed to delete review.';
            toast.error(message);
        }
    };

    const totalReviews = Number(data?.meta?.total ?? 0);
    const currentPage = Number(data?.meta?.page ?? page);
    const totalPages = Math.max(1, Number(data?.meta?.totalPages ?? Math.ceil(totalReviews / 10)));

    return (
        <>
            <h2 className="text-2xl font-bold">All Reviews</h2>
            <p className="text-base font-medium text-gray-600 mb-5">
                Manage user reviews, moderate feedback, and keep quality high.
            </p>

            <div className="border border-gray-200 rounded-xl pb-6 bg-white">
                <TableFilter onChange={handleFiltersChange} initialSearch={search} initialSort={sort} />

                <ReviewsDataTable
                    data={reviews}
                    isLoading={isLoading || isFetching}
                    onView={setViewingReview}
                    onEdit={startEdit}
                    onDelete={setDeletingReview}
                />

                {totalReviews > 10 ? (
                    <div className="mt-8 flex justify-center">
                        <PaginationComponent
                            currentPage={currentPage}
                            totalPages={totalPages}
                            paginationItemsToDisplay={2}
                            onPageChange={handlePageChange}
                        />
                    </div>
                ) : null}
            </div>

            <Dialog open={Boolean(viewingReview)} onOpenChange={(open) => !open && setViewingReview(null)}>
                <DialogContent className="max-w-3xl">
                    <DialogHeader>
                        <DialogTitle>Review Details</DialogTitle>
                        <DialogDescription className="sr-only">Review detail modal</DialogDescription>
                    </DialogHeader>

                    {viewingReview ? (
                        <div className="space-y-5">
                            <div className="flex flex-wrap items-start justify-between gap-3">
                                <div>
                                    <p className="text-lg font-semibold text-gray-800">{viewingReview.userName}</p>
                                    <p className="text-sm text-gray-500">{viewingReview.userEmail}</p>
                                    <p className="text-sm text-gray-500">{format(new Date(viewingReview.createdAt), 'MMM dd, yyyy')}</p>
                                </div>
                                <div className="rounded-full bg-primary-100 px-3 py-1 text-sm font-semibold text-primary-700">
                                    {viewingReview.overallRating.toFixed(1)} / 5
                                </div>
                            </div>

                            <div className="mt-4 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
                                {[
                                    ['Guide', viewingReview.guideRating],
                                    ['Service', viewingReview.serviceRating],
                                    ['Transportation', viewingReview.transportationRating],
                                    ['Organization', viewingReview.organizationRating],
                                ].map(([label, value]) => (
                                    <div key={String(label)} className="rounded-2xl bg-primary-50 p-3 text-sm font-medium text-gray-600">
                                        <div className="flex items-center justify-between">
                                            <span>{String(label)}</span>
                                            <span>{Number(value).toFixed(1)}/5</span>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <p className="text-gray-600 leading-7">{viewingReview.comment}</p>

                            {viewingReview.images.length > 0 ? (
                                <div className="flex flex-wrap gap-3">
                                    {viewingReview.images.map((imageUrl) => (
                                        <a
                                            key={imageUrl}
                                            href={imageUrl}
                                            target="_blank"
                                            rel="noreferrer"
                                            className="block h-24 w-24 overflow-hidden rounded-2xl border border-gray-100"
                                        >
                                            <img src={imageUrl} alt="Review attachment" className="h-full w-full object-cover" />
                                        </a>
                                    ))}
                                </div>
                            ) : null}
                        </div>
                    ) : null}
                </DialogContent>
            </Dialog>

            <Dialog open={Boolean(editingReview)} onOpenChange={(open) => !open && closeEdit()}>
                <DialogContent className="max-w-3xl">
                    <DialogHeader>
                        <DialogTitle>Edit Review</DialogTitle>
                        <DialogDescription className="sr-only">Review edit modal</DialogDescription>
                    </DialogHeader>

                    <div className="space-y-4">
                        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
                            {[
                                ['guideRating', 'Guide', editForm.guideRating],
                                ['serviceRating', 'Service', editForm.serviceRating],
                                ['transportationRating', 'Transportation', editForm.transportationRating],
                                ['organizationRating', 'Organization', editForm.organizationRating],
                            ].map(([key, label, value]) => (
                                <div key={String(key)} className="space-y-2">
                                    <Label className="text-xs font-semibold text-gray-700">{String(label)}</Label>
                                    <Select
                                        value={String(value)}
                                        onValueChange={(nextValue) => {
                                            const ratingValue = Number(nextValue);
                                            setEditForm((prev) => ({ ...prev, [String(key)]: ratingValue }));
                                        }}
                                    >
                                        <SelectTrigger className="tp-select h-10 bg-white">
                                            <SelectValue placeholder="Select" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {[5, 4, 3, 2, 1].map((rating) => (
                                                <SelectItem key={rating} value={String(rating)}>
                                                    {rating}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                            ))}
                        </div>

                        <div className="space-y-2">
                            <Label className="text-xs font-semibold text-gray-700">Comment</Label>
                            <Textarea
                                value={editForm.comment}
                                onChange={(event) => setEditForm((prev) => ({ ...prev, comment: event.target.value }))}
                                className="tp-textarea min-h-28 bg-white"
                                placeholder="Write review comment"
                            />
                        </div>

                        <div className="space-y-2">
                            <div className="flex items-center gap-2">
                                <UploadCloud size={14} className="text-primary-500" />
                                <Label className="text-xs font-semibold text-gray-700">Review images (up to 3)</Label>
                            </div>

                            {existingEditImages.length > 0 ? (
                                <div className="flex flex-wrap gap-3">
                                    {existingEditImages.map((imageUrl) => (
                                        <div key={imageUrl} className="relative h-20 w-20 overflow-hidden rounded-2xl border border-gray-100 bg-white">
                                            <img src={imageUrl} alt="Existing review" className="h-full w-full object-cover" />
                                            <button
                                                type="button"
                                                onClick={() => setExistingEditImages((prev) => prev.filter((item) => item !== imageUrl))}
                                                className="absolute top-1 right-1 h-5 w-5 rounded-full bg-black/70 text-white inline-flex items-center justify-center"
                                                title="Remove image"
                                            >
                                                <X size={12} />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            ) : null}

                            <MultipleImageUploader onChange={setNewEditImages as React.Dispatch<React.SetStateAction<[] | (File | FileMetadata)[]>>} />
                        </div>

                        <div className="flex items-center gap-2">
                            <button
                                type="button"
                                onClick={handleSaveEdit}
                                disabled={isUpdating}
                                className="tp-action-btn inline-flex items-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
                            >
                                <Save size={14} />
                                {isUpdating ? 'Saving...' : 'Save'}
                            </button>

                            <button
                                type="button"
                                onClick={closeEdit}
                                className="tp-cancel-btn inline-flex items-center gap-2 duration-300"
                            >
                                <X size={14} />
                                Cancel
                            </button>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>

            <ConfirmationDialog
                isOpen={Boolean(deletingReview)}
                title="Delete Review"
                description="Are you sure you want to delete this review? This action cannot be undone."
                confirmText="Delete"
                cancelText="Cancel"
                isLoading={isDeleting}
                isDestructive={true}
                onConfirm={handleDelete}
                onCancel={() => setDeletingReview(null)}
            />
        </>
    );
};

export default Reviews;