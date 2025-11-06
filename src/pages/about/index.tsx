import PageBanner from "@/components/shared/sections/PageBanner";
import OurStory from "./OurStory";
import Achievements from "./Achievements";
import CustomerReview from "@/components/shared/sections/CustomerReview";
import AboutFAQ from "./AboutFAQ";
import PartnerLogos from "@/components/shared/sections/PartnerLogos";
import NeedHelp from "@/components/shared/sections/NeedHelp";

const About = () => {
    return (
        <>
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