import React, { useCallback, useEffect, useRef, useState } from "react";
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

interface ListsProps {
  lists: PostState[] | PostCommentState[];
  setSize?: (
    size: number | ((_size: number) => number)
  ) => Promise<any[] | undefined>;
  isValidating?: boolean;
}

const Lists: React.FC<ListsProps> = ({ lists, setSize, isValidating }) => {
  const [isPosts, setIsPosts] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

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
        if (entry.isIntersecting) {
          setSize && setSize((prev) => prev + 1);
        }
      },
      { threshold: 0.5 }
    );

    const instance = ref.current;
    instance && observer.observe(instance);

    return () => {
      instance && observer.unobserve(instance);
      observer && observer.disconnect();
    };
  }, [setSize]);

  return (
    <>
      {lists.map((list) => (
        <div
          key={list.id}
          onClick={
            isPosts
              ? (e) =>
                  stopPropagationHandler(e, () => {
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
                onClick={(e) =>
                  stopPropagationHandler(e, () => navigate(`/${list.user.id}`))
                }
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
                  onClick={(e) =>
                    stopPropagationHandler(e, () =>
                      navigate(`/${list.user.id}`)
                    )
                  }
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
                      onClick={(e) =>
                        stopPropagationHandler(e, () => {
                          if (isDummy(list.id)) {
                            return toast.error("포스트 등록 중입니다.");
                          }

                          commentModal.onPost(list as PostState);
                          commentModal.onOpen();
                        })
                      }
                      icon={BiMessageRounded}
                      length={(list as PostState).comments.length}
                      textHover="group-hover:text-sky-500"
                      bgHover="group-hover:bg-sky-200/40"
                      textColor="text-gray-500"
                    />
                    <Icon
                      onClick={(e) =>
                        stopPropagationHandler(e, () => {
                          if (isDummy(list.id)) {
                            return toast.error("포스트 등록 중입니다.");
                          }

                          likedHandler(e, list as PostState);
                        })
                      }
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

      {isValidating && <p>Loading...</p>}
      <div ref={ref} style={{ border: "1px solid red", height: "10px" }}></div>
    </>
  );
};

export default Lists;
