import { baseApi } from "@/redux/baseApi";
import type { IResponse } from "@/types";
import type { IReview, IReviewEligibility, ITourReviewResponse, IUserReview } from "@/types/review.type";

export const reviewApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getTourReviews: builder.query<IResponse<ITourReviewResponse>, string>({
      query: (tourId) => ({
        url: `/review/tour/${tourId}`,
        method: "GET",
      }),
      providesTags: ["REVIEW"],
      transformResponse: (response: IResponse<ITourReviewResponse>) => ({
        ...response,
        data: response.data,
      }),
    }),
    getReviewEligibility: builder.query<IResponse<IReviewEligibility>, string>({
      query: (tourId) => ({
        url: `/review/eligibility/${tourId}`,
        method: "GET",
      }),
      providesTags: ["REVIEW"],
    }),
    createReview: builder.mutation<IResponse<IReview>, FormData>({
      query: (formData) => ({
        url: "/review",
        method: "POST",
        data: formData,
      }),
      invalidatesTags: ["REVIEW"],
    }),
    getMyReviews: builder.query<IResponse<IUserReview[]>, void>({
      query: () => ({
        url: "/review/my-reviews",
        method: "GET",
      }),
      providesTags: ["REVIEW"],
    }),
    deleteMyReview: builder.mutation<IResponse<{ _id: string }>, string>({
      query: (reviewId) => ({
        url: `/review/${reviewId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["REVIEW"],
    }),
    updateMyReview: builder.mutation<IResponse<IReview>, { reviewId: string; payload: FormData }>({
      query: ({ reviewId, payload }) => ({
        url: `/review/${reviewId}`,
        method: "PATCH",
        data: payload,
      }),
      invalidatesTags: ["REVIEW"],
    }),
  }),
});

export const {
  useGetTourReviewsQuery,
  useGetReviewEligibilityQuery,
  useCreateReviewMutation,
  useGetMyReviewsQuery,
  useDeleteMyReviewMutation,
  useUpdateMyReviewMutation,
} = reviewApi;
