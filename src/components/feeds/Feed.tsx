import React from "react";
import { BiMessageRounded, BiHeart } from "react-icons/bi";

import FeedProfileImage from "./FeedProfileImage";
import FeedItem from "./FeedItem";
import FeedIcon from "./FeedIcon";
import { PostState } from "../../redux/reducers/posts";
import { Link } from "react-router-dom";

interface FeedProps {
  posts: PostState[];
}

const Feed: React.FC<FeedProps> = ({ posts }) => {
  return (
    <>
      {posts?.map((post) => (
        <Link key={post.id} to={`/${post.user.id}/status/${post.id}`}>
          <div className="p-2 px-4 hover:bg-neutral-300/20">
            <div className="flex gap-3">
              <FeedProfileImage profileImage={post.user.profileImage} />
              <div className="flex-1">
                <FeedItem
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
        </Link>
      ))}
    </>
  );
};

export default Feed;
