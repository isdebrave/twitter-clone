import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import { AppDispatch, RootState } from "../redux/store";
import { fetchPost, fetchPostLiked } from "../redux/thunk/post";

const usePost = () => {
  const post = useSelector((state: RootState) => state.post);
  const me = useSelector((state: RootState) => state.me);
  const { userId, postId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (postId) {
      dispatch(fetchPost({ postId, navigate }));
    }
  }, [dispatch, postId, navigate]);

  const likedHandler = () => {
    if (postId) {
      dispatch(fetchPostLiked({ postId, meId: me.id, dispatch }));
    }
  };

  return { post, likedHandler };
};

export default usePost;
