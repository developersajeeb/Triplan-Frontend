import { useEffect, useState } from "react";
import { useForm, type FieldValues, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import z from "zod";
import { GoShieldCheck } from "react-icons/go";
import { LuBuilding2, LuUserCog } from "react-icons/lu";
import { MdOutlinePolicy } from "react-icons/md";
import { RiLoaderLine } from "react-icons/ri";

import { Tabs, TabsList, TabsPanel, TabsTab } from "@/components/ui/tabs";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import ProfilePhotoUploader from "@/components/shared/uploaders/ProfilePhotoUploader";
import { useUpdateUserInfoMutation, useUserInfoQuery } from "@/redux/features/user/user.api";

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

    country: z.string().optional().or(z.literal("")),
    city: z.string().optional().or(z.literal("")),
    post_code: z.string().optional().or(z.literal("")),
});

const Settings = () => {
    const { data: userData, isLoading } = useUserInfoQuery(undefined);
    const [updateUserInfo] = useUpdateUserInfoMutation();
    const [isProfileSaving, setIsProfileSaving] = useState(false);
    const [image, setImage] = useState<File | null>(null);
    const [uploaderKey, setUploaderKey] = useState(0);
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
            setIsProfileSaving(true);

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
                setUploaderKey((prev) => prev + 1);
            } else {
                toast.error("Something went wrong", { id: toastId });
            }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: object | any) {
            toast.error(error?.data?.message || "Something went wrong", { id: toastId });
        } finally {
            setIsProfileSaving(false);
        }
    };

    return (
        <>
            <div className="mb-5">
                <h2 className="text-2xl font-bold text-primary-950">Settings</h2>
                <p className="mt-1 text-sm text-gray-600">
                    Admin profile settings, business identity, and future multi-vendor controls in one place.
                </p>
            </div>

            <section className="rounded-xl border border-gray-300 bg-white p-5">
                <Tabs defaultValue="tab-1">
                    <div className="border-b">
                        <TabsList variant="underline">
                            <TabsTab value="tab-1" className="!text-base !font-semibold gap-2">
                                <span><LuUserCog /></span> Profile Settings
                            </TabsTab>
                            <TabsTab value="tab-2" className="!text-base !font-semibold gap-2">
                                <span><LuBuilding2 /></span> Business Settings
                            </TabsTab>
                            <TabsTab value="tab-3" className="!text-base !font-semibold gap-2">
                                <span><GoShieldCheck /></span> Security
                            </TabsTab>
                        </TabsList>
                    </div>

                    <TabsPanel value="tab-1">
                        <div className="pt-6">
                            <Form {...form}>
                                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 sm:space-y-5">
                                    <ProfilePhotoUploader
                                        onChange={setImage}
                                        defaultPreview={previewUrl}
                                        uploaderKey={uploaderKey}
                                    />

                                    <div className="grid gap-4 sm:grid-cols-3 sm:gap-5 mt-6">
                                        <div>
                                            <Label className="font-semibold text-gray-600 text-sm">Name</Label>
                                            {isLoading ? (
                                                <Skeleton className="h-12 w-full rounded-lg" />
                                            ) : (
                                                <Input
                                                    className="tp-input w-full mt-1"
                                                    value={userData?.data?.name || ""}
                                                    readOnly
                                                    disabled
                                                />
                                            )}
                                        </div>

                                        <div>
                                            <Label className="font-semibold text-gray-600 text-sm">Email</Label>
                                            {isLoading ? (
                                                <Skeleton className="h-12 w-full rounded-lg" />
                                            ) : (
                                                <Input
                                                    className="tp-input w-full mt-1"
                                                    value={userData?.data?.email || ""}
                                                    readOnly
                                                    disabled
                                                />
                                            )}
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
                                                            {isLoading ? (
                                                                <Skeleton className="h-12 w-full rounded-lg" />
                                                            ) : (
                                                                <Input
                                                                    className="tp-input w-full mt-1"
                                                                    placeholder="Enter your phone number"
                                                                    {...field}
                                                                    value={field.value || ""}
                                                                />
                                                            )}
                                                        </div>
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>

                                    <div className="grid gap-4 sm:grid-cols-3 sm:gap-5 mt-6">
                                        <FormField
                                            control={form.control}
                                            name="address"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormControl>
                                                        <div>
                                                            <Label className="font-semibold text-gray-600 text-sm">Address</Label>
                                                            {isLoading ? (
                                                                <Skeleton className="h-12 w-full rounded-lg" />
                                                            ) : (
                                                                <Input
                                                                    className="tp-input w-full mt-1"
                                                                    placeholder="Enter your address"
                                                                    {...field}
                                                                    value={field.value || ""}
                                                                />
                                                            )}
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
                                                            <Label className="font-semibold text-gray-600 text-sm">Country</Label>
                                                            {isLoading ? (
                                                                <Skeleton className="h-12 w-full rounded-lg" />
                                                            ) : (
                                                                <Input
                                                                    className="tp-input w-full mt-1"
                                                                    placeholder="Select your country"
                                                                    {...field}
                                                                    value={field.value || ""}
                                                                />
                                                            )}
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
                                                            <Label className="font-semibold text-gray-600 text-sm">City</Label>
                                                            {isLoading ? (
                                                                <Skeleton className="h-12 w-full rounded-lg" />
                                                            ) : (
                                                                <Input
                                                                    className="tp-input w-full mt-1"
                                                                    placeholder="Enter your city"
                                                                    {...field}
                                                                    value={field.value || ""}
                                                                />
                                                            )}
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
                                                    <div className="max-w-sm">
                                                        <Label className="font-semibold text-gray-600 text-sm">Post Code</Label>
                                                        {isLoading ? (
                                                            <Skeleton className="h-12 w-full rounded-lg" />
                                                        ) : (
                                                            <Input
                                                                className="tp-input w-full mt-1"
                                                                placeholder="Add your post code"
                                                                {...field}
                                                                value={field.value || ""}
                                                            />
                                                        )}
                                                    </div>
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <div className="flex justify-end">
                                        <Button
                                            disabled={isProfileSaving}
                                            type="submit"
                                            className={`tp-action-btn !h-12 ${isProfileSaving && "pointer-events-none"}`}
                                        >
                                            {isProfileSaving ? (
                                                <>
                                                    Saving <RiLoaderLine className="w-4 h-4 animate-spin" />
                                                </>
                                            ) : (
                                                "Save Profile"
                                            )}
                                        </Button>
                                    </div>
                                </form>
                            </Form>
                        </div>
                    </TabsPanel>

                    <TabsPanel value="tab-2">
                        <div className="pt-6 space-y-5">
                            <div className="rounded-2xl border border-gray-200 bg-gray-50 p-5">
                                <div className="flex items-center gap-2 text-gray-800 font-semibold">
                                    <LuBuilding2 className="text-primary-500" />
                                    Business identity
                                </div>
                                <p className="mt-2 text-sm text-gray-600">
                                    For now this is a UI scaffold for the future multi-vendor setup. Add these fields when the backend is ready.
                                </p>
                                <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                                    <div>
                                        <Label className="font-semibold text-gray-600 text-sm">Business name</Label>
                                        <Input className="tp-input w-full mt-1" placeholder="TripPlan / Vendor name" />
                                    </div>
                                    <div>
                                        <Label className="font-semibold text-gray-600 text-sm">Support email</Label>
                                        <Input className="tp-input w-full mt-1" placeholder="support@example.com" />
                                    </div>
                                    <div>
                                        <Label className="font-semibold text-gray-600 text-sm">Support phone</Label>
                                        <Input className="tp-input w-full mt-1" placeholder="+880..." />
                                    </div>
                                    <div>
                                        <Label className="font-semibold text-gray-600 text-sm">Currency</Label>
                                        <Input className="tp-input w-full mt-1" placeholder="BDT / USD" />
                                    </div>
                                    <div>
                                        <Label className="font-semibold text-gray-600 text-sm">Commission %</Label>
                                        <Input className="tp-input w-full mt-1" placeholder="10" />
                                    </div>
                                    <div>
                                        <Label className="font-semibold text-gray-600 text-sm">Timezone</Label>
                                        <Input className="tp-input w-full mt-1" placeholder="Asia/Dhaka" />
                                    </div>
                                </div>
                            </div>

                            <div className="rounded-2xl border border-gray-200 bg-white p-5">
                                <div className="flex items-center gap-2 text-gray-800 font-semibold">
                                    <MdOutlinePolicy className="text-primary-500" />
                                    Policies and public info
                                </div>
                                <div className="mt-4 grid gap-4 lg:grid-cols-2">
                                    <div>
                                        <Label className="font-semibold text-gray-600 text-sm">Refund policy</Label>
                                        <Textarea className="tp-textarea mt-1 min-h-32" placeholder="Write refund policy..." />
                                    </div>
                                    <div>
                                        <Label className="font-semibold text-gray-600 text-sm">Cancellation policy</Label>
                                        <Textarea className="tp-textarea mt-1 min-h-32" placeholder="Write cancellation policy..." />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </TabsPanel>

                    <TabsPanel value="tab-3">
                        <div className="pt-6 space-y-5">
                            <div className="rounded-2xl border border-gray-200 bg-white p-5">
                                <h3 className="text-lg font-semibold text-gray-800">Authentication information</h3>
                                <p className="mt-1 text-sm text-gray-600">
                                    Keep this tab for account security settings and login identity checks.
                                </p>

                                <ul className="mt-4 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
                                    {userData?.data?.auths?.map((auth: { provider: string; providerId?: string }, index: number) => (
                                        <li key={index} className="rounded-lg border border-gray-200 bg-gray-50 p-4">
                                            <p className="font-medium text-gray-600">
                                                Login & register with: <span className="font-bold capitalize text-primary-500">{auth?.provider}</span>
                                            </p>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div className="rounded-2xl border border-gray-200 bg-gray-50 p-5">
                                <h3 className="text-lg font-semibold text-gray-800">Future admin controls</h3>
                                <p className="mt-1 text-sm text-gray-600">
                                    When multi-vendor goes live, this tab can include password change, 2FA, API keys, vendor access, and notification preferences.
                                </p>
                            </div>
                        </div>
                    </TabsPanel>
                </Tabs>
            </section>
        </>
    );
};

export default Settings;