import PageBanner from "@/components/shared/sections/PageBanner";
import OurStory from "./OurStory";
import Achievements from "./Achievements";

const About = () => {
    return (
        <>
            <PageBanner title="About Us" />
            <OurStory />
            <Achievements />
        </>
    );
};

export default About;