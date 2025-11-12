import { LuGrid2X2 } from 'react-icons/lu';
import bgImage from '../../assets/images/tour-page-img.jpg';
import { RiListCheck2 } from 'react-icons/ri';
import { useGetAllToursQuery, useGetTourTypesQuery } from '@/redux/features/tour/tour.api';
import { useGetDivisionsQuery } from '@/redux/features/division/division.api';
import TourCard from '@/components/modules/tour/TourCard';
import { useSearchParams } from 'react-router';
import TourSideFilter from '@/components/modules/tour/TourSideFilter';
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import type { ITourPackage } from '@/types';
import { IoIosArrowDown } from 'react-icons/io';
import React from 'react';
import { IoClose, IoFilter } from 'react-icons/io5';
import { Drawer, DrawerClose, DrawerContent, DrawerTrigger } from '@/components/ui/drawer';


const Tours = () => {
    const [searchParams, setSearchParams] = useSearchParams();

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

    return (
        <>
            <section className="relative bg-center bg-cover bg-no-repeat px-4 py-14" style={{ backgroundImage: `url(${bgImage})` }}>
                <div className="absolute inset-0 bg-black/50 z-0"></div>
                <h1 className='text-5xl font-bold text-white text-center z-20 relative'>Tours</h1>
            </section>
            <section>
                {/* Big search area */}
            </section>
            <section className='flex flex-col lg:flex-row gap-6 bg-[#F1F5FF] tp-big-container pt-6 pb-16'>
                {/* Filters */}
                <TourSideFilter className='hidden lg:block' />

                {/* Tour Cards */}
                <div className='w-full'>
                    <div className='flex justify-between gap-5 mb-6'>
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
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button
                                        variant="outline"
                                        className="rounded-full shadow-none border-none hover:bg-primary-500 hover:text-white focus-visible:outline-none h-8"
                                    >
                                        Sort by <span><IoIosArrowDown size={16} /></span>
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent className="w-auto">
                                    <DropdownMenuCheckboxItem
                                        checked={false}
                                        onClick={() => {
                                            searchParams.set("sort", "newest");
                                            setSearchParams(searchParams);
                                        }}
                                    >
                                        Newest
                                    </DropdownMenuCheckboxItem>
                                    <DropdownMenuCheckboxItem
                                        checked={false}
                                        onClick={() => {
                                            searchParams.set("sort", "priceLowToHigh");
                                            setSearchParams(searchParams);
                                        }}
                                    >
                                        Price: Low to High
                                    </DropdownMenuCheckboxItem>
                                    <DropdownMenuCheckboxItem
                                        checked={false}
                                        onClick={() => {
                                            searchParams.set("sort", "priceHighToLow");
                                            setSearchParams(searchParams);
                                        }}
                                    >
                                        Price: High to Low
                                    </DropdownMenuCheckboxItem>
                                </DropdownMenuContent>
                            </DropdownMenu>

                            <ul className='flex gap-2'>
                                <li><span className='inline-block cursor-pointer p-1 rounded bg-primary-500 text-white'><LuGrid2X2 size={22} /></span></li>
                                <li><span className='inline-block cursor-pointer p-1 rounded hover:bg-primary-500 hover:text-white duration-300 text-gray-800'><RiListCheck2 size={22} /></span></li>
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
                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                            {(toursData ?? []).map((tour: ITourPackage) => (
                                <React.Fragment key={tour.slug}>
                                    <TourCard tour={tour} />
                                </React.Fragment>
                            ))}
                        </div>
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