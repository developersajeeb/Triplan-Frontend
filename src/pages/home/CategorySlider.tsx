'use client';
import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

const categories = [
  { title: 'Cruises', image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e' },
  { title: 'Hiking', image: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee' },
  { title: 'Airbirds', image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?fit=crop&w=900&q=80' },
  { title: 'Wildlife', image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?fit=crop&w=900&q=80' },
  { title: 'Walking', image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?fit=crop&w=900&q=80' },
  { title: 'Nature', image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?fit=crop&w=900&q=80' },
  { title: 'Beach', image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?fit=crop&w=900&q=80' },
  { title: 'Cruise 2', image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e' },
];

export default function CategorySlider() {
  const [activeIndex, setActiveIndex] = useState(0);

  // tweakable values
  const VISIBLE_SIDE = 5;   // left/right কতটুকু (মোট visible = 1 + 2 + 2 = 5)
  const ANGLE_STEP = 20;
  const OUTER_ANGLE = 0;
  const ARC_STRENGTH = 10;
  const H_GAP = 0;

  return (
    <div className="w-full max-w-[1300px] mx-auto py-12">
      <Swiper
        // এখানে মূল পরিবর্তন: slidesPerView=5 (ডেস্কটপ/বড় স্ক্রিনে সবসময় 5 দেখাবে)
        // loop
        slidesPerView={5}
        spaceBetween={20}
        centeredSlides={true}
        pagination={{ clickable: true }}
        breakpoints={{
          // ছোট স্ক্রিনে responsive রাখতে চাইলে:
          0: { slidesPerView: 1 },
          640: { slidesPerView: 2 },
          768: { slidesPerView: 3 },
          1024: { slidesPerView: 4 }, // >=1024px এ 5 দেখবে
        }}
        modules={[Pagination]}
        className="travel-swiper"
        onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
        onSwiper={(swiper) => setActiveIndex(swiper.activeIndex)}
      >
        {categories.map((item, index) => {
          const offset = index - activeIndex;
          const absOffset = Math.abs(offset);
          const inVisibleRange = absOffset <= VISIBLE_SIDE;

          const baseAngle = offset * ANGLE_STEP;
          const rotateY = Math.max(-OUTER_ANGLE, Math.min(OUTER_ANGLE, baseAngle));

          const translateY = inVisibleRange ? Math.pow(offset, 2) * ARC_STRENGTH : 40 + absOffset * 10;
          // ছোট/বড় স্ক্রিনে spread সামঞ্জস্য রাখার জন্য H_GAP*12 ব্যবহার করি (প্রয়োজনে পরিবর্তন করো)
          const translateX = inVisibleRange ? offset * H_GAP * 0 : offset * H_GAP * 0;

          const zIndex = inVisibleRange ? 100 - absOffset * 10 : 10;
          const opacity = inVisibleRange ? Math.max(1 - absOffset * 0.08, 0.6) : 0.25;

          const transform = `translateX(${translateX}px) translateY(${translateY}px) rotateY(${rotateY}deg)`;

          return (
            <SwiperSlide key={index}>
              <div
                className="group text-center cursor-pointer transition-transform duration-500"
                style={{
                  transform,
                  zIndex,
                  opacity,
                  willChange: 'transform, opacity',
                  pointerEvents: inVisibleRange ? 'auto' : 'none',
                }}
              >
                <div className="relative w-full h-[240px] overflow-hidden rounded-[24px] shadow-xl">
                  <img
                    src={item.image}
                    alt={item.title}
                    draggable={false}
                    className="w-full h-full object-cover rounded-[24px] transition-transform duration-500 group-hover:scale-110"
                    style={{ backfaceVisibility: 'hidden' }}
                  />
                </div>

                <h3 className="mt-4 text-[18px] font-semibold text-[#003049]">{item.title}</h3>
                <p className="text-[14px] text-gray-500">See More</p>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
}