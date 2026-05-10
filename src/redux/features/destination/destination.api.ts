import { baseApi } from "@/redux/baseApi";

export const destinationApi = baseApi.injectEndpoints({
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
		updateDivision: builder.mutation({
			query: ({ id, body }) => ({
				url: `/division/${id}`,
				method: "PATCH",
				data: body,
			}),
			invalidatesTags: ["DIVISION"],
		}),
		removeDivision: builder.mutation({
			query: (id: string) => ({
				url: `/division/${id}`,
				method: "DELETE",
			}),
			invalidatesTags: ["DIVISION"],
		}),
	}),
});

export const {
	useAddDivisionMutation,
	useGetDivisionsQuery,
	useGetSingleDivisionsQuery,
	useUpdateDivisionMutation,
	useRemoveDivisionMutation,
} = destinationApi;
