import PageBanner from "@/components/shared/sections/PageBanner";
import { Button } from "@/components/ui/button";
import { FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Form } from "@/components/ui/form";
import { useForm, type FieldValues } from "react-hook-form";
import { RiSearch2Line } from "react-icons/ri";
import { useSearchParams } from "react-router";
import ImageWaterMark from '@/assets/images/image-watermark.webp'
import BlogCard from "@/components/shared/blocks/BlogCard";

const BlogPage = () => {
    const form = useForm();
    const [searchParams, setSearchParams] = useSearchParams();

    const onSubmit = (data: FieldValues) => {
        searchParams.set("search", data.search || "");
        setSearchParams(searchParams);
    };

    return (
        <>
            <PageBanner title="Blog" />

            <section className="flex flex-col lg:flex-row gap-10 tp-container pt-8 pb-14">
                <div className="flex-1">
                    <div className="flex flex-wrap gap-5">
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="w-full sm:w-auto">
                                <FormField
                                    control={form.control}
                                    name="search"
                                    rules={{ required: "Please enter a search term" }}
                                    render={({ field }) => (
                                        <FormItem>
                                            <div className="relative">
                                                <FormControl>
                                                    <Input
                                                        {...field}
                                                        value={field.value || ""}
                                                        type="text"
                                                        className="tp-input w-full sm:w-auto !pr-12"
                                                        placeholder="Search blog..."
                                                    />
                                                </FormControl>
                                                <Button type="submit" size="icon" className="h-[34px] min-w-[36px] w-[36px] rounded-md bg-gray-200 hover:bg-primary-500 text-gray-800 hover:text-white duration-300 absolute right-1 top-1">
                                                    <RiSearch2Line className="!h-[18px] !w-[18px]" />
                                                </Button>
                                            </div>

                                            <FormMessage className="!mt-1" />
                                        </FormItem>
                                    )}
                                />
                            </form>
                        </Form>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-7 mt-8">
                        <BlogCard />
                        <BlogCard />
                        <BlogCard />
                    </div>
                </div>

                <div className="w-full lg:max-w-[380px]">
                    <div>
                        <h2 className="text-lg font-bold text-gray-700 pb-2 border-b border-gray-200 uppercase">All Categories</h2>
                        <ul className="flex flex-wrap gap-3 mt-5">
                            <li className="text-sm font-medium bg-white text-primary-400 border border-primary-400 px-2 py-1 rounded-lg text-nowrap">Tour Review</li>
                            <li className="text-sm font-medium bg-white text-primary-400 border border-primary-400 px-2 py-1 rounded-lg text-nowrap">Top Destinations</li>
                            <li className="text-sm font-medium bg-white text-primary-400 border border-primary-400 px-2 py-1 rounded-lg text-nowrap">Best Place</li>
                            <li className="text-sm font-medium bg-white text-primary-400 border border-primary-400 px-2 py-1 rounded-lg text-nowrap">Top Resort Review</li>
                            <li className="text-sm font-medium bg-white text-primary-400 border border-primary-400 px-2 py-1 rounded-lg text-nowrap">Best Restaurant</li>
                        </ul>
                    </div>

                    <div className="mt-10">
                        <h2 className="text-lg font-bold text-gray-700 pb-2 border-b border-gray-200 uppercase">Latest Post</h2>

                        <div className="mt-5 space-y-4">
                            <div className="flex gap-4 border border-gray-200 rounded-xl items-stretch">
                                <img className="object-cover w-[150px] rounded-l-xl" src={ImageWaterMark} />

                                <div className="py-4 pr-4">
                                    <p className="text-xs font-medium">January 10, 2026</p>
                                    <h6 className="text-base font-bold mt-1 mb-2 text-primary-900 hover:text-primary-500 cursor-pointer duration-300">Exploring The Green Spaces Of Realar Residence</h6>
                                </div>
                            </div>
                            <div className="flex gap-4 border border-gray-200 rounded-xl items-stretch">
                                <img className="object-cover w-[150px] rounded-l-xl" src={ImageWaterMark} />

                                <div className="py-4 pr-4">
                                    <p className="text-xs font-medium">January 10, 2026</p>
                                    <h6 className="text-base font-bold mt-1 mb-2 text-primary-900 hover:text-primary-500 cursor-pointer duration-300">Exploring The Green Spaces Of Realar Residence</h6>
                                </div>
                            </div>
                            <div className="flex gap-4 border border-gray-200 rounded-xl items-stretch">
                                <img className="object-cover w-[150px] rounded-l-xl" src={ImageWaterMark} />

                                <div className="py-4 pr-4">
                                    <p className="text-xs font-medium">January 10, 2026</p>
                                    <h6 className="text-base font-bold mt-1 mb-2 text-primary-900 hover:text-primary-500 cursor-pointer duration-300">Exploring The Green Spaces Of Realar Residence</h6>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="mt-10">
                        <h2 className="text-lg font-bold text-gray-700 pb-2 border-b border-gray-200 uppercase">Top Tags</h2>
                        <ul className="flex flex-wrap gap-3 mt-5">
                            <li className="text-sm font-medium bg-primary-400 text-white border px-2 py-1 rounded-lg text-nowrap">Tour Review</li>
                            <li className="text-sm font-medium bg-primary-400 text-white border px-2 py-1 rounded-lg text-nowrap">Top Destinations</li>
                            <li className="text-sm font-medium bg-primary-400 text-white border px-2 py-1 rounded-lg text-nowrap">Best Place</li>
                            <li className="text-sm font-medium bg-primary-400 text-white border px-2 py-1 rounded-lg text-nowrap">Top Resort Review</li>
                            <li className="text-sm font-medium bg-primary-400 text-white border px-2 py-1 rounded-lg text-nowrap">Best Restaurant</li>
                        </ul>
                    </div>
                </div>
            </section>
        </>
    );
};

export default BlogPage;