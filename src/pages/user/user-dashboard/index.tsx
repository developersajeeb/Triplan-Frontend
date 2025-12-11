import { IoCalendarOutline, IoHeartHalfOutline, IoNotificationsOutline } from "react-icons/io5";
import { LuFolderOpen, LuTentTree, LuTimer } from "react-icons/lu";
import { TbLocationPin, TbMapPin2 } from "react-icons/tb";
import { Link } from "react-router";
import ImageWaterMark from '@/assets/images/image-watermark.webp'
import { FaLocationDot } from "react-icons/fa6";
import { BiSupport } from "react-icons/bi";

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
                    <span className="min-w-12 w-12 h-12 xl:min-w-16 xl:w-16 xl:h-16 bg-green-500 flex justify-center items-center rounded-full text-white text-[22px] xl:text-[25px]"><TbLocationPin /></span>
                    <div>
                        <p className="text-center md:text-start text-2xl font-bold text-gray-700">01</p>
                        <p className="text-center md:text-start text-base text-gray-600 font-medium">Upcoming Tours</p>
                    </div>
                </div>
                <div className="flex flex-col md:flex-row items-center gap-2 xl:gap-4 border border-gray-200 rounded-xl p-3 md:p-5">
                    <span className="min-w-12 w-12 h-12 xl:min-w-16 xl:w-16 xl:h-16 bg-red-500 flex justify-center items-center rounded-full text-white text-[22px] xl:text-[25px]"><IoHeartHalfOutline /></span>
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

                <div className="border flex flex-col sm:flex-row sm:items-center gap-3 border-gray-200 rounded-xl p-3 md:p-4 mt-5">
                    <img className="rounded-xl h-[220px] sm:h-[130px] object-cover w-full sm:max-w-48" src={ImageWaterMark} alt="Tour Image" />
                    <div>
                        <h2 className='mt-1 mb-2'><Link to={`/tours/#`} className='text-gray-800 hover:text-primary-500 text-xl font-bold cursor-pointer duration-300'>Tour name</Link> <span className="text-xs font-medium bg-blue-500 text-white px-3 py-[3px] rounded-full">Upcoming</span></h2>

                        <div>
                            <p className='text-sm text-gray-500 font-medium inline-flex gap-1 pr-3'><span><FaLocationDot size={14} className="mt-1" /></span> asdasdasd</p>
                            <p className='text-sm text-gray-500 font-medium inline-flex gap-1'><span><LuTimer size={16} className='mt-[2px]' /></span> Start: 09:30 AM</p>
                        </div>
                        <Link to={`/tours/#`} className='mt-2 text-[14px] text-center inline-block font-semibold bg-primary-900 hover:bg-primary-400 text-white hover:text-white px-4 pt-[6px] pb-2 rounded-full transition-all duration-300;'>View Details</Link>
                    </div>
                </div>
            </section>

            <section className="mt-8 grid md:grid-cols-2 gap-6">
                <div className="border border-gray-200 rounded-xl p-3 md:p-5">
                    <h2 className="text-xl font-bold text-primary-950">Quick Actions</h2>

                    <div className="grid sm:grid-cols-2 gap-3 mt-5">
                        <Link to='/tours' className="py-4 lg:py-5 pr-4 xl:pr-5 pl-5 xl:pl-6 h-28 bg-green-500 hover:bg-green-600 duration-300 text-center rounded-xl font-semibold text-white text-base flex justify-center items-center gap-2"><span><TbLocationPin size={18} /></span> Book New Tour</Link>
                        <Link to='/destinations' className="py-4 lg:py-5 pr-4 xl:pr-5 pl-5 xl:pl-6 h-28 bg-primary-500 hover:bg-primary-600 duration-300 text-center rounded-xl font-semibold text-white text-base flex justify-center items-center gap-2"><span><LuTentTree size={18} /></span> Destinations</Link>
                        <Link to='/tour-guide' className="py-4 lg:py-5 pr-4 xl:pr-5 pl-5 xl:pl-6 h-28 bg-purple-500 hover:bg-purple-600 duration-300 text-center rounded-xl font-semibold text-white text-base flex justify-center items-center gap-2"><span><TbMapPin2 size={18} /></span> Tour Guides</Link>
                        <Link to='/contact-us' className="py-4 lg:py-5 pr-4 xl:pr-5 pl-5 xl:pl-6 h-28 bg-red-500 hover:bg-red-600 duration-300 text-center rounded-xl font-semibold text-white text-base flex justify-center items-center gap-2"><span><BiSupport size={18} /></span> Support</Link>
                    </div>
                </div>
                <div className="border border-gray-200 rounded-xl">
                    <div className="flex justify-between gap-5 flex-wrap p-3 md:p-5">
                        <h2 className="text-xl font-bold text-primary-950">Notifications</h2>
                        <p><Link to="/user/my-bookings" className="tp-action-btn !h-9 !py-2 inline-flex gap-2 items-center">View All <span><LuFolderOpen size={16} /></span></Link></p>
                    </div>

                    <ul>
                        <li className="flex gap-2 px-4 py-5 border-t border-gray-200">
                            <span className="text-[22px] text-gray-500 bg-gray-300 w-12 min-w-12 h-12 rounded-full inline-flex justify-center items-center"><IoNotificationsOutline /></span>
                            <div>
                                <p className="text-base text-gray-700 font-semibold">Booking Confirmation</p>
                                <p className="text-sm">Thank you for choosing Air. Your adventure is set.</p>
                            </div>
                        </li>
                        <li className="flex gap-2 px-4 py-4 bg-primary-50 border-t border-gray-200 cursor-pointer">
                            <span className="text-[22px] text-primary-400 bg-primary-100 w-12 min-w-12 h-12 rounded-full inline-flex justify-center items-center"><IoNotificationsOutline /></span>
                            <div className="flex-1">
                                <p className="text-base font-semibold text-primary-700">Rescheduling Notification</p>
                                <p className="text-sm text-primary-700">Thank you for choosing Air. Your adventure is set.</p>
                            </div>
                            <span className="bg-primary-400 hover:bg-primary-600 cursor-pointer duration-300 w-3 h-3 rounded-full"></span>
                        </li>
                        <li className="flex gap-2 px-4 py-4 bg-primary-50 border-t border-gray-200 cursor-pointer">
                            <span className="text-[22px] text-primary-400 bg-primary-100 w-12 min-w-12 h-12 rounded-full inline-flex justify-center items-center"><IoNotificationsOutline /></span>
                            <div className="flex-1">
                                <p className="text-base font-semibold text-primary-700">Rescheduling Notification</p>
                                <p className="text-sm text-primary-700">Thank you for choosing Air. Your adventure is set.</p>
                            </div>
                            <span className="bg-primary-400 hover:bg-primary-600 cursor-pointer duration-300 w-3 h-3 rounded-full"></span>
                        </li>
                    </ul>
                </div>
            </section>
        </>
    );
};

export default UserDashboard;