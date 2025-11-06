import CategorySlider from "./CategorySlider";
import HeroSlider from "./HeroSlider";
import DestinationSlider from "./DestinationSlider";
import WhyUs from "./WhyUs";
import RecentGallery from "./RecentGallery";
import TourCardSlider from "@/components/modules/tour/TourCardSlider";
import CustomerReview from "@/components/shared/sections/CustomerReview";
import TourGuide from "@/components/shared/sections/TourGuide";
import PartnerLogos from "@/components/shared/sections/PartnerLogos";
import NewsArticles from "./NewsArticles";
import HomeAccordion from "./HomeAccordion";

const Home = () => {
  return (
    <>
      <HeroSlider />
      <CategorySlider />
      <DestinationSlider />
      <WhyUs />
      <TourCardSlider />
      <RecentGallery />
      <TourGuide />
      <CustomerReview />
      <PartnerLogos />
      <NewsArticles />
      <HomeAccordion />
    </>
  );
};

export default Home;