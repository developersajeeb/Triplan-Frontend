import { Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import styles from "./style/destination_slider.module.scss";
import { Link } from "react-router";
import WhiteSvgIcon from "@/components/shared/blocks/WhiteSvgIcon";
import { useEffect, useRef } from "react";
import { useGetDivisionsQuery } from "@/redux/features/division/division.api";
import type { IDivision } from "@/types/division.type";
import { Skeleton } from "@/components/ui/skeleton";
import DestinationCard from "@/components/modules/destination/DestinationCard";

const DestinationSlider = () => {
  const { data: divisions, isLoading } = useGetDivisionsQuery(undefined);
  const sliderRef = useRef<HTMLDivElement | null>(null);
  const dragTextRef = useRef<HTMLSpanElement | null>(null);

  useEffect(() => {
    const slider = sliderRef.current;
    const dragText = dragTextRef.current;
    if (!slider || !dragText) return;

    let isInside = false;
    let targetX = 0,
      targetY = 0;
    let currentX = 0,
      currentY = 0;
    let animationFrame: number;

    const updatePosition = () => {
      // smooth follow (lerp)
      currentX += (targetX - currentX) * 0.15;
      currentY += (targetY - currentY) * 0.15;

      dragText.style.transform = `translate(${currentX}px, ${currentY}px)`;
      animationFrame = requestAnimationFrame(updatePosition);
    };

    const handleMove = (e: MouseEvent) => {
      if (!isInside) return;
      const rect = slider.getBoundingClientRect();
      targetX = e.clientX - rect.left;
      targetY = e.clientY - rect.top;
    };

    const handleEnter = () => {
      isInside = true;
      dragText.classList.add("visible");
    };

    const handleLeave = () => {
      isInside = false;
      dragText.classList.remove("visible");
    };

    slider.addEventListener("mouseenter", handleEnter);
    slider.addEventListener("mouseleave", handleLeave);
    slider.addEventListener("mousemove", handleMove);
    document.addEventListener("mousemove", handleMove);

    animationFrame = requestAnimationFrame(updatePosition);

    return () => {
      cancelAnimationFrame(animationFrame);
      slider.removeEventListener("mouseenter", handleEnter);
      slider.removeEventListener("mouseleave", handleLeave);
      slider.removeEventListener("mousemove", handleMove);
      document.removeEventListener("mousemove", handleMove);
    };
  }, []);

  return (
    <section className="overflow-hidden">
      <div className="tp-container relative py-12 md:py-16 lg:py-20 flex flex-col lg:flex-row gap-10">
        <div className="destination-left-side max-w-[500px] w-full">
          <h4 className="section-sub-title text-primary-950">
            Top Destination
          </h4>
          <h2 className="section-title text-primary-950 mb-4">
            Popular Destination
          </h2>
          <p className="section-heading-paragraph mb-7">
            From peaceful beaches to breathtaking mountains, explore our top and
            most loved destinations — perfect for your next unforgettable escape
            into nature.
          </p>
          <Link
            className="tp-primary-btn inline-flex items-center gap-3"
            to="/destinations"
          >
            All Destination
            <WhiteSvgIcon className="w-4 md:w-auto h-4 md:h-auto" />
          </Link>
        </div>
        <div className="lg:w-[calc(100%-500px)] relative" ref={sliderRef}>
          <Swiper
            pagination={{
              type: "progressbar",
            }}
            onTouchMove={(_swiper, e) => {
              const dragText = dragTextRef.current;
              const slider = sliderRef.current;
              if (!dragText || !slider) return;
              const rect = slider.getBoundingClientRect();
              const x = (e as TouchEvent).touches
                ? (e as TouchEvent).touches[0].clientX - rect.left
                : (e as MouseEvent).clientX - rect.left;
              const y = (e as TouchEvent).touches
                ? (e as TouchEvent).touches[0].clientY - rect.top
                : (e as MouseEvent).clientY - rect.top;
              dragText.style.transform = `translate(${x}px, ${y}px)`;
            }}
            className={styles["destination-swiper"]}
            slidesPerView={1}
            spaceBetween={20}
            modules={[Pagination]}
            freeMode={true}
            grabCursor={true}
            breakpoints={{
              640: {
                slidesPerView: 2.3,
              },
              1024: {
                slidesPerView: 1.5,
              },
              1200: {
                slidesPerView: 2,
              },
            }}
          >
            {isLoading ? (
              [...Array(3)].map((_, index) => (
                <SwiperSlide key={index}>
                  <Skeleton className="h-[420px] rounded-2xl"></Skeleton>
                </SwiperSlide>
              ))
            ) : (
               divisions?.data?.map((item: IDivision) => (
                <SwiperSlide key={item?._id} >
                  <DestinationCard item={item} />
                </SwiperSlide>
              ))
            )}
          </Swiper>

          <span
            ref={dragTextRef}
            className="drag-text absolute pointer-events-none text-white text-base bg-primary-400/40 backdrop-blur w-20 font-medium h-20 rounded-full flex justify-center items-center"
          >
            {"<"}Drag{">"}
          </span>
        </div>
      </div>
    </section>
  );
};

export default DestinationSlider;