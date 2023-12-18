import React, { useMemo, useRef, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { MdAddPhotoAlternate } from "react-icons/md";

import useReactHookForm from "./useReactHookForm";
import Button from "../components/Button";

import { RootState } from "../redux/store";
import { addImageHandler, removeImageHandler, src } from "../helpers/image";
import { bgBlue, hoverDarkBlue, textWhite } from "../constants/colors";

const useWritePostForm = (
  onSubmit: SubmitHandler<FieldValues>,
  showDivision: boolean
) => {
  const imagesInputRef = useRef<HTMLInputElement>(null);

  const [imagesPreview, setImagesPreview] = useState<string[]>([]);
  const [imageFiles, setImageFiles] = useState<File[]>([]);

  const me = useSelector((state: RootState) => state.me);

  // const { register, reset, handleSubmit } = useForm<FieldValues>({
  //   defaultValues: { body: "" },
  // });

  // const resetAll = () => {
  //   setImagesPreview([]);
  //   setImageFiles([]);
  //   reset();
  // };

  const writePost = useMemo(() => ({ body: "" }), []);
  const { register, handleSubmit, errors, watchAllFields, initializedForm } =
    useReactHookForm({ body: "" }, writePost);

  const resetAll = () => {
    setImagesPreview([]);
    setImageFiles([]);
    initializedForm();
  };

  const keyDownHandler = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    const textarea = document.querySelector("textarea")!;
    textarea.style.height = "auto";

    const scrollHeight = (e.target as HTMLTextAreaElement).scrollHeight;
    textarea.style.maxHeight = "450px";
    textarea.style.height = scrollHeight + "px";
  };

  const bodyContent = (
    <div className="px-6">
      <div className="flex gap-3 mb-4">
        <div className="w-[40px] h-[40px] rounded-full overflow-hidden">
          <img
            src={src(me.profileImage)}
            alt="ProfileImage"
            className="w-full"
          />
        </div>
        <textarea
          placeholder="What is happening?!"
          {...register("body", { required: true })}
          rows={2}
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
          ref={imagesInputRef}
          type="file"
          id="bodyImages"
          name="bodyImages"
          hidden
          multiple
          accept="image/*"
          onChange={(e) =>
            addImageHandler(
              e,
              (file) => setImageFiles((cur) => [...cur, file]),
              (data) => setImagesPreview((cur) => [...cur, data]),
              imageFiles
            )
          }
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
                className="w-[50px] h-[50px] flex cursor-pointer"
                onClick={(e) =>
                  removeImageHandler(
                    e,
                    imagesInputRef,
                    (fileArray) => setImageFiles(fileArray!),
                    (dataArray) => setImagesPreview(dataArray!),
                    imageFiles,
                    imagesPreview
                  )
                }
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

  return {
    resetAll,
    imageFiles,
    bodyContent,
    footerContent,
  };
};

export default useWritePostForm;
