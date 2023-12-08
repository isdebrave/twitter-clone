import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import { toast } from "react-hot-toast";
import { NavigateFunction } from "react-router-dom";

interface DataType {
  userId: string;
  navigate: NavigateFunction;
}

export const fetchProfile = createAsyncThunk(
  "fetchProfile",
  async (data: DataType) => {
    const { userId, navigate } = data;

    try {
      const response = await axios.post("/user/profile", { userId });
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
