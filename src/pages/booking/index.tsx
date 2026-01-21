import { useCreateBookingMutation } from "@/redux/features/booking/booking.api";
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
import { useParams } from "react-router";
import z from "zod";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { RiLoaderLine } from "react-icons/ri";

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
  const { data: tourData, isLoading: isTourLoading, isError } = useGetAllToursQuery({ slug: slug! });
  const { data: userData, isLoading: isUserLoading } = useUserInfoQuery(undefined);
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
    let bookingData;

    const normalizedPhone =
      userData.data.phone && userData.data.phone !== ""
        ? userData.data.phone.startsWith("+")
          ? userData.data.phone
          : `+${userData.data.phone}`
        : undefined;

    try {
      const res = await createBooking(bookingData).unwrap();
      if (res.success) {
        window.open(res.data.paymentUrl);
      }
    } catch (err) {
      console.log(err);
    }
  };

  if (isTourLoading) {
    return <p>Loading...</p>;
  }
  //   "@context": "https://schema.org",
  //   "@type": "Product",
  //   name: tourData.title,
  //   description: tourData.description,
  //   image: tourData.images,
  //   sku: tourData._id,
  //   brand: {
  //     "@type": "Organization",
  //     name: "triPlan",
  //     url: "https://triplan.developersajeeb.com"
  //   },
  //   offers: {
  //     "@type": "Offer",
  //     url: `https://triplan.developersajeeb.com/booking/${tourData.slug}`,
  //     priceCurrency: "USD",
  //     price: totalAmount || tourData.costFrom,
  //     availability: tourData.maxGuest > 0 ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
  //     eligibleQuantity: {
  //       "@type": "QuantitativeValue",
  //       maxValue: tourData.maxGuest,
  //       value: guestCount
  //     },
  //     validFrom: tourData.startDate,
  //   },
  //   tour: {
  //     "@type": "TouristTrip",
  //     name: tourData.title,
  //     itinerary: tourData.tourPlan
  //   },
  //   areaServed: tourData.location
  // };

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
                  <h2 className="text-lg font-bold text-gray-700 mb-10 flex gap-2"><span className="text-green-500 pt-[6px]"><FaRegCircleDot size={20} /></span> Elephant Jungle Sanctuary Half-Day Visit with Meal</h2>
                  <ul className="space-y-1">
                    <li className="text-base text-gray-600 font-medium flex items-center gap-1"><span><LuCalendarCheck2 size={16} /></span> Jan 20, 2026</li>
                    <li className="text-base text-gray-600 font-medium flex items-center gap-1"><span><PiUsersThree size={20} /></span> 2 Guest</li>
                  </ul>
                  <div className="border-b border-gray-200 my-5"></div>
                  <p className="flex flex-wrap justify-between gap-2"><span className="text-base font-normal text-gray-700">৳12000 x 2 Guest</span> <span className="text-base font-semibold text-primary-900">৳24000</span></p>
                  <div className="border-b border-gray-200 my-5"></div>
                  <p className="flex flex-wrap justify-between gap-2"><span className="text-base font-normal text-gray-700">Price</span> <span className="text-base font-semibold text-primary-900">৳24000</span></p>
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
                  <p className="text-base font-bold text-gray-800">৳24000</p>
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