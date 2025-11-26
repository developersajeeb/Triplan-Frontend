import { LuGrid2X2 } from 'react-icons/lu';
import { RiListCheck2 } from 'react-icons/ri';
import { useGetAllToursQuery, useGetTourTypesQuery } from '@/redux/features/tour/tour.api';
import { useGetDivisionsQuery } from '@/redux/features/division/division.api';
import TourCardBox from '@/components/modules/tour/TourCardBox';
import { useSearchParams } from 'react-router';
import TourSideFilter from '@/components/modules/tour/TourSideFilter';
import { Button } from '@/components/ui/button';
import type { ITourPackage } from '@/types';
import React, { useEffect, useState } from 'react';
import { IoClose, IoFilter } from 'react-icons/io5';
import { Drawer, DrawerClose, DrawerContent, DrawerTrigger } from '@/components/ui/drawer';
import TourCardList from '@/components/modules/tour/TourCardList';
import PageBanner from '@/components/shared/sections/PageBanner';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, } from "@/components/ui/select"
import PaginationComponent from '@/components/ui/PaginationComponent';
import TourCardLoader from '@/components/shared/blocks/TourCardLoader';
import { useAppDispatch } from '@/redux/hook';
import { setMaxPrice } from '@/redux/features/tour/priceSlice';
import { DialogTitle } from '@/components/ui/dialog';


const Tours = () => {
    const dispatch = useAppDispatch();
    const [viewType, setViewType] = useState<string>("grid");
    const [searchParams, setSearchParams] = useSearchParams();
    const sortValue = searchParams.get("sort") || "newest";

    const division = searchParams.getAll("division");
    const tourType = searchParams.getAll("tourType");
    const rating = searchParams.getAll("rating");

    const minPrice = searchParams.get("minPrice") || "";
    const maxPrice = searchParams.get("maxPrice") || "";
    const search = searchParams.get("search") || "";
    const sort = searchParams.get("sort") || "newest";

    const { data: tourTypes, isLoading: isTourTypeLoading } = useGetTourTypesQuery(undefined);
    const { data: divisions, isLoading: isDivisionsLoading } = useGetDivisionsQuery(undefined);
    const queryParams: Record<string, string> = {};

    if (division?.length) queryParams.division = division.join(",");
    if (tourType?.length) queryParams.tourType = tourType.join(",");
    if (rating?.length) queryParams.rating = rating.join(",");
    if (minPrice) queryParams.minPrice = minPrice;
    if (maxPrice) queryParams.maxPrice = maxPrice;
    if (search) queryParams.search = search;
    if (sort) queryParams.sort = sort;

    const { data: tours, isLoading, isFetching } = useGetAllToursQuery({ ...queryParams });

    const toursData = tours?.data?.map((item) => ({
        ...item,
        tourTypeName: tourTypes?.data?.find((tt: { _id: string; }) => tt._id === item.tourType)?.name || "Unknown",
        divisionName: Array.isArray(divisions?.data)
            ? divisions?.data.find(d => d._id === item.division)?.name || "Unknown"
            : "Unknown"
    }));

    useEffect(() => {
        if (tours && Array.isArray(tours.data) && tours.data.length > 0) {
            const prices = tours.data.map(t => t.costFrom || 0);
            const max = Math.max(...prices);
            dispatch(setMaxPrice(max));
        }
    }, [dispatch, tours]);

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

                <div className='w-full'>
                    <div className='flex flex-wrap justify-between gap-2 mb-6'>
                        <div className='flex gap-2 items-end flex-wrap'>
                            <Drawer direction="left">
                                <DrawerTrigger asChild>
                                    <Button className='bg-transparent hover:bg-primary-100 rounded-full border border-gray-400 shadow-none text-gray-700 lg:hidden'>Filter <span><IoFilter size={18} /></span></Button>
                                </DrawerTrigger>
                                <DrawerContent className='max-w-[300px] h-full rounded-none overflow-y-auto'>
                                    <DialogTitle className='sr-only'>Filter Drawer</DialogTitle>
                                    <div className='text-end px-4 py-4 sticky top-0 w-full bg-white shadow z-50'>
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

                    {/* Tour Cards */}
                    {isLoading || isTourTypeLoading || isDivisionsLoading || isFetching ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                            {[...Array(3)].map((_, i) => (
                                <React.Fragment key={i}><TourCardLoader /></React.Fragment>
                            ))}
                        </div>
                    ) : (toursData ?? []).length > 0 ? (

                        viewType === "grid" ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                                {(toursData ?? []).map((tour: ITourPackage) => (
                                    <React.Fragment key={tour.slug}><TourCardBox tour={tour} /></React.Fragment>
                                ))}
                            </div>
                        ) : (
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
                    <div className='mt-6'>
                        <PaginationComponent
                            currentPage={tours?.meta?.page || 1}
                            totalPages={tours?.meta?.totalPages || 1}
                            onPageChange={(page) => setSearchParams({ page: String(page) })}
                        />
                    </div>
                </div>
            </section>
        </>
    );
};

export default Tours;