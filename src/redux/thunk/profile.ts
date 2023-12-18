import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import { FieldValues } from "react-hook-form";
import { toast } from "react-hot-toast";
import { NavigateFunction } from "react-router-dom";

import { AppDispatch } from "../store";

interface DataType {
  userId: string;
  navigate: NavigateFunction;
}

export const fetchProfile = createAsyncThunk(
  "fetchProfile",
  async (data: DataType) => {
    const { userId, navigate } = data;

    try {
      const response = await axios.get(`/user/profile/${userId}`);
      return response.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        console.log(error);
        toast.error(error?.response?.data);
        navigate("/home");
      }
    }
  }
);

interface UpdateDataType {
  coverImage: File | null;
  profileImage: File | null;
  data: FieldValues;
  userId: string;
  dispatch: AppDispatch;
  navigate: NavigateFunction;
}

export const fetchUpdateProfile = createAsyncThunk(
  "fetchUpdateProfile",
  async (_data: UpdateDataType) => {
    const { coverImage, profileImage, data, userId, dispatch, navigate } =
      _data;

    const formData = new FormData();
    coverImage && formData.append("coverImage", coverImage);
    profileImage && formData.append("profileImage", profileImage);
    formData.append("data", JSON.stringify(data));

    try {
      const response = await axios.patch(`/user/profile/${userId}`, formData);

      dispatch(fetchProfile({ userId, navigate }));

      return response.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        console.log(error);
        toast.error(error?.response?.data);
      }
    }
  }
);
