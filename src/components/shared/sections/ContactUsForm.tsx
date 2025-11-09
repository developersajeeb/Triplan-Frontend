import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { useForm, type FieldValues, type SubmitHandler } from "react-hook-form";
import { LuSend } from "react-icons/lu";
import { RiLoaderLine } from "react-icons/ri";

const ContactUsForm = () => {
    const form = useForm();
    const [isLoginBtnLoading, setIsLoginBtnLoading] = useState<boolean>(false);
    const [fromSuccessMassage, setFromSuccessMassage] = useState<string>('');
    const [fromErrorMassage, setFromErrorMassage] = useState<string>('');

    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        try {
            setIsLoginBtnLoading(true);
            console.log("Form Data:", data);
            setFromSuccessMassage("Thank you for reaching out to triPlan. Our team will get back to you shortly.");
            form.reset();

        } catch (error) {
            console.error("Subscription error:", error);
            setFromErrorMassage("Something went wrong. Please try again.");
        } finally {
            setIsLoginBtnLoading(false);
        }
    };

    return (
        <div className="bg-white border border-gray-200 p-6 rounded-2xl">
            <h3 className="text-2xl md:text-3xl lg:text-4xl font-semibold mb-5 tracking-tight text-primary-950">Get in Touch</h3>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                    <div className="grid sm:grid-cols-2 gap-5">
                        <FormField
                            control={form.control}
                            name="name"
                            rules={{ required: "Name is required" }}
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <div>
                                            <Label className="font-semibold text-gray-600 text-sm">
                                                Name<span className="text-destructive text-base">*</span>
                                            </Label>
                                            <Input
                                                className="tp-input w-full mt-1"
                                                placeholder="Your full name"
                                                {...field}
                                                value={field.value || ""}
                                            />
                                        </div>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

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
                                <FormItem>
                                    <FormControl>
                                        <div>
                                            <Label className="font-semibold text-gray-600 text-sm">
                                                Email<span className="text-destructive text-base">*</span>
                                            </Label>
                                            <Input
                                                className="tp-input w-full mt-1"
                                                placeholder="example@gmail.com"
                                                {...field}
                                                value={field.value || ""}
                                            />
                                        </div>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <FormField
                        control={form.control}
                        name="phone"
                        rules={{
                            required: "Phone number is required",
                            pattern: {
                                value: /^[0-9+\-\s()]{8,20}$/,
                                message: "Enter a valid phone number",
                            },
                        }}
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <div>
                                        <Label className="font-semibold text-gray-600 text-sm">
                                            Phone<span className="text-destructive text-base">*</span>
                                        </Label>
                                        <Input
                                            className="tp-input w-full mt-1"
                                            placeholder="+880 1234 567 890"
                                            {...field}
                                            value={field.value || ""}
                                        />
                                    </div>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="message"
                        rules={{ required: "Message is required" }}
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <div>
                                        <Label className="font-semibold text-gray-600 text-sm">
                                            How can we help?<span className="text-destructive text-base">*</span>
                                        </Label>
                                        <Textarea
                                            className="tp-input !py-3 w-full mt-1 min-h-[120px]"
                                            placeholder="Write your message..."
                                            {...field}
                                            value={field.value || ""}
                                        />
                                    </div>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {(fromSuccessMassage || fromErrorMassage) && (
                        <p
                            className={`text-sm font-medium transition-colors duration-300 ${fromSuccessMassage ? "text-green-500" : "text-red-500"
                                }`}
                        >
                            {fromSuccessMassage || fromErrorMassage}
                        </p>
                    )}

                    {/* Submit Button */}
                    <Button
                        disabled={isLoginBtnLoading}
                        type="submit"
                        className={`tp-primary-btn-light !py-6 !px-5 ${isLoginBtnLoading && "pointer-events-none"}`}
                    >
                        {isLoginBtnLoading ? (
                            <>
                                Sending <RiLoaderLine className="ml-2 w-4 h-4 animate-spin" />
                            </>
                        ) : (
                            <>
                                Send Message <LuSend size={20} className="ml-2" />
                            </>
                        )}
                    </Button>
                </form>
            </Form>
        </div>
    );
};

export default ContactUsForm;