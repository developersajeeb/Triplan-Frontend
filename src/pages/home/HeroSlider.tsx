"use client";

import { useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay, Parallax } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "./style/HeroSlider.scss"; // custom SCSS styling
import { Button } from "@/components/ui/button"; // shadcn button (optional)
import { ChevronRight } from "lucide-react";

const slides = [
  {
    id: 1,
    title: "GUITAR CLASSES\nFOR KIDS",
    text: "Want to see your kid become more expressive?",
    img: "https://images.unsplash.com/photo-1578934191836-ff5f608c2228?auto=format&fit=crop&w=1349&q=80",
  },
  {
    id: 2,
    title: "MUSIC LESSONS\nFOR EVERY AGE",
    text: "Learn to play and express your passion for music.",
    img: "https://images.unsplash.com/photo-1579003087287-997fd4d18771?auto=format&fit=crop&w=1350&q=80",
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
    <section className="hero-slider hero-style relative">
      <Swiper
        modules={[Navigation, Pagination, Autoplay, Parallax]}
        loop
        speed={1000}
        parallax
        autoplay={{ delay: 6500, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        navigation
        className="w-full h-full"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div
              className="slide-inner slide-bg-image"
              data-background={slide.img}
            >
              <div className="container mx-auto px-4" data-swiper-parallax="300">
                <div className="slide-title mb-6">
                  <h2 className="text-white font-semibold text-[80px] leading-[1.1] whitespace-pre-line md:text-[60px] sm:text-[40px]">
                    {slide.title}
                  </h2>
                </div>

                <div className="slide-text mb-6" data-swiper-parallax="400">
                  <p className="text-white/90 text-2xl md:text-xl sm:text-base">
                    {slide.text}
                  </p>
                </div>

                <div
                  className="slide-btns flex gap-4"
                  data-swiper-parallax="500"
                >
                  <Button className="bg-white text-[#2b3b95] hover:bg-[#2b3b95] hover:text-white text-lg px-8 py-3 rounded">
                    Register now
                  </Button>
                  <Button
                    variant="ghost"
                    className="text-white text-base uppercase flex items-center gap-2 hover:text-gray-300"
                  >
                    <ChevronRight size={20} />
                    Get Info
                  </Button>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}