import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useEffect } from "react";
import { useForm, type FieldValues } from "react-hook-form";
import { GrPowerReset } from "react-icons/gr";
import { useSearchParams } from "react-router";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { ChevronDownIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { FiSearch } from "react-icons/fi";

const TableFilter = () => {
    const form = useForm();
    const [searchParams, setSearchParams] = useSearchParams();
    const searchValue = form.watch("search");
    const paymentDateValue = form.watch("payment_date");
    const sortValue = searchParams.get("sort") || "";
    const search = searchParams.get("search") || "";
    const paymentDate = searchParams.get("payment_date");

    const queryParams: Record<string, string> = {};
    if (search) queryParams.search = search;

    useEffect(() => {
        form.setValue("search", search);
        if (paymentDate) {
            form.setValue("payment_date", new Date(paymentDate));
        } else {
            form.setValue("payment_date", undefined);
        }
    }, [search, paymentDate, form]);

    const onSubmit = (data: FieldValues) => {
        const value = data.search?.trim() ?? "";
        const newParams = new URLSearchParams(searchParams);
        if (value) newParams.set("search", value);
        else newParams.delete("search");
        newParams.set("page", "1");
        setSearchParams(newParams);
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
        params.delete("page");
        setSearchParams(params);
    };

    const handleReset = () => {
        form.setValue("search", "");
        form.setValue("payment_date", undefined);
        const newParams = new URLSearchParams(searchParams);
        newParams.delete("search");
        newParams.delete("payment_date");
        newParams.delete("page");
        setSearchParams(newParams);
    };

    return (
        <section className="flex flex-wrap justify-between gap-5 p-5 pb-8">
            <div className="flex flex-wrap gap-3">
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-3 flex flex-wrap gap-3"
                    >

                        {/* Search Field */}
                        <FormField
                            control={form.control}
                            name="search"
                            render={({ field }) => (
                                <FormItem className="!mt-0">
                                    <div className="relative">
                                        <FormControl>
                                            <Input
                                                {...field}
                                                type="text"
                                                className="tp-input !w-[212px]"
                                                placeholder="Search by tour name..."
                                            />
                                        </FormControl>
                                    </div>

                                    <FormMessage className="!mt-1" />
                                </FormItem>
                            )}
                        />

                        {/* Payment Date Field */}
                        <FormField
                            control={form.control}
                            name="payment_date"
                            render={({ field }) => (
                                <FormItem className="!mt-0">
                                    <div>
                                        <Popover>
                                            <PopoverTrigger asChild>
                                                <Button
                                                    variant="outline"
                                                    className="w-[212px] h-11 hover:bg-white hover:border-primary-400 justify-between font-normal"
                                                >
                                                    {field.value
                                                        ? new Date(field.value).toLocaleDateString()
                                                        : "Select date"}
                                                    <ChevronDownIcon />
                                                </Button>
                                            </PopoverTrigger>

                                            <PopoverContent className="w-full p-0" align="start">
                                                <Calendar
                                                    mode="single"
                                                    selected={field.value}
                                                    onSelect={field.onChange}
                                                    captionLayout="dropdown"
                                                />
                                            </PopoverContent>
                                        </Popover>
                                    </div>

                                    <FormMessage className="!mt-1" />
                                </FormItem>
                            )}
                        />

                        <div className="inline-block !mt-0">
                            <button type="submit" className="inline-flex items-center text-sm gap-1 font-semibold border border-primary-500 bg-primary-500 hover:bg-primary-600 px-4 py-[11px] text-white duration-300 rounded-lg">Search <span><FiSearch /></span></button>
                        </div>
                    </form>
                </Form>
                {(searchValue?.trim() || paymentDateValue) && (
                    <div className="inline-block">
                        <button onClick={handleReset} type="button" className="inline-flex items-center text-sm gap-1 font-semibold border border-red-500 hover:bg-red-500 px-4 py-[11px] text-red-500 hover:text-white duration-300 rounded-lg">Reset <span><GrPowerReset /></span></button>
                    </div>
                )}
            </div>
            <Select value={sortValue} onValueChange={handleSortChange}>
                <SelectTrigger className="w-[160px] rounded-full shadow-none h-[34px] bg-white focus:ring-0 border border-primary-200">
                    <SelectValue placeholder="Select status" />
                </SelectTrigger>

                <SelectContent>
                    <SelectItem value="paid">Paid</SelectItem>
                    <SelectItem value="failed">Failed</SelectItem>
                    <SelectItem value="cancel">Cancel</SelectItem>
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
        </section>
    );
};

export default TableFilter;