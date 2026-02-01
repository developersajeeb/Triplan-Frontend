import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useGetAllToursQuery } from "@/redux/features/tour/tour.api";
import { useUserInfoQuery } from "@/redux/features/user/user.api";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FaRegCircleDot } from "react-icons/fa6";
import { LuCalendarCheck2 } from "react-icons/lu";
import { PiUsersThree } from "react-icons/pi";
import { useParams, useSearchParams } from "react-router";
import z from "zod";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { RiLoaderLine } from "react-icons/ri";
import { format } from "date-fns";
import { useCreateBookingMutation, useInitPaymentMutation } from "@/redux/features/booking/booking.api";

const couponSchema = z.object({
  coupon: z
    .string()
    .nonempty({ message: "Promo code is required" }),
})

const bookingInfoSchema = z.object({
  phone: z
    .string()
    .regex(/^\+?[1-9]\d{6,14}$/, {
      message: "Phone number must be valid (international format)",
    })
    .optional()
    .or(z.literal("")),

  address: z
    .string()
    .max(200, "Address cannot exceed 200 characters")
    .optional()
    .or(z.literal("")),

  country: z
    .string()
    .optional()
    .or(z.literal("")),

  city: z
    .string()
    .optional()
    .or(z.literal("")),
});

export default function Booking() {
  const { slug } = useParams();
  const [searchParams] = useSearchParams();
  const dateParam = searchParams.get("date");
  const guestParam = searchParams.get("guest");
  const totalParam = searchParams.get("total");
  const hasBookingData = Boolean(dateParam && guestParam && totalParam);

  const { data: tourData, isLoading: isTourLoading, isError } = useGetAllToursQuery({ slug: slug! }, { skip: !hasBookingData });
  const { data: userData, isLoading: isUserLoading } = useUserInfoQuery(undefined);
  const [initPayment] = useInitPaymentMutation();
  const [createBooking] = useCreateBookingMutation();
  const [isLoginBtnLoading, setIsLoginBtnLoading] = useState<boolean>(false);

  const couponForm = useForm<z.infer<typeof couponSchema>>({
    resolver: zodResolver(couponSchema),
    defaultValues: {
      coupon: "",
    },
  })

  const onApplyCoupon = (data: z.infer<typeof couponSchema>) => {
    console.log("Coupon code:", data.coupon)
    // call validate coupon API here
  }

  const form = useForm({
    resolver: zodResolver(bookingInfoSchema),
    defaultValues: {
      phone: "",
      address: "",
      country: "",
      city: ""
    },
  });

  useEffect(() => {
    if (userData?.data) {
      form.reset({
        phone: userData.data.phone || "",
        address: userData.data.address || "",
        country: userData.data.country || "",
        city: userData.data.city || "",
      });
    }
  }, [userData, form]);

  const handleBooking = async () => {
    const tour = tourData?.data?.[0]?._id;
    const guestCount = guestParam ? Number(guestParam) : 0;

    if (!tour || !guestCount) return;

    const bookingData = {
      tour,
      guestCount,
    };

    try {
      setIsLoginBtnLoading(true);
      const bookingRes = await createBooking(bookingData).unwrap();
      console.log('bookingRes:', bookingRes?.data?.booking?._id);

      const bookingId = bookingRes?.data?.booking?._id;
      if (!bookingId) return;

      const paymentRes = await initPayment(bookingId).unwrap();
      console.log('paymentRes:', paymentRes);
      const paymentUrl = paymentRes?.data?.paymentUrl;

      if (paymentUrl) {
        window.location.replace(paymentUrl);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoginBtnLoading(false);
    }
  };

  if (!hasBookingData) {
    return (
      <div className="tp-container min-h-[60vh] flex items-center justify-center">
        <p className="text-xl font-semibold text-gray-600 text-center">
          Please choose a tour and date to continue booking.
        </p>
      </div>
    );
  }

  if (isTourLoading) {
    return <p>Loading...</p>;
  }

  return (
    <>
      {!isTourLoading && isError && (
        <p>Something Went Wrong!!</p>
      )}
      {!isTourLoading && !tourData && (
        <p>No Data Found</p>
      )}
      <div className="tp-container my-20 flex flex-col lg:flex-row gap-8">
        {!isTourLoading && !isError && tourData && (
          <>
            {/* Left Section - Tour Summary */}
            <div className="flex-1">
              <Form {...form}>
                <form className="space-y-4 sm:space-y-5 shadow-[0px_5px_20px_0px_rgba(0,0,0,.05)] bg-white rounded-2xl border border-gray-200 p-6">
                  <div className="grid sm:grid-cols-2 gap-4 sm:gap-5">
                    <div>
                      <Label className="font-semibold text-gray-600 text-sm">
                        Name<span className="text-destructive text-base">*</span>
                      </Label>
                      {isUserLoading ? <Skeleton className="h-12 w-full rounded-lg" /> :
                        <Input
                          className="tp-input w-full mt-1"
                          value={userData?.data?.name || ""}
                          readOnly
                          disabled
                        />
                      }
                    </div>

                    <FormField
                      control={form.control}
                      name="phone"
                      rules={{ required: "Phone number is required" }}
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <div>
                              <Label className="font-semibold text-gray-600 text-sm">
                                Phone<span className="text-destructive text-base">*</span>
                              </Label>
                              {isUserLoading ? <Skeleton className="h-12 w-full rounded-lg" /> :
                                <Input
                                  className="tp-input w-full mt-1"
                                  placeholder="Enter your phone number"
                                  {...field}
                                  value={field.value || ""}
                                />
                              }
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="grid sm:grid-cols-2 gap-4 sm:gap-5 mt-6">
                    <div>
                      <Label className="font-semibold text-gray-600 text-sm">
                        Email<span className="text-destructive text-base">*</span>
                      </Label>
                      {isUserLoading ? <Skeleton className="h-12 w-full rounded-lg" /> :
                        <Input
                          className="tp-input w-full mt-1"
                          value={userData?.data?.email || ""}
                          readOnly
                          disabled
                        />
                      }
                    </div>

                    <FormField
                      control={form.control}
                      name="address"
                      rules={{ required: "Address is required" }}
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <div>
                              <Label className="font-semibold text-gray-600 text-sm">
                                Address<span className="text-destructive text-base">*</span>
                              </Label>
                              {isUserLoading ? <Skeleton className="h-12 w-full rounded-lg" /> :
                                <Input
                                  className="tp-input w-full mt-1"
                                  placeholder="Enter your address"
                                  {...field}
                                  value={field.value || ""}
                                />
                              }
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="grid sm:grid-cols-2 gap-4 sm:gap-5 mt-6">
                    <FormField
                      control={form.control}
                      name="country"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <div>
                              <Label className="font-semibold text-gray-600 text-sm">
                                Country
                              </Label>
                              {isUserLoading ? <Skeleton className="h-12 w-full rounded-lg" /> :
                                <Input
                                  className="tp-input w-full mt-1"
                                  placeholder="Select your country"
                                  {...field}
                                  value={field.value || ""}
                                />
                              }
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="city"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <div>
                              <Label className="font-semibold text-gray-600 text-sm">
                                City
                              </Label>
                              {isUserLoading ? <Skeleton className="h-12 w-full rounded-lg" /> :
                                <Input
                                  className="tp-input w-full mt-1"
                                  placeholder="Enter your city"
                                  {...field}
                                  value={field.value || ""}
                                />
                              }
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </form>
              </Form>
            </div>

            {/* Right Section - Booking Details */}
            <div className="w-full scroll-mt-24 md:scroll-mt-0 lg:min-w-[420px] lg:w-[420px] lg:sticky top-24 h-fit">
              <div className="shadow-[0px_5px_20px_0px_rgba(0,0,0,.05)] bg-white rounded-2xl border border-gray-200">
                <div className="p-6">
                  <h2 className="text-lg font-bold text-gray-700 mb-10 flex gap-2"><span className="text-green-500 pt-[6px]"><FaRegCircleDot size={20} /></span> {tourData?.data?.[0]?.title}</h2>
                  <ul className="space-y-1">
                    <li className="text-base text-gray-600 font-medium flex items-center gap-1"><span><LuCalendarCheck2 size={16} /></span> {dateParam ? format(new Date(dateParam), "MMM dd, yyyy") : ""}</li>
                    <li className="text-base text-gray-600 font-medium flex items-center gap-1"><span><PiUsersThree size={20} /></span> {guestParam} Guest</li>
                  </ul>
                  <div className="border-b border-gray-200 my-5"></div>
                  <p className="flex flex-wrap justify-between gap-2"><span className="text-base font-normal text-gray-700">৳{guestParam && totalParam ? Math.round(Number(totalParam) / Number(guestParam)) : 0} x {guestParam} Guest</span> <span className="text-base font-semibold text-primary-900">৳{totalParam}</span></p>
                  <div className="border-b border-gray-200 my-5"></div>
                  <p className="flex flex-wrap justify-between gap-2"><span className="text-base font-normal text-gray-700">Price</span> <span className="text-base font-semibold text-primary-900">৳{totalParam}</span></p>
                  <div className="border-b border-gray-200 my-5"></div>
                  <Accordion
                    type="single"
                    collapsible
                    className="w-full"
                  >
                    <AccordionItem value="coupon">
                      <AccordionTrigger className="py-0 [&>svg]:hidden text-primary-500 text-base">Enter Promo Code</AccordionTrigger>
                      <AccordionContent>
                        <Form {...couponForm}>
                          <form onSubmit={couponForm.handleSubmit(onApplyCoupon)} className="pt-2 flex w-full">
                            <FormField
                              control={couponForm.control}
                              name="coupon"
                              render={({ field }) => (
                                <FormItem className="w-full">
                                  <FormControl>
                                    <Input
                                      placeholder="Enter your code"
                                      className="tp-input h-11 w-full rounded-r-none"
                                      {...field}
                                      value={field.value || ""}
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />

                            <Button
                              type="submit"
                              className="h-11 !px-4 tp-primary-btn !rounded-l-none !rounded-r-lg"
                            >
                              Apply
                            </Button>
                          </form>
                        </Form>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </div>
                <div className="bg-gray-200 py-4 px-6 flex justify-between gap-2 flex-wrap">
                  <p className="text-base font-bold text-gray-800">Total</p>
                  <p className="text-base font-bold text-gray-800">৳{totalParam}</p>
                </div>
                <div className="p-5">

                  <Button
                    disabled={isLoginBtnLoading}
                    onClick={handleBooking}
                    className={`tp-primary-btn-light h-12 w-full ${isLoginBtnLoading && "pointer-events-none"}`}
                  >
                    {isLoginBtnLoading ? (
                      <>
                        Paying <RiLoaderLine className="w-4 h-4 animate-spin" />
                      </>
                    ) : (
                      <>
                        Pay Now
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
}