import React, { useState } from "react";
import { useSelector } from "react-redux";
import { IoClose } from "react-icons/io5";

import Modal from "./Modal";
import Button from "../Button";

import { bgBlue, hoverDarkBlue, textWhite } from "../../constants/colors";

import { src } from "../../helpers/image";

import PostBody from "../post/PostBody";
import PostProfile from "../post/PostProfile";

import useCommentModal from "../../hooks/useCommentModal";
import useWriteForm from "../../hooks/useWriteForm";

import { RootState } from "../../redux/store";
import { onPostCommentAdd } from "../../redux/reducers/post";
import { onPostsCommentAdd } from "../../redux/reducers/posts";
import { onProfilePostsCommentAdd } from "../../redux/reducers/profile";

const CommentModal = () => {
  const [isLoading, setIsLoading] = useState(false);

  const me = useSelector((state: RootState) => state.me);

  const { handleSubmit, register, keyDownHandler, onSubmit, resetAll } =
    useWriteForm({ body: "" });
  const commentModal = useCommentModal();
  const post = commentModal.post;

  if (!post) return;

  const bodyContent = (
    <div className="px-6">
      <div className="flex flex-col">
        <div className="mb-3">
          <div className="mb-3">
            <PostProfile
              href={`/${post.user.id}`}
              profileImage={post.user.profileImage}
              username={post.user.username}
              userId={post.user.id}
              noEllipsis
            />
          </div>
          <div className="mb-3 ml-14">
            <PostBody
              body={post.body}
              imagesCount={post.images.length}
              images={post.images}
              imagesHeight="h-[40vh]"
            />
          </div>
        </div>

        <div className="flex gap-3 mb-4">
          <div className="w-[40px] h-[40px] flex rounded-full overflow-hidden">
            <img
              src={src(me.profileImage)}
              alt="ProfileImage"
              className="w-full object-cover"
            />
          </div>
          <textarea
            placeholder="Add another post"
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
      </div>
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
          label="Post"
          bold
          fit
        />
      </form>
    </div>
  );

  return (
    <Modal
      disabled={isLoading}
      isOpen={commentModal.isOpen}
      onClose={commentModal.onClose}
      icon={IoClose}
      body={bodyContent}
      footer={footerContent}
      reset={resetAll}
    />
  );
};

export default CommentModal;
