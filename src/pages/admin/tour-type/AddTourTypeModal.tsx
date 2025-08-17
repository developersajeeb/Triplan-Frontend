/* eslint-disable @typescript-eslint/no-explicit-any */
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
import { useAddTourTypeMutation } from "@/redux/features/tour/tour.api";
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
    .nonempty({ message: "Tour type name is required." })
    .min(2, { message: "Tour type must be at least 2 characters long." })
    .max(100, { message: "Tour type cannot exceed 100 characters." }),
});

export function AddTourTypeModal() {
  const [addTourType] = useAddTourTypeMutation();
  const [open, setOpen] = useState<boolean>(false);
  const [isBtnLoading, seIsBtnLoading] = useState<boolean>(false);

  const form = useForm<z.infer<typeof typeSchema>>({
    resolver: zodResolver(typeSchema),
    defaultValues: {
      name: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof typeSchema>) => {
    seIsBtnLoading(true);
    try {
      const res = await addTourType({ name: data.name }).unwrap();
      if (res.success) {
        toast.success("Tour Type Added");
        seIsBtnLoading(false);
        form.reset();
        setOpen(false);
      }
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to add tour type.");
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <form>
        <DialogTrigger asChild>
          <Button className="tp-action-btn">Add Tour Type</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="text-xl">Add Tour Type</DialogTitle>
            <DialogDescription className="sr-only">
              Please enter the tour type name and save to add it.
            </DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form id="add-tour-type" onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem className="space-y-1">
                    <FormLabel className="text-gray-800">Tour Type Name<span className="text-destructive text-base">*</span></FormLabel>
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
            </form>
          </Form>

          <DialogFooter>
            <DialogClose asChild>
              <Button className="tp-cancel-btn">Cancel</Button>
            </DialogClose>
            <Button disabled={isBtnLoading} type="submit" className={`tp-action-btn ${isBtnLoading && 'pointer-events-none opacity-50'}`} form="add-tour-type">
              {isBtnLoading && <RiLoaderLine className="w-4 h-4 animate-spin" />} Save
            </Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
}