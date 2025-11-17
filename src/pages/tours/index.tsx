import { LuGrid2X2 } from 'react-icons/lu';
import { RiListCheck2 } from 'react-icons/ri';
import { useGetAllToursQuery, useGetTourTypesQuery } from '@/redux/features/tour/tour.api';
import { useGetDivisionsQuery } from '@/redux/features/division/division.api';
import TourCardBox from '@/components/modules/tour/TourCardBox';
import { useSearchParams } from 'react-router';
import TourSideFilter from '@/components/modules/tour/TourSideFilter';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import type { ITourPackage } from '@/types';
import React, { useState } from 'react';
import { IoClose, IoFilter } from 'react-icons/io5';
import { Drawer, DrawerClose, DrawerContent, DrawerTrigger } from '@/components/ui/drawer';
import TourCardList from '@/components/modules/tour/TourCardList';
import PageBanner from '@/components/shared/sections/PageBanner';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, } from "@/components/ui/select"


const Tours = () => {
    const [viewType, setViewType] = useState<string>("grid");
    const [searchParams, setSearchParams] = useSearchParams();
    const sortValue = searchParams.get("sort") || "newest";

    const division = searchParams.get("division") || undefined;
    const tourType = searchParams.get("tourType") || undefined;

    const { data: tours, isLoading } = useGetAllToursQuery({ division, tourType });
    const { data: tourTypes } = useGetTourTypesQuery(undefined);
    const { data: divisions } = useGetDivisionsQuery(undefined);
    const toursData = tours?.map((item) => ({
        ...item,
        tourTypeName: tourTypes?.data?.find((tt: { _id: string; }) => tt._id === item.tourType)?.name || "Unknown",
        divisionName: Array.isArray(divisions)
            ? divisions.find(d => d._id === item.division)?.name || "Unknown"
            : "Unknown"
    }));

    const handleSortChange = (value: string) => {
        searchParams.set("sort", value);
        setSearchParams(searchParams);
    };

    const handleResetSort = () => {
        searchParams.delete("sort");
        setSearchParams(searchParams);
    };

    return (
        <>
            <PageBanner title='Tours' />
            <section className='flex flex-col lg:flex-row gap-6 bg-[#F1F5FF] tp-big-container pt-6 pb-16'>
                {/* Filters */}
                <TourSideFilter className='hidden lg:block' />

                {/* Tour Cards */}
                <div className='w-full'>
                    <div className='flex flex-wrap justify-between gap-2 mb-6'>
                        <div className='flex gap-2 items-end flex-wrap'>
                            <Drawer direction="left">
                                <DrawerTrigger asChild>
                                    <Button className='bg-transparent hover:bg-primary-100 rounded-full border border-gray-400 shadow-none text-gray-700 lg:hidden'>Filter <span><IoFilter size={18} /></span></Button>
                                </DrawerTrigger>
                                <DrawerContent className='max-w-[300px] h-full rounded-none overflow-y-auto'>
                                    <div className='text-end px-4 pb-4'>
                                        <DrawerClose asChild>
                                            <button className='inline-flex items-center gap-1 text-gray-600 font-semibold border border-gray-400 max-w-[100px] py-2 px-4 rounded-full'>Close <IoClose size={22} /></button>
                                        </DrawerClose>
                                    </div>
                                    <TourSideFilter className='pt-0 rounded-t-none' />
                                </DrawerContent>
                            </Drawer>
                            <h5 className='text-gray-800 text-base font-semibold mt-1 hidden lg:block'>1920 Tours Available</h5>
                        </div>

                        <div className='flex gap-3'>
                            <Select value={sortValue} onValueChange={handleSortChange}>
                                <SelectTrigger className="w-[160px] rounded-full shadow-none h-[34px] bg-white focus:ring-0 border border-primary-200">
                                    <SelectValue placeholder="Sort by" />
                                </SelectTrigger>

                                <SelectContent>

                                    <SelectItem value="newest">Newest</SelectItem>
                                    <SelectItem value="priceLowToHigh">Price: Low to High</SelectItem>
                                    <SelectItem value="priceHighToLow">Price: High to Low</SelectItem>

                                    {/* ---- FOOTER RESET BUTTON ---- */}
                                    <div className="border-t mt-2 pt-2 px-2 pb-1">
                                        <button
                                            onClick={handleResetSort}
                                            className="w-full text-center py-2 text-sm font-medium rounded-md bg-red-100 hover:bg-red-200 text-red-700"
                                        >
                                            Reset
                                        </button>
                                    </div>

                                </SelectContent>
                            </Select>

                            <ul className='flex gap-2'>
                                <li>
                                    <span
                                        onClick={() => setViewType("grid")}
                                        className={`inline-block cursor-pointer p-1 rounded ${viewType === "grid"
                                            ? "bg-primary-500 text-white"
                                            : "hover:bg-primary-500 hover:text-white duration-300 text-gray-800"
                                            }`}
                                    >
                                        <LuGrid2X2 size={22} />
                                    </span>
                                </li>

                                <li>
                                    <span
                                        onClick={() => setViewType("list")}
                                        className={`inline-block cursor-pointer p-1 rounded ${viewType === "list"
                                            ? "bg-primary-500 text-white"
                                            : "hover:bg-primary-500 hover:text-white duration-300 text-gray-800"
                                            }`}
                                    >
                                        <RiListCheck2 size={22} />
                                    </span>
                                </li>
                            </ul>
                        </div>
                    </div>

                    {isLoading ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                            {[...Array(3)].map((_, i) => (
                                <div
                                    key={i}
                                    className="rounded-[10px] border border-gray-200 bg-white"
                                >
                                    <Skeleton className="h-[170px] rounded-b-0" />
                                    <div className="p-5">
                                        <Skeleton className="h-4 rounded-full max-w-[100px]" />
                                        <Skeleton className="h-4 rounded-full max-w-[140px] mt-2" />
                                        <Skeleton className="h-5 rounded-full max-w-[250px] mt-5" />
                                        <Skeleton className="h-5 rounded-full max-w-[200px] mt-2" />
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (toursData ?? []).length > 0 ? (

                        viewType === "grid" ? (
                            // GRID VIEW
                            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                                {(toursData ?? []).map((tour: ITourPackage) => (
                                    <React.Fragment key={tour.slug}><TourCardBox tour={tour} /></React.Fragment>
                                ))}
                            </div>
                        ) : (
                            // LIST VIEW
                            <div className="flex flex-col gap-4">
                                {(toursData ?? []).map((tour: ITourPackage) => (
                                    <TourCardList key={tour.slug} tour={tour} />
                                ))}
                            </div>
                        )

                    ) : (
                        <p className="text-center font-medium text-xl text-gray-500">
                            No tours available.
                        </p>
                    )}
                </div>
            </section>
        </>
    );
};

export default Tours;