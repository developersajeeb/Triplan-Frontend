import CategorySlider from "./CategorySlider";
import HeroSlider from "./HeroSlider";
import ctgBg from '../../assets/images/tour_login_bg.jpg';
import DestinationSlider from "./DestinationSlider";

const Home = () => {
  return (
    <>
      <HeroSlider />

      <section className="py-12 md:py-16 lg:py-24 bg-cover bg-no-repeat bg-center" style={{ backgroundImage: `url(${ctgBg})` }}>
        <div className="tp-container">
          <h4 className="section-sub-title text-center text-primary-950">Wonderful Place For You</h4>
          <h2 className="section-title text-center text-primary-950 mb-6 sm:mb-10 lg:mb-12">Tour Categories</h2>
          <CategorySlider />
        </div>
      </section>

      <section className="tp-container py-12 md:py-16 lg:py-24">
        <h4 className="section-sub-title text-center text-primary-950">Top Destination</h4>
        <h2 className="section-title text-center text-primary-950 mb-6 sm:mb-10 lg:mb-12">Popular Destination</h2>
        <DestinationSlider />
      </section>
    </>
  );
};

export default Home;