import { useGetAllToursQuery, useGetTourTypesQuery } from "@/redux/features/tour/tour.api";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import { useGetDivisionsQuery } from "@/redux/features/division/division.api";
import TourCardBox from "@/components/modules/tour/TourCardBox";
import type { ITourPackage } from "@/types";
import WhiteSvgIcon from "@/components/shared/blocks/WhiteSvgIcon";
import { Link } from "react-router";
import React from "react";
import TourCardLoader from "@/components/shared/blocks/TourCardLoader";

const TourCardSlider = () => {
    const { data: tours, isLoading } = useGetAllToursQuery(undefined);
    const { data: tourTypes } = useGetTourTypesQuery(undefined);
    const { data: divisions } = useGetDivisionsQuery(undefined);
    const toursData = tours?.map((item) => ({
        ...item,
        tourTypeName: tourTypes?.data?.find((tt: { _id: string; }) => tt._id === item.tourType)?.name || "Unknown",
        divisionName: Array.isArray(divisions)
            ? divisions.find(d => d._id === item.division)?.name || "Unknown"
            : "Unknown"
    }));

    return (
        <section className="tp-container py-12 md:py-16 lg:py-20">
            <h4 className="section-sub-title text-primary-950 text-center">Best Recommended Places</h4>
            <h2 className="section-title text-primary-950 mb-2 text-center">Best Destinations For Everyone</h2>
            <p className="section-heading-paragraph mb-6 sm:mb-8 text-center max-w-3xl mx-auto">Discover handpicked destinations — from vibrant cities to serene natural wonders — blending adventure, culture, and relaxation for every traveler.</p>

            <div>
                <Swiper
                    className="swiper-pagination-dot !pb-[52px]"
                    pagination={{ clickable: true }}
                    loop
                    autoplay={{ delay: 5000, disableOnInteraction: false }}
                    slidesPerView={1}
                    spaceBetween={20}
                    modules={[Pagination]}
                    grabCursor={true}
                    breakpoints={{
                        640: {
                            slidesPerView: 2,
                        },
                        1024: {
                            slidesPerView: 3,
                        },
                        1200: {
                            slidesPerView: 4,
                        },
                    }}
                >
                    {isLoading ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
                            {[...Array(4)].map((_, i) => (
                                <React.Fragment key={i}><TourCardLoader /></React.Fragment>
                            ))}
                        </div>
                    ) : (
                        (toursData ?? []).length > 0 ? (
                            (toursData ?? []).map((tour: ITourPackage) => (
                                <SwiperSlide key={tour.slug}>
                                    <TourCardBox tour={tour} />
                                </SwiperSlide>
                            ))
                        ) : (
                            <p className="text-center font-medium text-xl text-gray-500">No tours available.</p>
                        )
                    )}
                </Swiper>
            </div>

            {(toursData ?? []).length > 0 && (
                <div className="text-center mt-2">
                    <Link
                        className="tp-primary-btn inline-flex items-center gap-3"
                        to="/destinations"
                    >
                        All Destination
                        <WhiteSvgIcon className="w-4 md:w-auto h-4 md:h-auto" />
                    </Link>
                </div>
            )}
        </section>
    );
};

export default TourCardSlider;