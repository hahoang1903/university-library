"use client";

import { type ChangeEvent, useRef, useState } from "react";
import Image from "next/image";
import { Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import config from "@/lib/config";

type Props = {
  handleImageChange: (file: File | undefined) => void;
};

const ImageUpload = ({ handleImageChange }: Props) => {
  const [image, setImage] = useState<File | null>();
  const [preview, setPreview] = useState<string | null>(null);
  const isLoading = !!image && !preview;

  const { toast } = useToast();

  const uploadInputRef = useRef<HTMLInputElement>(null);

  const onFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    setImage(null);
    setPreview(null);
    handleImageChange(file);

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast({
        title: "Invalid file type",
        description: "Please select a valid image file",
        variant: "destructive",
      });
      return;
    }

    if (file.size > config.env.imageSizeLimit) {
      toast({
        title: "File size limit exceeded",
        description: `Please select a file smaller than ${config.env.imageSizeLimit / 1024 / 1024}MB`,
        variant: "destructive",
      });
      return;
    }

    setImage(file);
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreview(reader.result as string);
    };
  };

  const handleUploadClick = () => {
    if (uploadInputRef.current) {
      uploadInputRef.current.click();
    }
  };

  return (
    <>
      <input
        type="file"
        accept="image/*"
        className="hidden"
        ref={uploadInputRef}
        onChange={onFileChange}
      />
      <button
        className="upload-btn"
        type="button"
        onClick={handleUploadClick}
        disabled={isLoading}
      >
        <Image
          src="/icons/upload.svg"
          alt="Upload Icon"
          width={20}
          height={20}
          className="object-contain"
        />
        <p className="text-base text-light-100">Upload image</p>

        {image && <p className="upload-filename">{image.name}</p>}
        {isLoading && <Loader2 className="animate-spin" />}
      </button>

      {image && preview && (
        <Image alt={image.name} src={preview} width={500} height={300} />
      )}
    </>
  );
};

export default ImageUpload;
