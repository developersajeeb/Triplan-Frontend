import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { format } from "date-fns";
import { Star, UploadCloud } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import MultipleImageUploader from "@/components/shared/uploaders/MultipleImageUploader";
import { Skeleton } from "@/components/ui/skeleton";
import { useCreateReviewMutation, useGetReviewEligibilityQuery, useGetTourReviewsQuery } from "@/redux/features/review/review.api";
import type { FileMetadata } from "@/hooks/use-file-upload";
import useFancyBox from "@/hooks/useFancybox";
import { type FancyboxOptions } from "@fancyapps/ui/dist/fancybox";

const reviewSchema = z.object({
  guideRating: z.number().int().min(1).max(5),
  serviceRating: z.number().int().min(1).max(5),
  transportationRating: z.number().int().min(1).max(5),
  organizationRating: z.number().int().min(1).max(5),
  comment: z.string().trim().min(1, "Review comment is required").max(1000),
});

type ReviewFormValues = z.infer<typeof reviewSchema>;

const ratingOptions = [5, 4, 3, 2, 1];

interface TourReviewSectionProps {
  tourId?: string;
  sectionId?: string;
}

const buildRatingLabel = (value: number) => {
  if (value === 5) return "Excellent";
  if (value === 4) return "Very good";
  if (value === 3) return "Good";
  if (value === 2) return "Fair";
  return "Poor";
};

const RatingSelectField = ({
  label,
  value,
  onChange,
}: {
  label: string;
  value: number | undefined;
  onChange: (value: number) => void;
}) => {
  return (
    <div className="space-y-2 rounded-2xl border border-primary-100 bg-primary-50 p-4">
      <Label className="text-sm font-semibold text-gray-700">{label}</Label>
      <Select value={value ? String(value) : ""} onValueChange={(nextValue) => onChange(Number(nextValue))}>
        <SelectTrigger className="tp-select h-11 bg-white">
          <SelectValue placeholder="Select rating" />
        </SelectTrigger>
        <SelectContent>
          {ratingOptions.map((rating) => (
            <SelectItem key={rating} value={String(rating)}>
              {rating} - {buildRatingLabel(rating)}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default function TourReviewSection({ tourId, sectionId }: TourReviewSectionProps) {
  const fancyBoxOptions = {
    Hash: false,
    placeFocusBack: false,
    dragToClose: true,
    Toolbar: {
      display: {
        left: [],
        middle: [],
        right: ["close"],
      },
    },
  } as unknown as FancyboxOptions;
  const [reviewFancyBoxRef] = useFancyBox(fancyBoxOptions);
  const [reviewImages, setReviewImages] = useState<(File | FileMetadata)[] | []>([]);
  const [createReview, { isLoading: isSubmitting }] = useCreateReviewMutation();
  const { data: reviewData, isLoading: isReviewsLoading } = useGetTourReviewsQuery(tourId || "", {
    skip: !tourId,
  });

  const [shouldCheckEligibility, setShouldCheckEligibility] = useState<boolean>(false);
  const { data: eligibilityData, isFetching: isCheckingEligibility } = useGetReviewEligibilityQuery(tourId || "", {
    skip: !tourId || !shouldCheckEligibility,
  });

  const reviewState = reviewData?.data;
  const summary = reviewState?.summary;
  const reviews = reviewState?.reviews || [];
  const canReview = Boolean(eligibilityData?.data?.canReview);
  const showSection = Boolean(tourId && (reviews.length > 0 || canReview));

  const form = useForm<ReviewFormValues>({
    resolver: zodResolver(reviewSchema),
    defaultValues: {
      guideRating: 5,
      serviceRating: 5,
      transportationRating: 5,
      organizationRating: 5,
      comment: "",
    },
  });

  const handleSubmit = async (values: ReviewFormValues) => {
    if (!tourId) return;
    try {
      const formData = new FormData();
      formData.append("tour", tourId);
      formData.append("guideRating", String(values.guideRating));
      formData.append("serviceRating", String(values.serviceRating));
      formData.append("transportationRating", String(values.transportationRating));
      formData.append("organizationRating", String(values.organizationRating));
      formData.append("comment", values.comment);

      const fileList = reviewImages.filter((item) => item instanceof File) as File[];
      fileList.slice(0, 3).forEach((file) => {
        formData.append("images", file);
      });

      await createReview(formData).unwrap();
      toast.success("Review submitted successfully");
      form.reset({
        guideRating: 5,
        serviceRating: 5,
        transportationRating: 5,
        organizationRating: 5,
        comment: "",
      });
      setReviewImages([]);
    } catch (error) {
      console.error(error);
      toast.error("Failed to submit review. Please try again.");
    }
  };

  if (!showSection) {
    return null;
  }

  return (
    <section id={sectionId} className="mt-8 space-y-6">
      <div className="flex items-end justify-between gap-3 flex-wrap">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary-500">Reviews</p>
          <h3 className="text-2xl font-semibold text-gray-800">Guest feedback</h3>
        </div>
        <div className="flex items-center gap-3">
          {!isReviewsLoading && summary && (
          <div className="rounded-full bg-primary-100 px-4 py-2 text-sm font-semibold text-primary-700">
            {summary.overallRating.toFixed(1)} / 5 from {summary.totalReviews} review{summary.totalReviews === 1 ? "" : "s"}
          </div>
          )}
          {/* If there are no reviews show a CTA to check eligibility (avoids automatic 403 on page load) */}
          {!isReviewsLoading && reviews.length === 0 && !canReview && (
            <Button size="sm" variant="outline" onClick={() => setShouldCheckEligibility(true)} className="ml-2">
              {isCheckingEligibility ? "Checking..." : "Write a review"}
            </Button>
          )}
        </div>
      </div>

      {isReviewsLoading ? (
        <div className="grid gap-4">
          <Skeleton className="h-40 w-full rounded-2xl" />
          <Skeleton className="h-28 w-full rounded-2xl" />
        </div>
      ) : summary ? (
        <div className="grid gap-6 lg:grid-cols-[360px_1fr]">
          <Card className="border-primary-100 bg-white shadow-[0px_5px_20px_0px_rgba(0,0,0,.05)]">
            <CardContent className="p-6">
              <p className="text-sm font-semibold text-primary-500">Overall rating</p>
              <div className="mt-3 flex items-end gap-3">
                <span className="text-5xl font-bold tracking-tight text-primary-950">{summary.overallRating.toFixed(1)}</span>
                <span className="pb-1 text-lg font-semibold text-gray-500">/ 5</span>
              </div>
              <div className="mt-4 flex items-center gap-1 text-primary-500">
                {Array.from({ length: 5 }).map((_, index) => (
                  <Star key={index} className="h-4 w-4 fill-current" />
                ))}
              </div>
              <p className="mt-3 text-sm text-gray-600">Based on {summary.totalReviews} guest review{summary.totalReviews === 1 ? "" : "s"}.</p>
            </CardContent>
          </Card>

          <Card className="border-gray-100 bg-white shadow-[0px_5px_20px_0px_rgba(0,0,0,.05)]">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg text-gray-800">Review summary</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4 sm:grid-cols-2">
              {[
                ["Guide", summary.averageGuideRating],
                ["Service", summary.averageServiceRating],
                ["Transportation", summary.averageTransportationRating],
                ["Organization", summary.averageOrganizationRating],
              ].map(([label, value]) => (
                <div key={label} className="rounded-2xl border border-gray-100 p-4">
                  <div className="flex items-center justify-between text-sm font-medium text-gray-600">
                    <span>{label}</span>
                    <span>{Number(value).toFixed(1)}/5</span>
                  </div>
                  <div className="mt-3 h-2 rounded-full bg-gray-100">
                    <div className="h-2 rounded-full bg-primary-500" style={{ width: `${(Number(value) / 5) * 100}%` }} />
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      ) : null}

      {canReview && (
        <Card className="border-primary-100 bg-white shadow-[0px_5px_20px_0px_rgba(0,0,0,.05)]">
          <CardHeader className="pb-0">
            <CardTitle className="text-xl text-gray-800">Write a review</CardTitle>
            <p className="text-sm text-gray-600">Share your experience with the guide, service, transportation and organization.</p>
          </CardHeader>
          <CardContent className="pt-6">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
                <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                  <FormField
                    control={form.control}
                    name="guideRating"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <RatingSelectField label="Guide" value={field.value} onChange={field.onChange} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="serviceRating"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <RatingSelectField label="Service" value={field.value} onChange={field.onChange} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="transportationRating"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <RatingSelectField label="Transportation" value={field.value} onChange={field.onChange} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="organizationRating"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <RatingSelectField label="Organization" value={field.value} onChange={field.onChange} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="comment"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <div className="space-y-2 rounded-2xl border border-primary-100 bg-primary-50 p-4">
                          <Label className="text-sm font-semibold text-gray-700">Your comment</Label>
                          <Textarea
                            {...field}
                            className="tp-textarea min-h-32 bg-white"
                            placeholder="Write about your overall experience..."
                            value={field.value || ""}
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="space-y-2 rounded-2xl border border-primary-100 bg-primary-50 p-4">
                  <div className="flex items-center gap-2">
                    <UploadCloud className="h-4 w-4 text-primary-500" />
                    <Label className="text-sm font-semibold text-gray-700">Upload up to 3 images</Label>
                  </div>
                  <MultipleImageUploader onChange={setReviewImages as React.Dispatch<React.SetStateAction<[] | (File | FileMetadata)[]>>} />
                </div>

                <Button type="submit" disabled={isSubmitting} className="tp-primary-btn h-12 w-full sm:w-auto sm:px-8">
                  {isSubmitting ? "Submitting..." : "Submit Review"}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      )}

      {reviews.length > 0 ? (
        <div ref={reviewFancyBoxRef as (node: HTMLElement | null) => void} className="space-y-5">
          {reviews.map((review) => (
            <Card key={review._id} className="border-gray-100 bg-white shadow-[0px_5px_20px_0px_rgba(0,0,0,.05)]">
              <CardContent className="p-6">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <p className="text-lg font-semibold text-gray-800">{review.name}</p>
                    <p className="text-sm text-gray-500">{format(new Date(review.createdAt), "MMM dd, yyyy")}</p>
                  </div>
                  <div className="rounded-full bg-primary-100 px-3 py-1 text-sm font-semibold text-primary-700">
                    {review.overallRating.toFixed(1)} / 5
                  </div>
                </div>

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

                <p className="mt-4 text-gray-600 leading-7">{review.comment}</p>

                {review.images.length > 0 && (
                  <div className="mt-4 flex flex-wrap gap-3">
                    {review.images.map((imageUrl) => (
                      <a
                        key={imageUrl}
                        href={imageUrl}
                        data-fancybox={`review-${review._id}`}
                        className="block h-24 w-24 overflow-hidden rounded-2xl border border-gray-100"
                      >
                        <img src={imageUrl} alt="Review attachment" className="h-full w-full object-cover" />
                      </a>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      ) : null}
    </section>
  );
}