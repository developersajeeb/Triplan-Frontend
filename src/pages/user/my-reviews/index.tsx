import { Link } from "react-router";
import { useState } from "react";
import { format } from "date-fns";
import { toast } from "sonner";
import { Pencil, Save, Trash2, UploadCloud, X } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { useDeleteMyReviewMutation, useGetMyReviewsQuery, useUpdateMyReviewMutation } from "@/redux/features/review/review.api";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import MultipleImageUploader from "@/components/shared/uploaders/MultipleImageUploader";
import ConfirmationDialog from "@/components/utilities/ConfirmationDialog";
import type { FileMetadata } from "@/hooks/use-file-upload";


const MyReviews = () => {
    const { data: reviewData, isLoading, isFetching } = useGetMyReviewsQuery();
    const [deleteMyReview, { isLoading: isDeleting }] = useDeleteMyReviewMutation();
    const [updateMyReview, { isLoading: isUpdating }] = useUpdateMyReviewMutation();
    const [deletingReviewId, setDeletingReviewId] = useState<string | null>(null);
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const [editingReviewId, setEditingReviewId] = useState<string | null>(null);
    const [editForm, setEditForm] = useState({
        guideRating: 5,
        serviceRating: 5,
        transportationRating: 5,
        organizationRating: 5,
        comment: "",
        tourSlug: "",
        tourTitle: "",
    });
    const [existingEditImages, setExistingEditImages] = useState<string[]>([]);
    const [newEditImages, setNewEditImages] = useState<(File | FileMetadata)[] | []>([]);

    const reviews = reviewData?.data ?? [];

    const ratingOptions = [5, 4, 3, 2, 1];

    const startEdit = (review: typeof reviews[number]) => {
        setEditingReviewId(review._id);
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

    const cancelEdit = () => {
        setEditingReviewId(null);
        setEditForm({
            guideRating: 5,
            serviceRating: 5,
            transportationRating: 5,
            organizationRating: 5,
            comment: "",
            tourSlug: "",
            tourTitle: "",
        });
        setExistingEditImages([]);
        setNewEditImages([]);
    };

    const handleSaveEdit = async (reviewId: string) => {
        if (!editForm.comment.trim()) {
            toast.error("Review comment is required");
            return;
        }

        try {
            const payload = new FormData();
            payload.append("guideRating", String(editForm.guideRating));
            payload.append("serviceRating", String(editForm.serviceRating));
            payload.append("transportationRating", String(editForm.transportationRating));
            payload.append("organizationRating", String(editForm.organizationRating));
            payload.append("comment", editForm.comment.trim());
            payload.append("tourSlug", editForm.tourSlug);
            payload.append("tourTitle", editForm.tourTitle);
            payload.append("existingImages", JSON.stringify(existingEditImages));

            const fileList = newEditImages.filter((item) => item instanceof File) as File[];
            fileList.slice(0, Math.max(0, 3 - existingEditImages.length)).forEach((file) => {
                payload.append("images", file);
            });

            await updateMyReview({
                reviewId,
                payload,
            }).unwrap();

            toast.success("Review updated successfully");
            cancelEdit();
        } catch (error) {
            console.error(error);
            toast.error("Failed to update review. Please try again.");
        }
    };

    const handleDeleteClick = (reviewId: string) => {
        setDeletingReviewId(reviewId);
        setIsDeleteDialogOpen(true);
    };

    const handleConfirmDelete = async () => {
        if (!deletingReviewId) return;

        try {
            await deleteMyReview(deletingReviewId).unwrap();
            toast.success("Review deleted successfully");
            setIsDeleteDialogOpen(false);
        } catch (error) {
            console.error(error);
            toast.error("Failed to delete review. Please try again.");
        } finally {
            setDeletingReviewId(null);
        }
    };

    const handleCancelDelete = () => {
        setIsDeleteDialogOpen(false);
        setDeletingReviewId(null);
    };

    return (
        <>
            <h2 className="text-xl font-bold text-primary-950 mb-4">My Reviews</h2>

            <section className="space-y-4">
                {isLoading || isFetching ? (
                    Array.from({ length: 3 }).map((_, index) => (
                        <div key={index} className="border border-gray-200 rounded-xl p-5 space-y-3">
                            <Skeleton className="h-5 w-40" />
                            <Skeleton className="h-4 w-full" />
                            <Skeleton className="h-4 w-4/5" />
                            <Skeleton className="h-9 w-full" />
                        </div>
                    ))
                ) : reviews.length > 0 ? (
                    reviews.map((review) => (
                        <div key={review._id} className="border border-gray-200 rounded-xl p-5">
                            <div className="flex flex-wrap items-start justify-between gap-3">
                                <p className="text-sm font-semibold text-gray-500 flex items-center gap-2">
                                    <span className="w-[6px] h-[6px] bg-gray-500 rounded-full inline-block"></span>
                                    {format(new Date(review.createdAt), "dd MMMM yyyy")}
                                </p>
                                <p className="text-xs font-semibold text-primary-700 bg-primary-100 px-2 py-1 rounded-full">
                                    {review.overallRating.toFixed(1)} / 5
                                </p>
                            </div>

                            <p className="text-base font-medium text-gray-600 mt-2">{review.comment}</p>

                            <div className="mt-4 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
                                {[
                                    ["Guide", review.guideRating],
                                    ["Service", review.serviceRating],
                                    ["Transportation", review.transportationRating],
                                    ["Organization", review.organizationRating],
                                ].map(([label, value]) => (
                                    <div key={label} className="rounded-2xl bg-primary-50 p-3 text-sm font-medium text-gray-600">
                                        <div className="flex items-center justify-between">
                                            <span>{label}</span>
                                            <span>{Number(value).toFixed(1)}/5</span>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {review.images.length > 0 && (
                                <div className="mt-4 flex flex-wrap gap-3">
                                    {review.images.map((imageUrl) => (
                                        <a
                                            key={imageUrl}
                                            href={imageUrl}
                                            target="_blank"
                                            rel="noreferrer"
                                            className="block h-20 w-20 overflow-hidden rounded-2xl border border-gray-100"
                                        >
                                            <img src={imageUrl} alt="Review attachment" className="h-full w-full object-cover" />
                                        </a>
                                    ))}
                                </div>
                            )}

                            <div className="mt-4 pt-5 border-t flex flex-col sm:flex-row justify-between gap-3 sm:items-center">
                                <p className="text-sm font-medium text-gray-700">
                                    Tour:{" "}
                                    <Link to={review.tourSlug ? `/tours/${review.tourSlug}` : "/tours"} className="font-semibold text-primary-400 hover:text-primary-500 duration-300">
                                        {review.tourTitle}
                                    </Link>
                                </p>

                                <div className="flex items-center gap-2">
                                    <button
                                        type="button"
                                        onClick={() => startEdit(review)}
                                        className="h-8 w-8 rounded-full border border-gray-300 text-gray-700 hover:bg-primary-500 hover:text-white hover:border-primary-500 duration-300 inline-flex items-center justify-center"
                                        title="Edit review"
                                    >
                                        <Pencil size={14} />
                                    </button>

                                    <button
                                        type="button"
                                        onClick={() => handleDeleteClick(review._id)}
                                        disabled={isDeleting && deletingReviewId === review._id}
                                        className="h-8 w-8 rounded-full border border-gray-300 text-gray-700 hover:bg-red-600 hover:text-white hover:border-red-600 duration-300 inline-flex items-center justify-center disabled:opacity-60 disabled:cursor-not-allowed"
                                        title="Delete review"
                                    >
                                        <Trash2 size={14} />
                                    </button>
                                </div>
                            </div>

                            {editingReviewId === review._id && (
                                <div className="mt-5 p-4 rounded-2xl border border-primary-100 bg-primary-50 space-y-4">
                                    <p className="text-sm font-semibold text-primary-700">Edit your review</p>

                                    <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
                                        {[
                                            ["guideRating", "Guide", editForm.guideRating],
                                            ["serviceRating", "Service", editForm.serviceRating],
                                            ["transportationRating", "Transportation", editForm.transportationRating],
                                            ["organizationRating", "Organization", editForm.organizationRating],
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
                                                        {ratingOptions.map((rating) => (
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
                                            placeholder="Write your review"
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <div className="flex items-center gap-2">
                                            <UploadCloud size={14} className="text-primary-500" />
                                            <Label className="text-xs font-semibold text-gray-700">Review images (up to 3)</Label>
                                        </div>

                                        {existingEditImages.length > 0 && (
                                            <div className="flex flex-wrap gap-3">
                                                {existingEditImages.map((imageUrl) => (
                                                    <div key={imageUrl} className="relative h-20 w-20 overflow-hidden rounded-2xl border border-gray-100 bg-white">
                                                        <img src={imageUrl} alt="Existing review image" className="h-full w-full object-cover" />
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
                                        )}

                                        <MultipleImageUploader onChange={setNewEditImages as React.Dispatch<React.SetStateAction<[] | (File | FileMetadata)[]>>} />
                                    </div>

                                    <div className="flex items-center gap-2">
                                        <button
                                            type="button"
                                            onClick={() => handleSaveEdit(review._id)}
                                            disabled={isUpdating}
                                            className="tp-action-btn inline-flex items-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
                                        >
                                            <Save size={14} />
                                            {isUpdating ? "Saving..." : "Save"}
                                        </button>

                                        <button
                                            type="button"
                                            onClick={cancelEdit}
                                            className="tp-cancel-btn inline-flex items-center gap-2 duration-300"
                                        >
                                            <X size={14} />
                                            Cancel
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    ))
                ) : (
                    <p className="text-gray-500 text-center font-medium border border-gray-200 rounded-xl p-8">
                        You have not submitted any reviews yet.
                    </p>
                )}
            </section>
            <ConfirmationDialog
                isOpen={isDeleteDialogOpen}
                title="Delete Review"
                description="Are you sure you want to delete this review? This action cannot be undone."
                confirmText="Delete"
                cancelText="Cancel"
                isLoading={isDeleting}
                isDestructive={true}
                onConfirm={handleConfirmDelete}
                onCancel={handleCancelDelete}
            />
        </>
    );
};

export default MyReviews;