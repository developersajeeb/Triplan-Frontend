import { BiSolidHot } from "react-icons/bi";
import { FaHeart } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { HiOutlineUsers } from "react-icons/hi2";
import { LuNotepadText } from "react-icons/lu";
import { TbCalendarClock } from "react-icons/tb";
import { Link } from "react-router";
import type { ITourPackage } from "@/types";
import ImageWaterMark from '@/assets/images/image-watermark.webp'

interface Props {
    tour: ITourPackage;
}


const TourCard = ({ tour }: Props) => {
    return (
        <div className='group rounded-[10px] border border-gray-200 overflow-hidden bg-white shadow-[0px_4px_24px_0px_rgba(194, 194, 194, 0.25)]'>
            <div className='relative h-[200px] overflow-hidden'>
                <ul className='flex gap-2 justify-between absolute left-3 top-3 right-3 z-10'>
                    <li className='bg-white shadow w-6 h-6 rounded-full flex justify-center items-center cursor-pointer'><FaHeart className='text-gray-400' size={14} /></li>
                    <li className='text-xs text-white font-medium bg-primary-500 px-2 pr-3 py-1 rounded-full inline-flex items-center gap-1'><BiSolidHot size={14} /> Trending</li>
                </ul>
                <img src={tour?.images[0] || ImageWaterMark} className='h-[200px] overflow-hidden duration-300 group-hover:scale-110 w-full rounded-t-[10px] object-cover' alt="Tour Slider" />
            </div>

            <div className='p-5'>
                <p className='text-sm text-gray-600 font-medium mb-1'><span className='bg-[#FFCA18] text-[13px] text-gray-900 px-2 pt-[1px] pb-[2px] font-semibold rounded mr-[2px]'>4.8</span> <span className='hover:underline cursor-pointer duration-300'>(180 Reviews)</span></p>
                <p className='text-sm text-gray-800 font-semibold flex gap-1'><LuNotepadText className='text-primary-500 pt-[2px]' size={18} /> {tour?.tourTypeName}</p>

                <h2 className='mt-2 mb-2'><Link to={tour?.slug} className='text-gray-800 hover:text-primary-500 text-xl font-bold cursor-pointer duration-300'>{tour?.title}</Link></h2>
                <div>
                    <p className='text-sm text-gray-500 font-medium inline-flex gap-1 pr-3'><span><FaLocationDot size={14} className="mt-1" /></span> {tour?.arrivalLocation + ", " + tour?.divisionName}</p>
                    <p className='text-sm text-gray-500 font-medium inline-flex gap-1'><span><HiOutlineUsers size={16} className='mt-[2px]' /></span> {tour?.maxGuest} Guests</p>
                </div>

                <p className='text-gray-600 font-semibold mt-3'>Starts From <span className='text-primary-400 font-bold text-xl'><span className='text-base'>৳</span>{tour?.costFrom}</span> <span className='text-gray-500 font-bold text-xl line-through'>$789</span></p>

                <div className='w-full h-[1px] bg-gray-300 my-3'></div>

                <div className='flex justify-between items-center gap-2'>
                    <p className='text-sm text-gray-700 font-semibold flex gap-1'><TbCalendarClock className='pt-[1px] mr-[2px]' size={19} /> 4 Day, 3 Night</p>
                    <div className='w-[1px] h-8 bg-gray-300'></div>
                    <div><Link to={`/tours/${tour?.slug}`} className='text-[14px] text-center inline-block font-semibold bg-primary-900 hover:bg-primary-400 text-white hover:text-white px-5 py-2 rounded-full transition-all duration-300;'>View Details</Link></div>
                </div>
            </div>
        </div>
    );
};

export default TourCard;