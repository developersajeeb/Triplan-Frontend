import { IoNotificationsOutline } from "react-icons/io5";

const Notifications = () => {
    return (
        <>
            <h2 className="text-xl font-bold text-primary-950 mb-4">Notifications</h2>
            <ul className="space-y-4">
                <li className="flex gap-2 px-4 py-5 border border-gray-200 rounded-xl">
                    <span className="text-[22px] text-gray-500 bg-gray-300 w-12 min-w-12 h-12 rounded-full inline-flex justify-center items-center"><IoNotificationsOutline /></span>
                    <div>
                        <p className="text-base text-gray-700 font-semibold">Booking Confirmation</p>
                        <p className="text-sm">Thank you for choosing Air. Your adventure is set.</p>
                    </div>
                </li>
                <li className="flex gap-2 px-4 py-4 rounded-xl bg-primary-50 border border-gray-200 cursor-pointer">
                    <span className="text-[22px] text-primary-400 bg-primary-100 w-12 min-w-12 h-12 rounded-full inline-flex justify-center items-center"><IoNotificationsOutline /></span>
                    <div className="flex-1">
                        <p className="text-base font-semibold text-primary-700">Rescheduling Notification</p>
                        <p className="text-sm text-primary-700">Thank you for choosing Air. Your adventure is set.</p>
                    </div>
                    <span className="bg-primary-400 hover:bg-primary-600 cursor-pointer duration-300 w-3 h-3 rounded-full"></span>
                </li>
                <li className="flex gap-2 px-4 py-4 rounded-xl bg-primary-50 border border-gray-200 cursor-pointer">
                    <span className="text-[22px] text-primary-400 bg-primary-100 w-12 min-w-12 h-12 rounded-full inline-flex justify-center items-center"><IoNotificationsOutline /></span>
                    <div className="flex-1">
                        <p className="text-base font-semibold text-primary-700">Rescheduling Notification</p>
                        <p className="text-sm text-primary-700">Thank you for choosing Air. Your adventure is set.</p>
                    </div>
                    <span className="bg-primary-400 hover:bg-primary-600 cursor-pointer duration-300 w-3 h-3 rounded-full"></span>
                </li>
            </ul>
        </>
    );
};

export default Notifications;