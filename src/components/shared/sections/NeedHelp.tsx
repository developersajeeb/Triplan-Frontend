import { PiChatsCircle, PiPhoneCall } from "react-icons/pi";
import { Link } from "react-router";
import { BsCalendar2Check } from "react-icons/bs";

const NeedHelp = () => {
    return (
        <section className="py-12 md:py-16 lg:py-20 tp-container">
            <h4 className="section-sub-title text-primary-950 text-center">We’re here to help.</h4>
            <h2 className="section-title text-primary-950 mb-3 md:mb-8 text-center">Not sure which tour to pick?</h2>

            <div className="grid md:grid-cols-3 gap-5 lg:gap-8">
                <div className="border border-primary-100 p-6 rounded-2xl">
                    <PiChatsCircle size={38} className="text-primary-500" />
                    <h6 className="text-xl font-semibold mt-5 mb-3 text-gray-800">Chat online</h6>
                    <p className="text-gray-700 font-medium text-base mb-6">Chat instantly with us during our normal hours, or leave a message and we’ll get back to you ASAP.</p>
                    <Link to='#' className="font-extrabold text-primary-500 hover:text-primary-700 underline underline-offset-4 duration-300">Chat now</Link>
                </div>
                <div className="border border-primary-100 p-6 rounded-2xl">
                    <BsCalendar2Check size={34} className="text-primary-500" />
                    <h6 className="text-xl font-semibold mt-5 mb-3 text-gray-800">Schedule a call</h6>
                    <p className="text-gray-700 font-medium text-base mb-6">Chat instantly with us during our normal hours, or leave a message and we’ll get back to you ASAP.</p>
                    <Link to='#' className="font-extrabold text-primary-500 hover:text-primary-700 underline underline-offset-4 duration-300">Schedule now</Link>
                </div>
                <div className="border border-primary-100 p-6 rounded-2xl">
                    <PiPhoneCall size={38} className="text-primary-500" />
                    <h6 className="text-xl font-semibold mt-5 mb-3 text-gray-800">Call us</h6>
                    <p className="text-gray-700 font-medium text-base mb-6">Chat instantly with us during our normal hours, or leave a message and we’ll get back to you ASAP.</p>
                    <Link to='#' className="font-extrabold text-primary-500 hover:text-primary-700 underline underline-offset-4 duration-300">Call now</Link>
                </div>
            </div>
        </section>
    );
};

export default NeedHelp;