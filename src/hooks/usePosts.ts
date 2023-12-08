import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { AppDispatch, RootState } from "../redux/store";
import { fetchPosts } from "../redux/thunk/posts";

const usePosts = () => {
  const posts = useSelector((state: RootState) => state.posts);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (!posts.isUpdatedOnce) {
      dispatch(fetchPosts());
    }
  }, [posts.isUpdatedOnce, dispatch]);

  return posts.value;
};

export default usePosts;
