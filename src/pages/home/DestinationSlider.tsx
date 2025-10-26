import { useEffect } from 'react';
import { Pagination, Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

interface Props {
  setProgress: (progress: number) => void;
  prevRef: React.RefObject<HTMLButtonElement>;
  nextRef: React.RefObject<HTMLButtonElement>;
}

const DestinationSlider = ({ setProgress, prevRef, nextRef }: Props) => {
  useEffect(() => {
    // যদি swiper ইনস্ট্যান্স এবং নেভিগেশন রেফারেন্স উপলব্ধ থাকে
    if (prevRef.current && nextRef.current) {
      // নেভিগেশন বোতামগুলোকে swiper এর সাথে সংযুক্ত করুন
      const swiperElement = document.querySelector('.destination-swiper');
      if (swiperElement && (swiperElement as any).swiper) {
        const swiper = (swiperElement as any).swiper;
        swiper.params.navigation.prevEl = prevRef.current;
        swiper.params.navigation.nextEl = nextRef.current;
        swiper.navigation.init();
        swiper.navigation.update();
      }
    }
  }, [prevRef, nextRef]);

  return (
    <div className='w-[calc(100%-500px)] bg-red-200 clip-path-[polygon(0_0,_500%_0,_500%_100%,_0%_100%)] relative overflow-visible'>
      <Swiper
        onSwiper={(swiper) => {
          swiper.on('progress', (_swiper, progress: number) => {
            setProgress(progress * 100);
          });
        }}
        slidesPerView={3}
        spaceBetween={30}
        modules={[Navigation, Pagination]}
        className="mySwiper destination-swiper"
        navigation={{
          prevEl: prevRef?.current,
          nextEl: nextRef?.current,
        }}
        pagination={{
          type: 'progressbar',
          el: '.custom-progressbar', // এটি একটি custom class, যদিও আমরা state ব্যবহার করছি
        }}
      >
        <SwiperSlide>Slide 1</SwiperSlide>
        <SwiperSlide>Slide 2</SwiperSlide>
        <SwiperSlide>Slide 3</SwiperSlide>
        <SwiperSlide>Slide 4</SwiperSlide>
        <SwiperSlide>Slide 5</SwiperSlide>
        <SwiperSlide>Slide 6</SwiperSlide>
        <SwiperSlide>Slide 7</SwiperSlide>
        <SwiperSlide>Slide 8</SwiperSlide>
        <SwiperSlide>Slide 9</SwiperSlide>
      </Swiper>
    </div>
  );
};

export default DestinationSlider;