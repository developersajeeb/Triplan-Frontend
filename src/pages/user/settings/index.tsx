import { Tabs, TabsList, TabsPanel, TabsTab } from "@/components/ui/tabs";
import { LuUserCog } from "react-icons/lu";
import { GoShieldCheck } from "react-icons/go";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { RiLoaderLine } from "react-icons/ri";
import { useForm, type FieldValues, type SubmitHandler } from "react-hook-form";
import { useEffect, useState } from "react";
import { MdOutlineCloudDone } from "react-icons/md";
import { useUpdateUserInfoMutation, useUserInfoQuery } from "@/redux/features/user/user.api";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import ProfilePhotoUploader from "@/components/shared/uploaders/ProfilePhotoUploader";
import { Skeleton } from "@/components/ui/skeleton";

const profileUpdateSchema = z.object({
    phone: z
        .string()
        .regex(/^\+?[1-9]\d{6,14}$/, {
            message: "Phone number must be valid (international format)",
        })
        .optional()
        .or(z.literal("")),

    address: z
        .string()
        .max(200, "Address cannot exceed 200 characters")
        .optional()
        .or(z.literal("")),

    country: z
        .string()
        .optional()
        .or(z.literal("")),

    city: z
        .string()
        .optional()
        .or(z.literal("")),

    post_code: z
        .string()
        .optional()
        .or(z.literal("")),
});

const Settings = () => {
    const { data: userData, isLoading } = useUserInfoQuery(undefined);
    const [updateUserInfo] = useUpdateUserInfoMutation();
    const [isLoginBtnLoading, setIsLoginBtnLoading] = useState<boolean>(false);
    const [image, setImage] = useState<File | null>(null);
    const [uploaderKey, setUploaderKey] = useState<number>(0);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);

    const form = useForm({
        resolver: zodResolver(profileUpdateSchema),
        defaultValues: {
            phone: "",
            address: "",
            country: "",
            city: "",
            post_code: "",
        },
    });

    useEffect(() => {
        if (userData?.data) {
            form.reset({
                phone: userData.data.phone || "",
                address: userData.data.address || "",
                country: userData.data.country || "",
                city: userData.data.city || "",
                post_code: userData.data.post_code || "",
            });
            if (userData.data.picture) {
                setPreviewUrl(userData.data.picture);
            }
        }
    }, [userData, form]);

    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        const toastId = toast.loading("Updating profile...");
        try {
            setIsLoginBtnLoading(true);

            const normalizedPhone =
                data.phone && data.phone !== ""
                    ? data.phone.startsWith("+")
                        ? data.phone
                        : `+${data.phone}`
                    : undefined;

            const payload = {
                phone: normalizedPhone,
                address: data.address || undefined,
                country: data.country || undefined,
                city: data.city || undefined,
                post_code: data.post_code || undefined,
            };

            const formData = new FormData();
            formData.append("data", JSON.stringify(payload));

            if (image) {
                formData.append("picture", image);
            }

            const res = await updateUserInfo(formData).unwrap();

            if (res.success) {
                toast.success("Profile updated successfully", { id: toastId });
                setImage(null);
                setUploaderKey(prev => prev + 1);
            } else {
                toast.error("Something went wrong", { id: toastId });
            }

        } catch (error) {
            console.error("Profile update error:", error);
            toast.error("Something went wrong", { id: toastId });
        } finally {
            setIsLoginBtnLoading(false);
        }
    };

    return (
        <>
            <h2 className="text-xl font-bold text-primary-950 mb-4">Settings</h2>

            <section className="p-5 border border-gray-300 rounded-xl">
                <Tabs defaultValue="tab-1">
                    <div className="border-b">
                        <TabsList variant="underline">
                            <TabsTab value="tab-1" className='!text-base !font-semibold gap-2'><span><LuUserCog /></span> Profile Settings</TabsTab>
                            <TabsTab value="tab-2" className='!text-base !font-semibold gap-2'><span><GoShieldCheck /></span> Security</TabsTab>
                        </TabsList>
                    </div>
                    <TabsPanel value="tab-1">
                        <div className="pt-6">
                            <Form {...form}>
                                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 sm:space-y-5">
                                    <ProfilePhotoUploader onChange={setImage} defaultPreview={previewUrl} uploaderKey={uploaderKey} />
                                    <div className="grid sm:grid-cols-3 gap-4 sm:gap-5 mt-6">
                                        <div>
                                            <Label className="font-semibold text-gray-600 text-sm">
                                                Name
                                            </Label>
                                            {isLoading ? <Skeleton className="h-12 w-full rounded-lg" /> :
                                                <Input
                                                    className="tp-input w-full mt-1"
                                                    value={userData?.data?.name || ""}
                                                    readOnly
                                                    disabled
                                                />
                                            }
                                        </div>

                                        <div>
                                            <Label className="font-semibold text-gray-600 text-sm">
                                                Email
                                            </Label>
                                            {isLoading ? <Skeleton className="h-12 w-full rounded-lg" /> :
                                                <Input
                                                    className="tp-input w-full mt-1"
                                                    value={userData?.data?.email || ""}
                                                    readOnly
                                                    disabled
                                                />
                                            }
                                        </div>

                                        <FormField
                                            control={form.control}
                                            name="phone"
                                            rules={{ required: "Phone number is required" }}
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormControl>
                                                        <div>
                                                            <Label className="font-semibold text-gray-600 text-sm">
                                                                Phone<span className="text-destructive text-base">*</span>
                                                            </Label>
                                                            {isLoading ? <Skeleton className="h-12 w-full rounded-lg" /> :
                                                                <Input
                                                                    className="tp-input w-full mt-1"
                                                                    placeholder="Enter your phone number"
                                                                    {...field}
                                                                    value={field.value || ""}
                                                                />
                                                            }
                                                        </div>
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                    <div className="grid sm:grid-cols-3 gap-4 sm:gap-5 mt-6">
                                        <FormField
                                            control={form.control}
                                            name="address"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormControl>
                                                        <div>
                                                            <Label className="font-semibold text-gray-600 text-sm">
                                                                Address
                                                            </Label>
                                                            {isLoading ? <Skeleton className="h-12 w-full rounded-lg" /> :
                                                                <Input
                                                                    className="tp-input w-full mt-1"
                                                                    placeholder="Enter your address"
                                                                    {...field}
                                                                    value={field.value || ""}
                                                                />
                                                            }
                                                        </div>
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />

                                        <FormField
                                            control={form.control}
                                            name="country"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormControl>
                                                        <div>
                                                            <Label className="font-semibold text-gray-600 text-sm">
                                                                Country
                                                            </Label>
                                                            {isLoading ? <Skeleton className="h-12 w-full rounded-lg" /> :
                                                                <Input
                                                                    className="tp-input w-full mt-1"
                                                                    placeholder="Select your country"
                                                                    {...field}
                                                                    value={field.value || ""}
                                                                />
                                                            }
                                                        </div>
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />

                                        <FormField
                                            control={form.control}
                                            name="city"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormControl>
                                                        <div>
                                                            <Label className="font-semibold text-gray-600 text-sm">
                                                                City
                                                            </Label>
                                                            {isLoading ? <Skeleton className="h-12 w-full rounded-lg" /> :
                                                                <Input
                                                                    className="tp-input w-full mt-1"
                                                                    placeholder="Enter your city"
                                                                    {...field}
                                                                    value={field.value || ""}
                                                                />
                                                            }
                                                        </div>
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>

                                    <FormField
                                        control={form.control}
                                        name="post_code"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormControl>
                                                    <div>
                                                        <Label className="font-semibold text-gray-600 text-sm">
                                                            Post Code
                                                        </Label>
                                                        {isLoading ? <Skeleton className="h-12 w-full rounded-lg" /> :
                                                            <Input
                                                                className="tp-input w-full mt-1"
                                                                placeholder="Add your post code"
                                                                {...field}
                                                                value={field.value || ""}
                                                            />
                                                        }
                                                    </div>
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <Button
                                        disabled={isLoginBtnLoading}
                                        type="submit"
                                        className={`tp-action-btn !h-12 ${isLoginBtnLoading && "pointer-events-none"}`}
                                    >
                                        {isLoginBtnLoading ? (
                                            <>
                                                Saving <RiLoaderLine className="w-4 h-4 animate-spin" />
                                            </>
                                        ) : (
                                            <>
                                                Save <MdOutlineCloudDone />
                                            </>
                                        )}
                                    </Button>
                                </form>
                            </Form>
                        </div>
                    </TabsPanel>
                    <TabsPanel value="tab-2">
                        <div className="pt-6">
                            <h2 className="text-xl font-semibold tracking-tight text-primary-950">Authentication Information</h2>

                            <ul className="mt-4 grid grid-cols-4 gap-4">
                                {userData?.data?.auths?.map((auth: {provider: string, providerId: string}, index: number) => {
                                    return (
                                        (
                                            <li key={index} className="border border-gray-200 bg-gray-50 rounded-lg p-4">
                                                <p className="font-medium text-gray-600">Provider: <span className="font-semibold capitalize">{auth?.provider}</span></p>
                                                <span className="inline-block mt-2 text-sm px-3 py-1 rounded-full bg-green-100 font-medium text-green-700">Current</span>
                                            </li>
                                        )
                                    )
                                })}
                            </ul>
                        </div>
                    </TabsPanel>
                </Tabs>
            </section>
        </>
    );
};

export default Settings;