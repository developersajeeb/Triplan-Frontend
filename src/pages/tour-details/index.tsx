/* eslint-disable @typescript-eslint/no-unused-vars */
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import CommonMetadata from "@/components/utilities/CommonMetadata";
import JsonLd from "@/components/utilities/JsonLd";
import useFancyBox from "@/hooks/useFancybox";
import { useWishlist } from "@/hooks/useWishlist";
import { useGetSingleTourQuery } from "@/redux/features/tour/tour.api";
import { useEffect, useRef, useState } from "react";
import { FaFacebook, FaHeart, FaInstagram, FaLocationDot, FaStar, FaWhatsapp, FaXTwitter } from "react-icons/fa6";
import { FiLink } from "react-icons/fi";
import { GoShareAndroid } from "react-icons/go";
import { LuCalendarFold, LuCheck, LuImages, LuNotepadText } from "react-icons/lu";
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
import { PiSealCheck } from "react-icons/pi";
import { RxCross2 } from "react-icons/rx";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { TiStarFullOutline } from "react-icons/ti";
import { Progress } from "@/components/ui/progress";
import NotUserIcon from "@/components/shared/blocks/NotUserIcon";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";

export default function TourDetails() {
  const { slug } = useParams();
  const { data: tourData, isLoading, isError } = useGetSingleTourQuery(slug!);
  console.log(tourData);
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
  const [guestCount, setGuestCount] = useState<number>(1);
  const [totalAmount, setTotalAmount] = useState<number>(0);
  const [openCalendar, setOpenCalendar] = useState<boolean>(false)
  const [date, setDate] = useState<Date | undefined>(undefined)

  const shareUrl = `https://triplan.developersajeeb.com/tours/${tourData?.slug}`;
  const shareText = encodeURIComponent(tourData?.title ?? "");
  const [copied, setCopied] = useState<boolean>(false);

  const limit = 350;
  const text = tourData?.description ?? "";
  const [isExpanded, setIsExpanded] = useState(false);
  const [needsReadMore, setNeedsReadMore] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const today = new Date();
  const currentYear = today.getFullYear();

  useEffect(() => {
    if (!isLoading && !isError) {
      setTotalAmount(guestCount * tourData!.costFrom);
    }
  }, [guestCount, totalAmount, isLoading, isError, tourData]);

  // const incrementGuest = () => {
  //   setGuestCount((prv) => prv + 1);
  // };

  // const decrementGuest = () => {
  //   setGuestCount((prv) => prv - 1);
  // };

  useEffect(() => {
    setNeedsReadMore(text.length > limit);
  }, [text, limit]);

  const [progress, setProgress] = useState<number>(13);

  useEffect(() => {
    const timer = setTimeout(() => setProgress(66), 500);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <p>Loading...</p>;
  }

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

  const getTotalDays = (startDate: string, endDate: string): number => {
    const start = new Date(startDate);
    const end = new Date(endDate);

    const diffTime = end.getTime() - start.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    return diffDays;
  };

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

      <div className="pt-6 pb-20">
        {/* Header */}
        <section className="tp-container flex gap-4 mb-6">
          <div className="flex-1">
            <h1 className="text-3xl tracking-tight font-bold mb-3 text-gray-900">{tourData?.title}</h1>
            <ul className="flex flex-wrap gap-4">
              <li className='text-sm text-gray-600 font-medium mb-1'><span className='bg-[#FFCA18] text-[13px] text-gray-900 px-2 pt-[1px] pb-[2px] font-semibold rounded mr-[2px]'>4.8</span> <span className='hover:underline cursor-pointer duration-300'>(180 Reviews)</span></li>
              <li className='text-sm text-gray-600 font-semibold flex gap-1'><LuNotepadText className='pt-[2px]' size={18} /> {tourData?.tourTypeName}</li>
              <li className='text-sm text-gray-600 font-medium inline-flex gap-1 pr-3'><span><FaLocationDot size={14} className="mt-1" /></span> {tourData?.arrivalLocation + ", " + tourData?.divisionName}<span className="font-semibold text-primary-500 cursor-pointer">(View Map)</span></li>
            </ul>
          </div>

          <div className="flex gap-2 fixed justify-between md:justify-normal md:relative bg-white md:bg-transparent left-0 right-0 bottom-0 p-3 md:p-0 shadow-[0px_0px_10px_0px_#00000012] md:shadow-none z-30">
            <div className="md:hidden w-full sm:w-auto"><button type="button" className="tp-primary-btn w-full sm:w-auto h-11 !py-2">Check availability</button></div>
            <div className="flex gap-2">
              <Popover>
                <PopoverTrigger asChild>
                  <div className="bg-white border border-gray-200 hover:bg-gray-100 duration-300 w-11 h-11 rounded-full flex justify-center items-center cursor-pointer text-gray-500"><GoShareAndroid size={22} /></div>
                </PopoverTrigger>
                <PopoverContent className="w-auto focus-visible:outline-none">
                  <div className="space-y-4">
                    <Link to={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`}
                      target="_blank"
                      rel="noopener noreferrer" className="flex items-center gap-2 font-semibold text-sm text-gray-600 hover:text-primary-500 duration-300" ><span><FaFacebook size={18} /></span> Facebook
                    </Link>
                    <Link
                      to="https://www.instagram.com/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 font-semibold text-sm text-gray-600 hover:text-primary-500 duration-300" ><span><FaInstagram size={18} /></span> Instagram
                    </Link>
                    <Link to={`https://twitter.com/intent/tweet?url=${encodeURIComponent(
                      shareUrl
                    )}&text=${shareText}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 font-semibold text-sm text-gray-600 hover:text-primary-500 duration-300" ><span><FaXTwitter size={18} /></span> Twitter
                    </Link>
                    <Link to={`https://wa.me/?text=${encodeURIComponent(
                      `${tourData?.title} - ${shareUrl}`
                    )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 font-semibold text-sm text-gray-600 hover:text-primary-500 duration-300" ><span><FaWhatsapp size={18} /></span> Whatsapp
                    </Link>
                    <p onClick={handleCopy} className={`flex items-center gap-2 font-semibold text-sm ${copied ? 'text-primary-500' : 'text-gray-600'} hover:text-primary-500 duration-300 cursor-pointer`}><span><FiLink size={18} /></span> {copied ? "Copied!" : "Copy"}</p>
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
                    className={`transition-colors duration-300 ${isInWishlist(tourData._id) ? "text-red-500" : "text-gray-400"
                      }`}
                  />
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Gallery */}
        <section>
          <div ref={desktopFancyBoxRef} className="tp-container hidden md:grid grid-cols-12 gap-4">
            {tourData?.images?.[0] && (
              <a className="col-span-7 block" href={tourData.images[0] || ImageWaterMark} data-fancybox="gallery">
                <img
                  src={tourData.images[0] || ImageWaterMark}
                  onError={handleImageError}
                  className="w-full h-[360px] lg:h-[465px] object-cover rounded-xl"
                  alt="Tour gallery image one"
                />
              </a>
            )}
            <div className="col-span-5 space-y-4">
              {tourData?.images?.[1] && (
                <a className="block" href={tourData.images[1] || ImageWaterMark} data-fancybox="gallery">
                  <img
                    src={tourData.images[1] || ImageWaterMark}
                    onError={handleImageError}
                    className="w-full h-[172px] lg:h-[224px] object-cover rounded-xl"
                    alt="Tour gallery image two"
                  />
                </a>
              )}
              {tourData?.images?.[2] && (
                <div className="relative">
                  <a className="block" href={tourData.images[2] || ImageWaterMark} data-fancybox="gallery">
                    <img
                      src={tourData.images[2] || ImageWaterMark}
                      onError={handleImageError}
                      className="w-full h-[172px] lg:h-[224px] object-cover rounded-xl"
                      alt="Tour gallery image three"
                    />
                  </a>
                  {tourData.images.length > 3 && (
                    <span onClick={openGalleryFromStart} className="cursor-pointer inline-flex items-center gap-1 text-base font-medium text-gray-600 bg-white bg-opacity-90 py-2 px-4 rounded-full absolute right-3 bottom-3"><LuImages size={20} /> All photos</span>
                  )}
                </div>
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
          <div className="flex-1">
            <h3 className="text-2xl font-semibold text-gray-800 mb-6">Overview</h3>
            <ul className="grid sm:grid-cols-2 gap-4 content-between">
              <li className="flex gap-2 text-gray-600 font-medium">
                <span className="text-primary-600"><MdOutlineWatchLater size={22} /></span>
                <p>
                  Duration:{" "}
                  <span className="font-semibold">
                    {tourData?.startDate && tourData?.endDate ? (
                      `${getTotalDays(tourData.startDate, tourData.endDate)} Days`
                    ) : (
                      "N/A"
                    )}
                  </span>
                </p>
              </li>
              <li className="flex gap-2 text-gray-600 font-medium">
                <span className="text-primary-600"><LuNotepadText size={22} /></span>
                <p>Tour Type:{" "}<span className="font-semibold">{tourData?.tourTypeName || "N/A"}</span></p>
              </li>
              <li className="flex gap-2 text-gray-600 font-medium">
                <span className="text-primary-600"><TbUsers size={22} /></span>
                <p>On every tour:{" "}<span className="font-semibold">{tourData?.maxGuest || "N/A"} guests (max)</span></p>
              </li>
              <li className="flex gap-2 text-gray-600 font-medium">
                <span className="text-primary-600"><GrLocation size={22} /></span>
                <p>Location:{" "}<span className="font-semibold">{tourData?.location || "N/A"}</span></p>
              </li>
            </ul>

            {tourData?.description && (
              <div className="mt-6">
                <div
                  ref={contentRef}
                  style={{
                    maxHeight: isExpanded ? `${contentRef.current?.scrollHeight}px` : "150px",
                    overflow: "hidden",
                    transition: "max-height 0.5s ease",
                  }}
                >
                  <p className="text-gray-600 font-medium">{tourData.description}</p>
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
                <h3 className="text-2xl font-semibold text-gray-800 mb-5">Amenities</h3>
                <ul className="space-y-2">
                  {tourData?.amenities.map((amenitiesItem, index) =>
                    <li key={index} className="flex gap-2 text-gray-600 font-medium"><span className="text-primary-500 mt-[1px]"><PiSealCheck size={22} /></span> {amenitiesItem}</li>
                  )}
                </ul>

                <div className="border-b w-full border-gray-200 my-8"></div>
              </>
            )}

            {((tourData?.included && tourData.included.length > 0) ||
              (tourData?.excluded && tourData.excluded.length > 0)) && (
                <>
                  <h3 className="text-2xl font-semibold text-gray-800 mb-5">Includes/Excludes</h3>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <ul className="space-y-2">
                      {tourData?.included.map((includedItem, index) =>
                        <li key={index} className="flex gap-2 text-gray-800 font-medium"><span className="text-primary-500 mt-[1px]"><LuCheck size={20} /></span> {includedItem}</li>
                      )}
                    </ul>
                    <ul className="space-y-2">
                      {tourData?.excluded.map((excludedItem, index) =>
                        <li key={index} className="flex gap-2 text-gray-800 font-medium"><span className="text-red-500 mt-[1px]"><RxCross2 size={20} /></span> {excludedItem}</li>
                      )}
                    </ul>
                  </div>

                  <div className="border-b w-full border-gray-200 my-8"></div>
                </>
              )}

            <h3 className="text-2xl font-semibold text-gray-800 mb-5">Frequently asked questions</h3>
            <Accordion type="single" collapsible className="w-full space-y-3" defaultValue={String(0)}>
              {faqItems.map((item, index) => (
                <AccordionItem value={String(index)} key={index} className="py-2 px-4 border bg-gray-50 rounded-lg">
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

            <h3 className="text-2xl font-semibold text-gray-800 mb-5">Cancellation policy</h3>
            <p className="text-gray-600 font-medium">You can cancel up to 24 hours in advance of the experience for a full refund.</p>

            <div className="border-b w-full border-gray-200 my-8"></div>

            <h3 className="text-2xl font-semibold text-gray-800 mb-5">Customer reviews</h3>
            <div className="border border-gray-100 rounded-xl flex flex-col md:flex-row">
              <div className="md:w-[180px] p-5 border-b md:border-r border-gray-100">
                <h6 className="text-xl font-semibold text-gray-800 mb-2">Overall rating</h6>
                <p className="tracking-tighter flex items-center"><span className="text-primary-500 text-3xl font-semibold inline-flex items-center gap-1"><TiStarFullOutline size={28} /> 5.0</span><span className="font-semibold text-lg text-gray-800 -mb-1">/5</span></p>
                <p className="mt-1 text-gray-700">(1 review)</p>
              </div>
              <div className="p-5 flex-1">
                <p className="text-lg font-semibold mb-4">Review summary</p>
                <div className="grid sm:grid-cols-2 gap-x-5 md:gap-x-14 gap-y-3 sm:gap-y-5">
                  <div>
                    <p className="flex justify-between gap-2 text-gray-600 text-sm font-medium mb-1"><span>Guide</span> <span>5.0/5</span></p>
                    <Progress value={progress} className="w-full bg-primary-500" />
                  </div>
                  <div>
                    <p className="flex justify-between gap-2 text-gray-600 text-sm font-medium mb-1"><span>Service</span> <span>5.0/5</span></p>
                    <Progress value={progress} className="w-full bg-primary-500" />
                  </div>
                  <div>
                    <p className="flex justify-between gap-2 text-gray-600 text-sm font-medium mb-1"><span>Transportation</span> <span>5.0/5</span></p>
                    <Progress value={progress} className="w-full bg-primary-500" />
                  </div>
                  <div>
                    <p className="flex justify-between gap-2 text-gray-600 text-sm font-medium mb-1"><span>Organization</span> <span>5.0/5</span></p>
                    <Progress value={progress} className="w-full bg-primary-500" />
                  </div>
                </div>
              </div>
            </div>

            {/* User Review */}
            <div ref={reviewImageFancyBoxRef} className="mt-5 space-y-7">
              {reviews.map((review, reviewIndex) => (
                <div key={reviewIndex}>
                  <div className="flex gap-2 items-center">
                    <NotUserIcon minWidth="w-14" width="w-14" height="h-14" iconSize={30} />
                    <div>
                      <p className="font-semibold text-gray-800 text-lg">
                        {review.name}
                      </p>
                      <p className="text-sm text-gray-600">{review.date}</p>
                    </div>
                  </div>

                  <ul className="flex gap-1 mt-4 mb-3">
                    {[...Array(review.rating)].map((_, i) => (
                      <li key={i}>
                        <FaStar size={20} className="text-primary-500" />
                      </li>
                    ))}
                  </ul>

                  <p className="mt-3 mb-4 text-gray-600 font-medium">
                    {review.comment}
                  </p>

                  <div className="flex flex-wrap gap-3">
                    {review.images.map((img, imgIndex) => (
                      <a
                        key={imgIndex}
                        href={img}
                        data-fancybox={`review-${reviewIndex}`}
                        className="min-w-20 w-20 h-20"
                      >
                        <img
                          src={img}
                          alt="Review image"
                          className="w-full h-full object-cover rounded-lg"
                        />
                      </a>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Availability Check */}
          <div className="lg:min-w-[395px] lg:w-[395px]">
            <div className="shadow-[0px_5px_20px_0px_rgba(0,0,0,.05)] p-6 rounded-2xl border border-gray-200">
              <p className="text-base text-gray-700 font-medium flex justify-between"><span>from</span> <span className="inline-block px-3 py-1 bg-green-500 text-white text-sm rounded-full font-semibold">-5%</span></p>
              <p className="text-primary-500"><span className="text-[24px] font-semibold tracking-tighter">৳{tourData?.costFrom}</span><span className="text-base font-medium">/person</span></p>
              <p className="text-base text-gray-500 font-semibold line-through tracking-tighter -mt-1">৳30000</p>

              <ul>
                <li className="flex justify-between gap-2 border-t border-b border-gray-200 py-3 mt-4">
                  <span className="font-semibold text-gray-700">Date</span>
                  <Popover open={openCalendar} onOpenChange={setOpenCalendar}>
                    <PopoverTrigger asChild>
                      <Button
                        type="button"
                        id="date"
                        className="flex gap-2 w-auto h-auto text-left text-gray-700 font-semibold text-base tracking-tighter bg-transparent p-0 shadow-none hover:bg-transparent"
                      >
                        <span><LuCalendarFold size={22} /></span>
                        {date ? format(date, "MMM dd, yyyy") : "Select date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto overflow-hidden p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={date}
                        startMonth={new Date(currentYear, today.getMonth())}
                        endMonth={new Date(currentYear + 10, 11)}
                        disabled={{ before: today }}
                        onSelect={(date) => {
                          setDate(date);
                          setOpenCalendar(false);
                        }}
                      />
                    </PopoverContent>
                  </Popover>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* <div className="flex justify-between items-center  mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">{tourData?.title}</h1>
            <div className="flex gap-4 text-gray-600 mb-4">
              <span>📍 {tourData?.location}</span>
              <span>💰 From ${tourData?.costFrom}</span>
              <span>👥 Max {tourData?.maxGuest} guests</span>
            </div>
          </div>
          <div>
            <Button asChild className="tp-primary-btn h-12">
              <Link to={`/booking/${tourData?.slug}`}>Book Now</Link>
            </Button>
          </div>
        </div> */}
      </div>
    </>
  );
}