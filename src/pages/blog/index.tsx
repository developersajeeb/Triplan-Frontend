import PageBanner from "@/components/shared/sections/PageBanner";
import { Button } from "@/components/ui/button";
import { FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Form } from "@/components/ui/form";
import { useForm, type FieldValues } from "react-hook-form";
import { RiSearch2Line } from "react-icons/ri";
import { useSearchParams } from "react-router";
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

            <div className="tp-container pt-8 pb-14">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="w-full max-w-sm">
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
                                                className="tp-input w-full !pr-12"
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

                <div className="grid md:grid-cols-3 gap-7 mt-8">
                    <BlogCard />
                    <BlogCard />
                    <BlogCard />
                </div>
            </div>
        </>
    );
};

export default BlogPage;