import PageBanner from "@/components/shared/sections/PageBanner";

const sections = [
    {
        title: "1. Information We Collect",
        content: [
            "When you use TriPlan, we collect information you provide directly to us, such as when you create an account, book a tour, contact our support team, or otherwise interact with our services.",
            "Personal Information: Name, email address, phone number, billing address, and payment details when you register or make a booking.",
            "Usage Data: Pages visited, features used, search queries, clicks, and time spent on the platform, collected automatically via cookies and similar technologies.",
            "Device Information: IP address, browser type, operating system, and device identifiers to ensure compatibility and security.",
            "Location Data: With your permission, we may collect precise or approximate location data to suggest nearby tours and destinations.",
        ],
    },
    {
        title: "2. How We Use Your Information",
        content: [
            "We use the information we collect to provide, maintain, and improve our services, process transactions, and send you related information including booking confirmations and invoices.",
            "To personalize your experience — such as recommending tours based on your browsing history and preferences.",
            "To communicate with you about promotions, upcoming events, and other news about products and services offered by TriPlan (you may opt out at any time).",
            "To monitor and analyze trends and usage to improve the functionality and user experience of our platform.",
            "To detect, investigate, and prevent fraudulent transactions and other illegal activities, and to protect the rights and property of TriPlan and others.",
        ],
    },
    {
        title: "3. Sharing of Information",
        content: [
            "We do not sell, trade, or rent your personal identification information to third parties. We may share generic aggregated demographic information not linked to any personal identification information regarding visitors and users with our business partners and trusted affiliates.",
            "Service Providers: We may share your information with third-party vendors and service providers that perform services on our behalf, such as payment processing, data analysis, email delivery, hosting services, customer service, and marketing assistance.",
            "Tour Operators & Guides: When you make a booking, relevant details (name, contact, booking info) are shared with the respective tour operator or guide to facilitate your experience.",
            "Legal Requirements: We may disclose your information if required to do so by law or in the good-faith belief that such action is necessary to comply with a legal obligation.",
        ],
    },
    {
        title: "4. Cookies and Tracking Technologies",
        content: [
            "TriPlan uses cookies and similar tracking technologies to track activity on our platform and hold certain information. Cookies are files with a small amount of data that are sent to your browser from a website and stored on your device.",
            "Essential Cookies: Necessary for the website to function properly. They enable core functionality such as security, network management, and account access.",
            "Analytics Cookies: Help us understand how visitors interact with our website by collecting and reporting information anonymously.",
            "Marketing Cookies: Used to track visitors across websites to display relevant advertisements.",
            "You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. However, if you do not accept cookies, some portions of our platform may not function properly.",
        ],
    },
    {
        title: "5. Data Security",
        content: [
            "We implement a variety of security measures to maintain the safety of your personal information. Your personal information is contained behind secured networks and is only accessible by a limited number of persons who have special access rights to such systems.",
            "All sensitive information you supply is encrypted via Secure Socket Layer (SSL) technology. We implement appropriate technical and organizational measures to protect your data against unauthorized access, alteration, disclosure, or destruction.",
            "Despite our best efforts, no method of transmission over the Internet or method of electronic storage is 100% secure. We cannot guarantee absolute security, but we are committed to protecting your information.",
        ],
    },
    {
        title: "6. Data Retention",
        content: [
            "We retain personal information for as long as necessary to fulfill the purposes outlined in this Privacy Policy, unless a longer retention period is required or permitted by law.",
            "Account information is retained for the duration of your account's existence. If you delete your account, we will delete or anonymize your personal data within 30 days, except where we are required to retain it for legal, regulatory, or legitimate business purposes.",
            "Booking and transaction records may be retained for up to 7 years for accounting and tax compliance purposes.",
        ],
    },
    {
        title: "7. Your Rights and Choices",
        content: [
            "Depending on your location, you may have certain rights regarding your personal information under applicable data protection laws.",
            "Access & Correction: You have the right to access the personal information we hold about you and request corrections if it is inaccurate or incomplete.",
            "Deletion: You may request deletion of your personal data. We will honor such requests subject to our retention obligations.",
            "Portability: You have the right to receive a copy of your data in a structured, machine-readable format.",
            "Opt-Out: You may opt out of receiving promotional communications from us by following the unsubscribe instructions in those messages or by contacting us directly.",
            "To exercise any of these rights, please contact us at privacy@triplan.com.",
        ],
    },
    {
        title: "8. Children's Privacy",
        content: [
            "Our services are not directed to children under the age of 13. We do not knowingly collect personal information from children under 13. If you are a parent or guardian and believe your child has provided us with personal information, please contact us.",
            "If we discover that a child under 13 has provided us with personal information, we will promptly delete it from our systems.",
        ],
    },
    {
        title: "9. Third-Party Links",
        content: [
            "Our platform may contain links to third-party websites, apps, or services that are not operated by us. If you click on a third-party link, you will be directed to that third party's site. We strongly advise you to review the Privacy Policy of every site you visit.",
            "We have no control over and assume no responsibility for the content, privacy policies, or practices of any third-party sites or services.",
        ],
    },
    {
        title: "10. Changes to This Privacy Policy",
        content: [
            "We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the 'Last Updated' date.",
            "You are advised to review this Privacy Policy periodically for any changes. Changes to this Privacy Policy are effective when they are posted on this page. Continued use of our services after changes are posted constitutes your acceptance of the revised policy.",
        ],
    },
    {
        title: "11. Contact Us",
        content: [
            "If you have any questions about this Privacy Policy or our data practices, please contact us:",
            "Email: privacy@triplan.com",
            "Phone: +880 1700-000000",
            "Address: House 12, Road 5, Gulshan-1, Dhaka 1212, Bangladesh",
            "We will respond to your inquiry within 5–7 business days.",
        ],
    },
];

const PrivacyPolicy = () => {
    return (
        <>
            <PageBanner title="Privacy Policy" />
            <section className="tp-container py-12 md:py-16 lg:py-20">
                <div className="max-w-4xl mx-auto">
                    <div className="mb-10">
                        <p className="text-gray-500 text-sm mb-3">Last Updated: May 18, 2026</p>
                        <p className="text-gray-600 text-base leading-relaxed">
                            Welcome to <span className="font-semibold text-gray-800">TriPlan</span>. We are committed to protecting your personal information and your right to privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our services. Please read this policy carefully. If you disagree with its terms, please discontinue use of our platform.
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

export default PrivacyPolicy;
