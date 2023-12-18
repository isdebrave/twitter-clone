import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IoClose, IoCameraOutline } from "react-icons/io5";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import Modal from "./Modal";
import Input from "../Input";
import Button from "../Button";

import { AppDispatch, RootState } from "../../redux/store";
import { onProfileModalClose } from "../../redux/reducers/profileModal";
import { bgBlack, hoverLightWhite, textWhite } from "../../constants/colors";
import { fetchUpdateProfile } from "../../redux/thunk/profile";

import { addImageHandler, removeImageHandler, src } from "../../helpers/image";
import { namePattern } from "../../helpers/pattern";
import useReactHookForm from "../../hooks/useReactHookForm";

const ProfileModal = () => {
  const [isLoading, setIsLoading] = useState(false);
  const coverImageInputRef = useRef<HTMLInputElement>(null);

  const [coverImagePreview, setCoverImagePreview] = useState("");
  const [profileImagePreview, setProfileImagePreview] = useState("");
  const [coverImage, setCoverImage] = useState<File | null>(null);
  const [profileImage, setProfileImage] = useState<File | null>(null);

  const profileModal = useSelector((state: RootState) => state.profileModal);
  const profile = useSelector((state: RootState) => state.profile);

  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

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

  const { register, handleSubmit, errors, watchAllFields, initializedForm } =
    useReactHookForm({ username: "", bio: "" }, profile);

  const resetAll = () => {
    setCoverImagePreview("");
    setProfileImagePreview("");
    setCoverImage(null);
    setProfileImage(null);
    initializedForm();
  };

  // const {
  //   register,
  //   watch,
  //   handleSubmit,
  //   setValue,
  //   clearErrors,
  //   formState: { errors },
  // } = useForm<FieldValues>({
  //   defaultValues: { username: "", bio: "" },
  // });

  // const username = watch("username");
  // const bio = watch("bio");

  // useEffect(() => {
  //   setValue("username", profile.username);
  //   setValue("bio", profile.bio);
  // }, [profile, setValue]);

  // const resetAll = () => {
  //   setCoverImagePreview("");
  //   setProfileImagePreview("");
  //   setCoverImage(null);
  //   setProfileImage(null);
  //   setValue("username", profile.username);
  //   setValue("bio", profile.bio);
  //   clearErrors("username");
  // };

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    dispatch(
      fetchUpdateProfile({
        coverImage,
        profileImage,
        data,
        userId: profile.id,
        dispatch,
        navigate,
      })
    );
    dispatch(onProfileModalClose());
    resetAll();
  };

  const footerContent = (
    <div className="px-4 space-y-4">
      <Input
        id="username"
        label="username"
        disabled={isLoading}
        register={register}
        errors={errors}
        pattern={namePattern}
        required
        value={watchAllFields.username || ""}
      />
      <Input
        id="bio"
        label="bio"
        disabled={isLoading}
        register={register}
        errors={errors}
        value={watchAllFields.bio || ""}
      />
      <div className="flex justify-end">
        <Button
          onClick={handleSubmit(onSubmit)}
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
      disabled={isLoading}
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
