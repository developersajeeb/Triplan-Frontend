import CategorySlider from "./CategorySlider";
import HeroSlider from "./HeroSlider";
import DestinationSlider from "./DestinationSlider";
import WhyUs from "./WhyUs";
import RecentGallery from "./RecentGallery";
import TourCardSlider from "@/components/modules/tour/TourCardSlider";
import CustomerReview from "@/components/shared/sections/CustomerReview";
import TourGuide from "@/components/modules/tourGuide/TourGuide";
import PartnerLogos from "@/components/shared/sections/PartnerLogos";
import NewsArticles from "./NewsArticles";
import HomeAccordion from "./HomeAccordion";
import JsonLd from "@/components/utilities/JsonLd";
import CommonMetadata from "@/components/utilities/CommonMetadata";
import TriPlanBanner from "@/assets/images/seo/triplan-banner.webp";

const Home = () => {
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "TriPlan",
    "url": "https://triplan.developersajeeb.com",
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://triplan.developersajeeb.com/search?query={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  };

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "TriPlan",
    "url": "https://triplan.developersajeeb.com",
    "logo": "https://triplan.developersajeeb.com/logo.png",
    "sameAs": [
      "https://www.facebook.com/triplan",
      "https://www.instagram.com/triplan",
      "https://twitter.com/triplan"
    ]
  };

  return (
    <>
      <CommonMetadata
        title="triPlan – Your tour and travel manager"
        description="Explore the best tours, destinations, and travel packages with triPlan."
        featureImage={TriPlanBanner}
        canonicalUrl="https://triplan.developersajeeb.com/"
      />

      <JsonLd data={websiteSchema} />
      <JsonLd data={organizationSchema} />

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