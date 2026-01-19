import { baseApi } from "@/redux/baseApi";

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

    checkAvailability: builder.mutation({
      query: (availabilityData) => ({
        url: "/booking/check-availability",
        method: "POST",
        data: availabilityData,
      }),
    }),
  }),
});

export const { useCreateBookingMutation, useCheckAvailabilityMutation } = bookingApi;