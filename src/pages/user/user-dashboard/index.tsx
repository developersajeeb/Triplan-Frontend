import { IoCalendarOutline, IoHeartHalfOutline } from "react-icons/io5";
import { TbLocationPin } from "react-icons/tb";
import { Link } from "react-router";

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
                    <h2 className="text-xl font-bold text-primary-950">Upcoming Tours</h2>
                    <p><Link to="/user/my-bookings" className="tp-action-btn !h-9 !py-2 block">View All</Link></p>
                </div>

                <div className="border border-gray-200 rounded-xl p-3 md:p-5 mt-5"></div>
            </section>
        </>
    );
};

export default UserDashboard;