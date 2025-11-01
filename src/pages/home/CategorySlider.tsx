'use client';
import { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import styles from './style/category_slider.module.scss';
import ctgBg from '@/assets/images/tour_login_bg.jpg';

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
  const middleIndex = Math.floor(categories.length / 2);
  const [activeIndex, setActiveIndex] = useState(middleIndex);

  const VISIBLE_SIDE = 5;
  const ANGLE_STEP = 20;
  const OUTER_ANGLE = 0;
  const ARC_STRENGTH = 10;
  const H_GAP = 0;

  return (
    <section className="py-12 md:py-16 lg:py-20 bg-cover bg-no-repeat bg-center" style={{ backgroundImage: `url(${ctgBg})` }}>
      <div className={styles["tp-ctg-slider"]}>
        <div className="tp-container">
          <h4 className="section-sub-title text-center text-primary-950">Wonderful Place For You</h4>
          <h2 className="section-title text-center text-primary-950 mb-6 sm:mb-10 lg:mb-12">Tour Categories</h2>
          <Swiper
            slidesPerView={5}
            spaceBetween={20}
            centeredSlides={true}
            pagination={{ clickable: true }}
            initialSlide={middleIndex}
            breakpoints={{
              0: { slidesPerView: 1 },
              640: { slidesPerView: 2 },
              768: { slidesPerView: 3 },
              1024: { slidesPerView: 5 },
            }}
            modules={[Pagination]}
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
              const translateX = inVisibleRange ? offset * H_GAP * 0 : offset * H_GAP * 0;

              const zIndex = inVisibleRange ? 100 - absOffset * 10 : 10;
              const opacity = inVisibleRange ? Math.max(1 - absOffset * 0.08, 0.6) : 0.25;

              const transform = `translateX(${translateX}px) translateY(${translateY}px) rotateY(${rotateY}deg)`;

              return (
                <SwiperSlide key={index} className='pb-20'>
                  <div
                    className="group text-center transition-transform duration-500"
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

                    <h3 className="mt-4 text-[20px] font-semibold text-primary-900 hover:text-primary-400 duration-300 cursor-pointer">{item.title}</h3>
                    <p className="text-[14px] font-medium text-primary-900 cursor-pointer">See More</p>
                  </div>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>
      </div>
    </section>
  );
}