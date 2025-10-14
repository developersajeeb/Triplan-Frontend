import { useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay, Parallax } from "swiper/modules";
import styles from "./style/HeroSlider.module.scss";
import Slider1 from '../../assets/images/home-slider/tours-slider-1.jpg';
import { Link } from "react-router";
import WhiteSvgIcon from "@/components/shared/WhiteSvgIcon";

const slides = [
  {
    id: 1,
    subtitle: "Get unforgettable pleasure with us",
    title: "Explore beauty of\n the whole world",
    img: Slider1,
  },
  // {
  //   id: 2,
  //   title: "MUSIC LESSONS\nFOR EVERY AGE",
  //   text: "Learn to play and express your passion for music.",
  //   img: "https://images.unsplash.com/photo-1579003087287-997fd4d18771?auto=format&fit=crop&w=1350&q=80",
  // },
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
        modules={[Navigation, Pagination, Autoplay, Parallax]}
        loop
        speed={1200}
        parallax
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        navigation
        className="w-full h-full"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div
              className="slide-inner"
              style={{backgroundImage: `url(${slide.img})`}}
            >
              <div
                className="tp-container"
                data-swiper-parallax="300"
              >
                <h4 className="text-[40px] font-Nunito">{slide.subtitle}</h4>
                <h2 className="mb-8 text-white font-bold leading-[1.1] whitespace-pre-line text-[80px] sm:text-[40px] md:text-[75px]">
                  {slide.title}
                </h2>
                <div
                  className="flex gap-4"
                  data-swiper-parallax="500"
                >
                  <Link to="/registration" className="tp-primary-btn-light flex items-center gap-3">
                    Register Now
                    <WhiteSvgIcon className="w-4 md:w-auto h-4 md:h-auto" />
                  </Link>
                  <Link to="/tours" className="group tp-transparent-btn flex items-center gap-3">
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