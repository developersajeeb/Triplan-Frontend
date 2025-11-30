import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { Slider } from "@/components/ui/slider";
import { useGetDivisionsQuery } from "@/redux/features/division/division.api";
import { useGetTourTypesQuery } from "@/redux/features/tour/tour.api";
import type { RootState } from "@/redux/store";
import type { IDivision } from "@/types/division.type";
import type { ITourType } from "@/types/tour.type";
import { useEffect, useState } from "react";
import { useForm, type FieldValues } from "react-hook-form";
import { FaStar } from "react-icons/fa6";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { RiSearch2Line } from "react-icons/ri";
import { useSelector } from "react-redux";
import { useSearchParams } from "react-router";

interface Props {
    className?: string
}

const TourSideFilter = ({ className }: Props) => {
    const { tourMaxPrice, isLoading } = useSelector((state: RootState) => state.price);
    const { data: tourTypes, isLoading: isTourTypesLoading } = useGetTourTypesQuery(undefined);
    const tourTypeList = Array.isArray(tourTypes?.data) ? tourTypes.data : [];
    const { data: divisions, isLoading: isDivisionsLoading } = useGetDivisionsQuery(undefined);

    const [searchParams, setSearchParams] = useSearchParams();
    const hasQueryParams = searchParams.toString().length > 0;
    const form = useForm();
    const [priceRange, setPriceRange] = useState([0, 0]);
    useEffect(() => {
        if (!tourMaxPrice) return;

        const min = Number(searchParams.get("minPrice") ?? 0);
        const max = Number(searchParams.get("maxPrice") ?? tourMaxPrice);

        setPriceRange([min, max]);
    }, [searchParams, tourMaxPrice]);
    const [selectedReviewSet, setSelectedReviewSet] = useState<Set<number>>(new Set());

    const [selectedTourTypeSet, setSelectedTourTypeSet] = useState<Set<string>>(new Set());
    const [showAllTourType, setShowAllTourType] = useState<boolean>(false);
    useEffect(() => {
        const params = searchParams.get("tourType");
        if (params) {
            setSelectedTourTypeSet(new Set(params.split(",")));
        }
    }, [searchParams]);

    const [selectedDivisionSet, setSelectedDivisionSet] = useState<Set<string>>(new Set());
    const [showAllDivision, setShowAllDivision] = useState<boolean>(false);
    useEffect(() => {
        const params = searchParams.get("division");
        if (params) {
            setSelectedDivisionSet(new Set(params.split(",")));
        }
    }, [searchParams]);

    useEffect(() => {
        const searchText = searchParams.get("search") || "";
        if (searchText) {
            form.setValue("search", searchText);
        }
    }, [form, searchParams]);

    useEffect(() => {
        const ratingParam = searchParams.get("rating");
        if (ratingParam) {
            setSelectedReviewSet(new Set(ratingParam.split(",").map(Number)));
        }
    }, [searchParams]);

    const toggleReviewSelection = (star: number, checked: boolean) => {
        setSelectedReviewSet((prev) => {
            const next = new Set(prev);
            if (checked) next.add(star);
            else next.delete(star);
            return next;
        });
    };

    const handlePriceChange = (value: number[]) => {
        setPriceRange(value);
        searchParams.set("minPrice", String(value[0]));
        searchParams.set("maxPrice", String(value[1]));
        setSearchParams(searchParams);
    };

    const toggleSelection = (type: string, checked: boolean) => {
        const next = new Set(selectedTourTypeSet);

        if (checked) next.add(type);
        else next.delete(type);

        setSelectedTourTypeSet(next);

        const newParams = new URLSearchParams(searchParams);
        newParams.set("tourType", Array.from(next).join(","));
        setSearchParams(newParams);
    };

    const toggleDivisionSelection = (division: string, checked: boolean) => {
        const next = new Set(selectedDivisionSet);

        if (checked) next.add(division);
        else next.delete(division);

        setSelectedDivisionSet(next);

        const newParams = new URLSearchParams(searchParams);
        newParams.set("division", Array.from(next).join(","));
        setSearchParams(newParams);
    };

    const onSubmit = (data: FieldValues) => {
        searchParams.set("search", data.search || "");
        setSearchParams(searchParams);
    };

    const searchValue = form.getValues("search") || "";
    const isResetDisabled =
        priceRange[0] === 0 &&
        priceRange[1] === tourMaxPrice &&
        selectedTourTypeSet.size === 0 &&
        selectedDivisionSet.size === 0 &&
        selectedReviewSet.size === 0 &&
        searchValue.trim() === "" &&
        !hasQueryParams;

    return (
        <aside className={`${className || ""} w-full lg:w-[350px] bg-white rounded-xl border border-gray-200 shadow-[0px_4px_24px_0px_rgba(194, 194, 194, 0.25)]`}>
            <div className='flex justify-between items-center px-5 py-4 border-b border-gray-200'>
                <h2 className='text-gray-800 text-xl font-bold'>Filters</h2>
                <button
                    onClick={() => {
                        form.reset();
                        setPriceRange([0, tourMaxPrice]);
                        setSelectedTourTypeSet(new Set());
                        setSelectedDivisionSet(new Set());
                        setSelectedReviewSet(new Set());

                        searchParams.delete("minPrice");
                        searchParams.delete("maxPrice");
                        searchParams.delete("tourType");
                        searchParams.delete("division");
                        searchParams.delete("rating");
                        searchParams.delete("search");
                        searchParams.delete("sort");

                        setSearchParams(searchParams);
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
                                        Search by Tour Name
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

            <Accordion type="multiple" defaultValue={["price-range", "tour-types", "destination", "reviews"]}>
                <AccordionItem value="price-range" className="border-0">
                    <div className="flex w-full max-w-md flex-col gap-2 px-5 py-4 border-b border-gray-200">
                        <AccordionTrigger className="p-0 hover:no-underline">
                            <Label htmlFor="priceRange" className="text-base font-semibold text-gray-800 cursor-pointer">Price Range</Label>
                        </AccordionTrigger>
                        <AccordionContent className="p-0">
                            {isLoading ? (
                                <div className="mt-3">
                                    <Skeleton className="h-4 w-full" />
                                    <div className="flex justify-between mt-2">
                                        <Skeleton className="h-4 w-8" />
                                        <Skeleton className="h-4 w-8" />
                                    </div>
                                </div>
                            ) : (
                                <>
                                    <Slider
                                        className="mt-3"
                                        id="priceRange"
                                        min={0}
                                        max={tourMaxPrice || 0}
                                        value={priceRange}
                                        onValueChange={handlePriceChange}
                                    />

                                    <div className="flex items-center justify-between text-muted-foreground font-medium mt-2">
                                        <span>৳{priceRange[0]}</span>
                                        <span>৳{priceRange[1]}</span>
                                    </div>
                                </>
                            )}
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
                                {
                                    isTourTypesLoading
                                        ? Array.from({ length: 5 }).map((_, i) => (
                                            <div key={i} className="flex items-center gap-1 w-full h-full">
                                                <Skeleton className="h-4 w-4" />
                                                <Skeleton className="h-4 w-[140px]" />
                                            </div>
                                        ))
                                        : (showAllTourType ? tourTypeList : tourTypeList.slice(0, 5)).map((type: ITourType) => {
                                            const id = `tour-type-${type?.name?.replace(/\s+/g, "-").toLowerCase()}`;
                                            const checked = selectedTourTypeSet.has(type?.name);

                                            return (
                                                <div key={type?._id} className="flex items-center gap-3">
                                                    <Checkbox
                                                        id={id}
                                                        checked={checked}
                                                        onCheckedChange={(val) => toggleSelection(
                                                            type?.name,
                                                            val === true
                                                        )}
                                                    />
                                                    <Label className="cursor-pointer text-gray-600" htmlFor={id}>{type?.name}</Label>
                                                </div>
                                            );
                                        })}
                            </div>

                            {!isTourTypesLoading && tourTypeList.length > 5 && (
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

                <AccordionItem value="destination" className="border-0">
                    <div className="px-5 py-4 border-b border-gray-200">
                        <AccordionTrigger className="p-0 hover:no-underline">
                            <p className="text-base font-semibold text-gray-800 cursor-pointer">Destination</p>
                        </AccordionTrigger>

                        <AccordionContent className="p-0">
                            <div className="flex flex-col gap-3 mt-5">
                                {
                                    isDivisionsLoading
                                        ? Array.from({ length: 5 }).map((_, i) => (
                                            <div key={i} className="flex items-center gap-1 w-full h-full">
                                                <Skeleton className="h-4 w-4" />
                                                <Skeleton className="h-4 w-[140px]" />
                                            </div>
                                        ))
                                        : (showAllDivision ? (divisions?.data ?? []) : (divisions?.data?.slice(0, 5) ?? [])).map((division: IDivision) => {
                                            const id = `division-${division?.name.replace(/\s+/g, "-").toLowerCase()}`;
                                            const checked = selectedDivisionSet.has(division?.name);

                                            return (
                                                <div key={division?._id} className="flex items-center gap-3">
                                                    <Checkbox
                                                        id={id}
                                                        checked={checked}
                                                        onCheckedChange={(val) =>
                                                            toggleDivisionSelection(division.name, val === true)
                                                        }
                                                    />
                                                    <Label className="cursor-pointer text-gray-600" htmlFor={id}>
                                                        {division?.name}
                                                    </Label>
                                                </div>
                                            );
                                        })
                                }
                            </div>

                            {!isDivisionsLoading && Array.isArray(divisions) && divisions.length > 5 && (
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