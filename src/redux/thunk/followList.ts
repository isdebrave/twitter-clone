import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchFollowList = createAsyncThunk("fetchFollowList", async () => {
  try {
    const response = await axios.get("/user/all");
    return response.data;
  } catch (error) {
    console.log(error);
  }
});
