import CategorySlider from "./CategorySlider";
import HeroSlider from "./HeroSlider";
import ctgBg from '../../assets/images/tour_login_bg.jpg';
import DestinationSlider from "./DestinationSlider";
import { Link } from "react-router";
import WhiteSvgIcon from "@/components/shared/WhiteSvgIcon";

const Home = () => {
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
        </div>
        <DestinationSlider />
      </section>
    </>
  );
};

export default Home;