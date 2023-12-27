import React from "react";
import { useSelector } from "react-redux";

import useWriteForm from "../../hooks/useWriteForm";
import useCommentModal from "../../hooks/useCommentModal";

import { src } from "../../helpers/image";

import Button from "../Button";

import { bgBlue, hoverDarkBlue, textWhite } from "../../constants/colors";

import { RootState } from "../../redux/store";
import { onPostCommentAdd } from "../../redux/reducers/post";
import { onPostsCommentAdd } from "../../redux/reducers/posts";
import { onProfilePostsCommentAdd } from "../../redux/reducers/profile";

const WriteComment = () => {
  const me = useSelector((state: RootState) => state.me);
  const post = useSelector((state: RootState) => state.post);
  const commentModal = useCommentModal();

  const { handleSubmit, register, keyDownHandler, onSubmit, resetAll } =
    useWriteForm();

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
              actionArray: [
                onPostCommentAdd,
                onPostsCommentAdd,
                onProfilePostsCommentAdd,
              ],
              onClose: commentModal.onClose,
              postId: post.id,
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
