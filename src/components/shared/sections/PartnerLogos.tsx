import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import logo1 from '@/assets/images/partner-logos/airbnb-logo.webp'
import logo2 from '@/assets/images/partner-logos/codestack-logo.webp'
import logo3 from '@/assets/images/partner-logos/contiki-logo.webp'
import logo4 from '@/assets/images/partner-logos/corai-logo.webp'
import logo5 from '@/assets/images/partner-logos/ds-logo-black.webp'
import logo6 from '@/assets/images/partner-logos/europamundo-logo.webp'
import logo7 from '@/assets/images/partner-logos/intrepid-logo.webp'
import logo8 from '@/assets/images/partner-logos/taskup-logo.webp'
import logo9 from '@/assets/images/partner-logos/wonderful-holidays-uk.webp'

const PartnerLogos = () => {
    return (
        <section className="tp-container py-10 md:py-14 relative overflow-hidden">
            <p className="text-center font-semibold text-base text-primary-900 mb-10">Trusted by 40+ Partners Around the Globe</p>

            <Swiper
                className="logo-infinity-slider"
                modules={[Autoplay]}
                loop={true}
                allowTouchMove={false}
                speed={4000}
                autoplay={{
                    delay: 0,
                    disableOnInteraction: false,
                }}
                slidesPerView={2}
                spaceBetween={30}
                breakpoints={{
                    640: { slidesPerView: 3 },
                    767: { slidesPerView: 5 },
                    1024: { slidesPerView: 6 },
                }}
            >
                <SwiperSlide><img className="w-full max-w-[128px]" src={logo1} alt="partner logo" /></SwiperSlide>
                <SwiperSlide><img className="w-full max-w-[128px]" src={logo2} alt="partner logo" /></SwiperSlide>
                <SwiperSlide><img className="w-full max-w-[128px]" src={logo3} alt="partner logo" /></SwiperSlide>
                <SwiperSlide><img className="w-full max-w-[128px]" src={logo4} alt="partner logo" /></SwiperSlide>
                <SwiperSlide><img className="w-full max-w-[128px]" src={logo5} alt="partner logo" /></SwiperSlide>
                <SwiperSlide><img className="w-full max-w-[128px]" src={logo6} alt="partner logo" /></SwiperSlide>
                <SwiperSlide><img className="w-full max-w-[128px]" src={logo7} alt="partner logo" /></SwiperSlide>
                <SwiperSlide><img className="w-full max-w-[128px]" src={logo8} alt="partner logo" /></SwiperSlide>
                <SwiperSlide><img className="w-full max-w-[128px]" src={logo9} alt="partner logo" /></SwiperSlide>
            </Swiper>
        </section>
    );
};

export default PartnerLogos;