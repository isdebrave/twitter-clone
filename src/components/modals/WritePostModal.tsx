import React, { useMemo } from "react";
import { IoClose } from "react-icons/io5";
import { useSelector } from "react-redux";
import { MdAddPhotoAlternate } from "react-icons/md";
import { AxiosResponse } from "axios";

import Modal from "./Modal";
import Button from "../Button";

import { bgBlue, hoverDarkBlue, textWhite } from "../../helpers/colors";
import { addImageHandler, removeImageHandler, src } from "../../helpers/image";

import useWritePostModal from "../../hooks/useWritePostModal";
import useWriteForm from "../../hooks/useWriteForm";

import { RootState } from "../../redux/store";
import { onPostsAdd } from "../../redux/reducers/posts";
import { onProfilePostsAdd } from "../../redux/reducers/profile";

const WritePostModal = () => {
  const me = useSelector((state: RootState) => state.me);

  const defaultValues = useMemo(() => {
    return { body: "" };
  }, []);

  const {
    handleSubmit,
    imageFiles,
    imagesPreview,
    register,
    setImageFiles,
    setImagesPreview,
    keyDownHandler,
    imagesInputRef,
    onSubmit,
    resetAll,
    watchAllFields,
  } = useWriteForm(defaultValues);
  const writePostModal = useWritePostModal();

  const bodyContent = (
    <div className="px-6">
      <div className="flex gap-3 mb-4">
        <div className="w-[40px] h-[40px] flex rounded-full overflow-hidden">
          <img
            src={src(me.profileImage)}
            alt="ProfileImage"
            className="w-full object-cover"
          />
        </div>
        <textarea
          placeholder="What is happening?!"
          {...register("body")}
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
      <hr className="my-3" />
    </div>
  );

  const actionArray: Array<
    (data?: AxiosResponse<any>) => { payload: any; type: any }
  > = [];

  const options = {
    id: Date.now(),
    body: watchAllFields.body,
    images: imagesPreview,
    views: 0,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    userId: me.id,
    likedIds: [],
    user: {
      id: me.id,
      profileImage: me.profileImage,
      username: me.username,
    },
    comments: [],
  };

  actionArray.push((data) => onPostsAdd({ options, data }));
  actionArray.push((data) => onProfilePostsAdd({ options, data }));

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
          onClick={handleSubmit((data) =>
            onSubmit({
              data,
              fetchUrl: "/post",
              actionArray,
              onClose: writePostModal.onClose,
              errorMessage: "포스트를 작성해주세요.",
            })
          )}
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

  return (
    <Modal
      isOpen={writePostModal.isOpen}
      onClose={writePostModal.onClose}
      icon={IoClose}
      body={bodyContent}
      footer={footerContent}
      reset={resetAll}
    />
  );
};

export default WritePostModal;
