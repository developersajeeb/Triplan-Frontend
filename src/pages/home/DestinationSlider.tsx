import { Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import styles from './style/destination_slider.module.scss';
import { Link } from 'react-router';
import WhiteSvgIcon from '@/components/shared/WhiteSvgIcon';

const DestinationSlider = () => {
  const sliderData = [
    {
      image: "https://images.unsplash.com/photo-1587222318667-31212ce2828d?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1170",
      city: "Cox’s Bazar",
      totalListings: 320,
    },
    {
      image: "https://images.unsplash.com/photo-1639330484340-38edb3d8ee9d?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=735",
      city: "Sajek Valley",
      totalListings: 180,
    },
    {
      image: "https://images.unsplash.com/photo-1624635451380-2711aabe6460?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1170",
      city: "Sylhet",
      totalListings: 250,
    },
    {
      image: "https://images.unsplash.com/photo-1683491184388-7e8ebb14ac31?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=764",
      city: "Saint Martin’s Island",
      totalListings: 95,
    },
    {
      image: "https://plus.unsplash.com/premium_photo-1668611366479-cd5d2440d6a8?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8QmFuZGFyYmFufGVufDB8fDB8fHww&auto=format&fit=crop&q=60&w=600",
      city: "Bandarban",
      totalListings: 210,
    },
  ];

  return (
    <section className="overflow-hidden">
      <div className="tp-container relative py-12 md:py-16 lg:py-20 flex flex-col lg:flex-row gap-10">
        <div className="destination-left-side max-w-[500px] w-full">
          <h4 className="section-sub-title text-primary-950">Top Destination</h4>
          <h2 className="section-title text-primary-950 mb-4">Popular Destination</h2>
          <p className="text-lg font-medium text-gray-700 mb-7">From peaceful beaches to breathtaking mountains, explore our top and most loved destinations — perfect for your next unforgettable escape into nature.</p>
          <Link className="tp-primary-btn inline-flex items-center gap-3" to="/destinations">
            All Destination
            <WhiteSvgIcon className="w-4 md:w-auto h-4 md:h-auto" />
          </Link>
        </div>
        <div className='lg:w-[calc(100%-500px)]'>
          <Swiper
            pagination={{
              type: 'progressbar',
            }}
            className={styles["destination-swiper"]}
            slidesPerView={1}
            spaceBetween={20}
            modules={[Pagination]}
            freeMode={true}
            grabCursor={true}
            breakpoints={{
              640: {
                slidesPerView: 2.3,
              },
              1024: {
                slidesPerView: 1.5,
              },
              1200: {
                slidesPerView: 2,
              },
            }}
          >
            {sliderData.map((item, index) => (
              <SwiperSlide className='bg-no-repeat bg-cover p-5 rounded-2xl gap-2 justify-between !flex !flex-col relative overflow-hidden !h-[420px]' key={index} style={{ backgroundImage: `url(${item?.image})` }}>
                <div className='absolute top-0 right-0 left-0 bottom-0 inset-0 bg-black/30 z-0'></div>
                <div className='z-10'>
                  <p className='text-white font-medium'>{item?.totalListings} Listings</p>
                  <p className='text-2xl text-white font-semibold'>{item?.city}</p>
                </div>
                <div className='z-10'>
                  <Link to='/#' className='group tp-transparent-btn !text-sm !px-6 !py-3 inline-flex items-center gap-3'>
                    Explore
                    <WhiteSvgIcon className="group-hover:stroke-primary-400 w-4 md:w-auto h-4 md:h-auto" />
                  </Link>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
};

export default DestinationSlider;