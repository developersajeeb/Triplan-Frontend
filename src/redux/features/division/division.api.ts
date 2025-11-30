import { baseApi } from "@/redux/baseApi";

export const divisionApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    addDivision: builder.mutation({
      query: (divisionData) => ({
        url: "/division/create",
        method: "POST",
        data: divisionData,
      }),
      invalidatesTags: ["DIVISION"],
    }),
    getDivisions: builder.query({
      query: (queryParams) => ({
        url: "/division",
        method: "GET",
        params: queryParams,
      }),
      providesTags: ["DIVISION"],
      transformResponse: (response) => {
        return {
          data: response.data,
          meta: response.meta,
        };
      },
    }),
    getSingleDivisions: builder.query({
      query: (slug) => ({
        url: `/division/${slug}`,
        method: "GET",
      }),
      providesTags: ["DIVISION"],
      transformResponse: (response) => {
        return {
          data: response.data,
        };
      },
    }),
  }),
});

export const { useAddDivisionMutation, useGetDivisionsQuery, useGetSingleDivisionsQuery } = divisionApi;