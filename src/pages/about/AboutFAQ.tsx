import CommonAccordion from '@/components/shared/sections/CommonAccordion';

const faqItems = [
    {
        title: "What is triPlan?",
        content: "triPlan is a smart travel platform that helps you discover, plan, and book your dream trips across Bangladesh with just a few clicks.",
    },
    {
        title: "How does triPlan make travel planning easier?",
        content: "We bring together trusted tour packages, real-time information, and expert guides — so you can focus on enjoying the journey while we handle the details.",
    },
    {
        title: "Are the tour packages customizable?",
        content: "Yes! You can customize your tour plan by selecting destinations, accommodation types, and activities that match your preferences and budget.",
    },
    {
        title: "Is triPlan suitable for group or family trips?",
        content: "Absolutely. We offer a variety of packages for couples, families, friends, and corporate groups — ensuring comfort and memorable experiences for everyone.",
    },
    {
        title: "How can I contact TriPlan for support?",
        content: "You can reach out via our Contact page, email, or social media channels anytime. Our support team is available to assist you 24/7.",
    },
];

const AboutFAQ = () => {
    return (
        <section className="py-12 md:py-16 lg:py-20 bg-primary-50">
            <div className="max-w-[880px] mx-auto px-5">
                <h4 className="section-sub-title text-primary-950 text-center">FAQ</h4>
                <h2 className="section-title text-primary-950 mb-3 md:mb-8 text-center">Frequently Asked Questions</h2>

                <CommonAccordion items={faqItems} defaultOpen={0} />
            </div>
        </section>
    );
};

export default AboutFAQ;