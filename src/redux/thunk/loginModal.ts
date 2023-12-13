import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import { FieldValues } from "react-hook-form";
import { toast } from "react-hot-toast";

export const fetchLoginModal = createAsyncThunk(
  "fetchLoginModal",
  async (data: FieldValues) => {
    try {
      await axios.post("/auth/login", data);
      localStorage.setItem("auth", "true");
    } catch (error) {
      if (error instanceof AxiosError) {
        console.log(error);
        toast.error(error?.response?.data);
      }
    }
  }
);
