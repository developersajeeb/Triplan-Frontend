import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useForm, type FieldValues, type SubmitHandler } from "react-hook-form";
import { LuFacebook, LuMail, LuSend, LuYoutube } from "react-icons/lu";
import { RiLoaderLine } from "react-icons/ri";
import Logo from '@/assets/triPlan-logo-white.svg';
import { Link } from "react-router";
import { MdOutlineCall } from "react-icons/md";
import { FiInstagram } from "react-icons/fi";
import { FaXTwitter } from "react-icons/fa6";
import bgImage from '@/assets/images/home-slider/tours-slider-2.webp';
import paymentLogos from '@/assets/images/payment-method.jpeg';

const Footer = () => {
    const form = useForm();
    const [isLoginBtnLoading, setIsLoginBtnLoading] = useState<boolean>(false);
    const [fromSuccessMassage, setFromSuccessMassage] = useState<string>('');

    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        try {
            setIsLoginBtnLoading(true);
            console.log("Form Data:", data);
            setFromSuccessMassage("Subscription successful! Thank you for joining us.");
            form.reset();

        } catch (error) {
            console.error("Subscription error:", error);
            setFromSuccessMassage("Something went wrong. Please try again.");
        } finally {
            setIsLoginBtnLoading(false);
        }
    };

    return (
        <footer>
            <section className="pt-12 md:pt-16 pb-12 lg:pt-20 lg:pb-14 bg-primary-950">
                <div className="tp-container">
                    <div className="grid lg:grid-cols-2 gap-5 border-b border-primary-800 pb-12 md:pb-14 lg:pb-16">
                        <h3 className="text-3xl md:text-5xl tracking-tight font-semibold text-white">Get Updated The Latest <span className="font-Nunito">Newsletter</span></h3>
                        <Form {...form}>
                            <form className="flex flex-col sm:flex-row gap-3 sm:gap-2 w-full" onSubmit={form.handleSubmit(onSubmit)}>
                                <FormField
                                    control={form.control}
                                    name="email"
                                    rules={{
                                        required: "Email is required",
                                        pattern: {
                                            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                            message: "Enter a valid email address",
                                        },
                                    }}
                                    render={({ field }) => (
                                        <FormItem className="w-full">
                                            <FormControl className="mb-1">
                                                <Input
                                                    className="tp-newsletter-input w-full"
                                                    placeholder="example@gmail.com"
                                                    {...field}
                                                    value={field.value || ""}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                            {fromSuccessMassage && <span className="text-green-500 text-sm">Subscription successful! Thank you for joining us.</span>}
                                        </FormItem>
                                    )}
                                />
                                <Button disabled={isLoginBtnLoading} type="submit" className={`tp-primary-btn-light h-[54px] ${isLoginBtnLoading && 'pointer-events-none'}`}>
                                    Subscribe Now {isLoginBtnLoading ? <RiLoaderLine className="w-4 h-4 animate-spin" /> : <LuSend size={20} />}
                                </Button>
                            </form>
                        </Form>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-7 gap-6 pt-12 md:pt-14 lg:pt-16">
                        <div className="col-span-full lg:col-span-4">
                            <img className="max-w-[180px]" src={Logo} alt="triPlan" />
                            <p className="text-white font-medium my-5">Explore like never before — discover, plan, and book unforgettable travel experiences effortlessly with triPlan.</p>
                            <Link className="inline-flex gap-2 items-center text-white hover:text-gray-300 duration-300 text-base font-medium" to='tel:+8801743370840'><span><MdOutlineCall size={16} /></span> +8801743370840</Link><br />
                            <Link className="inline-flex gap-2 items-center text-white hover:text-gray-300 duration-300 text-base font-medium" to='mailto:info@developersajeeb.com'><span><LuMail size={16} /></span> info@developersajeeb.com</Link>
                        </div>

                        <div className="col-span-full lg:col-span-3 sm:flex justify-between md:grid grid-cols-3 gap-6">
                            <div className="mb-6 sm:mb-0">
                                <h4 className="text-white text-xl font-semibold mb-3">Company</h4>
                                <ul className="space-y-2">
                                    <li><Link to="/" className="text-gray-300 hover:text-primary-300 duration-300 text-base font-medium">Home</Link></li>
                                    <li><Link to="/about-us" className="text-gray-300 hover:text-primary-300 duration-300 text-base font-medium">About</Link></li>
                                    <li><Link to="/blog" className="text-gray-300 hover:text-primary-300 duration-300 text-base font-medium">Blog</Link></li>
                                </ul>
                            </div>
                            <div className="mb-6 sm:mb-0">
                                <h4 className="text-white text-xl font-semibold mb-3">Quick Links</h4>
                                <ul className="space-y-2">
                                    <li><Link to="/tours" className="text-gray-300 hover:text-primary-300 duration-300 text-base font-medium">Tours</Link></li>
                                    <li><Link to="/destinations" className="text-gray-300 hover:text-primary-300 duration-300 text-base font-medium">Destinations</Link></li>
                                    <li><Link to="/tour-guide" className="text-gray-300 hover:text-primary-300 duration-300 text-base font-medium">Tour Guider</Link></li>
                                    <li><Link to="/contact-us" className="text-gray-300 hover:text-primary-300 duration-300 text-base font-medium">Contact</Link></li>
                                </ul>
                            </div>
                            <div>
                                <h4 className="text-white text-xl font-semibold mb-3">Connect</h4>
                                <ul className="space-y-2">
                                    <li><Link to="#" className="text-gray-300 hover:text-primary-300 duration-300 text-base font-medium flex items-center gap-2"><span><LuFacebook size={16} /></span> Facebook</Link></li>
                                    <li><Link to="#" className="text-gray-300 hover:text-primary-300 duration-300 text-base font-medium flex items-center gap-2"><span><FiInstagram size={16} /></span> Instagram</Link></li>
                                    <li><Link to="#" className="text-gray-300 hover:text-primary-300 duration-300 text-base font-medium flex items-center gap-2"><span><FaXTwitter size={16} /></span> Twitter</Link></li>
                                    <li><Link to="#" className="text-gray-300 hover:text-primary-300 duration-300 text-base font-medium flex items-center gap-2"><span><LuYoutube size={16} /></span> Youtube</Link></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="bg-no-repeat bg-cover bg-top relative" style={{ backgroundImage: `url(${bgImage})` }}>
                <div className="absolute top-0 right-0 left-0 bottom-0 inset-0 bg-black/50"></div>
                <div className="tp-container py-5 z-20 relative">
                    <div className="flex flex-col md:flex-row justify-between gap-2 items-center text-center border-b border-gray-500 pb-5">
                        <p className="text-white text-sm font-medium">Copyright &copy; 2023 TriPlan. All rights reserved | Develop by <Link to="https://developersajeeb.com" target="_blank" className="text-primary-400 font-bold">DeveloperSajeeb</Link></p>
                        <ul className="flex gap-2 flex-wrap text-white mx-auto md:mx-0">
                            <li><Link to="#" className="hover:text-primary-300 duration-300 text-sm font-medium">Privacy policy</Link></li>{" "}|{" "}
                            <li><Link to="#" className="hover:text-primary-300 duration-300 text-sm font-medium">Terms of use</Link></li>
                        </ul>
                    </div>
                    <img className="w-full pt-5" src={paymentLogos} alt="Payment Logos" />
                </div>
            </section>
        </footer>
    );
};

export default Footer;