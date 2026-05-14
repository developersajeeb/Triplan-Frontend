import { baseApi } from "@/redux/baseApi";

export type IAdminUserRecord = {
    _id: string;
    name: string;
    email: string;
    phone?: string;
    picture?: string;
    address?: string;
    country?: string;
    city?: string;
    post_code?: string;
    role: "SUPER_ADMIN" | "ADMIN" | "USER" | "GUIDE";
    isActive?: "ACTIVE" | "INACTIVE" | "BLOCKED";
    isVerified?: boolean;
    isDeleted?: boolean;
    bookingsCount?: number;
    toursBookedCount?: number;
    totalSpent?: number;
    lastBookingAt?: string | null;
    createdAt?: string;
    updatedAt?: string;
};

export type IAdminUsersResponse = {
    data: IAdminUserRecord[];
    meta?: {
        page?: number;
        limit?: number;
        total?: number;
        totalPage?: number;
        totalPages?: number;
    };
};

export type IAdminUserQueryParams = {
    page?: number;
    limit?: number;
    search?: string;
    role?: string;
    status?: string;
    sort?: string;
};

export type IAdminUserUpdatePayload = FormData;

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
        getAdminUsers: builder.query<IAdminUsersResponse, IAdminUserQueryParams>({
            query: (args: IAdminUserQueryParams = {}) => ({
                url: "/user/all-users",
                method: "GET",
                params: {
                    page: args.page ?? 1,
                    limit: args.limit ?? 10,
                    ...(args.search ? { search: args.search } : {}),
                    ...(args.role && args.role !== "all" ? { role: args.role } : {}),
                    ...(args.status && args.status !== "all" ? { status: args.status } : {}),
                    ...(args.sort ? { sort: args.sort } : {}),
                },
            }),
            transformResponse: (response: IAdminUsersResponse | { data?: IAdminUserRecord[]; meta?: IAdminUsersResponse['meta'] }) => {
                if (response && typeof response === "object" && "data" in response) {
                    return response as IAdminUsersResponse;
                }

                return { data: [], meta: { page: 1, limit: 10, total: 0, totalPages: 0, totalPage: 0 } };
            },
            providesTags: ["USER"],
        }),
        updateAdminUser: builder.mutation({
            query: ({ userId, payload }: { userId: string; payload: FormData }) => ({
                url: `/user/${userId}`,
                method: "PATCH",
                data: payload,
            }),
            invalidatesTags: ["USER"],
        }),
        deleteAdminUser: builder.mutation({
            query: (userId: string) => ({
                url: `/user/${userId}`,
                method: "DELETE",
            }),
            invalidatesTags: ["USER"],
        }),
    }),
});

export const {
    useUserInfoQuery,
    useUpdateUserInfoMutation,
    useToggleWishlistMutation,
    useGetWishlistQuery,
    useGetAdminUsersQuery,
    useUpdateAdminUserMutation,
    useDeleteAdminUserMutation,
} = authApi;