import { baseApi } from "@/redux/baseApi";
import type { IResponse } from "@/types";
import type { IReview, IReviewEligibility, ITourReviewResponse } from "@/types/review.type";

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
  }),
});

export const {
  useGetTourReviewsQuery,
  useGetReviewEligibilityQuery,
  useCreateReviewMutation,
} = reviewApi;
