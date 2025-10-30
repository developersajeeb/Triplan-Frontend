import { BiSolidHot } from "react-icons/bi";
import { FaHeart } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { HiOutlineUsers } from "react-icons/hi2";
import { LuNotepadText } from "react-icons/lu";
import { TbCalendarClock } from "react-icons/tb";
import { Link } from "react-router";
import type { ITourPackage } from "@/types";
import ImageWaterMark from '../../../assets/images/image-watermark.webp'

interface Props {
    tour: ITourPackage;
}


const TourCard = ({tour}: Props) => {
    return (
        <div className='rounded-[10px] overflow-hidden bg-white shadow-[0px_4px_24px_0px_rgba(194, 194, 194, 0.25)]'>
            <div className='relative'>
                <ul className='flex gap-2 justify-between absolute left-3 top-3 right-3'>
                    <li className='bg-white shadow w-6 h-6 rounded-full flex justify-center items-center cursor-pointer'><FaHeart className='text-gray-400' size={14} /></li>
                    <li className='text-xs text-white font-medium bg-primary-500 px-2 pr-3 py-1 rounded-full inline-flex items-center gap-1'><BiSolidHot size={14} /> Trending</li>
                </ul>
                <img src={ImageWaterMark} className='h-[224px] w-full rounded-t-[10px]' alt="Tour Slider" />
            </div>

            <div className='p-5'>
                <div className='flex justify-between gap-2'>
                    <p className='text-sm text-gray-800 font-semibold flex gap-1 w-full max-w-[150px]'><LuNotepadText className='text-primary-500 pt-1' size={16} /> {tour?.tourTypeName}</p>
                    <div className='w-[1px] h-5 bg-gray-300'></div>
                    <p className='text-sm text-gray-600 font-medium w-full max-w-[150px] text-end'><span className='bg-[#FFCA18] text-[13px] text-gray-900 px-2 pt-[1px] pb-[2px] font-semibold rounded mr-1'>4.8</span> <span className='hover:underline cursor-pointer duration-300'>(180 Reviews)</span></p>
                </div>

                <h2 className='mt-3 mb-1'><Link to={tour?.slug} className='text-gray-800 hover:text-primary-500 text-xl font-bold cursor-pointer duration-300'>{tour?.title}</Link></h2>
                <p className='text-base text-gray-500 font-medium flex gap-1'><span><FaLocationDot size={20} className='pt-1' /></span> {tour?.arrivalLocation + ", " + tour?.divisionName}</p>
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
    );
};

export default TourCard;