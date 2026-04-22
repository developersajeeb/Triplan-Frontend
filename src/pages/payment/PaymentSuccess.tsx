import { Button } from "@/components/ui/button";
import { CheckCheck, Sparkles, Ticket } from "lucide-react";
import { Link, useSearchParams } from "react-router";

const PaymentSuccess = () => {
    const [searchParams] = useSearchParams();
    const transactionId = searchParams.get("tran_id") || searchParams.get("transactionId") || searchParams.get("txnid");
    const amount = searchParams.get("amount");

    return (
        <section className="relative overflow-hidden bg-primary-50 py-16 md:py-20 lg:py-24 min-h-[70vh] flex items-center">
            <div className="absolute -top-16 -left-10 h-52 w-52 rounded-full bg-primary-200/70 blur-2xl animate-pulse" />
            <div className="absolute -bottom-20 -right-10 h-64 w-64 rounded-full bg-primary-300/60 blur-3xl animate-pulse" />

            <div className="tp-container relative z-10">
                <div className="mx-auto max-w-3xl rounded-3xl border border-primary-200 bg-white/90 backdrop-blur-sm shadow-[0px_20px_60px_rgba(16,24,40,0.08)] p-6 sm:p-8 md:p-10">
                    <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full border-[10px] border-primary-100 bg-primary-200 text-primary-600">
                        <CheckCheck size={34} />
                    </div>

                    <div className="flex justify-center mb-4">
                        <p className="inline-flex items-center gap-2 rounded-full bg-primary-100 px-4 py-1.5 text-xs sm:text-sm font-semibold text-primary-700 w-fit">
                            <Sparkles size={16} />
                            Payment Confirmed
                        </p>
                    </div>

                    <h1 className="text-center text-2xl sm:text-3xl md:text-4xl font-bold text-primary-950 leading-tight">
                        Your booking is now secured!
                    </h1>
                    <p className="mt-3 text-center text-gray-600 text-sm sm:text-base max-w-xl mx-auto">
                        Thank you for your payment. We have received your request and your tour reservation is being processed.
                    </p>

                    <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                        <div className="rounded-2xl border border-primary-100 bg-primary-50 p-4">
                            <p className="text-xs uppercase tracking-wide text-primary-700 font-semibold">Transaction ID</p>
                            <p className="mt-1 text-sm sm:text-base font-bold text-primary-950 break-all">
                                {transactionId || "Will be available in payment history"}
                            </p>
                        </div>
                        <div className="rounded-2xl border border-primary-100 bg-primary-50 p-4">
                            <p className="text-xs uppercase tracking-wide text-primary-700 font-semibold">Paid Amount</p>
                            <p className="mt-1 text-sm sm:text-base font-bold text-primary-950">
                                {amount ? `BDT ${amount}` : "Recorded successfully"}
                            </p>
                        </div>
                    </div>

                    <div className="mt-8 flex flex-col sm:flex-row gap-3 sm:gap-4">
                        <Button asChild className="tp-primary-btn h-12 flex-1">
                            <Link to="/user/my-bookings">
                                <Ticket className="h-4 w-4" />
                                View My Bookings
                            </Link>
                        </Button>

                        <Button asChild variant="outline" className="h-12 flex-1 tp-transparent-black-btn">
                            <Link to="/tours">Explore More Tours</Link>
                        </Button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default PaymentSuccess;