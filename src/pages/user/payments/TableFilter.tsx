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
    const statusValue = form.watch("status");

    const search = searchParams.get("search") || "";
    const status = searchParams.get("status") || "";
    const startDate = searchParams.get("startDate");

    useEffect(() => {
        form.setValue("search", search);
        form.setValue("status", status);
        if (startDate) {
            const [year, month, day] = startDate.split("-").map(Number);
            form.setValue("payment_date", new Date(year, month - 1, day));
        } else {
            form.setValue("payment_date", undefined);
        }
    }, [search, status, startDate, form]);

    const normalizeLocalDate = (date: Date) => new Date(date.getFullYear(), date.getMonth(), date.getDate());

    const onSubmit = (data: FieldValues) => {
        const value = data.search?.trim() ?? "";
        const newParams = new URLSearchParams(searchParams);

        if (value) newParams.set("search", value);
        else newParams.delete("search");

        newParams.set("page", "1");
        setSearchParams(newParams);
    };

    const handleStatusChange = (value: string) => {
        const params = new URLSearchParams(searchParams);
        if (value && value !== "all") {
            params.set("status", value);
        } else {
            params.delete("status");
        }
        params.set("page", "1");
        setSearchParams(params);
    };

    const handleDateChange = (date: Date | undefined) => {
        const params = new URLSearchParams(searchParams);
        if (date) {
            const normalizedDate = normalizeLocalDate(date);
            const dateStr = `${normalizedDate.getFullYear()}-${String(normalizedDate.getMonth() + 1).padStart(2, "0")}-${String(normalizedDate.getDate()).padStart(2, "0")}`;
            params.set("startDate", dateStr);
            params.set("endDate", dateStr);
        } else {
            params.delete("startDate");
            params.delete("endDate");
        }
        params.set("page", "1");
        setSearchParams(params);
    };

    const handleReset = () => {
        form.setValue("search", "");
        form.setValue("payment_date", undefined);
        form.setValue("status", "");
        const newParams = new URLSearchParams(searchParams);
        newParams.delete("search");
        newParams.delete("payment_date");
        newParams.delete("status");
        newParams.delete("startDate");
        newParams.delete("endDate");
        newParams.delete("page");
        setSearchParams(newParams);
    };

    const hasFilters = searchValue?.trim() || paymentDateValue || statusValue;

    return (
        <section className="flex flex-wrap justify-between gap-5 p-5 pb-8">
            <div className="flex flex-wrap gap-3">
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-3 flex flex-wrap gap-3"
                    >
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
                                                placeholder="Search by tour title..."
                                            />
                                        </FormControl>
                                    </div>
                                    <FormMessage className="!mt-1" />
                                </FormItem>
                            )}
                        />

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
                                                    onSelect={(date) => {
                                                        const normalizedDate = date ? normalizeLocalDate(date) : undefined;
                                                        field.onChange(normalizedDate);
                                                        handleDateChange(normalizedDate);
                                                    }}
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
                            <button
                                type="submit"
                                className="inline-flex items-center text-sm gap-1 font-semibold border border-primary-500 bg-primary-500 hover:bg-primary-600 px-4 py-[11px] text-white duration-300 rounded-lg"
                            >
                                Search <span><FiSearch /></span>
                            </button>
                        </div>
                    </form>
                </Form>

                {hasFilters && (
                    <div className="inline-block">
                        <button
                            onClick={handleReset}
                            type="button"
                            className="inline-flex items-center text-sm gap-1 font-semibold border border-red-500 hover:bg-red-500 px-4 py-[11px] text-red-500 hover:text-white duration-300 rounded-lg"
                        >
                            Reset <span><GrPowerReset /></span>
                        </button>
                    </div>
                )}
            </div>

            <Form {...form}>
                <FormField
                    control={form.control}
                    name="status"
                    render={() => (
                        <FormItem className="!mt-0">
                            <Select value={statusValue || ""} onValueChange={handleStatusChange}>
                                <FormControl>
                                    <SelectTrigger className="w-[180px] rounded-full shadow-none h-[44px] bg-white focus:ring-0 border border-primary-200">
                                        <SelectValue placeholder="Select status" />
                                    </SelectTrigger>
                                </FormControl>

                                <SelectContent>
                                    <SelectItem value="all">All Status</SelectItem>
                                    <SelectItem value="PAID">Paid</SelectItem>
                                    <SelectItem value="FAILED">Failed</SelectItem>
                                    <SelectItem value="CANCELLED">Cancel</SelectItem>
                                    <SelectItem value="UNPAID">Unpaid</SelectItem>
                                </SelectContent>
                            </Select>
                            <FormMessage className="!mt-1" />
                        </FormItem>
                    )}
                />
            </Form>
        </section>
    );
};

export default TableFilter;