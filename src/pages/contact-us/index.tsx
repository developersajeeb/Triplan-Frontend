import ContactUsForm from "@/components/shared/sections/ContactUsForm";
import PageBanner from "@/components/shared/sections/PageBanner";
import { Link } from "react-router";
import { HiOutlineMail } from "react-icons/hi";
import { FiPhoneCall } from "react-icons/fi";
import { GrLocation } from "react-icons/gr";
import TriPlanBanner from "@/assets/images/seo/triplan-banner.webp";
import CommonMetadata from "@/components/utilities/CommonMetadata";
import JsonLd from "@/components/utilities/JsonLd";

const ContactUs = () => {
    const contactPageSchema = {
        "@context": "https://schema.org",
        "@type": "WebPage",
        name: "Contact Us",
        url: "https://triplan.developersajeeb.com/contact-us",
        description: "Get in touch with triplan support team via email, phone, or visit our New York office."
    };
    return (
        <>
            <JsonLd data={contactPageSchema} />
            <CommonMetadata
                title="Contact Us – Get in Touch with triplan Support"
                description="Have questions or need assistance? Reach out to triplan via email, phone, or visit us at our New York office. Our support team is ready to help."
                featureImage={TriPlanBanner}
                canonicalUrl="https://triplan.developersajeeb.com/contact"
            />

            <PageBanner title="Contact Us" />
            <section className="py-12 md:py-16 lg:py-20 bg-white">
                <div className="grid md:grid-cols-2 gap-6 md:gap-8 tp-container">
                    <div><ContactUsForm /></div>
                    <div>
                        <h2 className="text-2xl md:text-3xl font-semibold mb-3 tracking-tight text-primary-950">Reach Out to Our Support Team</h2>
                        <p className="section-heading-paragraph !text-base">Got a question, need advice, or looking for help? Our knowledgeable team is here to assist you every step of the way. We’re just a message or call away, ready to provide the guidance you need.</p>

                        <ul className="mt-6">
                            <li className="flex items-center gap-3">
                                <span className="bg-primary-200 text-primary-600 min-w-11 w-11 h-11 flex items-center justify-center rounded-full"><HiOutlineMail size={24} /></span>
                                <div>
                                    <p className="text-sm text-gray-500 font-medium">Email Address</p>
                                    <p className="text-base text-gray-800 hover:text-primary-500 duration-300 font-semibold"><Link to="mailto:info@triplan.com" className="break-all">info@triplan.com</Link></p>
                                </div>
                            </li>

                            <div className="my-5 h-[1px] w-full bg-gray-300"></div>

                            <li className="flex items-center gap-3">
                                <span className="bg-primary-200 text-primary-600 min-w-11 w-11 h-11 flex items-center justify-center rounded-full"><FiPhoneCall size={24} /></span>
                                <div>
                                    <p className="text-sm text-gray-500 font-medium">Phone Number</p>
                                    <p className="text-base text-gray-800 hover:text-primary-500 duration-300 font-semibold"><Link to="tel:01743370840" className="break-all">+8801743370840</Link></p>
                                </div>
                            </li>

                            <div className="my-5 h-[1px] w-full bg-gray-300"></div>

                            <li className="flex items-center gap-3">
                                <span className="bg-primary-200 text-primary-600 min-w-11 w-11 h-11 flex items-center justify-center rounded-full"><GrLocation size={24} /></span>
                                <div>
                                    <p className="text-sm text-gray-500 font-medium">Location</p>
                                    <p className="text-base text-gray-800 hover:text-primary-500 duration-300 font-semibold">12 Crescent Avenue, Midtown, New York, NY 10001, USA</p>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="tp-container mt-16">
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d206.41636883096515!2d90.4159207943782!3d23.834233290124576!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e1!3m2!1sen!2sbd!4v1762705780220!5m2!1sen!2sbd"
                        width="100%"
                        height="350"
                        style={{ border: 0, borderRadius: "16px" }}
                        allowFullScreen
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                    ></iframe>
                </div>
            </section>
        </>
    );
};

export default ContactUs;