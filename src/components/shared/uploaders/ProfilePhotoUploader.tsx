import { useFileUpload } from "@/hooks/use-file-upload";
import { Button } from "@/components/ui/button";
import { LuUserRound } from "react-icons/lu";
import { useEffect, useState } from "react";
import { toast } from "sonner";

interface Props {
  onChange: (file: File | null) => void;
  defaultPreview?: string | null;
  uploaderKey?: number;
}

export default function ProfilePhotoUploader({ onChange, defaultPreview, uploaderKey }: Props) {
  const maxSizeMB = 5
  const maxSize = maxSizeMB * 1024 * 1024
  const [error, setError] = useState<string | null>(null);

  const [{ files, errors }, { removeFile, openFileDialog, getInputProps }] =
    useFileUpload({
      accept: "image/svg+xml,image/png,image/jpeg,image/jpg,image/webp",
      maxSize,
    });

  useEffect(() => {
    if (errors?.length) {
      const message = `Image size must be less than ${maxSizeMB}MB`;
      setError(message);
      toast.error(message);
      onChange(null);
      return;
    }

    const file = files[0]?.file;

    if (file instanceof File) {
      setError(null);
      onChange(file);
    } else {
      onChange(null);
    }
  }, [errors?.length, files, onChange]);

  const previewUrl = files[0]?.preview ?? defaultPreview ?? null;
  const fileName = files[0]?.file instanceof File ? files[0].file.name : null;
  const fileId = files[0]?.id;

  return (
    <div className="flex flex-col gap-2">
      <div className="inline-flex items-end gap-2">
        <div
          aria-label={previewUrl ? "Upload preview" : "Default user avatar"}
          className="relative flex w-24 min-w-24 h-[88px] bg-gray-100 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-input"
        >
          {previewUrl ? (
            <img
              alt="Upload preview"
              className="size-full object-cover"
              height={200}
              src={previewUrl}
              width={200}
            />
          ) : (
            <div aria-hidden="true">
              <LuUserRound className="opacity-60" size={46} />
            </div>
          )}
        </div>
        <div className="relative inline-block">
          <p className="text-muted-foreground text-xs mb-3 font-semibold">
            PNG, JPG, SVG or WEBP (max. {maxSizeMB}MB)
          </p>
          <Button type="button" className="tp-transparent-black-btn !border-gray-400 !text-gray-500 hover:!text-white !rounded-lg !text-sm  !px-4 !h-9" aria-haspopup="dialog" onClick={openFileDialog}>
            {fileName ? "Change image" : "Select image"}
          </Button>
          <input
            {...getInputProps()}
            aria-label="Upload image file"
            className="sr-only"
            tabIndex={-1}
          />
        </div>
      </div>
      {fileName && fileId && !uploaderKey && (
        <div className="inline-flex gap-2 text-xs">
          <p aria-live="polite" className="truncate text-muted-foreground">
            {fileName}
          </p>

          <button
            type="button"
            className="font-medium text-destructive hover:underline"
            aria-label={`Remove ${fileName}`}
            onClick={() => {
              removeFile(fileId);
              setError(null);
              onChange(null);
            }}
          >
            Remove
          </button>
        </div>
      )}
      {error && (
        <p className="text-xs text-destructive font-medium">{error}</p>
      )}
    </div>
  );
}
