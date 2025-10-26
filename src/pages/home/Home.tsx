import CategorySlider from "./CategorySlider";
import HeroSlider from "./HeroSlider";
import ctgBg from '../../assets/images/tour_login_bg.jpg';
import DestinationSlider from "./DestinationSlider";
import { Link } from "react-router";
import WhiteSvgIcon from "@/components/shared/WhiteSvgIcon";
import { useRef, useState } from "react";

const Home = () => {
  const [progress, setProgress] = useState<number>(0);
  const prevRef = useRef<HTMLButtonElement>(null);
  const nextRef = useRef<HTMLButtonElement>(null);
  

  return (
    <>
      <HeroSlider />

      <section className="py-12 md:py-16 lg:py-20 bg-cover bg-no-repeat bg-center" style={{ backgroundImage: `url(${ctgBg})` }}>
        <div className="tp-container">
          <h4 className="section-sub-title text-center text-primary-950">Wonderful Place For You</h4>
          <h2 className="section-title text-center text-primary-950 mb-6 sm:mb-10 lg:mb-12">Tour Categories</h2>
          <CategorySlider />
        </div>
      </section>

      <section className="tp-container py-12 md:py-16 lg:py-20 flex gap-10">
        <div className="destination-left-side max-w-[500px] w-full">
          <h4 className="section-sub-title text-primary-950">Top Destination</h4>
          <h2 className="section-title text-primary-950 mb-4">Popular Destination</h2>
          <p className="text-lg font-medium text-gray-700 mb-7">From peaceful beaches to breathtaking mountains, explore our top and most loved destinations — perfect for your next unforgettable escape into nature.</p>
          <Link className="tp-primary-btn inline-flex items-center gap-3 mb-6 sm:mb-10 lg:mb-12" to="/destinations">
            All Destination
            <WhiteSvgIcon className="w-4 md:w-auto h-4 md:h-auto" />
          </Link>

          <div className="flex gap-4 mb-6">
            <button ref={prevRef} className="p-2 bg-gray-200 rounded-full hover:bg-gray-300 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button ref={nextRef} className="p-2 bg-gray-200 rounded-full hover:bg-gray-300 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
        <DestinationSlider
          setProgress={setProgress}
          prevRef={prevRef}
          nextRef={nextRef}
        />
      </section>
      <div className="w-full bg-gray-200 rounded-full h-2.5">
        <div className="bg-blue-600 h-2.5 rounded-full transition-all duration-300" style={{ width: `${progress}%` }}></div>
      </div>
    </>
  );
};

export default Home;