import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

import { RootState } from "../redux/store";
import { PostState, onPostLiked } from "../redux/reducers/post";
import { onPostsLiked } from "../redux/reducers/posts";
import { onProfilePostsLiked } from "../redux/reducers/profile";

const useLiked = () => {
  const dispatch = useDispatch();
  const me = useSelector((state: RootState) => state.me);
  const post = useSelector((state: RootState) => state.post);
  const posts = useSelector((state: RootState) => state.posts);
  const profile = useSelector((state: RootState) => state.profile);

  const isExists = (likedIds: string[], userId: string) => {
    return likedIds.find((id) => id === userId);
  };

  const likedHandler = (e: React.MouseEvent, clickedPost: PostState) => {
    e.stopPropagation();

    try {
      axios.post("/post/liked", { postId: clickedPost.id });

      if (!isExists(clickedPost.likedIds, me.id)) {
        axios.post("/notification", {
          body: `${me.username} 님이 ${clickedPost.id.slice(
            0,
            10
          )} 포스트에 좋아요를 눌렀습니다.`,
          userId: clickedPost.user.id,
        });
      }

      let likedIds = post.likedIds;
      dispatch(
        onPostLiked({
          isExists: isExists(likedIds, me.id),
          userId: me.id,
        })
      );

      likedIds = posts.find((post) => post.id === clickedPost.id)!.likedIds;
      dispatch(
        onPostsLiked({
          isExists: isExists(likedIds, me.id),
          userId: me.id,
          postId: clickedPost.id,
        })
      );

      likedIds = profile.posts.find(
        (post) => post.id === clickedPost.id
      )!.likedIds;
      dispatch(
        onProfilePostsLiked({
          isExists: isExists(likedIds, me.id),
          userId: me.id,
          postId: clickedPost.id,
        })
      );
    } catch (error) {
      console.log(error);
    }
  };

  return { likedHandler };
};

export default useLiked;
