import React, { useCallback } from "react";
import { BiMessageRounded, BiHeart } from "react-icons/bi";
import { useNavigate } from "react-router-dom";

import FeedProfileImage from "./FeedProfileImage";
import FeedItem from "./FeedItem";
import FeedIcon from "./FeedIcon";

import { PostState } from "../../redux/reducers/post";

interface FeedProps {
  posts: PostState[];
}

const Feed: React.FC<FeedProps> = ({ posts }) => {
  const navigate = useNavigate();

  const linkHandler = useCallback(
    (e: React.MouseEvent<HTMLDivElement>, href: string) => {
      e.stopPropagation();
      navigate(href);
    },
    [navigate]
  );

  return (
    <>
      {posts.map((post) => (
        <div
          key={post.id}
          onClick={(e) => linkHandler(e, `/${post.user.id}/status/${post.id}`)}
          className="cursor-pointer"
        >
          <div className="p-2 px-4 hover:bg-neutral-300/20">
            <div className="flex gap-3">
              <div onClick={(e) => linkHandler(e, `/${post.user.id}`)}>
                <FeedProfileImage profileImage={post.user.profileImage} />
              </div>

              <div className="flex-1">
                <FeedItem
                  onClick={(e) => linkHandler(e, `/${post.user.id}`)}
                  username={post.user.username}
                  userId={post.user.id.slice(0, 10)}
                  createdAt={post.createdAt}
                  body={post.body}
                  images={post.images}
                />

                <div className="flex gap-10">
                  <FeedIcon
                    icon={BiMessageRounded}
                    length={post.comments.length}
                    groupTextHoverColor="group-hover:text-sky-500"
                    groupBgHoverColor="group-hover:bg-sky-200/40"
                  />
                  <FeedIcon
                    icon={BiHeart}
                    length={post.likedIds.length}
                    groupTextHoverColor="group-hover:text-rose-500"
                    groupBgHoverColor="group-hover:bg-rose-200/40"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default Feed;
