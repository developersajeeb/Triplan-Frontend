import { BiSolidHot } from "react-icons/bi";
import { FaHeart } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { LuNotepadText } from "react-icons/lu";
import { Link } from "react-router";
import type { ITourListItemWithReview } from "@/types";
import ImageWaterMark from '@/assets/images/image-watermark.webp'
import { useWishlist } from "@/hooks/useWishlist";

interface Props {
    tour: ITourListItemWithReview;
}

const TourCardBox = ({ tour }: Props) => {
    const { isInWishlist, toggle } = useWishlist();
    const startsFromPrice = tour?.sellingPrice ?? tour?.costFrom;
    const originalPrice =
        typeof tour?.sellingPrice === "number" && tour?.sellingPrice < (tour?.costFrom ?? 0)
            ? tour.costFrom
            : undefined;
    const reviewCount = tour.reviewCount ?? 0;
    const averageRating = tour.averageRating ?? 0;

    return (
        <div className='group rounded-[10px] border border-gray-200 overflow-hidden bg-white shadow-[0px_4px_24px_0px_rgba(194, 194, 194, 0.25)]'>
            <div className='relative h-[200px] xl:h-[260px] overflow-hidden'>
                <ul className='flex gap-2 justify-between absolute left-3 top-3 right-3 z-10'>
                    <li onClick={() => toggle(tour._id)} className='bg-white shadow w-6 h-6 rounded-full flex justify-center items-center cursor-pointer'><FaHeart className={`transition-colors duration-300 ${isInWishlist(tour._id) ? "text-red-500" : "text-gray-400"}`} size={14} /></li>
                    <li className='text-xs text-white font-medium bg-primary-500 px-2 pr-3 py-1 rounded-full inline-flex items-center gap-1'><BiSolidHot size={14} /> Trending</li>
                </ul>
                <img src={tour?.images[0] || ImageWaterMark} className='h-[200px] lg:h-[260px] overflow-hidden duration-300 group-hover:scale-110 w-full rounded-t-[10px] object-cover' alt="Tour Slider" />
            </div>

            <div className='p-5 flex flex-col h-[calc(100%-200px)] xl:h-[calc(100%-260px)]'>
                <div className="flex-1">
                    {reviewCount > 0 && (
                        <p className='text-sm text-gray-600 font-medium mb-1'>
                            <span className='bg-[#FFCA18] text-[13px] text-gray-900 px-2 pt-[1px] pb-[2px] font-semibold rounded mr-[2px]'>
                                {averageRating.toFixed(1)}
                            </span>{" "}
                            <span>
                                ({reviewCount} Review{reviewCount === 1 ? "" : "s"})
                            </span>
                        </p>
                    )}
                    <h2 className='mt-2 mb-2'><Link to={`/tours/${tour?.slug}`} className='text-gray-800 hover:text-primary-500 text-xl font-bold cursor-pointer duration-300'>{tour?.title}</Link></h2>
                    <div className="flex flex-wrap gap-3">
                        <p className='text-sm text-gray-500 font-medium inline-flex gap-1'><span><FaLocationDot size={14} className="mt-1" /></span> {tour?.arrivalLocation}</p>
                        <p className='text-sm text-gray-500 font-medium inline-flex gap-1'><LuNotepadText size={14} className='mt-[2px]' /> {tour?.tourTypeName}</p>
                    </div>

                    <p className='text-gray-600 font-semibold mt-3'>
                        Starts From <span className='text-primary-400 font-bold text-xl'><span className='text-base'>৳</span>{startsFromPrice}</span>
                        {originalPrice ? (
                            <span className='text-gray-500 font-bold text-base line-through ml-2'>৳{originalPrice}</span>
                        ) : null}
                    </p>
                </div>

                <div className='w-full h-[1px] bg-gray-300 my-3'></div>
                <div className="text-end"><Link to={`/tours/${tour?.slug}`} className='text-[14px] text-center inline-block font-semibold bg-primary-900 hover:bg-primary-400 text-white hover:text-white px-5 py-2 rounded-full transition-all duration-300;'>View Details</Link></div>
            </div>
        </div>
    );
};

export default TourCardBox;