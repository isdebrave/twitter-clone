import React from "react";
import { useSelector } from "react-redux";
import { BiMessageRounded, BiHeart } from "react-icons/bi";

import { RootState } from "../../redux/store";
import FeedProfileImage from "./FeedProfileImage";
import FeedItem from "./FeedItem";
import FeedIcon from "./FeedIcon";
import axios from "axios";

const Feed = () => {
  const posts = useSelector((state: RootState) => state.posts);

  return (
    <>
      {posts?.map((post) => (
        <div key={post.id} className="p-2 px-4 hover:bg-neutral-300/20">
          <div className="flex gap-3">
            <FeedProfileImage profileImage={post.user.profileImage} />
            <div className="flex-1">
              <FeedItem
                username={post.user.username}
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
      ))}
    </>
  );
};

export default Feed;
