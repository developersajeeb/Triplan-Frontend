import PageBanner from "@/components/shared/sections/PageBanner";
import OurStory from "./OurStory";
import Achievements from "./Achievements";
import CustomerReview from "@/components/shared/sections/CustomerReview";
import AboutFAQ from "./AboutFAQ";
import PartnerLogos from "@/components/shared/sections/PartnerLogos";
import NeedHelp from "@/components/shared/sections/NeedHelp";
import CommonMetadata from "@/components/utilities/CommonMetadata";
import TriPlanBanner from "@/assets/images/seo/triplan-banner.webp";
import JsonLd from "@/components/utilities/JsonLd";

const About = () => {
    return (
        <>
            <CommonMetadata
                title="About Us – Learn More About triplan"
                description="Discover the story behind triplan — our mission, achievements, values, and why thousands of travelers trust us for the best tour plans worldwide."
                featureImage={TriPlanBanner}
                canonicalUrl="https://triplan.developersajeeb.com/about-us"
            />
            <JsonLd
                type="WebPage"
                data={{
                    name: "About triplan",
                    url: "https://triplan.developersajeeb.com/about-us",
                    description:
                        "Learn about triplan’s mission, company values, achievements, story, and commitment to providing top-quality travel planning services.",
                    image: TriPlanBanner,
                }}
            />

            <PageBanner title="About Us" />
            <OurStory />
            <Achievements />
            <CustomerReview />
            <PartnerLogos />
            <AboutFAQ />
            <NeedHelp />
        </>
    );
};

export default About;