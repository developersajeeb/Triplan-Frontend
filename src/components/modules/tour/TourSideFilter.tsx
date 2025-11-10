import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { useState } from "react";
import { useForm, type FieldValues, type SubmitHandler } from "react-hook-form";
import { FaStar } from "react-icons/fa6";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { RiSearch2Line } from "react-icons/ri";

interface Props {
    className?: string
}

const tourTypes = [
    "Adventure Tours",
    "Cultural Tours",
    "Wildlife Safaris",
    "Beach Holidays",
    "Mountain Treks",
    "City Sightseeing",
    "Cruise Trips",
    "Historical Tours",
    "Food & Wine Tours",
    "Family Vacations",
];

const bangladeshDivisions = [
    "Dhaka",
    "Chattogram",
    "Khulna",
    "Rajshahi",
    "Barishal",
    "Sylhet",
    "Rangpur",
    "Mymensingh",
];

const TourSideFilter = ({ className }: Props) => {
    const form = useForm();
    const [priceRange, setPriceRange] = useState([0, 800]);
    const [selectedReviewSet, setSelectedReviewSet] = useState<Set<number>>(new Set());

    const [selectedTourTypeSet, setSelectedTourTypeSet] = useState<Set<string>>(new Set());
    const [showAllTourType, setShowAllTourType] = useState<boolean>(false);

    const [selectedDivisionSet, setSelectedDivisionSet] = useState<Set<string>>(new Set());
    const [showAllDivision, setShowAllDivision] = useState<boolean>(false);

    const toggleReviewSelection = (star: number, checked: boolean) => {
        setSelectedReviewSet((prev) => {
            const next = new Set(prev);
            if (checked) next.add(star);
            else next.delete(star);
            return next;
        });
    };

    const toggleSelection = (type: string, checked: boolean) => {
        setSelectedTourTypeSet((prev) => {
            const next = new Set(prev);
            if (checked) next.add(type);
            else next.delete(type);
            return next;
        });
    };

    const toggleDivisionSelection = (type: string, checked: boolean) => {
        setSelectedDivisionSet((prev) => {
            const next = new Set(prev);
            if (checked) next.add(type);
            else next.delete(type);
            return next;
        });
    };

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

    const searchValue = form.getValues("search") || "";
    const isResetDisabled =
        priceRange[0] === 0 &&
        priceRange[1] === 800 &&
        selectedTourTypeSet.size === 0 &&
        selectedDivisionSet.size === 0 &&
        selectedReviewSet.size === 0 &&
        searchValue.trim() === "";

    return (
        <aside className={`${className || ""} w-full lg:w-[350px] bg-white rounded-xl border border-gray-200 shadow-[0px_4px_24px_0px_rgba(194, 194, 194, 0.25)]`}>
            <div className='flex justify-between items-center px-5 py-4 border-b border-gray-200'>
                <h2 className='text-gray-800 text-xl font-bold'>Filters</h2>
                <button
                    onClick={() => {
                        form.reset();
                        setPriceRange([0, 800]);
                        setSelectedTourTypeSet(new Set());
                        setShowAllTourType(false);
                        setSelectedDivisionSet(new Set());
                        setShowAllDivision(false);
                        setSelectedReviewSet(new Set());
                    }}
                    disabled={isResetDisabled}
                    className={`text-sm font-semibold px-3 py-1 rounded-full ${isResetDisabled ? "text-gray-400 pointer-events-none bg-gray-200" : "text-white bg-primary-500 hover:bg-primary-700 duration-300"}`}
                >Reset</button>
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

            <Accordion type="multiple" defaultValue={["price-range", "tour-types", "division", "reviews"]}>
                <AccordionItem value="price-range" className="border-0">
                    <div className="flex w-full max-w-md flex-col gap-2 px-5 py-4 border-b border-gray-200">
                        <AccordionTrigger className="p-0 hover:no-underline">
                            <Label htmlFor="priceRange" className="text-base font-semibold text-gray-800 cursor-pointer">Price Range</Label>
                        </AccordionTrigger>
                        <AccordionContent className="p-0">
                            <Slider
                                className="mt-3"
                                id="priceRange"
                                max={1000}
                                min={0}
                                onValueChange={setPriceRange}
                                value={priceRange}
                            />
                            <div className="flex items-center justify-between text-muted-foreground font-medium mt-2">
                                <span>${priceRange[0]}</span>
                                <span>${priceRange[1]}</span>
                            </div>
                        </AccordionContent>
                    </div>
                </AccordionItem>

                <AccordionItem value="tour-types" className="border-0">
                    <div className="px-5 py-4 border-b border-gray-200">
                        <AccordionTrigger className="p-0 hover:no-underline">
                            <p className="text-base font-semibold text-gray-800 cursor-pointer">Tour Types</p>
                        </AccordionTrigger>

                        <AccordionContent className="p-0">
                            <div className="flex flex-col gap-3 mt-5">
                                {(showAllTourType ? tourTypes : tourTypes.slice(0, 5)).map((type) => {
                                    const id = `tour-type-${type.replace(/\s+/g, "-").toLowerCase()}`;
                                    const checked = selectedTourTypeSet.has(type);

                                    return (
                                        <div key={type} className="flex items-center gap-3">
                                            <Checkbox
                                                id={id}
                                                checked={checked}
                                                onCheckedChange={(val: boolean | "indeterminate") =>
                                                    toggleSelection(type, Boolean(val))
                                                }
                                            />
                                            <Label className="cursor-pointer text-gray-600" htmlFor={id}>{type}</Label>
                                        </div>
                                    );
                                })}
                            </div>

                            {tourTypes.length > 5 && (
                                <button
                                    onClick={() => setShowAllTourType((s) => !s)}
                                    className="text-primary-500 hover:text-primary-600 duration-300 text-sm font-semibold mt-3 underline underline-offset-2 flex items-center gap-1"
                                >
                                    {showAllTourType ? "See less" : "See more"}{" "}
                                    <span className="pt-1">
                                        {showAllTourType ? <IoIosArrowUp size={16} /> : <IoIosArrowDown size={16} />}
                                    </span>
                                </button>
                            )}
                        </AccordionContent>
                    </div>
                </AccordionItem>

                <AccordionItem value="division" className="border-0">
                    <div className="px-5 py-4 border-b border-gray-200">
                        <AccordionTrigger className="p-0 hover:no-underline">
                            <p className="text-base font-semibold text-gray-800 cursor-pointer">Division</p>
                        </AccordionTrigger>

                        <AccordionContent className="p-0">
                            <div className="flex flex-col gap-3 mt-5">
                                {(showAllDivision ? bangladeshDivisions : bangladeshDivisions.slice(0, 5)).map((type) => {
                                    const id = `tour-type-${type.replace(/\s+/g, "-").toLowerCase()}`;
                                    const checked = selectedDivisionSet.has(type);

                                    return (
                                        <div key={type} className="flex items-center gap-3">
                                            <Checkbox
                                                id={id}
                                                checked={checked}
                                                onCheckedChange={(val: boolean | "indeterminate") =>
                                                    toggleDivisionSelection(type, Boolean(val))
                                                }
                                            />
                                            <Label className="cursor-pointer text-gray-600" htmlFor={id}>{type}</Label>
                                        </div>
                                    );
                                })}
                            </div>

                            {tourTypes.length > 5 && (
                                <button
                                    onClick={() => setShowAllDivision((s) => !s)}
                                    className="text-primary-500 hover:text-primary-600 duration-300 text-sm font-semibold mt-3 underline underline-offset-2 flex items-center gap-1"
                                >
                                    {showAllDivision ? "See less" : "See more"}{" "}
                                    <span className="pt-1">
                                        {showAllDivision ? <IoIosArrowUp size={16} /> : <IoIosArrowDown size={16} />}
                                    </span>
                                </button>
                            )}
                        </AccordionContent>
                    </div>
                </AccordionItem>

                <AccordionItem value="reviews" className="border-0">
                    <div className="px-5 pt-4 pb-6">
                        <AccordionTrigger className="p-0 hover:no-underline">
                            <p className="text-base font-semibold text-gray-800">Review</p>
                        </AccordionTrigger>

                        <AccordionContent className="p-0">
                            <div className="flex flex-col gap-3 mt-5">
                                {[5, 4, 3, 2, 1].map((star) => {
                                    const id = `review-star-${star}`;
                                    const checked = selectedReviewSet.has(star);

                                    return (
                                        <div key={star} className="flex items-center gap-3">
                                            <Checkbox
                                                id={id}
                                                checked={checked}
                                                onCheckedChange={(val: boolean | "indeterminate") =>
                                                    toggleReviewSelection(star, Boolean(val))
                                                }
                                            />
                                            <Label
                                                className="cursor-pointer text-gray-600 flex items-center gap-1"
                                                htmlFor={id}
                                            >
                                                <span className="flex">
                                                    {[...Array(5)].map((_, i) => (
                                                        <FaStar size={18} key={i} className={i < star ? "text-yellow-500" : "text-gray-300"} />
                                                    ))}
                                                </span>
                                                {star} Star
                                            </Label>
                                        </div>
                                    );
                                })}
                            </div>
                        </AccordionContent>
                    </div>
                </AccordionItem>
            </Accordion>
        </aside>
    );
};

export default TourSideFilter;