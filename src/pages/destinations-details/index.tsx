import { useGetSingleDivisionsQuery } from "@/redux/features/division/division.api";
import { useParams, useSearchParams } from "react-router";
import pageBgImage from '@/assets/images/page-banner-bg.jpg';
import { Skeleton } from "@/components/ui/skeleton";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { LuGrid2X2 } from "react-icons/lu";
import { RiListCheck2 } from "react-icons/ri";
import React, { useEffect, useState } from "react";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RiSearch2Line } from "react-icons/ri";
import { Button } from "@/components/ui/button";
import { useForm, type FieldValues } from "react-hook-form";
import { GrPowerReset } from "react-icons/gr";
import { useGetAllToursQuery } from "@/redux/features/tour/tour.api";
import PaginationComponent from "@/components/ui/PaginationComponent";
import TourCardLoader from "@/components/shared/blocks/TourCardLoader";
import type { ITourPackage } from "@/types";
import TourCardBox from "@/components/modules/tour/TourCardBox";
import TourCardList from "@/components/modules/tour/TourCardList";

const DestinationDetails = () => {
    const { slug } = useParams();
    const form = useForm();
    const [viewType, setViewType] = useState("grid");
    const [searchParams, setSearchParams] = useSearchParams();
    const searchValueFromURL = searchParams.get("search") || "";
    const sortValue = searchParams.get("sort") || "newest";

    const { data: destination, isLoading: isDestinationLoading } = useGetSingleDivisionsQuery(slug);

    const queryParams: Record<string, string> = {};

    const search = searchParams.get("search");
    const sort = searchParams.get("sort");
    const page = searchParams.get("page") || "1";

    if (search) queryParams.search = search;
    if (sort) queryParams.sort = sort;
    if (page) queryParams.page = page;

    if (destination?.data?.name) {
        queryParams.division = destination.data.name;
    }

    const { data: toursData, isLoading: isTourLoading, isFetching } = useGetAllToursQuery(queryParams);

    console.log(toursData);


    useEffect(() => {
        form.setValue("search", searchValueFromURL);
    }, [searchValueFromURL, form]);

    const onSubmit = (data: FieldValues) => {
        const params = new URLSearchParams(searchParams);
        params.set("search", data.search || "");
        params.set("page", "1");
        setSearchParams(params);
    };

    const handleSortChange = (value: string) => {
        const params = new URLSearchParams(searchParams);
        params.set("sort", value);
        params.set("page", "1");
        setSearchParams(params);
    };

    const handleResetSort = () => {
        const params = new URLSearchParams(searchParams);
        params.delete("sort");
        params.set("page", "1");
        setSearchParams(params);
    };

    const handleReset = () => {
        const params = new URLSearchParams(searchParams);
        form.setValue("search", "");
        params.delete("search");
        params.delete("page");
        setSearchParams(params);
    };

    const searchValue = form.watch("search");

    return (
        <>
            {isDestinationLoading ?
                <div className="py-10 md:py-16 bg-gray-50">
                    <div className="max-w-4xl mx-auto px-5">
                        <Skeleton className="mx-auto mb-5 max-w-60 h-10 rounded-full" />
                        <Skeleton className="mx-auto mb-2 max-w-full h-5 rounded-full" />
                        <Skeleton className="mx-auto mb-2 max-w-3xl h-5 rounded-full" />
                        <Skeleton className="mx-auto max-w-2xl h-5 rounded-full" />
                    </div>
                </div>
                :
                <section className="bg-cover bg-no-repeat bg-center relative py-10 md:py-16" style={{ backgroundImage: `url(${destination?.data?.thumbnail || pageBgImage})` }}>
                    <div className="absolute top-0 right-0 left-0 bottom-0 inset-0 bg-black/50"></div>
                    <div className='max-w-4xl px-5 mx-auto text-center relative'>
                        <h1 className='text-4xl md:text-5xl lg:text-6xl text-white font-semibold tracking-tight'>{destination?.data?.name || 'Title missing!'}</h1>
                        {destination?.data?.description && (
                            <p className="text-white text-base mt-5 opacity-90">
                                {destination?.data?.description}
                            </p>
                        )}
                    </div>
                </section>
            }

            <section className="tp-container pt-8 pb-16 flex justify-between">
                <div className="flex gap-3">
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)}>
                            <FormField
                                control={form.control}
                                name="search"
                                render={({ field }) => (
                                    <FormItem className="relative">
                                        <FormControl>
                                            <Input
                                                {...field}
                                                value={field.value || ""}
                                                type="text"
                                                className="tp-input !pr-12"
                                                placeholder="Search by tour name..."
                                            />
                                        </FormControl>

                                        <Button
                                            type="submit"
                                            size="icon"
                                            className="h-[34px] w-[36px] rounded-md bg-gray-200 hover:bg-primary-500 text-gray-800 hover:text-white duration-300 absolute right-1 -top-1"
                                        >
                                            <RiSearch2Line className="!h-[18px] !w-[18px]" />
                                        </Button>

                                        <FormMessage className="!mt-1" />
                                    </FormItem>
                                )}
                            />
                        </form>
                    </Form>
                    {searchValue && searchValue.trim() !== "" && (
                        <div>
                            <button onClick={handleReset} type="button" className="flex items-center text-sm gap-1 font-semibold border border-red-500 hover:bg-red-500 px-4 py-[11px] text-red-500 hover:text-white duration-300 rounded-lg">Reset <span><GrPowerReset /></span></button>
                        </div>
                    )}
                </div>

                <div className='flex gap-3'>
                    <Select value={sortValue} onValueChange={handleSortChange}>
                        <SelectTrigger className="w-[160px] rounded-full shadow-none h-[34px] bg-white focus:ring-0 border border-primary-200">
                            <SelectValue placeholder="Sort by" />
                        </SelectTrigger>

                        <SelectContent>

                            <SelectItem value="newest">Newest</SelectItem>
                            <SelectItem value="priceLowToHigh">Price: Low to High</SelectItem>
                            <SelectItem value="priceHighToLow">Price: High to Low</SelectItem>
                            <div className="border-t mt-2 pt-2 px-2 pb-1">
                                <button
                                    onClick={handleResetSort}
                                    className="w-full text-center py-2 text-sm font-medium rounded-md bg-red-100 hover:bg-red-200 text-red-700"
                                >
                                    Reset
                                </button>
                            </div>

                        </SelectContent>
                    </Select>

                    <ul className='flex gap-2'>
                        <li>
                            <span
                                onClick={() => setViewType("grid")}
                                className={`inline-block cursor-pointer p-1 rounded ${viewType === "grid"
                                    ? "bg-primary-500 text-white"
                                    : "hover:bg-primary-500 hover:text-white duration-300 text-gray-800"
                                    }`}
                            >
                                <LuGrid2X2 size={22} />
                            </span>
                        </li>

                        <li>
                            <span
                                onClick={() => setViewType("list")}
                                className={`inline-block cursor-pointer p-1 rounded ${viewType === "list"
                                    ? "bg-primary-500 text-white"
                                    : "hover:bg-primary-500 hover:text-white duration-300 text-gray-800"
                                    }`}
                            >
                                <RiListCheck2 size={22} />
                            </span>
                        </li>
                    </ul>
                </div>
            </section>

            <section className="tp-container">
                {isTourLoading || isDestinationLoading || isFetching ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                        {[...Array(3)].map((_, i) => (
                            <React.Fragment key={i}><TourCardLoader /></React.Fragment>
                        ))}
                    </div>
                ) : (toursData?.data ?? []).length > 0 ? (

                    viewType === "grid" ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                            {(toursData?.data ?? []).map((tour: ITourPackage) => (
                                <React.Fragment key={tour.slug}><TourCardBox tour={tour} /></React.Fragment>
                            ))}
                        </div>
                    ) : (
                        <div className="flex flex-col gap-4">
                            {(toursData?.data  ?? []).map((tour: ITourPackage) => (
                                <TourCardList key={tour.slug} tour={tour} />
                            ))}
                        </div>
                    )

                ) : (
                    <p className="text-center font-medium text-xl text-gray-500">
                        No tours available.
                    </p>
                )}
            </section>
            <div className='mt-8 mb-14 tp-container'>
                <PaginationComponent
                    currentPage={toursData?.meta?.page || 1}
                    totalPages={toursData?.meta?.totalPages || 1}
                    onPageChange={(page) => setSearchParams({ page: String(page) })}
                />
            </div>
        </>
    );
};

export default DestinationDetails;