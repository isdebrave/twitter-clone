import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { AppDispatch, RootState } from "../redux/store";
import { fetchProfile } from "../redux/thunk/profile";

const useProfile = () => {
  const { userId } = useParams();

  const profile = useSelector((state: RootState) => state.profile);
  const me = useSelector((state: RootState) => state.me);

  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  useEffect(() => {
    if (userId) {
      dispatch(fetchProfile({ userId, navigate }));
    }
  }, [dispatch, userId, navigate]);

  return { profile, me };
};

export default useProfile;
