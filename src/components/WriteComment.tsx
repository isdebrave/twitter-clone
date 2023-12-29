import React from "react";
import { useSelector } from "react-redux";
import { AxiosResponse } from "axios";

import useWriteForm from "../hooks/useWriteForm";
import useCommentModal from "../hooks/useCommentModal";

import { src } from "../helpers/image";

import Button from "./Button";

import { bgBlue, hoverDarkBlue, textWhite } from "../constants/colors";

import { RootState } from "../redux/store";
import { onPostCommentAdd } from "../redux/reducers/post";
import { onPostsCommentAdd } from "../redux/reducers/posts";
import { onProfilePostsCommentAdd } from "../redux/reducers/profile";

const WriteComment = () => {
  const me = useSelector((state: RootState) => state.me);
  const post = useSelector((state: RootState) => state.post);
  const commentModal = useCommentModal();

  const { handleSubmit, register, keyDownHandler, onSubmit, watchAllFields } =
    useWriteForm({ body: "" });

  const bodyContent = (
    <div className="flex gap-3 mb-4">
      <div className="w-[40px] h-[40px] flex rounded-full overflow-hidden">
        <img
          src={src(me.profileImage)}
          alt="ProfileImage"
          className="w-full object-cover"
        />
      </div>
      <textarea
        placeholder="Post your reply"
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
  );

  const actionArray: Array<
    (data?: AxiosResponse<any>) => { payload: any; type: any }
  > = [];

  const options = {
    id: Date.now(),
    body: watchAllFields.body,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    userId: me.id,
    postId: post.id,
    user: {
      id: me.id,
      profileImage: me.profileImage,
      username: me.username,
    },
  };

  actionArray.push((data) => onPostCommentAdd({ options, data }));
  actionArray.push((data) => onPostsCommentAdd({ options, data }));
  actionArray.push((data) => onProfilePostsCommentAdd({ options, data }));

  const footerContent = (
    <div className="px-6">
      <form
        encType="multipart/form-data"
        className="flex justify-end items-center"
      >
        <Button
          onClick={handleSubmit((data) =>
            onSubmit({
              data,
              fetchUrl: `/post/${post.id}/comment`,
              actionArray,
              shouldCommentAlert: true,
              onClose: commentModal.onClose,
              post,
            })
          )}
          bgColor={bgBlue}
          textColor={textWhite}
          hoverColor={hoverDarkBlue}
          label="Reply"
          bold
          fit
        />
      </form>
    </div>
  );

  return (
    <>
      {bodyContent}
      {footerContent}
    </>
  );
};

export default WriteComment;
