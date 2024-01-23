import React, { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IoClose, IoCameraOutline } from "react-icons/io5";

import Modal from "./Modal";
import Input from "../Input";
import Button from "../Button";

import { bgBlack, hoverLightWhite, textWhite } from "../../helpers/colors";
import { addImageHandler, removeImageHandler, src } from "../../helpers/image";
import { namePattern } from "../../helpers/pattern";

import useWriteForm from "../../hooks/useWriteForm";

import { RootState } from "../../redux/store";
import { onProfileUpdate } from "../../redux/reducers/profile";
import { onMeProfileUpdate } from "../../redux/reducers/me";
import { onPostsProfileUpdate } from "../../redux/reducers/posts";
import { onPostProfileUpdate } from "../../redux/reducers/post";
import { onProfileModalClose } from "../../redux/reducers/profileModal";

const ProfileModal = () => {
  const profile = useSelector((state: RootState) => state.profile);
  const profileModal = useSelector((state: RootState) => state.profileModal);

  const defaultValues = useMemo(() => {
    return { username: profile.username, bio: profile.bio };
  }, [profile]);

  const {
    coverImageInputRef,
    coverImagePreview,
    setCoverImagePreview,
    profileImagePreview,
    setProfileImagePreview,
    setCoverImage,
    profileImage,
    setProfileImage,
    register,
    errors,
    handleSubmit,
    onSubmit,
    resetAll,
    watchAllFields,
  } = useWriteForm(defaultValues, "PATCH");

  const dispatch = useDispatch();

  const extendedSrc = (imagePreview: string, image: string) => {
    if (imagePreview.length > 0) return imagePreview;

    return src(image);
  };

  const coverImageContent = (
    <div className="w-full h-44 flex justify-center items-center relative">
      <div className="absolute bg-gray-400 w-full h-full">
        {(coverImagePreview.length > 0 || profile.coverImage.length > 0) && (
          <div className="w-full h-full flex">
            <img
              src={extendedSrc(coverImagePreview, profile.coverImage)}
              alt="coverImage"
              className="w-full object-cover brightness-75"
            />
          </div>
        )}
      </div>

      <label
        htmlFor="coverImage"
        className="
          relative 
          bg-slate-600 
          p-2 
          rounded-full 
          hover:opacity-80 
          cursor-pointer
        "
      >
        <IoCameraOutline size={30} color="white" />
      </label>
      <input
        ref={coverImageInputRef}
        type="file"
        id="coverImage"
        name="coverImage"
        hidden
        accept="image/*"
        onChange={(e) =>
          addImageHandler(
            e,
            (file) => setCoverImage(file),
            (data) => setCoverImagePreview(data)
          )
        }
      />

      {coverImagePreview.length > 0 && (
        <div
          className="
            relative 
            ml-8 
            bg-slate-600 
            p-2 
            rounded-full 
            hover:opacity-80 
            cursor-pointer
          "
          onClick={(e) =>
            removeImageHandler(
              e,
              coverImageInputRef,
              () => setCoverImage(null),
              () => setCoverImagePreview("")
            )
          }
        >
          <IoClose size={30} color="white" />
        </div>
      )}
    </div>
  );

  const profileImageContent = (
    <div
      className="
        w-[120px] 
        h-[120px] 
        border-4 
        border-white 
        rounded-full 
        relative
        -translate-y-1/3
        translate-x-4
      "
    >
      <div className="w-full h-full flex">
        <img
          src={extendedSrc(profileImagePreview, profile.profileImage)}
          alt="ProfileImage"
          className="w-full rounded-full object-cover brightness-75"
        />
      </div>

      <div
        className="
          absolute 
          top-0 
          left-0 
          w-full 
          h-full 
          flex 
          justify-center 
          items-center
        "
      >
        <label
          htmlFor="profileImage"
          className="
            flex
            w-fit
            bg-slate-600 
            p-2 
            rounded-full 
            hover:opacity-80 
            cursor-pointer
          "
        >
          <IoCameraOutline size={30} color="white" />
        </label>
        <input
          type="file"
          id="profileImage"
          name="profileImage"
          hidden
          accept="image/*"
          onChange={(e) =>
            addImageHandler(
              e,
              (file) => setProfileImage(file),
              (data) => setProfileImagePreview(data)
            )
          }
        />
      </div>
    </div>
  );

  const bodyContent = (
    <form encType="multipart/form-data">
      {coverImageContent}
      {profileImageContent}
    </form>
  );

  const actionArray: Array<() => { payload: any; type: any }> = [];

  actionArray.push(
    onProfileUpdate.bind(null, {
      coverImage: coverImagePreview,
      profileImage: profileImagePreview,
      username: watchAllFields.username,
      bio: watchAllFields.bio,
    })
  );

  if (profileImage) {
    actionArray.push(
      onMeProfileUpdate.bind(null, {
        profileImage: profileImagePreview,
      })
    );

    actionArray.push(
      onPostsProfileUpdate.bind(null, {
        profileImage: profileImagePreview,
        userId: profile.id,
      })
    );

    actionArray.push(
      onPostProfileUpdate.bind(null, {
        profileImage: profileImagePreview,
      })
    );
  }

  const footerContent = (
    <div className="px-4 space-y-4">
      <Input
        id="username"
        label="username"
        register={register}
        errors={errors}
        pattern={namePattern}
        required
        value={watchAllFields.username || ""}
      />
      <Input
        id="bio"
        label="bio"
        register={register}
        errors={errors}
        value={watchAllFields.bio || ""}
      />
      <div className="flex justify-end">
        <Button
          onClick={handleSubmit((data) =>
            onSubmit({
              data,
              fetchUrl: `/user/profile/${profile.id}`,
              actionArray,
              onClose: () => dispatch(onProfileModalClose()),
            })
          )}
          bgColor={bgBlack}
          textColor={textWhite}
          hoverColor={hoverLightWhite}
          label="Save"
          bold
          fit
        />
      </div>
    </div>
  );

  return (
    <Modal
      isOpen={profileModal.isOpen}
      onClose={() => dispatch(onProfileModalClose())}
      icon={IoClose}
      title="Edit profile"
      body={bodyContent}
      footer={footerContent}
      reset={resetAll}
    />
  );
};

export default ProfileModal;
