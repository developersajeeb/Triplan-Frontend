import { useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay, Parallax } from "swiper/modules";
import styles from "./style/hero_slider.module.scss";
import { Link } from "react-router";
import WhiteSvgIcon from "@/components/shared/blocks/WhiteSvgIcon";
import Slider1 from '../../assets/images/home-slider/tours-slider-1.webp';
import Slider2 from '../../assets/images/home-slider/tours-slider-2.webp';
import Slider3 from '../../assets/images/home-slider/tours-slider-3.webp';

const slides = [
  {
    id: 1,
    subtitle: "Get unforgettable pleasure with us",
    title: "Explore beauty of\n the whole world",
    img: Slider1,
  },
  {
    id: 2,
    subtitle: "Get unforgettable pleasure with us",
    title: " Natural Wonder\n of the world ",
    img: Slider2,
  },
  {
    id: 3,
    subtitle: "Get unforgettable pleasure with us",
    title: "Let’s make your\n best trip with us",
    img: Slider3,
  },
];

export default function HeroSlider() {
  useEffect(() => {
    document.querySelectorAll<HTMLElement>(".slide-bg-image").forEach((el) => {
      const bg = el.dataset.background;
      if (bg) el.style.backgroundImage = `url(${bg})`;
    });
  }, []);

  return (
    <section className={styles["hero-slider"]}>
      <Swiper
        modules={[Pagination, Autoplay, Parallax]}
        loop
        speed={1200}
        parallax
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        className="w-full h-full"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div
              className="flex h-full w-full items-center justify-center bg-cover bg-center text-left relative"
              style={{backgroundImage: `url(${slide.img})`}}
            >
              <div className="absolute top-0 right-0 left-0 bottom-0 inset-0 bg-black/50"></div>
              <div
                className="tp-container"
                data-swiper-parallax="300"
              >
                <h4 className="section-sub-title text-white">{slide.subtitle}</h4>
                <h2 className="mb-8 text-white font-bold leading-[1.1] whitespace-pre-line text-[34px] sm:text-[58px] md:text-[75px]">
                  {slide.title}
                </h2>
                <div
                  className="inline-flex flex-col sm:flex-row gap-4"
                  data-swiper-parallax="500"
                >
                  <Link to="/registration" className="tp-primary-btn-light flex items-center gap-3">
                    Register Now
                    <WhiteSvgIcon className="w-4 md:w-auto h-4 md:h-auto" />
                  </Link>
                  <Link to="/tours" className="group tp-transparent-white-btn flex items-center gap-3">
                    All Tours
                    <WhiteSvgIcon className="group-hover:stroke-primary-400 w-4 md:w-auto h-4 md:h-auto" />
                  </Link>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}