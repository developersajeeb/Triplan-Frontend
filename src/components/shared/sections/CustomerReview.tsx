import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import { FaStar } from "react-icons/fa";
import { PiQuotes } from "react-icons/pi";
import NotUserIcon from "../blocks/NotUserIcon";
import ctgBg from '@/assets/images/tour_login_bg.jpg';

const CustomerReview = () => {
    return (
        <section className="py-12 md:py-16 lg:py-20 bg-cover bg-no-repeat bg-center" style={{ backgroundImage: `url(${ctgBg})` }}>
            <div className="tp-container">
                <h4 className="section-sub-title text-primary-950 text-center">Testimonial</h4>
                <h2 className="section-title text-primary-950 mb-6 sm:mb-8 text-center">What Client Say About us</h2>

                <Swiper
                    className="swiper-pagination-dot !pb-[90px]"
                    pagination={{ clickable: true }}
                    loop
                    autoplay={{ delay: 2500, disableOnInteraction: false }}
                    slidesPerView={1}
                    spaceBetween={20}
                    modules={[Pagination]}
                    grabCursor={true}
                    breakpoints={{
                        640: {
                            slidesPerView: 2,
                        },
                        1024: {
                            slidesPerView: 3,
                        }
                    }}
                >
                    <SwiperSlide>
                        <div className="bg-primary-50 border border-primary-200 px-5 pt-5 pb-10 rounded-xl">
                            <p className="text-base font-medium text-gray-700 tracking-tight">Dream Tours is the only way to go. We had the time of our life on our trip to the Ark. The customer service was wonderful, and the staff was very helpful.</p>
                            <div className="w-full h-[1px] bg-primary-100 my-4"></div>
                            <div className="flex items-center justify-between gap-2">
                                <p className="flex items-center gap-2"><NotUserIcon minWidth="min-w-10" width="w-10" height="h-10" iconSize={20} /> <span className="text-base font-semibold text-primary-950">John Doe</span></p>
                                <ul className="flex items-center gap-1">
                                    <li><FaStar size={16} className="text-yellow-400" /></li>
                                    <li><FaStar size={16} className="text-yellow-400" /></li>
                                    <li><FaStar size={16} className="text-yellow-400" /></li>
                                    <li><FaStar size={16} className="text-yellow-400" /></li>
                                    <li><FaStar size={16} className="text-yellow-400" /></li>
                                </ul>
                            </div>

                            <div className="w-20 h-20 bg-primary-300 rounded-full flex justify-center items-center border-4 border-white absolute left-[40%] -bottom-10"><PiQuotes size={36} className="text-white" /></div>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className="bg-primary-50 border border-primary-200 px-5 pt-5 pb-10 rounded-xl">
                            <p className="text-base font-medium text-gray-700 tracking-tight">Dream Tours is the only way to go. We had the time of our life on our trip to the Ark. The customer service was wonderful, and the staff was very helpful.</p>
                            <div className="w-full h-[1px] bg-primary-100 my-4"></div>
                            <div className="flex items-center justify-between gap-2">
                                <p className="flex items-center gap-2"><NotUserIcon minWidth="min-w-10" width="w-10" height="h-10" iconSize={20} /> <span className="text-base font-semibold text-primary-950">John Doe</span></p>
                                <ul className="flex items-center gap-1">
                                    <li><FaStar size={16} className="text-yellow-400" /></li>
                                    <li><FaStar size={16} className="text-yellow-400" /></li>
                                    <li><FaStar size={16} className="text-yellow-400" /></li>
                                    <li><FaStar size={16} className="text-yellow-400" /></li>
                                    <li><FaStar size={16} className="text-yellow-400" /></li>
                                </ul>
                            </div>

                            <div className="w-20 h-20 bg-primary-300 rounded-full flex justify-center items-center border-4 border-white absolute left-[40%] -bottom-10"><PiQuotes size={36} className="text-white" /></div>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className="bg-primary-50 border border-primary-200 px-5 pt-5 pb-10 rounded-xl">
                            <p className="text-base font-medium text-gray-700 tracking-tight">Dream Tours is the only way to go. We had the time of our life on our trip to the Ark. The customer service was wonderful, and the staff was very helpful.</p>
                            <div className="w-full h-[1px] bg-primary-100 my-4"></div>
                            <div className="flex items-center justify-between gap-2">
                                <p className="flex items-center gap-2"><NotUserIcon minWidth="min-w-10" width="w-10" height="h-10" iconSize={20} /> <span className="text-base font-semibold text-primary-950">John Doe</span></p>
                                <ul className="flex items-center gap-1">
                                    <li><FaStar size={16} className="text-yellow-400" /></li>
                                    <li><FaStar size={16} className="text-yellow-400" /></li>
                                    <li><FaStar size={16} className="text-yellow-400" /></li>
                                    <li><FaStar size={16} className="text-yellow-400" /></li>
                                    <li><FaStar size={16} className="text-yellow-400" /></li>
                                </ul>
                            </div>

                            <div className="w-20 h-20 bg-primary-300 rounded-full flex justify-center items-center border-4 border-white absolute left-[40%] -bottom-10"><PiQuotes size={36} className="text-white" /></div>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className="bg-primary-50 border border-primary-200 px-5 pt-5 pb-10 rounded-xl">
                            <p className="text-base font-medium text-gray-700 tracking-tight">Dream Tours is the only way to go. We had the time of our life on our trip to the Ark. The customer service was wonderful, and the staff was very helpful.</p>
                            <div className="w-full h-[1px] bg-primary-100 my-4"></div>
                            <div className="flex items-center justify-between gap-2">
                                <p className="flex items-center gap-2"><NotUserIcon minWidth="min-w-10" width="w-10" height="h-10" iconSize={20} /> <span className="text-base font-semibold text-primary-950">John Doe</span></p>
                                <ul className="flex items-center gap-1">
                                    <li><FaStar size={16} className="text-yellow-400" /></li>
                                    <li><FaStar size={16} className="text-yellow-400" /></li>
                                    <li><FaStar size={16} className="text-yellow-400" /></li>
                                    <li><FaStar size={16} className="text-yellow-400" /></li>
                                    <li><FaStar size={16} className="text-yellow-400" /></li>
                                </ul>
                            </div>

                            <div className="w-20 h-20 bg-primary-300 rounded-full flex justify-center items-center border-4 border-white absolute left-[40%] -bottom-10"><PiQuotes size={36} className="text-white" /></div>
                        </div>
                    </SwiperSlide>
                </Swiper>
            </div>
        </section >
    );
};

export default CustomerReview;