import DestinationCard from "@/components/modules/destination/DestinationCard";
import PageBanner from "@/components/shared/sections/PageBanner";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetDivisionsQuery } from "@/redux/features/division/division.api";
import type { IDivision } from "@/types/division.type";
import { useEffect } from "react";
import { useForm, type FieldValues } from "react-hook-form";
import { useSearchParams } from "react-router";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RiSearch2Line } from "react-icons/ri";
import PaginationComponent from "@/components/ui/PaginationComponent";
import { GrPowerReset } from "react-icons/gr";
import TriPlanBanner from "@/assets/images/seo/triplan-banner.webp";
import CommonMetadata from "@/components/utilities/CommonMetadata";
import JsonLd from "@/components/utilities/JsonLd";

const DestinationsPage = () => {
    const form = useForm();
    const [searchParams, setSearchParams] = useSearchParams();
    const search = searchParams.get("search") || "";
    const page = searchParams.get("page") || "1";

    const queryParams: Record<string, string> = {};
    if (search) queryParams.search = search;
    if (page) queryParams.page = page;

    const { data: divisionRes, isLoading, isFetching } = useGetDivisionsQuery(queryParams);

    const divisions = divisionRes?.data ?? [];
    const meta = divisionRes?.meta;

    useEffect(() => {
        form.setValue("search", search);
    }, [search, form]);

    const onSubmit = (data: FieldValues) => {
        const value = data.search?.trim() ?? "";
        const newParams = new URLSearchParams(searchParams);
        if (value) newParams.set("search", value);
        else newParams.delete("search");
        newParams.set("page", "1");
        setSearchParams(newParams);
    };

    const handleReset = () => {
        form.setValue("search", "");
        const newParams = new URLSearchParams(searchParams);
        newParams.delete("search");
        newParams.delete("page");
        setSearchParams(newParams);
    };

    const searchValue = form.watch("search");

    const destinationsPageSchema = {
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        name: "Destinations",
        description: "Explore the best travel destinations with triplan. Search and find your perfect place to visit.",
        url: "https://triplan.developersajeeb.com/destinations",
        image: TriPlanBanner
    };

    return (
        <>
            <CommonMetadata
                title="Destinations – Explore Amazing Places with triplan"
                description="Discover top travel destinations with triplan. Search, explore, and plan your perfect trip with detailed guides, tours, and travel tips."
                featureImage={TriPlanBanner}
                canonicalUrl="https://triplan.com/destinations"
            />
            <JsonLd data={destinationsPageSchema} />

            <PageBanner title='Destinations' />
            <section className="pt-8 tp-container flex gap-3">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="w-full max-w-[250px]">
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
                                                placeholder="Search destinations..."
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
                {searchValue && searchValue.trim() !== "" && (
                    <div>
                        <button onClick={handleReset} type="button" className="flex items-center text-sm gap-1 font-semibold border border-red-500 hover:bg-red-500 px-4 py-[11px] text-red-500 hover:text-white duration-300 rounded-lg">Reset <span><GrPowerReset /></span></button>
                    </div>
                )}
            </section>

            {isLoading || isFetching ? (
                <section className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 tp-container py-10 md:py-14">
                    <Skeleton className="h-[420px] rounded-2xl" />
                    <Skeleton className="h-[420px] rounded-2xl" />
                    <Skeleton className="h-[420px] rounded-2xl" />
                </section>
            ) : divisions.length > 0 ? (
                <section className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 tp-container py-10 md:py-14">
                    {divisions.map((item: IDivision) => (
                        <DestinationCard key={item._id} item={item} />
                    ))}
                </section>
            ) : (
                <p className="text-center font-medium text-xl text-gray-500 py-10">
                    No destination available.
                </p>
            )}

            {meta && (
                <div className="mt-6 tp-container pb-12">
                    <PaginationComponent
                        currentPage={meta.page}
                        totalPages={meta.totalPage}
                        onPageChange={(newPage) => {
                            searchParams.set("page", String(newPage));
                            setSearchParams(searchParams);
                        }}
                    />
                </div>
            )}
        </>
    );
};

export default DestinationsPage;