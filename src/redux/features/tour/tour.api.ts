import { baseApi } from "@/redux/baseApi";
import type { IResponse, ITourPackage, IToursResponse } from "@/types";

export const tourApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    addTour: builder.mutation({
      query: (tourData) => ({
        url: "/tour/create",
        method: "POST",
        data: tourData,
      }),
      invalidatesTags: ["TOUR"],
    }),
    addTourType: builder.mutation({
      query: (tourTypeName) => ({
        url: "/tour/create-tour-type",
        method: "POST",
        data: tourTypeName,
      }),
      invalidatesTags: ["TOUR"],
    }),
    removeTourType: builder.mutation({
      query: (tourTypeId) => ({
        url: `/tour/tour-types/${tourTypeId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["TOUR"],
    }),
    getTourTypes: builder.query({
      query: (params) => ({
        url: "/tour/tour-types",
        method: "GET",
        params,
      }),
      providesTags: ["TOUR"],
      transformResponse: (response) => response.data,
    }),
    getAllTours: builder.query<IToursResponse, Record<string, string>>({
      query: (params) => ({
        url: "/tour",
        method: "GET",
        params,
      }),
      transformResponse: (response: IResponse<never>): IToursResponse => ({
        data: response.data,
        meta: response.meta,
      }),
    }),
    getSingleTour: builder.query({
      query: (slug: string) => ({
        url: `/tour/slug/${slug}`,
        method: "GET",
      }),
      transformResponse: (response: IResponse<ITourPackage>) => response.data,
      providesTags: ["TOUR"],
    }),
  }),
});

export const {
  useGetTourTypesQuery,
  useAddTourTypeMutation,
  useRemoveTourTypeMutation,
  useAddTourMutation,
  useGetAllToursQuery,
  useGetSingleTourQuery,
} = tourApi;