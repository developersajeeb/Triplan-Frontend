import { useGetAllToursQuery, useGetTourTypesQuery } from "@/redux/features/tour/tour.api";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import { useGetDivisionsQuery } from "@/redux/features/division/division.api";
import TourCard from "@/components/modules/tour/TourCard";
import { Skeleton } from "@/components/ui/skeleton";
import type { ITourPackage } from "@/types";

const PopularDestination = () => {
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
    console.log(tours);


    return (
        <section className="tp-container py-12 md:py-16 lg:py-20">
            <h4 className="section-sub-title text-primary-950 text-center">Best Recommended Places</h4>
            <h2 className="section-title text-primary-950 mb-4 text-center">Best Destinations For Everyone</h2>
            <p className="text-lg font-medium text-gray-700 mb-7 text-center max-w-3xl mx-auto">Discover handpicked destinations — from vibrant cities to serene natural wonders — blending adventure, culture, and relaxation for every traveler.</p>

            <div>
                <Swiper
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
                            <div className="rounded-[10px] border border-gray-200 bg-white shadow-[0px_4px_24px_0px_rgba(194, 194, 194, 0.25)]">
                                <Skeleton className="h-[170px] rounded-b-0" />
                                <div className="p-5">
                                    <Skeleton className="h-4 rounded-full max-w-[100px]" />
                                    <Skeleton className="h-4 rounded-full max-w-[140px] mt-2" />
                                    <Skeleton className="h-5 rounded-full max-w-[250px] mt-5" />
                                    <Skeleton className="h-5 rounded-full max-w-[200px] mt-2" />
                                </div>
                            </div>
                            <div className="rounded-[10px] border border-gray-200 bg-white shadow-[0px_4px_24px_0px_rgba(194, 194, 194, 0.25)]">
                                <Skeleton className="h-[170px] rounded-b-0" />
                                <div className="p-5">
                                    <Skeleton className="h-4 rounded-full max-w-[100px]" />
                                    <Skeleton className="h-4 rounded-full max-w-[140px] mt-2" />
                                    <Skeleton className="h-5 rounded-full max-w-[250px] mt-5" />
                                    <Skeleton className="h-5 rounded-full max-w-[200px] mt-2" />
                                </div>
                            </div>
                            <div className="rounded-[10px] border border-gray-200 bg-white shadow-[0px_4px_24px_0px_rgba(194, 194, 194, 0.25)]">
                                <Skeleton className="h-[170px] rounded-b-0" />
                                <div className="p-5">
                                    <Skeleton className="h-4 rounded-full max-w-[100px]" />
                                    <Skeleton className="h-4 rounded-full max-w-[140px] mt-2" />
                                    <Skeleton className="h-5 rounded-full max-w-[250px] mt-5" />
                                    <Skeleton className="h-5 rounded-full max-w-[200px] mt-2" />
                                </div>
                            </div>
                            <div className="rounded-[10px] border border-gray-200 bg-white shadow-[0px_4px_24px_0px_rgba(194, 194, 194, 0.25)]">
                                <Skeleton className="h-[170px] rounded-b-0" />
                                <div className="p-5">
                                    <Skeleton className="h-4 rounded-full max-w-[100px]" />
                                    <Skeleton className="h-4 rounded-full max-w-[140px] mt-2" />
                                    <Skeleton className="h-5 rounded-full max-w-[250px] mt-5" />
                                    <Skeleton className="h-5 rounded-full max-w-[200px] mt-2" />
                                </div>
                            </div>
                        </div>
                    ) : (
                        (toursData ?? []).length > 0 ? (
                            (toursData ?? []).map((tour: ITourPackage) => (
                                <SwiperSlide key={tour.slug}>
                                    <TourCard tour={tour} />
                                </SwiperSlide>
                            ))
                        ) : (
                            <p className="text-center font-medium text-xl text-gray-500">No tours available.</p> 
                        )
                    )}
                </Swiper>
            </div>
        </section>
    );
};

export default PopularDestination;