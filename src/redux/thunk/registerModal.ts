import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import { FieldValues } from "react-hook-form";
import { toast } from "react-hot-toast";

export const fetchRegisterModal = createAsyncThunk(
  "fetchRegisterModal",
  async (data: FieldValues) => {
    try {
      await axios.post("/auth/register", data);
      localStorage.setItem("auth", "true");
    } catch (error) {
      if (error instanceof AxiosError) {
        console.log(error);
        toast.error(error?.response?.data);
      }
    }
  }
);
