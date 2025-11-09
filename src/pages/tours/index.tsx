import { LuGrid2X2 } from 'react-icons/lu';
import bgImage from '../../assets/images/tour-page-img.jpg';
import { RiListCheck2 } from 'react-icons/ri';
import { useGetAllToursQuery, useGetTourTypesQuery } from '@/redux/features/tour/tour.api';
import { useGetDivisionsQuery } from '@/redux/features/division/division.api';
import TourCard from '@/components/modules/tour/TourCard';
import { useSearchParams } from 'react-router';
import React from 'react';
import TourSideFilter from '@/components/modules/tour/TourSideFilter';

const Tours = () => {
    const [searchParams] = useSearchParams();

    const division = searchParams.get("division") || undefined;
    const tourType = searchParams.get("tourType") || undefined;

    const { data: tours } = useGetAllToursQuery({ division, tourType });
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
                <TourSideFilter />

                {/* Tour Cards */}
                <div className='w-full'>
                    <div className='flex justify-between gap-5 flex-wrap mb-4'>
                        <h5 className='text-gray-800 text-base font-semibold'>1920 Tours Available</h5>

                        <ul className='flex gap-2'>
                            <li className='cursor-pointer p-1 rounded bg-primary-500 text-white'><LuGrid2X2 size={22} /></li>
                            <li className='cursor-pointer p-1 rounded hover:bg-primary-500 hover:text-white duration-300 text-gray-800'><RiListCheck2 size={22} /></li>
                        </ul>
                    </div>

                    <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6'>
                        {toursData?.map((tour) => (
                            <React.Fragment key={tour.slug}><TourCard tour={tour} /></React.Fragment>
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
};

export default Tours;