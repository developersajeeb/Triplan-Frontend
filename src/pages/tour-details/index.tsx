/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import CommonMetadata from "@/components/utilities/CommonMetadata";
import JsonLd from "@/components/utilities/JsonLd";
import useFancyBox from "@/hooks/useFancybox";
import { useWishlist } from "@/hooks/useWishlist";
import { useCheckAvailabilityMutation } from "@/redux/features/booking/booking.api";
import { useGetSingleTourQuery } from "@/redux/features/tour/tour.api";
import React, { useEffect, useRef, useState } from "react";
import { FaFacebook, FaHeart, FaInstagram, FaWhatsapp, FaXTwitter } from "react-icons/fa6";
import { FiLink } from "react-icons/fi";
import { GoShareAndroid } from "react-icons/go";
import { LuCheck, LuImages, LuNotepadText, LuSend } from "react-icons/lu";
import { Link, useParams } from "react-router";
import { toast } from "sonner";
import { Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import ImageWaterMark from "@/assets/images/image-watermark.webp";
import { Skeleton } from "@/components/ui/skeleton";
import { Fancybox, type FancyboxOptions } from "@fancyapps/ui/dist/fancybox";
import { PiSealCheck } from "react-icons/pi";
import { RxCross2 } from "react-icons/rx";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { CiCircleMinus, CiCirclePlus } from "react-icons/ci";
import { useForm, type FieldValues, type SubmitHandler } from "react-hook-form";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { RiLoaderLine } from "react-icons/ri";
import { Textarea } from "@/components/ui/textarea";
import { useNavigate } from "react-router";
import TourReviewSection from "./TourReviewSection";
import { useGetTourReviewsQuery } from "@/redux/features/review/review.api";
import { formatCurrency } from "@/config";
import { useCreateEnquiryMutation } from "@/redux/features/enquiry/enquiry.api";

export default function TourDetails() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [checkAvailability, { isLoading: isCheckingAvailability }] = useCheckAvailabilityMutation();
  const { data: tourData, isLoading } = useGetSingleTourQuery(slug!);
  const { data: reviewData } = useGetTourReviewsQuery(tourData?._id || "", {
    skip: !tourData?._id,
  });

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
  const shareUrl = `https://triplan.developersajeeb.com/tours/${tourData?.slug}`;
  const shareText = encodeURIComponent(tourData?.title ?? "");
  const [copied, setCopied] = useState<boolean>(false);

  const limit = 350;
  const text = tourData?.description ?? "";
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const [isCollapsing, setIsCollapsing] = useState<boolean>(false);
  const [needsReadMore, setNeedsReadMore] = useState<boolean>(false);
  const contentRef = useRef<HTMLParagraphElement>(null);
  const enquiryForm = useForm({
    mode: "onSubmit",
  });
  const [isLoginBtnLoading, setIsLoginBtnLoading] = useState<boolean>(false);
  const [openEnquiry, setOpenEnquiry] = useState<boolean>(false);
  const [guest, setGuest] = useState<number>(1);
  const [createEnquiry, { isLoading: isSubmittingEnquiry }] = useCreateEnquiryMutation();

  const batchOptions = tourData?.batches ?? [];
  const [selectedBatchId, setSelectedBatchId] = useState<string>("");

  const formatBatchDateRange = (startDate: string, endDate: string) => {
    return `${format(new Date(startDate), "MMM dd")} – ${format(new Date(endDate), "MMM dd, yyyy")}`;
  };

  const toUTCDateKey = (value: string | Date) => {
    const date = value instanceof Date ? value : new Date(value);

    if (Number.isNaN(date.getTime())) {
      return "";
    }

    const year = date.getUTCFullYear();
    const month = String(date.getUTCMonth() + 1).padStart(2, "0");
    const day = String(date.getUTCDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const getBatchSeatsLeft = (batch: (typeof batchOptions)[number]) => {
    if (typeof batch.remainingSeat === "number") {
      return batch.remainingSeat;
    }

    return Math.max(0, (batch.maxSeat || 0) - (batch.bookedSeat || 0));
  };

  const getBatchStatus = (batch: (typeof batchOptions)[number]) => {
    const seatsLeft = getBatchSeatsLeft(batch);
    const regEndDate = new Date(batch.regEndDate);
    const now = new Date();
    const regClosed = regEndDate.getTime() < now.getTime();

    if (seatsLeft <= 0 || regClosed) return "Closed";

    const daysUntilRegClose = Math.ceil(
      (regEndDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)
    );

    if (daysUntilRegClose <= 2) return "Closing soon";
    return "Open";
  };

  const getBatchBadgeClasses = (status: string) => {
    if (status === "Closing soon") {
      return "bg-yellow-400 text-yellow-800";
    }

    if (status === "Open") {
      return "bg-green-400 text-green-800";
    }

    return "bg-red-300 text-red-800";
  };

  const orderedBatchOptions = [
    ...batchOptions.filter((batch) => getBatchStatus(batch) !== "Closed"),
    ...batchOptions.filter((batch) => getBatchStatus(batch) === "Closed"),
  ];

  const selectedBatch =
    batchOptions.find((batch) => batch._id === selectedBatchId) ||
    batchOptions.find((batch) => getBatchStatus(batch) !== "Closed") ||
    batchOptions[0];

  const enquiryOnSubmit: SubmitHandler<FieldValues> = async (values) => {
    try {
      setIsLoginBtnLoading(true);

      await createEnquiry({
        name: String(values.name || "").trim(),
        email: String(values.email || "").trim(),
        phone: String(values.phone || "").trim(),
        message: String(values.message || "").trim(),
        tourTitle: tourData?.title,
        tourSlug: tourData?.slug,
      }).unwrap();

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

  useEffect(() => {
    const batches = tourData?.batches ?? [];

    const getLocalBatchStatus = (batch: (typeof batches)[number]) => {
      const seatsLeft =
        typeof batch.remainingSeat === "number"
          ? batch.remainingSeat
          : Math.max(0, (batch.maxSeat || 0) - (batch.bookedSeat || 0));
      const regClosed = new Date(batch.regEndDate).getTime() < new Date().getTime();

      return seatsLeft <= 0 || regClosed ? "Closed" : "Open";
    };

    if (!batches.length) {
      setSelectedBatchId("");
      return;
    }

    const selectedBatchData = batches.find((batch) => batch._id === selectedBatchId);
    const firstOpenBatch = batches.find((batch) => getLocalBatchStatus(batch) !== "Closed");
    const nextBatchId =
      firstOpenBatch?._id || selectedBatchData?._id || batches[0]._id;

    if (
      !selectedBatchData ||
      getLocalBatchStatus(selectedBatchData) === "Closed" ||
      selectedBatchId !== nextBatchId
    ) {
      setSelectedBatchId(nextBatchId);
    }
  }, [tourData?.batches, selectedBatchId]);

  const selectedBatchStatus = selectedBatch ? getBatchStatus(selectedBatch) : "";
  const selectedBatchSellingPrice = selectedBatch?.sellingPrice ?? tourData?.sellingPrice ?? 0;
  const selectedBatchCostFrom = selectedBatch?.costFrom ?? tourData?.costFrom ?? 0;
  const liveGuestTotal = guest * selectedBatchSellingPrice;
  const selectedBatchDateKey = selectedBatch ? toUTCDateKey(selectedBatch.startDate) : "";
  const bookingUrl = selectedBatch
    ? `/booking/${tourData?.slug}?date=${selectedBatchDateKey}&guest=${guest}&total=${liveGuestTotal}`
    : "#";
  const discountPercent =
    selectedBatchCostFrom > 0
      ? Math.max(0, Math.round(((selectedBatchCostFrom - selectedBatchSellingPrice) / selectedBatchCostFrom) * 100))
      : 0;

  const handleBookNow = async () => {
    if (!tourData?._id) {
      toast.error("Tour data is missing. Please try again.");
      return;
    }

    if (!selectedBatch) {
      toast.error("No batch is available for this tour.");
      return;
    }

    if (selectedBatchStatus === "Closed") {
      toast.error("This batch is closed. Please select another batch.");
      return;
    }

    if (!selectedBatchDateKey) {
      toast.error("Selected batch date is invalid. Please choose another batch.");
      return;
    }

    try {
      const result = await checkAvailability({
        tour: tourData._id,
        date: selectedBatchDateKey,
        guestCount: guest,
      }).unwrap();

      const availabilityData = result.data || result;

      if (!availabilityData.available) {
        toast.error(availabilityData.message || "Selected batch is not available");
        return;
      }

      navigate(bookingUrl);
    } catch (error: any) {
      const errorMessage = error?.data?.message || "Failed to check availability";
      toast.error(errorMessage);
    }
  };

  useEffect(() => {
    setNeedsReadMore(text.length > limit);
  }, [text, limit]);

  useEffect(() => {
    if (!isCollapsing) return;

    const timer = setTimeout(() => {
      setIsCollapsing(false);
    }, 500);

    return () => clearTimeout(timer);
  }, [isCollapsing]);

  const handleToggleDescription = () => {
    if (isExpanded) {
      setIsCollapsing(true);
      setIsExpanded(false);
      return;
    }

    setIsExpanded(true);
  };

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

  const faqItems = (tourData?.faq ?? []).filter(
    (item) => item?.question?.trim() && item?.answer?.trim()
  );

  const reviewSummary = reviewData?.data?.summary;
  const headerRating = reviewSummary?.overallRating?.toFixed(1) ?? "0.0";
  const headerTotalReviews = reviewSummary?.totalReviews ?? 0;
  const hasReviewData = headerTotalReviews > 0;

  const handleScrollToReviews = () => {
    const reviewSection = document.getElementById("tour-reviews");
    if (!reviewSection) return;

    const top = reviewSection.getBoundingClientRect().top + window.scrollY - 90;
    window.scrollTo({ top, behavior: "smooth" });
  };


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
                  {hasReviewData && (
                    <li
                      className="text-sm text-gray-600 font-medium mb-1"
                      onClick={handleScrollToReviews}
                      role="button"
                      tabIndex={0}
                      onKeyDown={(event) => {
                        if (event.key === "Enter" || event.key === " ") {
                          event.preventDefault();
                          handleScrollToReviews();
                        }
                      }}
                    >
                      <span className="bg-[#FFCA18] text-[13px] text-gray-900 px-2 pt-[1px] pb-[2px] font-semibold rounded mr-[2px]">
                        {headerRating}
                      </span>{" "}
                      <span className="hover:underline cursor-pointer duration-300">
                        ({headerTotalReviews} Review{headerTotalReviews === 1 ? "" : "s"})
                      </span>
                    </li>
                  )}
                  <li className="text-sm text-gray-600 font-semibold flex gap-1">
                    <LuNotepadText className="pt-[2px]" size={18} />{" "}
                    {tourData?.tourTypeName}
                  </li>
                  <li className="text-sm text-gray-600 font-medium inline-flex gap-1 pr-3">
                    <span>
                      <HiOutlineLocationMarker size={18} />
                    </span>{" "}
                    {tourData?.arrivalLocation}
                  </li>
                </ul>
              </div>
              <div className="flex gap-2 fixed justify-between md:justify-normal md:relative bg-white md:bg-transparent left-0 right-0 bottom-0 p-3 md:p-0 shadow-[0px_0px_10px_0px_#00000012] md:shadow-none z-30">
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
              <h3 className="text-2xl font-semibold text-gray-800 mb-6">
                Overview
              </h3>
              {tourData?.description && (
                <div className="mt-6">
                  <div
                    className="overflow-hidden"
                    style={
                      isExpanded
                        ? {
                            maxHeight: `${contentRef.current?.scrollHeight ?? 0}px`,
                            opacity: 1,
                            transition: "max-height 0.5s ease, opacity 0.35s ease",
                          }
                        : {
                            maxHeight: "7.5em",
                            opacity: isCollapsing ? 1 : 0.95,
                            transition: "max-height 0.5s ease, opacity 0.35s ease",
                          }
                    }
                  >
                    <p
                      ref={contentRef}
                      className="text-gray-600 font-medium"
                      style={
                        !isExpanded && !isCollapsing
                          ? {
                              display: "-webkit-box",
                              WebkitLineClamp: 5,
                              WebkitBoxOrient: "vertical",
                              overflow: "hidden",
                            }
                          : undefined
                      }
                    >
                      {tourData.description}
                    </p>
                  </div>

                  {needsReadMore && (
                    <button
                      onClick={handleToggleDescription}
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

              {faqItems.length > 0 && (
                <>
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
                        <AccordionContent className="pb-2 text-base font-medium text-gray-600 whitespace-pre-line">
                          {item.answer}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>

                  <div className="border-b w-full border-gray-200 my-8"></div>
                </>
              )}

              <TourReviewSection tourId={tourData?._id} sectionId="tour-reviews" />
            </div>
          )}

          {/* Booking Card */}
          {isLoading ? (
            <Skeleton className="my-2 w-full scroll-mt-24 md:scroll-mt-0 lg:min-w-[395px] lg:w-[395px] lg:sticky top-24" />
          ) : (
            <div className={`w-full scroll-mt-24 md:scroll-mt-0 lg:min-w-[395px] lg:w-[395px] lg:sticky top-24 h-fit`}>
              <div className="shadow-[0px_5px_20px_0px_rgba(0,0,0,.05)] bg-white p-6 rounded-2xl border border-gray-200">
                <p className="text-base text-gray-700 font-medium flex justify-between">
                  <span>from</span>{" "}
                  <span className="inline-block px-3 py-1 bg-green-500 text-white text-sm rounded-full font-semibold">
                    -{discountPercent}%
                  </span>
                </p>
                <p className="text-primary-500">
                  <span className="text-[24px] font-semibold tracking-tighter">
                    {formatCurrency(selectedBatchSellingPrice)}
                  </span>
                  <span className="text-base font-medium">/person</span>{" "}
                  {selectedBatchCostFrom > 0 && (
                    <span className="text-base text-gray-500 font-semibold line-through tracking-tighter -mt-1">
                      {formatCurrency(selectedBatchCostFrom)}
                    </span>
                  )}
                </p>

                <hr className="border-gray-200 my-4" />

                <p className="text-sm font-bold text-gray-600 mb-2">Select a batch</p>

                {orderedBatchOptions.map((batch) => {
                  const isSelected = selectedBatchId === batch._id;
                  const batchStatus = getBatchStatus(batch);
                  const seatsLeft = getBatchSeatsLeft(batch);

                  return (
                    <div
                      key={batch._id}
                      onClick={() => {
                        if (batchStatus !== "Closed") {
                          setSelectedBatchId(batch._id);
                        }
                      }}
                      className={`border rounded-lg px-4 py-2 flex justify-between gap-3 mb-2 ${
                        isSelected
                          ? "border-primary-200 bg-primary-400"
                          : "border-gray-200 bg-gray-50"
                      } ${batchStatus === "Closed" ? "opacity-65 pointer-events-none" : "cursor-pointer"}`}
                    >
                      <div>
                        <p className={`text-sm font-semibold ${isSelected ? "text-white" : "text-gray-600"}`}>
                          {formatBatchDateRange(batch.startDate, batch.endDate)}
                        </p>
                        <p className={`text-xs font-medium ${isSelected ? "text-white" : "text-gray-500"}`}>
                          Reg. ends {format(new Date(batch.regEndDate), "MMM dd, yyyy")} / {seatsLeft} seats left
                        </p>
                      </div>
                      <div>
                        <span
                          className={`inline-block px-2 py-[2px] text-xs rounded-full font-semibold ${
                            getBatchBadgeClasses(batchStatus)
                          }`}
                        >
                          {batchStatus}
                        </span>
                      </div>
                    </div>
                  );
                })}

                <hr className="border-gray-200 mt-5" />

                <div className="flex justify-between py-3">
                  <p className="font-semibold text-gray-700">Guest</p>
                  <div className="flex items-center">
                    <button
                      className="text-gray-600 hover:bg-primary-950 hover:text-white rounded-full duration-300 disabled:opacity-35 disabled:pointer-events-none"
                      type="button"
                      disabled={guest <= 1}
                      onClick={() => setGuest((prev) => Math.max(1, prev - 1))}
                    >
                      <CiCircleMinus size={24} />
                    </button>
                    <span className="w-8 text-center font-medium">{guest}</span>
                    <button
                      className="text-gray-600 hover:bg-primary-950 hover:text-white rounded-full duration-300"
                      type="button"
                      onClick={() => setGuest((prev) => prev + 1)}
                    >
                      <CiCirclePlus size={24} />
                    </button>
                  </div>
                </div>
                <div className="flex justify-between pb-3">
                  <p className="font-semibold text-gray-700">Amount</p>
                  <p className="text-lg font-semibold text-primary-500 tracking-tight">
                    {formatCurrency(liveGuestTotal)}
                  </p>
                </div>

                <Button
                  type="button"
                  disabled={isCheckingAvailability}
                  onClick={handleBookNow}
                  className="tp-primary-btn h-12 w-full mt-5"
                >
                  {isCheckingAvailability ? "Checking..." : "Book Now"}
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
                          disabled={isLoginBtnLoading || isSubmittingEnquiry}
                          type="submit"
                          className={`tp-primary-btn-light !py-5 !px-5 ${(isLoginBtnLoading || isSubmittingEnquiry) && "pointer-events-none"
                            }`}
                        >
                          {isLoginBtnLoading || isSubmittingEnquiry ? (
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