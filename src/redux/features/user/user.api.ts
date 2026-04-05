import { baseApi } from "@/redux/baseApi";

export const authApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        userInfo: builder.query({
            query: () => ({
                url: "/user/me",
                method: "GET",
            }),
            providesTags: ["USER"],
        }),
        updateUserInfo: builder.mutation({
            query: (payload) => ({
                url: "/user/me",
                method: "PATCH",
                data: payload,
            }),
            invalidatesTags: ["USER"],
        }),
        toggleWishlist: builder.mutation({
            query: (tourId: string) => ({
                url: `/user/wishlist/${tourId}`,
                method: "POST",
            }),
            invalidatesTags: ["USER"],
        }),
        getWishlist: builder.query({
            query: () => ({
                url: "/user/wishlist",
                method: "GET",
            }),
            providesTags: ["USER"],
        }),
    }),
});

export const {
    useUserInfoQuery,
    useUpdateUserInfoMutation,
    useToggleWishlistMutation,
    useGetWishlistQuery,
} = authApi;