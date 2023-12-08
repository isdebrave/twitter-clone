import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchPosts = createAsyncThunk("fetchPosts", async () => {
  try {
    const response = await axios.get("/post");
    return response.data;
  } catch (error) {
    console.log(error);
  }
});
