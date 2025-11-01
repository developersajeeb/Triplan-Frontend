/* eslint-disable @typescript-eslint/no-explicit-any */
import SingleImageUploader from "@/components/shared/uploaders/SingleImageUploader";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useAddDivisionMutation } from "@/redux/features/division/division.api";
import { zodResolver } from "@hookform/resolvers/zod";
import { DialogDescription } from "@radix-ui/react-dialog";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { RiLoaderLine } from "react-icons/ri";
import { toast } from "sonner";
import z from "zod";

const typeSchema = z.object({
    name: z
        .string()
        .nonempty({ message: "Division name is required." })
        .min(2, { message: "Division must be at least 2 characters long." })
        .max(100, { message: "Division cannot exceed 100 characters." }),
    description: z
        .string()
        .nonempty({ message: "Description is required." })
        .min(5, { message: "Description must be at least 2 characters long." })
        .max(500, { message: "Description cannot exceed 100 characters." }),
});

export function AddDivisionModal() {
    const [addDivision] = useAddDivisionMutation();
    const [image, setImage] = useState<File | null>(null);
    const [open, setOpen] = useState<boolean>(false);
    const [isBtnLoading, seIsBtnLoading] = useState<boolean>(false);

    const form = useForm<z.infer<typeof typeSchema>>({
        resolver: zodResolver(typeSchema),
        defaultValues: {
            name: "",
            description: "",
        },
    });

    const onSubmit = async (data: z.infer<typeof typeSchema>) => {
        
        seIsBtnLoading(true);
        try {
            const formData = new FormData();
            formData.append("name", data.name);
            formData.append("description", data.description);
            formData.append("file", image as File);
            
            const res = await addDivision(formData).unwrap();

            if (res.success) {
                toast.success("division Added");
                seIsBtnLoading(false);
                form.reset();
                setOpen(false);
            }
        } catch (error: any) {
            toast.error(error?.data?.message || "Failed to add division.");
        } finally {
            seIsBtnLoading(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button className="tp-action-btn">Add Division</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle className="text-xl">Add Division</DialogTitle>
                    <DialogDescription className="sr-only">
                        Please enter the division name and save to add it.
                    </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form id="add-tour-type" className="space-y-3" onSubmit={form.handleSubmit(onSubmit)}>
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem className="space-y-1">
                                    <FormLabel className="text-gray-800">Division Name<span className="text-destructive text-base">*</span></FormLabel>
                                    <FormControl>
                                        <Input
                                            className="tp-input"
                                            placeholder="Name"
                                            {...field}
                                            value={field.value || ""}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="description"
                            render={({ field }) => (
                                <FormItem className="space-y-1">
                                    <FormLabel className="text-gray-800">Description<span className="text-destructive text-base">*</span></FormLabel>
                                    <FormControl>
                                        <Textarea
                                            className="tp-textarea min-h-20"
                                            placeholder="Description here"
                                            {...field}
                                            value={field.value || ""}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <SingleImageUploader onChange={setImage} />
                    </form>
                </Form>

                <DialogFooter className="mt-5">
                    <DialogClose asChild>
                        <Button className="tp-cancel-btn">Cancel</Button>
                    </DialogClose>
                    <Button disabled={isBtnLoading} type="submit" className={`tp-action-btn ${isBtnLoading && 'pointer-events-none opacity-50'}`} form="add-tour-type">
                        {isBtnLoading && <RiLoaderLine className="w-4 h-4 animate-spin" />} Save
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}