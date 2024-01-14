import React, { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { BiHeart, BiMessageRounded, BiSolidHeart } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import ListsItem from "./ListsItem";
import Icon from "./Icon";

import { stopPropagationHandler } from "../helpers/event";
import { src } from "../helpers/image";
import { isDummy, isHeartFill } from "../helpers/post";

import useLiked from "../hooks/useLiked";
import useCommentModal from "../hooks/useCommentModal";

import { RootState } from "../redux/store";
import { PostCommentState, PostState } from "../redux/reducers/post";
import Loader from "./Loader";

interface ListsProps {
  lists: PostState[] | PostCommentState[];
  isValidating: boolean;
  isEnter: boolean;
  setIsEnter: React.Dispatch<React.SetStateAction<boolean>>;
  text?: string;
}

const Lists: React.FC<ListsProps> = ({
  lists,
  isValidating,
  isEnter,
  setIsEnter,
  text,
}) => {
  const [isPosts, setIsPosts] = useState(false);
  const [node, setNode] = useState<HTMLDivElement>();
  const ref = useCallback((node: HTMLDivElement) => setNode(node), []);

  const { likedHandler } = useLiked();
  const commentModal = useCommentModal();

  const me = useSelector((state: RootState) => state.me);

  const navigate = useNavigate();

  useEffect(() => {
    if (!lists || !lists[0]) return;

    if ("views" in lists[0]) {
      setIsPosts(true);
    }
  }, [lists]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!isEnter && entry.isIntersecting) {
          setIsEnter(true);
        }
      },
      { threshold: 0 }
    );

    node && observer.observe(node);

    return () => {
      node && observer.unobserve(node);
      observer && observer.disconnect();
    };
  }, [isEnter, setIsEnter, node]);

  if (lists.length === 0) {
    return (
      <span className="block text-neutral-500 text-center p-6 text-xl">
        {text || "포스팅이 없습니다."}
      </span>
    );
  }

  return (
    <>
      {lists.map((list, idx) => (
        <div
          // ref={idx === lists.length - 2 ? ref : null}
          key={list.id}
          onClick={
            isPosts
              ? stopPropagationHandler(() => {
                  if (isDummy(list.id)) {
                    return toast.error("포스트 등록 중입니다.");
                  }

                  navigate(`/${list.user.id}/status/${list.id}`);
                })
              : undefined
          }
          className={isPosts ? "cursor-pointer" : ""}
        >
          <div
            className={`
              ${isPosts ? "p-3 px-4" : "py-4"}
              ${isPosts ? "hover:bg-neutral-300/20" : ""}
            `}
          >
            <div className="flex gap-3">
              <div
                onClick={stopPropagationHandler(() =>
                  navigate(`/${list.user.id}`)
                )}
                className="
                  w-[40px]
                  h-[40px]
                  flex
                  rounded-full
                  overflow-hidden
                  hover:brightness-90
                  transition
                  cursor-pointer
                "
              >
                <img
                  src={src(list.user.profileImage)}
                  alt="ProfileImage"
                  referrerPolicy="no-referrer"
                  className="w-full object-cover"
                />
              </div>

              <div className="flex-1">
                <ListsItem
                  onClick={stopPropagationHandler(() =>
                    navigate(`/${list.user.id}`)
                  )}
                  username={list.user.username}
                  userId={list.user.id}
                  isPosts={isPosts}
                  postId={
                    isPosts
                      ? (list as PostState).id
                      : (list as PostCommentState).postId
                  }
                  commentId={!isPosts ? (list as PostCommentState).id : ""}
                  createdAt={list.createdAt}
                  body={list.body}
                  images={isPosts ? (list as PostState).images : []}
                />

                {isPosts && (
                  <div className="flex gap-10">
                    <Icon
                      onClick={stopPropagationHandler(() => {
                        if (isDummy(list.id)) {
                          return toast.error("포스트 등록 중입니다.");
                        }

                        commentModal.onPost(list as PostState);
                        commentModal.onOpen();
                      })}
                      icon={BiMessageRounded}
                      length={(list as PostState).comments.length}
                      textHover="group-hover:text-sky-500"
                      bgHover="group-hover:bg-sky-200/40"
                      textColor="text-gray-500"
                    />
                    <Icon
                      onClick={stopPropagationHandler(() => {
                        if (isDummy(list.id)) {
                          return toast.error("포스트 등록 중입니다.");
                        }

                        likedHandler(list as PostState);
                      })}
                      icon={
                        isHeartFill((list as PostState).likedIds, me.id)
                          ? BiSolidHeart
                          : BiHeart
                      }
                      length={(list as PostState).likedIds.length}
                      textHover="group-hover:text-rose-500"
                      bgHover="group-hover:bg-rose-200/40"
                      textColor={
                        isHeartFill((list as PostState).likedIds, me.id)
                          ? "text-rose-500"
                          : "text-gray-500"
                      }
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      ))}

      <div ref={ref} style={{ height: "20px", backgroundColor: "red" }}></div>
      {isValidating && <Loader size={50} />}
    </>
  );
};

export default Lists;
