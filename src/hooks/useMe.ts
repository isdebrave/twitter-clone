import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { AppDispatch } from "../redux/store";
import { fetchMe } from "../redux/thunk/me";

const useMe = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchMe(navigate));
  }, [dispatch, navigate]);
};

export default useMe;
