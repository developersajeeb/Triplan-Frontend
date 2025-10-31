import CategorySlider from "./CategorySlider";
import HeroSlider from "./HeroSlider";
import DestinationSlider from "./DestinationSlider";
import WhyUs from "./WhyUs";
import PopularDestination from "./PopularDestination";
import RecentGallery from "./RecentGallery";

const Home = () => {
  return (
    <>
      <HeroSlider />
      <CategorySlider />
      <DestinationSlider />
      <WhyUs />
      <PopularDestination />
      <RecentGallery />
    </>
  );
};

export default Home;