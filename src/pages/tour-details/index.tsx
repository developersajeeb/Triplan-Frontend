/* eslint-disable @typescript-eslint/no-unused-vars */
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import CommonMetadata from "@/components/utilities/CommonMetadata";
import JsonLd from "@/components/utilities/JsonLd";
import useFancyBox from "@/hooks/useFancybox";
import { useWishlist } from "@/hooks/useWishlist";
import { useGetSingleTourQuery } from "@/redux/features/tour/tour.api";
import React, { useEffect, useRef, useState } from "react";
import { FaFacebook, FaHeart, FaInstagram, FaWhatsapp, FaXTwitter } from "react-icons/fa6";
import { FiLink } from "react-icons/fi";
import { GoShareAndroid } from "react-icons/go";
import { LuCalendarFold, LuCheck, LuImages, LuNotepadText, LuSend } from "react-icons/lu";
import { Link, useParams } from "react-router";
import { toast } from "sonner";
import { Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import ImageWaterMark from "@/assets/images/image-watermark.webp";
import { Skeleton } from "@/components/ui/skeleton";
import { Fancybox, type FancyboxOptions } from "@fancyapps/ui/dist/fancybox";
import { MdOutlineWatchLater } from "react-icons/md";
import { TbUsers } from "react-icons/tb";
import { GrLocation } from "react-icons/gr";
import { PiCalendarSlashBold, PiClockBold, PiSealCheck } from "react-icons/pi";
import { RxCross2 } from "react-icons/rx";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { CiCircleMinus, CiCirclePlus } from "react-icons/ci";
import z from "zod";
import { useForm, type FieldValues, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { RiLoaderLine } from "react-icons/ri";
import { GiCheckMark } from "react-icons/gi";
import { Textarea } from "@/components/ui/textarea";
import { FaRegDotCircle } from "react-icons/fa";
import { getTotalDays } from "@/helper/CommonHelper";
import { useCheckAvailabilityMutation } from "@/redux/features/booking/booking.api";
import OverallRatingBox from "./OverallRatingBox";
import UserReview from "./UserReview";

type BookingFormValues = z.infer<typeof bookingSchema>;

const bookingSchema = z.object({
  date: z
    .any()
    .refine((val) => val instanceof Date, { message: "Please select a valid date" }),
  guest: z
    .number()
    .min(1, { message: "At least 1 guest is required" })
    .max(20, { message: "Cannot book more than 20 guests" }),
});

export default function TourDetails() {
  const { slug } = useParams();
  const [checkAvailability, { isLoading: isCheckingAvailabilityLoading }] = useCheckAvailabilityMutation();
  const { data: tourData, isLoading } = useGetSingleTourQuery(slug!);

  const { isInWishlist, toggle } = useWishlist();
  const fancyBoxOptions = {
    Hash: false,
    placeFocusBack: false,
    dragToClose: true,

    Toolbar: {
      display: {
        left: [],
        middle: [],
        right: ["close"],
      },
    },
  } as unknown as FancyboxOptions;
  const [desktopFancyBoxRef] = useFancyBox(fancyBoxOptions);
  const [mobileFancyBoxRef] = useFancyBox(fancyBoxOptions);
  const [reviewImageFancyBoxRef] = useFancyBox(fancyBoxOptions);
  const [openCalendar, setOpenCalendar] = useState<boolean>(false);
  const availabilityBoxRef = useRef<HTMLDivElement>(null);
  const availabilityRef = useRef<HTMLDivElement>(null);
  const scrollToAvailability = () => {
    availabilityRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };
  const shareUrl = `https://triplan.developersajeeb.com/tours/${tourData?.slug}`;
  const shareText = encodeURIComponent(tourData?.title ?? "");
  const [copied, setCopied] = useState<boolean>(false);

  const limit = 350;
  const text = tourData?.description ?? "";
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const [needsReadMore, setNeedsReadMore] = useState<boolean>(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const today = new Date();
  const [month, setMonth] = useState<Date>(today);
  const enquiryForm = useForm({
    mode: "onSubmit",
  });
  const [isLoginBtnLoading, setIsLoginBtnLoading] = useState<boolean>(false);
  const [openEnquiry, setOpenEnquiry] = useState<boolean>(false);

  const enquiryOnSubmit: SubmitHandler<FieldValues> = async () => {
    try {
      setIsLoginBtnLoading(true);
      toast.success("Thank you for reaching out. We will get back to you shortly.");
      enquiryForm.reset();
      setOpenEnquiry(false);
    } catch (error) {
      console.error("Subscription error:", error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsLoginBtnLoading(false);
    }
  };

  const {
    watch,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<BookingFormValues>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      date: undefined,
      guest: 1,
    },
  });
  const selectedDate = watch("date");
  const guest = watch("guest");
  const allErrors = Object.values(errors)
    .map((e) => e?.message)
    .filter((msg): msg is string => typeof msg === "string");

  useEffect(() => {
    setNeedsReadMore(text.length > limit);
  }, [text, limit]);
  const [checking, setChecking] = useState(false);
  const [availability, setAvailability] = useState<null | {
    date: Date;
    guest: number;
    total: number;
  }>(null);
  const [hasCheckedAvailability, setHasCheckedAvailability] = useState<boolean>(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch (error) {
      toast.error("Copy failed");
    }
  };

  const handleImageError = (
    e: React.SyntheticEvent<HTMLImageElement, Event>
  ) => {
    e.currentTarget.src = ImageWaterMark;
    e.currentTarget.onerror = null;
  };

  const openGalleryFromStart = () => {
    if (!tourData?.images?.length) return;

    Fancybox.show(
      tourData.images.map((img) => ({
        src: img || ImageWaterMark,
        type: "image",
      })),
      {
        startIndex: 0,
        placeFocusBack: false,
      }
    );
  };

  const Counter = ({
    label,
    value,
    min,
    onChange,
  }: {
    label: string;
    value: number;
    min: number;
    onChange: (val: number) => void;
  }) => (
    <li className="flex justify-between border-b py-3 last-of-type:border-none">
      <p className="font-semibold text-gray-700">{label}</p>
      <div className="flex items-center">
        <button
          className="text-gray-600 hover:bg-primary-950 hover:text-white rounded-full duration-300 disabled:opacity-35 disabled:pointer-events-none"
          type="button"
          disabled={value <= min}
          onClick={() => onChange(Math.max(min, value - 1))}
        >
          <CiCircleMinus size={24} />
        </button>
        <span className="w-8 text-center font-medium">{value}</span>
        <button
          className="text-gray-600 hover:bg-primary-950 hover:text-white rounded-full duration-300"
          type="button"
          onClick={() => onChange(value + 1)}
        >
          <CiCirclePlus size={24} />
        </button>
      </div>
    </li>
  );

  const onSubmit: SubmitHandler<BookingFormValues> = async (data) => {
    try {
      setChecking(true);

      const result = await checkAvailability({
        tour: tourData?._id,
        date: new Date(data.date).toISOString(),
        guest: data.guest,
      }).unwrap();

      // Check if data is nested under result.data or directly in result
      const availabilityData = result.data || result;
      
      if (!availabilityData.available) {
        toast.error(availabilityData.message || "Selected date is not available");
        setAvailability(null);
        setHasCheckedAvailability(true);
        return;
      }

      setAvailability({
        date: data.date,
        guest: data.guest,
        total: data.guest * (tourData?.costFrom || 0),
      });
      setHasCheckedAvailability(true);
      toast.success(availabilityData.message || "Tour is available for the selected date!");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast.error(
        error?.data?.message || "Failed to check availability"
      );
      setHasCheckedAvailability(true);
    } finally {
      setChecking(false);
    }
  };

  useEffect(() => {
    if (
      isCheckingAvailabilityLoading ||
      hasCheckedAvailability
    ) {
      availabilityBoxRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }, [isCheckingAvailabilityLoading, hasCheckedAvailability]);

  const faqItems = [
    {
      question: "What services does TripPlan offer?",
      answer: "TripPlan offers complete travel management — including tour packages, hotel bookings, transport, adventure trips, and custom itinerary planning to make your journey hassle-free.",
    },
    {
      question: "Can I customize my tour package?",
      answer: "Yes! You can fully personalize your trip by choosing destinations, activities, and travel dates that match your preferences and budget.",
    },
    {
      question: "Do you offer group discounts?",
      answer: "Absolutely. We have special offers for group bookings, families, and corporate travelers. Contact our team for the best available deals.",
    },
    {
      question: "How do I book a trip with TripPlan?",
      answer: "Simply browse your desired destination, select a package, and click “Book Now.” You can also reach out to our travel experts for personalized guidance.",
    },
    {
      question: "Is TripPlan a trusted tour operator?",
      answer: "Yes — we work with verified global partners and provide transparent pricing, secure payments, and 24/7 support to ensure a reliable travel experience.",
    },
  ];

  const reviews = [
    {
      name: "Sajeeb Debnath",
      date: "July 9, 2025",
      rating: 5,
      comment:
        "Entire journey on the river cruise was amazing. This is the first such cruise dinner for my family.",
      images: [ImageWaterMark, ImageWaterMark],
    },
    {
      name: "Sajeeb Debnath",
      date: "July 9, 2025",
      rating: 5,
      comment:
        "We loved everything, right from table organising, food, music and the hospitality.",
      images: [ImageWaterMark, ImageWaterMark],
    },
  ];

  return (
    <>
      <CommonMetadata
        title={`${tourData?.title} – Tour Details & Booking | triPlan`}
        description={
          tourData?.description?.slice(0, 150) +
          "... Explore pricing, dates, inclusions and book this tour easily on triPlan."
        }
        featureImage={tourData?.images?.[0]}
        canonicalUrl={`https://triplan.developersajeeb.com/tours/${tourData?.slug}`}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "TouristTrip",
          name: tourData?.title,
          description: tourData?.description,
          image: tourData?.images,
          tourBookingPage: `https://triplan.developersajeeb.com/booking/${tourData?.slug}`,
          offers: {
            "@type": "Offer",
            price: tourData?.costFrom,
            priceCurrency: "USD",
            url: `https://triplan.developersajeeb.com/tours/${tourData?.slug}`,
            availability: "https://schema.org/InStock"
          },
          itinerary: tourData?.tourPlan?.map((step, index) => ({
            "@type": "ListItem",
            position: index + 1,
            item: step,
          })),
          areaServed: tourData?.divisionName,
          departureLocation: tourData?.departureLocation,
          arrivalLocation: tourData?.arrivalLocation,
        }}
      />

      <div className="pt-3 md:pt-6 pb-20">
        {/* Header */}
        <section className="tp-container flex gap-4 mb-6">
          {isLoading ? (
            <div className="flex-1">
              <Skeleton className="h-[30px] w-11/12 rounded-full" />
              <Skeleton className="mt-3 h-[20px] w-9/12 rounded-full" />
            </div>
          ) : (
            <>
              <div className="flex-1">
                <h1 className="text-2xl md:text-3xl tracking-tight font-bold mb-3 text-gray-900">
                  {tourData?.title}
                </h1>
                <ul className="flex flex-wrap gap-2 md:gap-4">
                  <li className="text-sm text-gray-600 font-medium mb-1">
                    <span className="bg-[#FFCA18] text-[13px] text-gray-900 px-2 pt-[1px] pb-[2px] font-semibold rounded mr-[2px]">
                      4.8
                    </span>{" "}
                    <span className="hover:underline cursor-pointer duration-300">
                      (180 Reviews)
                    </span>
                  </li>
                  <li className="text-sm text-gray-600 font-semibold flex gap-1">
                    <LuNotepadText className="pt-[2px]" size={18} />{" "}
                    {tourData?.tourTypeName}
                  </li>
                  <li className="text-sm text-gray-600 font-medium inline-flex gap-1 pr-3">
                    <span>
                      <HiOutlineLocationMarker size={18} />
                    </span>{" "}
                    {tourData?.arrivalLocation + ", " + tourData?.divisionName}
                  </li>
                </ul>
              </div>
              <div className="flex gap-2 fixed justify-between md:justify-normal md:relative bg-white md:bg-transparent left-0 right-0 bottom-0 p-3 md:p-0 shadow-[0px_0px_10px_0px_#00000012] md:shadow-none z-30">
                <div className="md:hidden w-full sm:w-auto">
                  <Button
                    disabled={checking}
                    type="button"
                    onClick={scrollToAvailability}
                    className="tp-primary-btn w-full sm:w-auto h-11 !py-2"
                  >
                    Check availability
                  </Button>
                </div>
                <div className="flex gap-2">
                  <Popover>
                    <PopoverTrigger asChild>
                      <div className="bg-white border border-gray-200 hover:bg-gray-100 duration-300 w-11 h-11 rounded-full flex justify-center items-center cursor-pointer text-gray-500">
                        <GoShareAndroid size={22} />
                      </div>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto focus-visible:outline-none">
                      <div className="space-y-4">
                        <Link
                          to={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                            shareUrl
                          )}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 font-semibold text-sm text-gray-600 hover:text-primary-500 duration-300"
                        >
                          <span>
                            <FaFacebook size={18} />
                          </span>{" "}
                          Facebook
                        </Link>
                        <Link
                          to="https://www.instagram.com/"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 font-semibold text-sm text-gray-600 hover:text-primary-500 duration-300"
                        >
                          <span>
                            <FaInstagram size={18} />
                          </span>{" "}
                          Instagram
                        </Link>
                        <Link
                          to={`https://twitter.com/intent/tweet?url=${encodeURIComponent(
                            shareUrl
                          )}&text=${shareText}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 font-semibold text-sm text-gray-600 hover:text-primary-500 duration-300"
                        >
                          <span>
                            <FaXTwitter size={18} />
                          </span>{" "}
                          Twitter
                        </Link>
                        <Link
                          to={`https://wa.me/?text=${encodeURIComponent(
                            `${tourData?.title} - ${shareUrl}`
                          )}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 font-semibold text-sm text-gray-600 hover:text-primary-500 duration-300"
                        >
                          <span>
                            <FaWhatsapp size={18} />
                          </span>{" "}
                          Whatsapp
                        </Link>
                        <p
                          onClick={handleCopy}
                          className={`flex items-center gap-2 font-semibold text-sm ${copied ? "text-primary-500" : "text-gray-600"
                            } hover:text-primary-500 duration-300 cursor-pointer`}
                        >
                          <span>
                            <FiLink size={18} />
                          </span>{" "}
                          {copied ? "Copied!" : "Copy"}
                        </p>
                      </div>
                    </PopoverContent>
                  </Popover>
                  {tourData?._id && (
                    <div
                      onClick={() => toggle(tourData._id)}
                      className="bg-white border border-gray-200 w-11 h-11 rounded-full flex justify-center items-center cursor-pointer"
                    >
                      <FaHeart
                        size={20}
                        className={`transition-colors duration-300 ${isInWishlist(tourData._id)
                          ? "text-red-500"
                          : "text-gray-400"
                          }`}
                      />
                    </div>
                  )}
                </div>
              </div>
            </>
          )}
        </section>

        {/* Gallery */}
        <section>
          <div
            ref={desktopFancyBoxRef}
            className="tp-container hidden md:grid grid-cols-12 gap-4"
          >
            {isLoading ? (
              <Skeleton className="col-span-7 w-full h-[360px] lg:h-[465px] rounded-xl" />
            ) : (
              tourData?.images?.[0] && (
                <a
                  className="col-span-7 block"
                  href={tourData.images[0] || ImageWaterMark}
                  data-fancybox="gallery"
                >
                  <img
                    src={tourData.images[0] || ImageWaterMark}
                    onError={handleImageError}
                    className="w-full h-[360px] lg:h-[465px] object-cover rounded-xl"
                    alt="Tour gallery image one"
                  />
                </a>
              )
            )}
            <div className="col-span-5 space-y-4">
              {isLoading ? (
                <Skeleton className="w-full h-[172px] lg:h-[224px] object-cover rounded-xl" />
              ) : (
                tourData?.images?.[1] && (
                  <a
                    className="block"
                    href={tourData.images[1] || ImageWaterMark}
                    data-fancybox="gallery"
                  >
                    <img
                      src={tourData.images[1] || ImageWaterMark}
                      onError={handleImageError}
                      className="w-full h-[172px] lg:h-[224px] object-cover rounded-xl"
                      alt="Tour gallery image two"
                    />
                  </a>
                )
              )}
              {isLoading ? (
                <Skeleton className="w-full h-[172px] lg:h-[224px] object-cover rounded-xl" />
              ) : (
                tourData?.images?.[2] && (
                  <div className="relative">
                    <a
                      className="block"
                      href={tourData.images[2] || ImageWaterMark}
                      data-fancybox="gallery"
                    >
                      <img
                        src={tourData.images[2] || ImageWaterMark}
                        onError={handleImageError}
                        className="w-full h-[172px] lg:h-[224px] object-cover rounded-xl"
                        alt="Tour gallery image three"
                      />
                    </a>
                    {tourData.images.length > 3 && (
                      <span
                        onClick={openGalleryFromStart}
                        className="cursor-pointer inline-flex items-center gap-1 text-base font-medium text-gray-600 bg-white bg-opacity-90 py-2 px-4 rounded-full absolute right-3 bottom-3"
                      >
                        <LuImages size={20} /> All photos
                      </span>
                    )}
                  </div>
                )
              )}
            </div>
          </div>

          <div ref={mobileFancyBoxRef} className="md:hidden">
            <Swiper
              className="swiper-pagination-dot !pb-[42px]"
              pagination={{ clickable: true }}
              loop
              autoplay={{ delay: 2500, disableOnInteraction: false }}
              slidesPerView={1}
              spaceBetween={2}
              modules={[Pagination]}
              grabCursor={true}
              breakpoints={{
                640: {
                  slidesPerView: 2,
                },
              }}
            >
              {isLoading
                ? [...Array(3)].map((_, i) => (
                  <SwiperSlide key={i}>
                    <Skeleton className="w-full h-[260px]" />
                  </SwiperSlide>
                ))
                : ((tourData?.images ?? []).length) > 0
                  ? tourData?.images.map((galleryImg, index) => (
                    <SwiperSlide key={index}>
                      <a href={galleryImg || ImageWaterMark} data-fancybox="gallery">
                        <img
                          src={galleryImg || ImageWaterMark}
                          onError={handleImageError}
                          className="w-full h-[260px] object-cover"
                          alt={`Tour gallery image ${index + 1}`}
                        />
                      </a>
                    </SwiperSlide>
                  ))
                  : (
                    <SwiperSlide>
                      <p className="text-center font-medium text-xl text-gray-500 pt-5">
                        No image available.
                      </p>
                    </SwiperSlide>
                  )
              }
            </Swiper>
          </div>
        </section>

        {/* Tour Details and booking card */}
        <section className="tp-container mt-8 flex flex-col-reverse lg:flex-row gap-8">
          {/* Content Side */}
          {isLoading ? (
            <div className="flex-1">
              <Skeleton className="w-full h-[20px] rounded-xl" />
              <Skeleton className="my-2 w-11/12 h-[20px] rounded-xl" />
              <Skeleton className="my-2 w-9/12 h-[20px] rounded-xl" />

              <Skeleton className="mt-10 max-w-36 h-[20px] rounded-xl" />
              <Skeleton className="mt-5 w-full h-[50px] rounded-xl" />
              <Skeleton className="mt-3 w-full h-[50px] rounded-xl" />
              <Skeleton className="mt-3 w-full h-[50px] rounded-xl" />
            </div>
          ) : (
            <div className="flex-1">
              {/* Available Book box */}
              {isCheckingAvailabilityLoading ? (
                <div ref={availabilityBoxRef} className="border border-primary-400 rounded-2xl p-5 shadow-[0px_5px_20px_0px_rgba(0,0,0,.05)] bg-white mb-6 scroll-mt-24">
                  <p className="text-lg font-semibold text-gray-500 flex items-center gap-2"><span><PiClockBold size={22} /></span> Checking...</p>
                  <Skeleton className="mt-3 w-full h-[30px] rounded-full" />
                  <Skeleton className="mt-3 w-4/5 h-[30px] rounded-full" />
                </div>
              ) : (
                hasCheckedAvailability && availability ? (
                  availability ? (
                    <div ref={availabilityBoxRef} className="border border-primary-400 rounded-2xl p-5 shadow-[0px_5px_20px_0px_rgba(0,0,0,.05)] bg-white mb-6 scroll-mt-24">
                      <p className="bg-green-500 text-white px-3 py-2 text-lg rounded-xl font-semibold flex items-center gap-2"><span><GiCheckMark /></span> Available</p>

                      <div className="flex flex-col sm:flex-row gap-4 mt-5">
                        <div className="flex-1">
                          <h1 className="text-base tracking-tight font-semibold text-gray-700 flex gap-1"><FaRegDotCircle className="text-primary-500 pt-1" size={22} /> {tourData?.title}</h1>
                          {tourData?.startDate && (
                            <div className="flex gap-1 text-sm text-gray-600 font-medium mt-5 sm:pl-6">
                              <span>
                                <LuCalendarFold size={20} />
                              </span>
                              <p>
                                Start Date:{" "}
                                <span className="font-semibold">
                                  {format(new Date(tourData.startDate), "MMM dd, yyyy")}
                                </span>
                              </p>
                            </div>
                          )}
                          {tourData?.arrivalLocation && (
                            <div className="flex text-sm gap-1 items-center text-gray-600 font-medium mt-3 sm:pl-6">
                              <span>
                                <GrLocation size={20} />
                              </span>
                              <p>
                                Starting Location:{" "}
                                <span className="font-semibold">
                                  {tourData?.departureLocation || "N/A"}
                                </span>
                              </p>
                            </div>
                          )}
                        </div>
                        <div>
                          <p className="mb-1 text-sm font-medium text-gray-500 space-y-1 sm:text-end">
                            Total guests: {availability?.guest}
                          </p>
                          <p className="text-lg font-semibold sm:text-end">
                            <span className="font-medium text-gray-600 tracking-tighter">Total: </span>
                            <span className="text-primary-500">
                              ৳{availability?.total}
                            </span>
                          </p>

                          <div className="sm:text-end mt-5">
                            <Link
                              to={`/booking/${tourData?.slug}?date=${format(availability.date, "yyyy-MM-dd")}&guest=${availability.guest}&total=${availability.total}`}
                              className="tp-primary-btn h-12 w-auto !py-3 inline-block"
                            >
                              Book Now
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : null
                ) : hasCheckedAvailability && !availability ? (
                  <div ref={availabilityBoxRef} className="border border-primary-400 rounded-2xl p-5 shadow-[0px_5px_20px_0px_rgba(0,0,0,.05)] bg-white mb-6 scroll-mt-24">
                    <p className="bg-red-500 text-white px-3 py-2 text-lg rounded-xl font-semibold flex items-center gap-2"><span><PiCalendarSlashBold size={22} /></span> Not Available Right Now</p>
                  </div>
                ) : null
              )}

              <h3 className="text-2xl font-semibold text-gray-800 mb-6">
                Overview
              </h3>
              <ul className="grid sm:grid-cols-2 gap-4 content-between">
                <li className="flex gap-2 text-gray-600 font-medium">
                  <span className="text-primary-600">
                    <MdOutlineWatchLater size={22} />
                  </span>
                  <p>
                    Duration:{" "}
                    <span className="font-semibold">
                      {tourData?.startDate && tourData?.endDate
                        ? `${getTotalDays(
                          tourData.startDate,
                          tourData.endDate
                        )} Days`
                        : "N/A"}
                    </span>
                  </p>
                </li>
                <li className="flex gap-2 text-gray-600 font-medium">
                  <span className="text-primary-600">
                    <LuNotepadText size={22} />
                  </span>
                  <p>
                    Tour Type:{" "}
                    <span className="font-semibold">
                      {tourData?.tourTypeName || "N/A"}
                    </span>
                  </p>
                </li>
                <li className="flex gap-2 text-gray-600 font-medium">
                  <span className="text-primary-600">
                    <TbUsers size={22} />
                  </span>
                  <p>
                    On every tour:{" "}
                    <span className="font-semibold">
                      {tourData?.maxGuest || "N/A"} guests (max)
                    </span>
                  </p>
                </li>
                <li className="flex gap-2 text-gray-600 font-medium">
                  <span className="text-primary-600">
                    <GrLocation size={22} />
                  </span>
                  <p>
                    Location:{" "}
                    <span className="font-semibold">
                      {tourData?.location || "N/A"}
                    </span>
                  </p>
                </li>
              </ul>

              {tourData?.description && (
                <div className="mt-6">
                  <div
                    ref={contentRef}
                    style={{
                      maxHeight: isExpanded
                        ? `${contentRef.current?.scrollHeight}px`
                        : "150px",
                      overflow: "hidden",
                      transition: "max-height 0.5s ease",
                    }}
                  >
                    <p className="text-gray-600 font-medium">
                      {tourData.description}
                    </p>
                  </div>

                  {needsReadMore && (
                    <button
                      onClick={() => setIsExpanded(!isExpanded)}
                      className="mt-2 text-blue-500 font-semibold"
                    >
                      {isExpanded ? "Read Less" : "Read More"}
                    </button>
                  )}
                </div>
              )}

              <div className="border-b w-full border-gray-200 my-8"></div>

              {tourData?.amenities && (
                <>
                  <h3 className="text-2xl font-semibold text-gray-800 mb-5">
                    Amenities
                  </h3>
                  <ul className="space-y-2">
                    {tourData?.amenities.map((amenitiesItem, index) => (
                      <li
                        key={index}
                        className="flex gap-2 text-gray-600 font-medium"
                      >
                        <span className="text-primary-500 mt-[1px]">
                          <PiSealCheck size={22} />
                        </span>{" "}
                        {amenitiesItem}
                      </li>
                    ))}
                  </ul>

                  <div className="border-b w-full border-gray-200 my-8"></div>
                </>
              )}

              {((tourData?.included && tourData.included.length > 0) ||
                (tourData?.excluded && tourData.excluded.length > 0)) && (
                  <>
                    <h3 className="text-2xl font-semibold text-gray-800 mb-5">
                      Includes/Excludes
                    </h3>

                    <div className="grid sm:grid-cols-2 gap-4">
                      <ul className="space-y-2">
                        {tourData?.included.map((includedItem, index) => (
                          <li
                            key={index}
                            className="flex gap-2 text-gray-800 font-medium"
                          >
                            <span className="text-primary-500 mt-[1px]">
                              <LuCheck size={20} />
                            </span>{" "}
                            {includedItem}
                          </li>
                        ))}
                      </ul>
                      <ul className="space-y-2">
                        {tourData?.excluded.map((excludedItem, index) => (
                          <li
                            key={index}
                            className="flex gap-2 text-gray-800 font-medium"
                          >
                            <span className="text-red-500 mt-[1px]">
                              <RxCross2 size={20} />
                            </span>{" "}
                            {excludedItem}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="border-b w-full border-gray-200 my-8"></div>
                  </>
                )}

              <h3 className="text-2xl font-semibold text-gray-800 mb-5">
                Frequently asked questions
              </h3>
              <Accordion
                type="single"
                collapsible
                className="w-full space-y-3"
                defaultValue={String(0)}
              >
                {faqItems.map((item, index) => (
                  <AccordionItem
                    value={String(index)}
                    key={index}
                    className="py-2 px-4 border bg-gray-50 rounded-lg"
                  >
                    <AccordionTrigger className="py-2 text-lg text-primary-950 leading-6 hover:no-underline">
                      {item.question}
                    </AccordionTrigger>
                    <AccordionContent className="pb-2 text-base font-medium text-gray-600">
                      {item.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>

              <div className="border-b w-full border-gray-200 my-8"></div>

              <h3 className="text-2xl font-semibold text-gray-800 mb-5">
                Cancellation policy
              </h3>
              <p className="text-gray-600 font-medium">
                You can cancel up to 24 hours in advance of the experience for a
                full refund.
              </p>

              <div className="border-b w-full border-gray-200 my-8"></div>

              <h3 className="text-2xl font-semibold text-gray-800 mb-5">
                Customer reviews
              </h3>
              <OverallRatingBox />

              {/* User Review */}
              <div ref={reviewImageFancyBoxRef} className="mt-5 space-y-7">
                {reviews.map((review, reviewIndex) => (
                  <React.Fragment key={reviewIndex}>
                    <UserReview review={review} reviewIndex={reviewIndex} />
                  </React.Fragment>
                ))}
              </div>
            </div>
          )}

          {/* Availability Check */}
          {isLoading ? (
            <Skeleton className="my-2 w-full scroll-mt-24 md:scroll-mt-0 lg:min-w-[395px] lg:w-[395px] lg:sticky top-24" />
          ) : (
            <div ref={availabilityRef} className={`w-full scroll-mt-24 md:scroll-mt-0 lg:min-w-[395px] lg:w-[395px] lg:sticky top-24 h-fit`}>
              <div className="shadow-[0px_5px_20px_0px_rgba(0,0,0,.05)] bg-white p-6 rounded-2xl border border-gray-200">
                <p className="text-base text-gray-700 font-medium flex justify-between">
                  <span>from</span>{" "}
                  <span className="inline-block px-3 py-1 bg-green-500 text-white text-sm rounded-full font-semibold">
                    -5%
                  </span>
                </p>
                <p className="text-primary-500">
                  <span className="text-[24px] font-semibold tracking-tighter">
                    ৳{tourData?.costFrom}
                  </span>
                  <span className="text-base font-medium">/person</span>
                </p>
                <p className="text-base text-gray-500 font-semibold line-through tracking-tighter -mt-1">
                  ৳30000
                </p>

                <ul>
                  <li className="flex justify-between gap-2 border-b border-gray-200 py-3 mt-4">
                    <span className="font-semibold text-gray-700">Date</span>
                    <Popover open={openCalendar} onOpenChange={setOpenCalendar}>
                      <PopoverTrigger asChild>
                        <Button
                          type="button"
                          id="date"
                          className="flex gap-2 w-auto h-auto text-left text-gray-700 font-semibold text-base tracking-tighter bg-transparent p-0 shadow-none hover:bg-transparent"
                        >
                          <span>
                            <LuCalendarFold size={22} />
                          </span>
                          {selectedDate
                            ? format(selectedDate, "MMM dd, yyyy")
                            : "Select date"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent
                        className="w-auto overflow-hidden p-0"
                        align="end"
                      >
                        <Calendar
                          mode="single"
                          selected={selectedDate}
                          month={month}
                          onMonthChange={setMonth}
                          disabled={{ before: today }}
                          onSelect={(d) => {
                            setValue("date", d!, { shouldValidate: true });
                            setOpenCalendar(false);
                          }}
                        />
                      </PopoverContent>
                    </Popover>
                  </li>
                  <Counter
                    label="Guest"
                    value={guest || 1}
                    min={1}
                    onChange={(v) =>
                      setValue("guest", Number(v), {
                        shouldValidate: true,
                        shouldDirty: true,
                      })
                    }
                  />
                </ul>
                {allErrors.length > 0 && (
                  <div className="mt-4 rounded-lg border border-red-200 bg-red-50 p-3">
                    <ul className="list-disc list-inside space-y-1 text-sm text-red-600 font-medium">
                      {allErrors.map((msg, i) => (
                        <li key={i}>{msg}</li>
                      ))}
                    </ul>
                  </div>
                )}
                <Button
                  onClick={handleSubmit(onSubmit)}
                  className="tp-primary-btn h-12 w-full mt-5"
                >
                  Check Availability
                </Button>
                <Dialog
                  open={openEnquiry}
                  onOpenChange={(
                    open: boolean | ((prevState: boolean) => boolean)
                  ) => {
                    setOpenEnquiry(open);

                    if (!open) {
                      enquiryForm.reset();
                    }
                  }}
                >
                  <DialogTrigger asChild>
                    <Button
                      type="button"
                      className="tp-transparent-black-btn h-12 w-full mt-3"
                    >
                      Make enquiry
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-[550px]">
                    <DialogHeader>
                      <DialogTitle>Make enquiry</DialogTitle>
                      <DialogDescription>
                        Have a question before booking? Message us to learn more.
                      </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={enquiryForm.handleSubmit(enquiryOnSubmit)}>
                      <Form {...enquiryForm}>
                        <div className="grid sm:grid-cols-2 gap-5 mt-5 mb-4">
                          <FormField
                            control={enquiryForm.control}
                            name="name"
                            rules={{ required: "Name is required" }}
                            render={({ field }) => (
                              <FormItem>
                                <FormControl>
                                  <div>
                                    <Label className="font-semibold text-gray-600 text-sm">
                                      Name
                                      <span className="text-destructive text-base">
                                        *
                                      </span>
                                    </Label>
                                    <Input
                                      className="tp-input w-full mt-1"
                                      placeholder="Your full name"
                                      {...field}
                                      value={field.value || ""}
                                    />
                                  </div>
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={enquiryForm.control}
                            name="email"
                            rules={{
                              required: "Email is required",
                              pattern: {
                                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                message: "Enter a valid email address",
                              },
                            }}
                            render={({ field }) => (
                              <FormItem>
                                <FormControl>
                                  <div>
                                    <Label className="font-semibold text-gray-600 text-sm">
                                      Email
                                      <span className="text-destructive text-base">
                                        *
                                      </span>
                                    </Label>
                                    <Input
                                      className="tp-input w-full mt-1"
                                      placeholder="example@gmail.com"
                                      {...field}
                                      value={field.value || ""}
                                    />
                                  </div>
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                        <FormField
                          control={enquiryForm.control}
                          name="phone"
                          rules={{
                            required: "Phone number is required",
                            pattern: {
                              value: /^[0-9+\-\s()]{8,20}$/,
                              message: "Enter a valid phone number",
                            },
                          }}
                          render={({ field }) => (
                            <FormItem>
                              <FormControl>
                                <div>
                                  <Label className="font-semibold text-gray-600 text-sm">
                                    Phone
                                    <span className="text-destructive text-base">
                                      *
                                    </span>
                                  </Label>
                                  <Input
                                    className="tp-input w-full mt-1"
                                    placeholder="+880 1234 567 890"
                                    {...field}
                                    value={field.value || ""}
                                  />
                                </div>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={enquiryForm.control}
                          name="message"
                          rules={{ required: "Message is required" }}
                          render={({ field }) => (
                            <FormItem className="mt-4">
                              <FormControl>
                                <div>
                                  <Label className="font-semibold text-gray-600 text-sm">
                                    How can we help?
                                    <span className="text-destructive text-base">
                                      *
                                    </span>
                                  </Label>
                                  <Textarea
                                    className="tp-input !py-3 w-full mt-1 min-h-[120px]"
                                    placeholder="Write your message..."
                                    {...field}
                                    value={field.value || ""}
                                  />
                                </div>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </Form>
                      <DialogFooter className="mt-4 flex-row justify-end space-x-1">
                        <DialogClose asChild>
                          <Button
                            type="button"
                            className="tp-cancel-btn !py-[18px] !px-5 !rounded-full"
                          >
                            Cancel
                          </Button>
                        </DialogClose>

                        <Button
                          disabled={isLoginBtnLoading}
                          type="submit"
                          className={`tp-primary-btn-light !py-5 !px-5 ${isLoginBtnLoading && "pointer-events-none"
                            }`}
                        >
                          {isLoginBtnLoading ? (
                            <>
                              Sending{" "}
                              <RiLoaderLine className="ml-2 w-4 h-4 animate-spin" />
                            </>
                          ) : (
                            <>
                              Send <LuSend size={20} className="ml-2" />
                            </>
                          )}
                        </Button>
                      </DialogFooter>
                    </form>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          )}
        </section>
      </div>
    </>
  );
}