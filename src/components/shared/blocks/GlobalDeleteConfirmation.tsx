import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import type { ReactNode } from "react";
import { CgDanger } from "react-icons/cg";

interface IProps {
  children: ReactNode;
  onConfirm: () => void;
}

export function GlobalDeleteConfirmation({ children, onConfirm }: IProps) {
  const handleConfirm = () => {
    onConfirm();
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="text-xl text-red-500 flex items-center gap-2"><CgDanger size={30} /> Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription className="font-semibold">
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="mt-4">
          <AlertDialogCancel className="tp-cancel-btn !border-gray-400 !text-gray-500">No, Keep it</AlertDialogCancel>
          <AlertDialogAction onClick={handleConfirm} className="tp-action-btn !bg-red-600">
            Yes
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}