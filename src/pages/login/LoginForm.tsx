import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Link, useLocation, useNavigate } from "react-router"
import Logo from '@/assets/triPlan-logo.svg';
import { useForm, type FieldValues, type SubmitHandler } from "react-hook-form"
import { useLoginMutation } from "@/redux/features/auth/auth.api"
import { toast } from "sonner"
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form"
import { useState } from "react"
import { RiLoaderLine } from "react-icons/ri";
import { FiEye, FiEyeOff } from "react-icons/fi"
import z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import SocialLogin from "@/components/shared/blocks/SocialLogin"

const loginSchema = z.object({
    email: z
        .string()
        .nonempty({ message: "Email is required." })
        .email({ message: "Invalid email address." }),

    password: z
        .string()
        .nonempty({ message: "Password is required." })
        .min(6, { message: "Password must be at least 6 characters long." })
});

export function LoginForm({
    className,
    ...props
}: React.ComponentProps<"div">) {
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";
    const navigate = useNavigate();
    const form = useForm<z.infer<typeof loginSchema>>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });
    const [login] = useLoginMutation();
    const [isLoginBtnLoading, setIsLoginBtnLoading] = useState<boolean>(false);

    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        setIsLoginBtnLoading(true);
        try {
            const res = await login(data).unwrap();
            console.log(res);
            toast.success('Login Successfully');
            navigate(from, { replace: true });
            setIsLoginBtnLoading(false);
        } catch (err) {
            setIsLoginBtnLoading(false);
            console.error(err);
            const error = err as { data: { message: string }; };

            if (error.data.message === "Password does not match") {
                toast.error("Invalid credentials");
                return;
            }

            if (error.data.message === "User does not exist") {
                toast.error("User does not exist");
                return;
            }
            
            if (error.data.message === "You have authenticated through Google. Please use google for login!") {
                toast.error("You have authenticated through Google. Please use google for login!");
                return;
            }

            if (error.data.message === "User is not verified") {
                toast.error("Your account is not verified");
                navigate("/verify", { state: data.email });
            }
        }
    };

    return (
        <div className={cn("flex flex-col gap-6 w-full max-w-[380px]", className)} {...props}>
            <Form {...form}>
                <form className="px-5 py-8" onSubmit={form.handleSubmit(onSubmit)}>
                    <div className="flex flex-col gap-4">
                        <div className="flex flex-col items-center text-center mb-3">
                            <Link to='/'><img className="w-32 mb-3" src={Logo} alt="logo" /></Link>
                            <h1 className="text-3xl font-bold">Welcome back</h1>
                            <p className="text-muted-foreground font-medium text-balance">
                                Login to your triPlan account
                            </p>
                        </div>

                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem className="space-y-1">
                                    <Label className="font-semibold text-gray-600 text-sm" htmlFor="email">Email</Label>
                                    <FormControl>
                                        <Input
                                            className="tp-input"
                                            placeholder="sajeeb@example.com"
                                            {...field}
                                            value={field.value || ""}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem className="space-y-1">
                                    <div className="flex items-center gap-1">
                                        <Label className="font-semibold text-gray-600 text-sm" htmlFor="password">Password</Label>
                                        <Link
                                            to="/forgot-password"
                                            className="ml-auto text-sm underline-offset-2 hover:underline"
                                        >
                                            Forgot your password?
                                        </Link>
                                    </div>
                                    <FormControl>
                                        <div className="relative">
                                            <Input
                                                type={showPassword ? "text" : "password"}
                                                className="tp-input !pr-10"
                                                placeholder="Enter your password"
                                                {...field}
                                                value={field.value || ""}
                                            />
                                            <span
                                                className="text-gray-600 absolute top-[14px] right-3 cursor-pointer"
                                                onClick={() => setShowPassword(!showPassword)}
                                            >
                                                {showPassword ? <FiEye size={16} /> : <FiEyeOff size={16} />}
                                            </span>
                                        </div>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button disabled={isLoginBtnLoading} type="submit" className={`tp-primary-btn h-11 !rounded-lg mt-3 ${isLoginBtnLoading && 'pointer-events-none'}`}>
                            {isLoginBtnLoading && <RiLoaderLine className="w-4 h-4 animate-spin" />} Login
                        </Button>
                        <div className="my-3 after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-gray-300">
                            <span className="font-semibold bg-primary-50 text-muted-foreground relative z-10 px-2">
                                Or continue with
                            </span>
                        </div>
                        <SocialLogin />
                        <div className="text-center text-base">
                            Don&apos;t have an account?{" "}
                            <Link to="/registration" className="underline underline-offset-4 font-medium hover:text-primary-500 duration-300">
                                Sign up
                            </Link>
                        </div>
                    </div>
                </form>
            </Form>
        </div>
    )
}