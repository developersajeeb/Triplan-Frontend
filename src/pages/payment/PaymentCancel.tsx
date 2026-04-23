import { Button } from "@/components/ui/button";
import { ArrowLeft, CircleAlert, RotateCw } from "lucide-react";
import { Link } from "react-router";

const PaymentCancel = () => {
    return (
        <section className="relative overflow-hidden bg-primary-50 py-16 md:py-20 lg:py-24 min-h-[70vh] flex items-center">
            <div className="absolute -top-20 -right-8 h-52 w-52 rounded-full bg-primary-200/70 blur-2xl animate-pulse" />
            <div className="absolute -bottom-20 -left-10 h-64 w-64 rounded-full bg-primary-300/60 blur-3xl animate-pulse" />

            <div className="tp-container relative z-10">
                <div className="mx-auto max-w-3xl rounded-3xl border border-primary-200 bg-white/90 backdrop-blur-sm shadow-[0px_20px_60px_rgba(16,24,40,0.08)] p-6 sm:p-8 md:p-10">
                    <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full border-[10px] border-primary-100 bg-primary-200 text-primary-700">
                        <CircleAlert size={34} />
                    </div>

                    <h1 className="text-center text-2xl sm:text-3xl md:text-4xl font-bold text-primary-950 leading-tight">
                        Payment was cancelled
                    </h1>
                    <p className="mt-3 text-center text-gray-600 text-sm sm:text-base max-w-xl mx-auto">
                        No worries. Your transaction was not completed and no booking has been finalized. You can return and try again anytime.
                    </p>

                    <div className="mt-8 rounded-2xl border border-primary-100 bg-primary-50 p-4 sm:p-5">
                        <p className="text-sm text-primary-900 font-semibold">What you can do next</p>
                        <ul className="mt-2 space-y-1.5 text-sm text-gray-600 list-disc pl-5">
                            <li>Go back to your booking page and confirm details again.</li>
                            <li>Retry the payment flow when you are ready.</li>
                            <li>Explore other tours if you want to change plans.</li>
                        </ul>
                    </div>

                    <div className="mt-8 flex flex-col sm:flex-row gap-3 sm:gap-4">
                        <Button asChild className="tp-primary-btn h-12 flex-1">
                            <Link to="/tours">
                                <RotateCw className="h-4 w-4" />
                                Retry With Another Tour
                            </Link>
                        </Button>

                        <Button asChild variant="outline" className="h-12 flex-1 tp-transparent-black-btn">
                            <Link to="/">
                                <ArrowLeft className="h-4 w-4" />
                                Back To Home
                            </Link>
                        </Button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default PaymentCancel;