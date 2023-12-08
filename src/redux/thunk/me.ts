import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { NavigateFunction } from "react-router-dom";

export const fetchMe = createAsyncThunk(
  "fetchMe",
  async (navigate: NavigateFunction) => {
    try {
      const response = await axios.get("/user/me");

      if (!response.data) {
        localStorage.removeItem("auth");
        return navigate("/auth");
      }

      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
);
