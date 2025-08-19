import { LuGrid2X2, LuNotepadText } from 'react-icons/lu';
import bgImage from '../../assets/images/tour-page-img.jpg';
import { RiListCheck2 } from 'react-icons/ri';
import { FaHeart } from 'react-icons/fa';
import { BiSolidHot } from "react-icons/bi";
import { Link, useSearchParams } from 'react-router';
import { FaLocationDot } from "react-icons/fa6";
import { HiOutlineUsers } from "react-icons/hi2";
import { TbCalendarClock } from 'react-icons/tb';
import { useGetAllToursQuery, useGetTourTypesQuery } from '@/redux/features/tour/tour.api';
import { useGetDivisionsQuery } from '@/redux/features/division/division.api';

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

    console.log(toursData);


    return (
        <>
            <section className="relative bg-center bg-cover bg-no-repeat px-4 py-14" style={{ backgroundImage: `url(${bgImage})` }}>
                <div className="absolute inset-0 bg-black/50 z-0"></div>
                <h1 className='text-5xl font-bold text-white text-center z-20 relative'>Tours</h1>
            </section>
            <section>
                {/* Big search area */}
            </section>
            <section className='flex flex-col lg:flex-row gap-6 bg-[#F1F5FF] tp-container pt-6 pb-16'>
                {/* Filters */}
                <div className='w-full lg:w-[350px] bg-white rounded-xl border border-gray-200 shadow-[0px_4px_24px_0px_rgba(194, 194, 194, 0.25)]'>
                    <div className='flex justify-between items-center px-5 py-4'>
                        <h2 className='text-gray-800 text-xl font-bold'>Filters</h2>
                        <button className='text-sm font-semibold text-primary-400'>Reset</button>
                    </div>
                </div>

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
                            <div key={tour.slug} className='rounded-[10px] overflow-hidden bg-white shadow-[0px_4px_24px_0px_rgba(194, 194, 194, 0.25)]'>
                                <div className='relative'>
                                    <ul className='flex gap-2 justify-between absolute left-3 top-3 right-3'>
                                        <li className='bg-white shadow w-6 h-6 rounded-full flex justify-center items-center cursor-pointer'><FaHeart className='text-gray-400' size={14} /></li>
                                        <li className='text-xs text-white font-medium bg-primary-500 px-2 pr-3 py-1 rounded-full inline-flex items-center gap-1'><BiSolidHot size={14} /> Trending</li>
                                    </ul>
                                    <img src={bgImage} className='h-[224px] w-full rounded-t-[10px]' alt="Tour Slider" />
                                </div>

                                <div className='p-5'>
                                    <div className='flex justify-between gap-2'>
                                        <p className='text-sm text-gray-800 font-semibold flex gap-1 w-full max-w-[150px]'><LuNotepadText className='text-primary-500 pt-1' size={16} /> {tour?.tourTypeName}</p>
                                        <div className='w-[1px] h-5 bg-gray-300'></div>
                                        <p className='text-sm text-gray-600 font-medium w-full max-w-[150px] text-end'><span className='bg-[#FFCA18] text-[13px] text-gray-900 px-2 pt-[1px] pb-[2px] font-semibold rounded mr-1'>4.8</span> <span className='hover:underline cursor-pointer duration-300'>(180 Reviews)</span></p>
                                    </div>

                                    <h2 className='mt-3 mb-1'><Link to={`${tour?.slug}`} className='text-gray-800 hover:text-primary-500 text-xl font-bold cursor-pointer duration-300'>{tour?.title}</Link></h2>
                                    <p className='text-base text-gray-500 font-medium flex gap-1'><span><FaLocationDot size={20} className='pt-1' /></span> {tour?.arrivalLocation +", "+ tour?.divisionName}</p>
                                    <p className='text-base text-gray-500 font-medium flex gap-1 mt-1'><span><HiOutlineUsers size={20} className='pt-[2px]' /></span> {tour?.maxGuest} Guests</p>

                                    <p className='text-gray-600 font-semibold mt-3'>Starts From <span className='text-primary-400 font-bold text-xl'><span className='text-base'>৳</span>{tour?.costFrom}</span> <span className='text-gray-500 font-bold text-xl line-through'>$789</span></p>

                                    <div className='w-full h-[1px] bg-gray-300 my-3'></div>

                                    <div className='flex justify-between items-center gap-2'>
                                        <p className='text-sm text-gray-700 font-semibold flex gap-1 w-full max-w-[150px] h-full'><TbCalendarClock className='pt-[1px] mr-[2px]' size={19} /> 4 Day,3 Night</p>
                                        <div className='w-[1px] h-8 bg-gray-300'></div>
                                        <div className='text-end w-full max-w-[150px]'><Link to={`${tour?.slug}`} className='text-[14px] inline-block font-semibold bg-primary-900 hover:bg-primary-400 text-white hover:text-white px-5 py-2 rounded-full transition duration-300;'>View Details</Link></div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
};

export default Tours;