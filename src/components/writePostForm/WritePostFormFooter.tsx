import React, { Dispatch, SetStateAction } from "react";
import { MdAddPhotoAlternate } from "react-icons/md";
import {
  FieldValues,
  SubmitHandler,
  UseFormHandleSubmit,
} from "react-hook-form";
import { toast } from "react-hot-toast";

import Button from "../Button";
import { bgBlue, hoverDarkBlue, textWhite } from "../../constants/colors";

interface WritePostFormFooterProps {
  handleSubmit: UseFormHandleSubmit<FieldValues>;
  onSubmit: SubmitHandler<FieldValues>;
  imagesPreview: string[];
  setImagesPreview: Dispatch<SetStateAction<string[]>>;
  imageFiles: File[];
  setImageFiles: Dispatch<SetStateAction<File[]>>;
}

const WritePostFormFooter: React.FC<WritePostFormFooterProps> = ({
  handleSubmit,
  onSubmit,
  imagesPreview,
  setImagesPreview,
  imageFiles,
  setImageFiles,
}) => {
  const imagesHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;

    if (!files) return;

    if (files.length + imageFiles.length > 4) {
      toast.error("최대 4개까지 선택 가능합니다.");
      return;
    }

    for (let i = 0; i < files.length; i++) {
      setImageFiles((cur) => [...cur, files[i]]);

      const reader = new FileReader();
      reader.readAsDataURL(files[i]);
      reader.onload = (e) => {
        if (e.target) {
          setImagesPreview((cur) => [...cur, e.target!.result as string]);
        }
      };
    }
  };

  const removeImageHandler = (e: React.MouseEvent) => {
    const removeIdx = parseInt(
      (e.target as HTMLImageElement).getAttribute("data-idx") || "",
      10
    );

    const updatedImagesPreview = imagesPreview.filter(
      (_, idx) => idx !== removeIdx
    );
    setImagesPreview(updatedImagesPreview);

    const updatedImagesFiles = imageFiles.filter((_, idx) => idx !== removeIdx);
    setImageFiles(updatedImagesFiles);
  };

  return (
    <div className="px-6">
      <form
        encType="multipart/form-data"
        className="flex justify-between items-center"
      >
        <label
          htmlFor="bodyImages"
          className="block p-2 rounded-full hover:bg-sky-100 cursor-pointer"
        >
          <MdAddPhotoAlternate className="text-sky-500" size={24} />
        </label>
        <input
          type="file"
          id="bodyImages"
          name="bodyImages"
          hidden
          multiple
          accept="image/*"
          onChange={imagesHandler}
        />
        <Button
          onClick={handleSubmit(onSubmit)}
          bgColor={bgBlue}
          textColor={textWhite}
          hoverColor={hoverDarkBlue}
          label="Post"
          bold
          fit
        />
      </form>

      {imagesPreview.length > 0 && (
        <>
          <hr className="my-3" />
          <div className="flex gap-3">
            {imagesPreview.map((src, idx) => (
              <div
                key={src + idx}
                className="w-[50px] h-[50px] flex"
                onClick={removeImageHandler}
              >
                <img
                  data-idx={idx}
                  src={src}
                  alt="BodyImages"
                  className="w-full object-cover"
                />
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default WritePostFormFooter;
