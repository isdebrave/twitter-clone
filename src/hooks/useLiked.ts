import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

import { RootState } from "../redux/store";
import { onPostLiked } from "../redux/reducers/post";
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

  const likedHandler = (e: React.MouseEvent, postId: string) => {
    e.stopPropagation();

    try {
      axios.post(`/post/liked`, { postId });

      let likedIds;

      likedIds = post.likedIds;
      dispatch(
        onPostLiked({
          isExists: isExists(likedIds, me.id),
          userId: me.id,
        })
      );

      likedIds = posts.find((post) => post.id === postId)?.likedIds;
      if (!likedIds) return;
      dispatch(
        onPostsLiked({
          isExists: isExists(likedIds, me.id),
          userId: me.id,
          postId,
        })
      );

      likedIds = profile.posts.find((post) => post.id === postId)?.likedIds;
      if (!likedIds) return;
      dispatch(
        onProfilePostsLiked({
          isExists: isExists(likedIds, me.id),
          userId: me.id,
          postId,
        })
      );
    } catch (error) {
      console.log(error);
    }
  };

  return { likedHandler };
};

export default useLiked;
