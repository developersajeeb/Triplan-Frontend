import CommonAccordion from "@/components/shared/sections/CommonAccordion";

const faqItems = [
  {
    title: "What services does TripPlan offer?",
    content: "TripPlan offers complete travel management — including tour packages, hotel bookings, transport, adventure trips, and custom itinerary planning to make your journey hassle-free.",
  },
  {
    title: "Can I customize my tour package?",
    content: "Yes! You can fully personalize your trip by choosing destinations, activities, and travel dates that match your preferences and budget.",
  },
  {
    title: "Do you offer group discounts?",
    content: "Absolutely. We have special offers for group bookings, families, and corporate travelers. Contact our team for the best available deals.",
  },
  {
    title: "How do I book a trip with TripPlan?",
    content: "Simply browse your desired destination, select a package, and click “Book Now.” You can also reach out to our travel experts for personalized guidance.",
  },
  {
    title: "Is TripPlan a trusted tour operator?",
    content: "Yes — we work with verified global partners and provide transparent pricing, secure payments, and 24/7 support to ensure a reliable travel experience.",
  },
];

const HomeAccordion = () => {
    return (
        <section className="py-12 md:py-16 lg:py-20 bg-primary-50">
            <div className="max-w-[880px] mx-auto px-5">
                <h4 className="section-sub-title text-primary-950 text-center">FAQ</h4>
                <h2 className="section-title text-primary-950 mb-3 md:mb-8 text-center">Frequently Asked Questions</h2>

                <div><CommonAccordion items={faqItems} defaultOpen={0} /></div>
            </div>
        </section>
    );
};

export default HomeAccordion;