/* eslint-disable @typescript-eslint/no-explicit-any */
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Link, useNavigate } from "react-router"
import Logo from '@/assets/triPlan-logo.svg';
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form"
import { Form, FormControl, FormDescription, FormField, FormItem, FormMessage } from "@/components/ui/form"
import { useRegisterMutation } from "@/redux/features/auth/auth.api"
import { toast } from "sonner"
import { FiEye, FiEyeOff } from "react-icons/fi"
import { useState } from "react"
import { RiLoaderLine } from "react-icons/ri"
import SocialLogin from "@/components/shared/blocks/SocialLogin"

const registerSchema = z
    .object({
        name: z
            .string()
            .nonempty({ message: "Name is required." })
            .min(2, { message: "At least 2 characters long." })
            .max(50, { message: "Name cannot exceed 50 characters." }),
        phone: z
            .string()
            .nonempty({ message: "Phone number is required." })
            .regex(/^(?:\+8801\d{9}|01\d{9})$/, {
                message: "Phone number Invalid.",
            }),
        email: z
            .string()
            .nonempty({ message: "Email is required." })
            .email({ message: "Invalid email address format." })
            .min(5, { message: "Email must be at least 5 characters long." })
            .max(100, { message: "Email cannot exceed 100 characters." }),
        password: z
            .string()
            .nonempty({ message: "Password is required." })
            .min(6, { message: "Password at least 6 characters long." })
            .regex(/^(?=.*[A-Z])/, {
                message: "Password must contain at least 1 uppercase letter.",
            })
            .regex(/^(?=.*[!@#$%^&*])/, {
                message: "Password must contain at least 1 special character.",
            })
            .regex(/^(?=.*\d)/, {
                message: "Password must contain at least 1 number.",
            }),
        confirmPassword: z
            .string()
            .nonempty({ message: "Confirm Password is required." })
            .min(6, { error: "Confirm Password is too short" }),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Password do not match",
        path: ["confirmPassword"],
    });

export function RegisterFrom({
    className,
    ...props
}: React.ComponentProps<"div">) {
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);
    const [register] = useRegisterMutation();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const form = useForm<z.infer<typeof registerSchema>>({
        resolver: zodResolver(registerSchema),
        defaultValues: {
            name: "",
            email: "",
            phone: "",
            password: "",
            confirmPassword: "",
        },
    });

    const onSubmit = async (data: z.infer<typeof registerSchema>) => {
        setIsLoading(true);
        const userInfo = {
            name: data.name,
            email: data.email,
            phone: data.phone,
            password: data.password,
        };

        try {
            await register(userInfo).unwrap();
            toast.success("Account created successfully!");
            setIsLoading(false);
            navigate("/verify", { state: { email: data.email } });
        } catch (error: object | any) {
            setIsLoading(false);
            toast.error(error?.data?.message || "Something went wrong. Please try again.");
            console.error(error);
        }
    };

    return (
        <div className={cn("flex flex-col gap-6 w-full max-w-[520px]", className)} {...props}>
            <Form {...form}>
                <form className="px-5 py-8" onSubmit={form.handleSubmit(onSubmit)}>
                    <div className="flex flex-col gap-3">
                        <div className="flex flex-col items-center text-center mb-3">
                            <Link to='/'><img className="w-32 mb-3" src={Logo} alt="logo" /></Link>
                            <h1 className="text-3xl font-bold">Let’s Register</h1>
                            <p className="text-muted-foreground font-medium text-balance mt-1">
                                Your travel starts here – join triPlan today
                            </p>
                        </div>

                        <div className="grid sm:grid-cols-2 gap-3">
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem className="space-y-1">
                                        <Label className="font-semibold text-gray-600 text-sm" htmlFor="name">Name<span className="text-destructive text-base">*</span></Label>
                                        <FormControl>
                                            <Input className="tp-input" placeholder="Your name" {...field} />
                                        </FormControl>
                                        <FormDescription className="sr-only">
                                            This is your public display name.
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="phone"
                                render={({ field }) => (
                                    <FormItem className="space-y-1">
                                        <Label className="font-semibold text-gray-600 text-sm" htmlFor="phone">Phone<span className="text-destructive text-base">*</span></Label>
                                        <FormControl>
                                            <Input className="tp-input" placeholder="01XXXXXXXXX" {...field} />
                                        </FormControl>
                                        <FormDescription className="sr-only">
                                            This is your phone number for verification, contact, etc.
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem className="space-y-1">
                                    <Label className="font-semibold text-gray-600 text-sm" htmlFor="email">Email<span className="text-destructive text-base">*</span></Label>
                                    <FormControl>
                                        <Input className="tp-input" placeholder="m@example.com" {...field} />
                                    </FormControl>
                                    <FormDescription className="sr-only">
                                        This is your email.
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <div className="grid sm:grid-cols-2 gap-3">
                            <FormField
                                control={form.control}
                                name="password"
                                render={({ field }) => (
                                    <FormItem className="space-y-1">
                                        <Label className="font-semibold text-gray-600 text-sm" htmlFor="password">Password<span className="text-destructive text-base">*</span></Label>
                                        <FormControl>
                                            <div className="relative">
                                                <Input
                                                    type={showPassword ? "text" : "password"}
                                                    className="tp-input !pr-10"
                                                    placeholder="Enter your password"
                                                    {...field}
                                                />
                                                <span
                                                    className="text-gray-600 absolute top-[14px] right-3 cursor-pointer"
                                                    onClick={() => setShowPassword(!showPassword)}
                                                >
                                                    {showPassword ? <FiEye size={16} /> : <FiEyeOff size={16} />}
                                                </span>
                                            </div>
                                        </FormControl>
                                        <FormDescription className="sr-only">
                                            This is your password for authentication.
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="confirmPassword"
                                render={({ field }) => (
                                    <FormItem className="space-y-1">
                                        <Label className="font-semibold text-gray-600 text-sm" htmlFor="confirmPassword">Confirm Password<span className="text-destructive text-base">*</span></Label>
                                        <FormControl>
                                            <div className="relative">
                                                <Input
                                                    type={showConfirmPassword ? "text" : "password"}
                                                    className="tp-input !pr-10"
                                                    placeholder="Re-type password"
                                                    {...field}
                                                />
                                                <span
                                                    className="text-gray-600 absolute top-[14px] right-3 cursor-pointer"
                                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                                >
                                                    {showConfirmPassword ? <FiEye size={16} /> : <FiEyeOff size={16} />}
                                                </span>
                                            </div>
                                        </FormControl>
                                        <FormDescription className="sr-only">
                                            This is your re enter password for authentication.
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <Button disabled={isLoading} type="submit" className={`tp-primary-btn h-11 !rounded-lg mt-3 ${isLoading && 'pointer-events-none'}`}>
                            {isLoading && <RiLoaderLine className="w-4 h-4 animate-spin" />} Sign Up
                        </Button>
                        <div className="my-3 after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-gray-300">
                            <span className="font-semibold bg-primary-50 text-muted-foreground relative z-10 px-2">
                                Or continue with
                            </span>
                        </div>
                        <SocialLogin />
                        <div className="text-center text-base">
                            Already have an account?{" "}
                            <Link to="/login" className="underline underline-offset-4 font-medium hover:text-primary-500 duration-300">
                                Login
                            </Link>
                        </div>
                    </div>
                </form>
            </Form>
        </div>
    )
}