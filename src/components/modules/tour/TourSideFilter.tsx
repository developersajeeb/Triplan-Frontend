import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { useState } from "react";
import { useForm, type FieldValues, type SubmitHandler } from "react-hook-form";
import { RiSearch2Line } from "react-icons/ri";

interface Props {
    className?: string
}

const TourSideFilter = ({ className }: Props) => {
    const form = useForm();
    const [priceRange, setPriceRange] = useState([0, 800]);

    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        try {
            // setIsLoginBtnLoading(true);
            console.log("Form Data:", data);
            // setFromSuccessMassage("Thank you for reaching out to triPlan. Our team will get back to you shortly.");
            form.reset();

        } catch (error) {
            console.error("Subscription error:", error);
            // setFromErrorMassage("Something went wrong. Please try again.");
        } finally {
            // setIsLoginBtnLoading(false);
        }
    };

    return (
        <aside className={`${className || ""} w-full lg:w-[350px] bg-white rounded-xl border border-gray-200 shadow-[0px_4px_24px_0px_rgba(194, 194, 194, 0.25)]`}>
            <div className='flex justify-between items-center px-5 py-4 border-b border-gray-200'>
                <h2 className='text-gray-800 text-xl font-bold'>Filters</h2>
                <button className='text-sm font-semibold text-primary-400'>Reset</button>
            </div>

            <div className="px-5 pt-4 pb-6 border-b border-gray-200">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                        <FormField
                            control={form.control}
                            name="search"
                            rules={{ required: "Please enter a search term" }}
                            render={({ field }) => (
                                <FormItem>
                                    <Label className="text-sm font-semibold text-gray-600">
                                        Search by Tour Type
                                    </Label>

                                    <div className="relative">
                                        <FormControl>
                                            <Input
                                                {...field}
                                                value={field.value || ""}
                                                type="text"
                                                className="tp-input !pr-12"
                                                placeholder="Search..."
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

            <div className="flex w-full max-w-md flex-col gap-2 px-5 py-4 border-b border-gray-200">
                <Label htmlFor="priceRange" className="text-base font-semibold text-gray-800">Price Range</Label>
                <Slider
                    className="mt-3"
                    id="priceRange"
                    max={1000}
                    min={0}
                    onValueChange={setPriceRange}
                    value={priceRange}
                />
                <div className="flex items-center justify-between text-muted-foreground font-medium">
                    <span>${priceRange[0]}</span>
                    <span>${priceRange[1]}</span>
                </div>
            </div>
        </aside>
    );
};

export default TourSideFilter;