import PageBanner from "@/components/shared/sections/PageBanner";

const sections = [
    {
        title: "1. Acceptance of Terms",
        content: [
            "By accessing or using the TriPlan website, mobile application, or any related services (collectively, the \"Platform\"), you agree to be bound by these Terms of Service and our Privacy Policy. If you do not agree with any part of these terms, you must not use our Platform.",
            "These Terms constitute a legally binding agreement between you (\"User\") and TriPlan (\"we\", \"us\", or \"our\"). We reserve the right to update or modify these Terms at any time without prior notice. Your continued use of the Platform following any changes constitutes your acceptance of the new Terms.",
        ],
    },
    {
        title: "2. Use of the Platform",
        content: [
            "You must be at least 18 years old to use our Platform. By using TriPlan, you represent and warrant that you meet this age requirement and have the legal capacity to enter into a binding agreement.",
            "You agree to use the Platform only for lawful purposes and in a manner that does not infringe upon the rights of others or restrict their use of the Platform.",
            "You must not use the Platform to transmit any unsolicited or unauthorized advertising or promotional material, engage in any conduct that is abusive, harassing, threatening, or otherwise objectionable, or attempt to gain unauthorized access to any part of the Platform.",
            "We reserve the right to suspend or terminate your access to the Platform at any time, without notice, for conduct that we believe violates these Terms or is harmful to other users, us, third parties, or the public.",
        ],
    },
    {
        title: "3. Account Registration",
        content: [
            "To access certain features of the Platform, you may be required to create an account. You agree to provide accurate, current, and complete information during registration and to keep your account information updated.",
            "You are responsible for safeguarding your account password and for all activities that occur under your account. You must immediately notify TriPlan of any unauthorized use of your account or any other breach of security.",
            "You may not create an account using a false identity or impersonate any other person. TriPlan reserves the right to refuse registration or cancel accounts at its sole discretion.",
            "Each user may maintain only one active account. Creating multiple accounts to circumvent suspensions, bans, or other restrictions is prohibited.",
        ],
    },
    {
        title: "4. Bookings and Payments",
        content: [
            "All tour bookings made through the Platform are subject to availability and confirmation by the respective tour operator or guide. A booking is only confirmed once you receive a written confirmation email from TriPlan.",
            "Prices displayed on the Platform are in Bangladeshi Taka (BDT) unless otherwise stated. All applicable taxes and fees will be displayed during the checkout process before you complete your booking.",
            "Payments are processed through secure third-party payment gateways. By submitting payment information, you authorize TriPlan to charge the specified amount to your chosen payment method.",
            "TriPlan is not responsible for any additional charges imposed by your bank or payment provider, including foreign transaction fees or currency conversion charges.",
            "In the event of a pricing error, TriPlan reserves the right to cancel or modify any affected bookings and notify you of the correction. You will be given the option to rebook at the correct price or receive a full refund.",
        ],
    },
    {
        title: "5. Cancellations and Refunds",
        content: [
            "Cancellation policies vary depending on the specific tour, package, or service booked. The applicable cancellation policy will be clearly stated on the tour listing page and in your booking confirmation.",
            "General Cancellation Policy: Cancellations made more than 14 days before the departure date are eligible for a full refund minus a 5% processing fee. Cancellations made 7–14 days before departure are eligible for a 50% refund. Cancellations made within 7 days of the departure date are non-refundable.",
            "Refunds, where applicable, will be credited to the original payment method within 7–10 business days.",
            "TriPlan reserves the right to cancel any tour due to insufficient bookings, unsafe conditions, force majeure events, or other unforeseen circumstances. In such cases, a full refund will be provided.",
            "No-shows (failure to appear at the departure point without prior notification) are non-refundable.",
        ],
    },
    {
        title: "6. Tour Conduct and Responsibilities",
        content: [
            "Participants are expected to behave respectfully toward tour guides, other travelers, local communities, and the natural environment. TriPlan and its tour operators reserve the right to remove any participant from a tour for disruptive, unsafe, or disrespectful behavior without refund.",
            "You are responsible for ensuring that you meet any health, fitness, or document requirements specific to the tour you book. TriPlan is not liable for denied participation due to failure to meet such requirements.",
            "Some tours may involve physical activities with inherent risks. By booking such tours, you acknowledge these risks and agree to follow all safety instructions provided by your tour guide.",
            "You are responsible for arranging adequate travel insurance to cover medical expenses, trip cancellations, and personal liability. TriPlan strongly recommends all travelers carry comprehensive travel insurance.",
        ],
    },
    {
        title: "7. Intellectual Property",
        content: [
            "All content available on the Platform, including but not limited to text, graphics, logos, images, audio clips, videos, and software, is the property of TriPlan or its content suppliers and is protected by applicable intellectual property laws.",
            "You are granted a limited, non-exclusive, non-transferable license to access and use the Platform for personal, non-commercial purposes only. You may not reproduce, distribute, modify, or create derivative works from any content without our prior written consent.",
            "User-submitted content (such as reviews, photos, and comments) remains your property, but by submitting it you grant TriPlan a worldwide, royalty-free license to use, display, reproduce, and distribute that content on the Platform and in marketing materials.",
        ],
    },
    {
        title: "8. Third-Party Services",
        content: [
            "The Platform may contain links to third-party websites, applications, or services that are not owned or controlled by TriPlan. We have no control over and assume no responsibility for the content, privacy policies, or practices of any third-party services.",
            "Some tours or packages may involve services provided by third-party operators, hotels, transport providers, or activity vendors. TriPlan acts as an intermediary and is not liable for the acts, omissions, or default of such third parties.",
            "Your interactions with third-party services, including any transactions or disputes, are solely between you and the third party.",
        ],
    },
    {
        title: "9. Limitation of Liability",
        content: [
            "To the fullest extent permitted by law, TriPlan and its officers, directors, employees, and agents shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of the Platform or services.",
            "TriPlan's total liability to you for any claim arising from or related to these Terms or the Platform shall not exceed the total amount paid by you to TriPlan in the six (6) months preceding the claim.",
            "TriPlan is not responsible for any loss or damage resulting from force majeure events, including natural disasters, pandemics, government actions, strikes, or other events beyond our reasonable control.",
            "We do not guarantee that the Platform will be uninterrupted, error-free, or free of viruses or other harmful components.",
        ],
    },
    {
        title: "10. Disclaimer of Warranties",
        content: [
            "The Platform and all services are provided on an \"as is\" and \"as available\" basis without any warranties of any kind, either express or implied, including but not limited to implied warranties of merchantability, fitness for a particular purpose, or non-infringement.",
            "TriPlan does not warrant that the information on the Platform is accurate, complete, reliable, current, or error-free. Tour descriptions, photos, itineraries, and pricing are provided for general informational purposes and may be subject to change.",
        ],
    },
    {
        title: "11. Governing Law and Dispute Resolution",
        content: [
            "These Terms shall be governed by and construed in accordance with the laws of Bangladesh, without regard to its conflict of law provisions.",
            "Any dispute, controversy, or claim arising out of or relating to these Terms or the Platform shall first be attempted to be resolved through good-faith negotiation between the parties.",
            "If a dispute cannot be resolved through negotiation within 30 days, it shall be submitted to binding arbitration in Dhaka, Bangladesh, under the rules of the Bangladesh International Arbitration Centre (BIAC).",
            "Notwithstanding the above, either party may seek injunctive or other equitable relief in any court of competent jurisdiction to prevent irreparable harm.",
        ],
    },
    {
        title: "12. Changes to Terms",
        content: [
            "TriPlan reserves the right to revise these Terms of Service at any time. When we make material changes, we will update the \"Last Updated\" date at the top of this page and, where appropriate, notify you via email or an in-platform notification.",
            "Your continued use of the Platform after any changes are posted means you accept the revised Terms. If you do not agree to the updated Terms, you must stop using the Platform.",
        ],
    },
    {
        title: "13. Contact Us",
        content: [
            "If you have any questions, concerns, or feedback regarding these Terms of Service, please reach out to us:",
            "Email: legal@triplan.com",
            "Phone: +880 1700-000000",
            "Address: House 12, Road 5, Gulshan-1, Dhaka 1212, Bangladesh",
            "Our support team is available Sunday through Thursday, 9:00 AM – 6:00 PM (BST).",
        ],
    },
];

const TermsOfService = () => {
    return (
        <>
            <PageBanner title="Terms of Service" />
            <section className="tp-container py-12 md:py-16 lg:py-20">
                <div className="max-w-4xl mx-auto">
                    <div className="mb-10">
                        <p className="text-gray-500 text-sm mb-3">Last Updated: May 18, 2026</p>
                        <p className="text-gray-600 text-base leading-relaxed">
                            Welcome to <span className="font-semibold text-gray-800">TriPlan</span>. These Terms of Service govern your access to and use of our platform, services, and content. By using TriPlan, you agree to comply with and be bound by these Terms. Please read them carefully before using our services.
                        </p>
                    </div>

                    <div className="space-y-10">
                        {sections.map((section, index) => (
                            <div key={index}>
                                <h2 className="text-xl md:text-2xl font-semibold text-gray-800 mb-4">
                                    {section.title}
                                </h2>
                                <ul className="space-y-3">
                                    {section.content.map((item, i) => (
                                        <li key={i} className="text-gray-600 leading-relaxed text-base flex gap-2">
                                            {section.content.length > 1 && i > 0 ? (
                                                <>
                                                    <span className="mt-2 shrink-0 w-1.5 h-1.5 rounded-full bg-primary"></span>
                                                    <span>{item}</span>
                                                </>
                                            ) : (
                                                <span>{item}</span>
                                            )}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
};

export default TermsOfService;
