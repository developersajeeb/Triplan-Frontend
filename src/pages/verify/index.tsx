import { cn } from '@/lib/utils';
import { OTPInput, type SlotProps } from "input-otp"
import { useEffect, useId, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { FaShieldAlt } from "react-icons/fa";
import { Form, FormControl, FormDescription, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { OtpExpireTimeInSeconds } from '@/config';
import { useSendOtpMutation, useVerifyOtpMutation } from '@/redux/features/auth/auth.api';
import { toast } from 'sonner';
import { Skeleton } from '@/components/ui/skeleton';
import bgImage from '@/assets/images/varify-page-bg.svg'

const FormSchema = z.object({
    pin: z.string().min(4, {
        message: "Your one-time password must be 4 characters.",
    }),
});

export default function VerifyPage() {
    const location = useLocation();
    const navigate = useNavigate();
    const [email] = useState(() => location.state?.email || location.state || "");
    const [active, setActive] = useState<boolean>(true);
    const id = useId()
    const [seconds, setSeconds] = useState(OtpExpireTimeInSeconds);
    const [sendOtp] = useSendOtpMutation();
    const [isSendingOtp, setIsSendingOtp] = useState<boolean>(false);
    const [verifyOtp] = useVerifyOtpMutation();
    const timerId = useRef<NodeJS.Timeout | null>(null);
    const isOtpSendingRef = useRef(false);

    const startTimer = (expiryTime: number) => {
        setActive(true);
        setSeconds(Math.max(0, Math.floor((expiryTime - Date.now()) / 1000)));

        if (timerId.current) {
            clearInterval(timerId.current);
        }

        timerId.current = setInterval(() => {
            const remaining = Math.max(0, Math.floor((expiryTime - Date.now()) / 1000));
            setSeconds(remaining);

            if (remaining === 0) {
                setActive(false);
                localStorage.removeItem("otp_expiry");
                localStorage.removeItem("otp_sent");
                if (timerId.current) {
                    clearInterval(timerId.current);
                }
            }
        }, 1000);
    };

    useEffect(() => {
        if (!email) {
            toast.error("Invalid request. Please register again.");
            navigate("/registration");
            return;
        }

        const savedExpiry = localStorage.getItem("otp_expiry");
        const otpSent = localStorage.getItem("otp_sent");

        if (savedExpiry) {
            const expiryTime = parseInt(savedExpiry, 10);
            if (expiryTime > Date.now()) {
                startTimer(expiryTime);
                return;
            } else {
                localStorage.removeItem("otp_expiry");
                localStorage.removeItem("otp_sent");
            }
        }

        if (!otpSent) {
            handleSendOtp();
        }

        // return () => {
        //     if (performance.navigation.type !== performance.navigation.TYPE_RELOAD) {
        //         localStorage.removeItem("otp_expiry");
        //         localStorage.removeItem("otp_sent");
        //         setSeconds(OtpExpireTimeInSeconds);
        //         setActive(false);

        //         if (!otpSent || otpSent !== "true") {
        //             if (!isOtpSendingRef.current) {
        //                 handleSendOtp();
        //             }
        //         }
        //     }
        // };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [email]);

    const handleSendOtp = async () => {
        if (isOtpSendingRef.current) return;
        isOtpSendingRef.current = true;
        setIsSendingOtp(true);
        const toastId = toast.loading("Sending OTP...");

        try {
            const res = await sendOtp({ email: email }).unwrap();

            if (res.success) {
                toast.success("OTP Sent", { id: toastId });

                const expiryTime = Date.now() + OtpExpireTimeInSeconds * 1000;
                localStorage.setItem("otp_expiry", expiryTime.toString());
                localStorage.setItem("otp_sent", "true");
                startTimer(expiryTime);
            }
        } catch (err) {
            console.log(err);
        } finally {
            isOtpSendingRef.current = false;
            setIsSendingOtp(false);
        }
    };

    const formatTime = (seconds: number): string => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
    };

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            pin: "",
        },
    });

    const onSubmit = async (data: z.infer<typeof FormSchema>) => {
        console.log(data);

        const toastId = toast.loading("Verifying OTP");
        const userInfo = {
            email,
            otp: data.pin,
        };

        try {
            const res = await verifyOtp(userInfo).unwrap();
            if (res.success) {
                toast.success("OTP Verified Successfully!", { id: toastId });
                navigate("/login");
            }
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="p-5 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: `url(${bgImage})` }}>
                <div className="flex items-center justify-center h-screen text-center">
                    <div className='border border-gray-200 bg-gray-50 px-7 py-9 max-w-[450px] w-full rounded-xl'>
                        <span className='inline-flex items-center justify-center mb-5 bg-primary-200 border-[15px] border-primary-100 p-4 rounded-full text-primary-400'><FaShieldAlt size={40} /></span>
                        <h1 className='text-2xl font-bold text-gray-800 mb-1'>Verify your account</h1>
                        <p className='word-break text-gray-500 mb-8'>Please enter the OTP sent to <span className='font-semibold break-all'>{email}</span> to verify your account</p>

                        <FormField
                            control={form.control}
                            name="pin"
                            render={({ field }) => (
                                <FormItem className="space-y-1">
                                    <FormControl>
                                        <OTPInput
                                            id={id}
                                            value={field.value}
                                            onChange={(value) => field.onChange(value)}
                                            containerClassName="flex items-center justify-center gap-3 has-disabled:opacity-50 mb-1"
                                            maxLength={4}
                                            render={({ slots }) => (
                                                <div className="flex gap-2">
                                                    {slots.map((slot, idx) => (
                                                        <Slot key={idx} {...slot} />
                                                    ))}
                                                </div>
                                            )}
                                        />
                                    </FormControl>
                                    <FormDescription className="sr-only">
                                        This is your otp input field.
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        {active ? (
                            <Button type="submit" className="tp-primary-btn h-11 !px-5 !rounded-lg mt-7">
                                Submit
                            </Button>
                        ) : (
                            <Button type="button" className="tp-primary-btn h-11 !px-5 !rounded-lg mt-7 pointer-events-none" disable>
                                Submit
                            </Button>
                        )}

                        <div className='mt-5'>
                            {isSendingOtp ? (
                                <Skeleton className="h-[20px] max-w-[150px] rounded-full mx-auto" />
                            ) : active ? (
                                <p className="text-sm text-gray-500">
                                    OTP expires in <span className="font-semibold">{formatTime(seconds)}</span> minutes
                                </p>
                            ) : (
                                <p className='text-sm text-gray-500'>
                                    Don&apos;t receive a code?{" "}
                                    <span
                                        onClick={() => handleSendOtp()}
                                        className='text-primary-600 hover:text-primary-400 duration-300 cursor-pointer underline underline-offset-2'>
                                        Resend
                                    </span>
                                </p>
                            )}
                        </div>
                    </div>
                </div>
            </form>
        </Form>
    );
};

function Slot(props: SlotProps) {
    return (
        <div
            className={cn(
                "border-input bg-background text-base text-foreground flex size-11 items-center justify-center rounded-md border border-gray-400 font-medium shadow-xs transition-[color,box-shadow]",
                { "border-primary-400 z-10 ring-[3px]": props.isActive }
            )}
        >
            {props.char !== null && <div>{props.char}</div>}
        </div>
    )
}
