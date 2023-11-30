import React, { useCallback, useEffect, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import axios, { AxiosError } from "axios";
import { IoClose } from "react-icons/io5";
import { MdAddPhotoAlternate } from "react-icons/md";
import toast from "react-hot-toast";

import Modal from "./Modal";
import Button from "../Button";
import usePostModal from "../../hooks/usePostModal";
import useMe from "../../hooks/useMe";
import { bgBlue, hoverDarkBlue, textWhite } from "../../constants/colors";

const PostModal = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [imagesPreview, setImagesPreview] = useState<string[]>([]);
  const [imagesFiles, setImagesFiles] = useState<FileList[]>([]);
  const postModal = usePostModal();
  const me = useMe();

  const { register, watch, reset, handleSubmit } = useForm<FieldValues>({
    defaultValues: { bodyImages: "", body: "" },
  });

  const bodyImages = watch("bodyImages");

  useEffect(() => {
    if (imagesFiles.length + bodyImages.length > 4) {
      toast.error("최대 4개까지 선택 가능합니다.");
      return;
    }

    setImagesFiles((cur) => [...cur, ...bodyImages]);
    for (const file of bodyImages) {
      const reader = new FileReader();

      reader.readAsDataURL(file);

      reader.onload = (e) => {
        if (e.target) {
          setImagesPreview((cur) => [...cur, e.target!.result as string]);
        }
      };
    }
  }, [bodyImages]);

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

      const updatedImagesFiles = imagesFiles.filter(
        (_, idx) => idx !== removeIdx
      );
      setImagesFiles(updatedImagesFiles);
    },
    [imagesPreview, imagesFiles]
  );

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    try {
      setIsLoading(true);

      await axios.post("/post", { data });
      postModal.onClose();
      reset();
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        console.log(error);
        toast.error(error?.response?.data);
      }
    } finally {
      setIsLoading(false);
    }
  };

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
      <hr className="my-3" />
    </div>
  );

  const footerContent = (
    <div className="px-6">
      <div className="flex justify-between items-center">
        <form encType="multipart/form-data">
          <label
            htmlFor="bodyImages"
            className="block p-2 rounded-full hover:bg-sky-100 cursor-pointer"
          >
            <MdAddPhotoAlternate className="text-sky-500" size={24} />
          </label>
          <input
            type="file"
            id="bodyImages"
            {...register("bodyImages")}
            hidden
            multiple
            accept="image/*"
          />
        </form>
        <Button
          onClick={handleSubmit(onSubmit)}
          bgColor={bgBlue}
          textColor={textWhite}
          hoverColor={hoverDarkBlue}
          label="Post"
          bold
          fit
        />
      </div>

      {imagesPreview.length > 0 && (
        <>
          <hr className="my-3" />
          <button
            onClick={removeImageHandler}
            className="flex gap-3 w-[50px] h-[50px]"
          >
            {imagesPreview.map((src, idx) => (
              <img
                key={src}
                data-idx={idx}
                src={src}
                alt="BodyImages"
                className="w-full object-cover"
              />
            ))}
          </button>
        </>
      )}
    </div>
  );

  return (
    <Modal
      disabled={isLoading}
      isOpen={postModal.isOpen}
      onClose={postModal.onClose}
      icon={IoClose}
      body={bodyContent}
      footer={footerContent}
      reset={reset}
    />
  );
};

export default PostModal;
