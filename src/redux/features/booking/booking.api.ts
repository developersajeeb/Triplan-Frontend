import { baseApi } from "@/redux/baseApi";

type IMyBookingQueryParams = {
  page?: number;
  limit?: number;
  search?: string;
  status?: string;
};

export type IAdminDashboardSummary = {
  stats: {
    totalRevenue: number;
    totalBookings: number;
    activeUsers: number;
    averageRating: number;
  };
  trend: {
    revenueChange: number;
    bookingsChange: number;
    activeUsersChange: number;
    averageRatingChange: number;
  };
  revenueData: Array<{
    month: string;
    revenue: number;
    bookings: number;
  }>;
  destinationData: Array<{
    name: string;
    value: number;
    color: string;
  }>;
  recentBookings: Array<{
    id: string;
    customer: string;
    destination: string;
    amount: number;
    status: string;
    date: string;
    rating: number | null;
  }>;
};

export const bookingApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createBooking: builder.mutation({
      query: (bookingData) => ({
        url: "/booking",
        method: "POST",
        data: bookingData,
      }),
      invalidatesTags: ["BOOKING"],
    }),

    initPayment: builder.mutation({
      query: (bookingId: string) => ({
        url: `/payment/init-payment/${bookingId}`,
        method: "POST",
      }),
      invalidatesTags: ["BOOKING"],
    }),

    checkAvailability: builder.mutation({
      query: (availabilityData) => ({
        url: "/booking/check-availability",
        method: "POST",
        data: availabilityData,
      }),
    }),

    getMyBookings: builder.query({
      query: (args: IMyBookingQueryParams = {}) => ({
        url: "/booking/my-bookings",
        method: "GET",
        params: {
          page: args.page ?? 1,
          limit: args.limit ?? 10,
          ...(args.search ? { search: args.search } : {}),
          ...(args.status ? { status: args.status } : {}),
        },
      }),
      transformResponse: (response: { data?: unknown[] } | unknown) => {
        if (response && typeof response === "object" && "data" in response) {
          return response;
        }

        return { data: [] };
      },
      providesTags: ["BOOKING"],
    }),

    getAdminDashboardSummary: builder.query<IAdminDashboardSummary, void>({
      query: () => ({
        url: "/booking/dashboard-summary",
        method: "GET",
      }),
      transformResponse: (response: { data: IAdminDashboardSummary }) => response.data,
      providesTags: ["BOOKING"],
    }),
  }),
});

export const {
  useCreateBookingMutation,
  useInitPaymentMutation,
  useCheckAvailabilityMutation,
  useGetMyBookingsQuery,
  useGetAdminDashboardSummaryQuery,
} = bookingApi;