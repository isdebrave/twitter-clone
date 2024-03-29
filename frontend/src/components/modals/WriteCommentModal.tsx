import React, { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IoClose } from "react-icons/io5";
import { AxiosResponse } from "axios";

import Modal from "./Modal";
import Button from "../Button";

import { bgBlue, hoverDarkBlue, textWhite } from "../../helpers/colors";
import { src } from "../../helpers/image";

import PostBody from "../post/PostBody";
import PostProfile from "../post/PostProfile";

import useWriteForm from "../../hooks/useWriteForm";

import { RootState } from "../../redux/store";
import { onPostCommentAdd } from "../../redux/reducers/post";
import { onPostsCommentAdd } from "../../redux/reducers/posts";
import { onProfilePostsCommentAdd } from "../../redux/reducers/profile";
import { onCommentModalClose } from "../../redux/reducers/commentModal";

const WriteCommentModal = () => {
  const me = useSelector((state: RootState) => state.me);
  const commentModal = useSelector((state: RootState) => state.commentModal);

  const dispatch = useDispatch();

  const defaultValues = useMemo(() => {
    return { body: "" };
  }, []);

  const {
    handleSubmit,
    register,
    keyDownHandler,
    onSubmit,
    resetAll,
    watchAllFields,
  } = useWriteForm(defaultValues);

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
      </div>
    </div>
  );

  const actionArray: Array<
    (data?: AxiosResponse<any>) => { payload: any; type: any }
  > = [];

  const options = {
    id: Date.now(),
    body: watchAllFields.body,
    createdAt: Date.now(),
    updatedAt: Date.now(),
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
              shouldCommentAlert: post.user.id !== me.id,
              onClose: () => dispatch(onCommentModalClose()),
              post,
              errorMessage: "댓글을 작성해주세요.",
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
      isOpen={commentModal.isOpen}
      onClose={() => dispatch(onCommentModalClose())}
      icon={IoClose}
      body={bodyContent}
      footer={footerContent}
      reset={resetAll}
    />
  );
};

export default WriteCommentModal;
