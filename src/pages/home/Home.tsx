import CategorySlider from "./CategorySlider";
import HeroSlider from "./HeroSlider";
import DestinationSlider from "./DestinationSlider";
import WhyUs from "./WhyUs";
import PopularDestination from "./PopularDestination";

const Home = () => {
  return (
    <>
      <HeroSlider />
      <CategorySlider />
      <DestinationSlider />
      <WhyUs />
      <PopularDestination />
    </>
  );
};

export default Home;