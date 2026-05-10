import { baseApi } from "@/redux/baseApi";
import type { IResponse, ITourPackage, ITourListItem, IToursResponse } from "@/types";

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
    updateTourType: builder.mutation({
      query: ({ id, body }) => ({
        url: `/tour/tour-types/${id}`,
        method: "PATCH",
        data: body,
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
      providesTags: ["TOUR"],
      transformResponse: (response: IResponse<ITourListItem[]>): IToursResponse => ({
        data: response.data,
        meta: response.meta,
      }),
    }),
    updateTour: builder.mutation({
      query: ({ id, ...tourData }) => ({
        url: `/tour/${id}`,
        method: "PATCH",
        data: tourData,
      }),
      invalidatesTags: ["TOUR"],
    }),
    updateTourMultipart: builder.mutation({
      query: ({ id, formData }: { id: string; formData: FormData }) => ({
        url: `/tour/${id}`,
        method: "PATCH",
        data: formData,
      }),
      invalidatesTags: ["TOUR"],
    }),
    deleteTour: builder.mutation({
      query: (id: string) => ({
        url: `/tour/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["TOUR"],
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
  useUpdateTourTypeMutation,
  useRemoveTourTypeMutation,
  useAddTourMutation,
  useGetAllToursQuery,
  useUpdateTourMutation,
  useUpdateTourMultipartMutation,
  useDeleteTourMutation,
  useGetSingleTourQuery,
} = tourApi;