import React, { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { BiHeart, BiMessageRounded, BiSolidHeart } from "react-icons/bi";
import { useNavigate } from "react-router-dom";

import ListsItem from "./ListsItem";
import Icon from "./Icon";

import { stopPropagationHandler } from "../helpers/event";
import { src } from "../helpers/image";

import useLiked from "../hooks/useLiked";
import useCommentModal from "../hooks/useCommentModal";
import useIntersected from "../hooks/useIntersected";

import { RootState } from "../redux/store";
import { PostState } from "../redux/reducers/post";
import { CommentState } from "../redux/reducers/comments";

interface ListsProps {
  lists: PostState[] | CommentState[];
  size?: number;
  setSize?: (
    size: number | ((_size: number) => number)
  ) => Promise<any[] | undefined>;
  isLoading?: boolean;
}

const Lists: React.FC<ListsProps> = ({ lists, size, setSize, isLoading }) => {
  const [isPosts, setIsPosts] = useState(false);
  const [div, setDiv] = useState<HTMLDivElement>();

  const { likedHandler } = useLiked();
  const commentModal = useCommentModal();
  const intersected = useIntersected();

  const me = useSelector((state: RootState) => state.me);

  const navigate = useNavigate();

  useEffect(() => {
    if (!lists || !lists[0]) return;

    if ("views" in lists[0]) {
      setIsPosts(true);
    }
  }, [lists]);

  const ref = useCallback((div: HTMLDivElement) => setDiv(div), []);
  useEffect(() => {
    if (!div) return;

    const observer = new IntersectionObserver((entries) => {
      // const entry = entries[0];
      observer.unobserve(div);

      if (setSize && size) {
        console.log("hi");
        setSize(size + 1);
      }
    });

    observer.observe(div);

    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [div]);

  const isHeartFill = (array: string[], meId: string) => {
    if (array.includes(meId)) {
      return true;
    }

    return false;
  };

  return (
    <>
      {lists.map((list, idx) => (
        <div
          ref={idx === lists.length - 2 ? ref : null}
          key={list.id}
          onClick={
            isPosts
              ? (e) =>
                  stopPropagationHandler(e, () =>
                    navigate(`/${list.user.id}/status/${list.id}`)
                  )
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
                      : (list as CommentState).postId
                  }
                  commentId={!isPosts ? (list as CommentState).id : undefined}
                  createdAt={list.createdAt}
                  body={list.body}
                  images={isPosts ? (list as PostState).images : []}
                />

                {isPosts && (
                  <div className="flex gap-10">
                    <Icon
                      onClick={(e) =>
                        stopPropagationHandler(e, () => {
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
                      onClick={(e) => likedHandler(e, list.id)}
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
      {size && setSize && (
        <button onClick={() => setSize(size + 1)}>Load More</button>
      )}
    </>
  );
};

export default Lists;
