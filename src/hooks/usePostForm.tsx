import React, { useCallback, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { MdAddPhotoAlternate } from "react-icons/md";
import toast from "react-hot-toast";

import useMe from "./useMe";
import Button from "../components/Button";
import { bgBlue, hoverDarkBlue, textWhite } from "../constants/colors";

const usePostForm = (
  onSubmit: SubmitHandler<FieldValues>,
  showDivision: boolean
) => {
  const [imagesPreview, setImagesPreview] = useState<string[]>([]);
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const me = useMe();

  const { register, reset, handleSubmit } = useForm<FieldValues>({
    defaultValues: { body: "" },
  });

  const removeImageHandler = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      const removeIdx = parseInt(
        (e.target as HTMLImageElement).getAttribute("data-idx") || "",
        10
      );

      const updatedImagesPreview = imagesPreview.filter(
        (_, idx) => idx !== removeIdx
      );
      setImagesPreview(updatedImagesPreview);

      const updatedImagesFiles = imageFiles.filter(
        (_, idx) => idx !== removeIdx
      );
      setImageFiles(updatedImagesFiles);
    },
    [imagesPreview, imageFiles]
  );

  const keyDownHandler = useCallback(
    (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
      const textarea = document.querySelector("textarea")!;
      textarea.style.height = "auto";

      const scrollHeight = (e.target as HTMLTextAreaElement).scrollHeight;
      textarea.style.maxHeight = "450px";
      textarea.style.height = scrollHeight + "px";
    },
    []
  );

  const profileImage = me.value?.profileImage || "./images/anonymous.jpg";
  const bodyContent = (
    <div className="px-6">
      <div className="flex gap-3 mb-4">
        <div className="w-[44px] h-[44px] rounded-full overflow-hidden">
          <img src={profileImage} alt="ProfileImage" className="w-full" />
        </div>
        <textarea
          placeholder="What is happening?!"
          {...register("body", { required: true })}
          rows={3}
          className="
            flex-auto 
            resize-none 
            outline-none 
            text-xl 
            placeholder-gray-500
        "
          onKeyDown={keyDownHandler}
        ></textarea>
      </div>
      {showDivision && <hr className="my-3" />}
    </div>
  );

  const imagesHandler = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
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
    },
    [imageFiles]
  );

  const footerContent = (
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
              <button onClick={removeImageHandler} key={src + idx}>
                <div className="w-[50px] h-[50px] flex">
                  <img
                    data-idx={idx}
                    src={src}
                    alt="BodyImages"
                    className="w-full object-cover"
                  />
                </div>
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );

  return {
    reset,
    imagesPreview,
    setImagesPreview,
    imageFiles,
    setImageFiles,
    bodyContent,
    footerContent,
  };
};

export default usePostForm;
