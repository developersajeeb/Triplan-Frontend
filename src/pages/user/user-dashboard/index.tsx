import { IoCalendarOutline, IoHeartHalfOutline } from "react-icons/io5";
import { LuFolderOpen, LuNotepadText, LuTimer } from "react-icons/lu";
import { TbLocationPin } from "react-icons/tb";
import { Link } from "react-router";
import ImageWaterMark from '@/assets/images/image-watermark.webp'
import { FaLocationDot } from "react-icons/fa6";

const UserDashboard = () => {
    return (
        <>
            <section className="grid sm:grid-cols-3 gap-4 sm:gap-6">
                <div className="flex flex-col md:flex-row items-center gap-2 xl:gap-4 border border-gray-200 rounded-xl p-3 md:p-5">
                    <span className="min-w-12 w-12 h-12 xl:min-w-16 xl:w-16 xl:h-16 bg-primary-500 flex justify-center items-center rounded-full text-white text-[22px] xl:text-[25px]"><IoCalendarOutline /></span>
                    <div>
                        <p className="text-center md:text-start text-2xl font-bold text-gray-700">04</p>
                        <p className="text-center md:text-start text-base text-gray-600 font-medium">Total Bookings</p>
                    </div>
                </div>
                <div className="flex flex-col md:flex-row items-center gap-2 xl:gap-4 border border-gray-200 rounded-xl p-3 md:p-5">
                    <span className="min-w-12 w-12 h-12 xl:min-w-16 xl:w-16 xl:h-16 bg-primary-500 flex justify-center items-center rounded-full text-white text-[22px] xl:text-[25px]"><TbLocationPin /></span>
                    <div>
                        <p className="text-center md:text-start text-2xl font-bold text-gray-700">01</p>
                        <p className="text-center md:text-start text-base text-gray-600 font-medium">Upcoming Tours</p>
                    </div>
                </div>
                <div className="flex flex-col md:flex-row items-center gap-2 xl:gap-4 border border-gray-200 rounded-xl p-3 md:p-5">
                    <span className="min-w-12 w-12 h-12 xl:min-w-16 xl:w-16 xl:h-16 bg-primary-500 flex justify-center items-center rounded-full text-white text-[22px] xl:text-[25px]"><IoHeartHalfOutline /></span>
                    <div>
                        <p className="text-center md:text-start text-2xl font-bold text-gray-700">10</p>
                        <p className="text-center md:text-start text-base text-gray-600 font-medium">Wishlist Items</p>
                    </div>
                </div>
            </section>

            <section className="mt-6 border border-gray-200 rounded-xl p-3 md:p-5">
                <div className="flex justify-between gap-5 flex-wrap">
                    <h2 className="text-xl font-bold text-primary-950">Recent Bookings</h2>
                    <p><Link to="/user/my-bookings" className="tp-action-btn !h-9 !py-2 inline-flex gap-2 items-center">View All <span><LuFolderOpen size={16} /></span></Link></p>
                </div>

                <div className="border flex items-center gap-3 border-gray-200 rounded-xl p-3 md:p-4 mt-5">
                    <img className="rounded-xl h-[100px] object-cover max-w-40" src={ImageWaterMark} alt="Tour Image" />
                    <div className="">
                        <p className='text-sm text-gray-800 font-semibold flex gap-1'><LuNotepadText className='text-primary-500 pt-[2px]' size={18} /> Type name</p>
                        <h2 className='mt-1 mb-2'><Link to={`/tours/#`} className='text-gray-800 hover:text-primary-500 text-xl font-bold cursor-pointer duration-300'>Tour name</Link></h2>

                        <div>
                            <p className='text-sm text-gray-500 font-medium inline-flex gap-1 pr-3'><span><FaLocationDot size={14} className="mt-1" /></span> asdasdasd</p>
                            <p className='text-sm text-gray-500 font-medium inline-flex gap-1'><span><LuTimer size={16} className='mt-[2px]' /></span> Start: 09:30 AM</p>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default UserDashboard;