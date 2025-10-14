'use client';
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

const categories = [
  {
    title: 'Cruises',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e',
  },
  {
    title: 'Hiking',
    image: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee',
  },
  {
    title: 'Airbirds',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?fit=crop&w=900&q=80',
  },
  {
    title: 'Wildlife',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?fit=crop&w=900&q=80',
  },
  {
    title: 'Walking',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?fit=crop&w=900&q=80',
  },
  {
    title: 'Walking',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?fit=crop&w=900&q=80',
  },
  {
    title: 'Walking',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?fit=crop&w=900&q=80',
  },
  {
    title: 'Wildlife',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?fit=crop&w=900&q=80',
  },
  {
    title: 'Cruises',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e',
  },
  {
    title: 'Airbirds',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?fit=crop&w=900&q=80',
  },
];

const CategorySlider = () => {
  return (
    <div className="w-full max-w-[1300px] mx-auto py-12">
      <Swiper
        slidesPerView={1.3}
        spaceBetween={20}
        pagination={{ clickable: true }}
        breakpoints={{
          640: { slidesPerView: 2.3 },
          768: { slidesPerView: 3.3 },
          1024: { slidesPerView: 4.3 },
          1280: { slidesPerView: 5 },
        }}
        modules={[Pagination]}
        className="travel-swiper"
      >
        {categories.map((item, index) => (
          <SwiperSlide key={index}>
            <div
              className={`group text-center cursor-pointer transition-transform duration-500 hover:-translate-y-2`}
            >
              <div className="relative w-full h-[240px] overflow-hidden rounded-[24px] shadow-xl">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover rounded-[24px] transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              <h3 className="mt-4 text-[18px] font-semibold text-[#003049]">{item.title}</h3>
              <p className="text-[14px] text-gray-500">See More</p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default CategorySlider;
