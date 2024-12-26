import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { recursiveApiCall } from "./recursiveApiCall";

const API_URL = "https://jsonplaceholder.typicode.com/users";

interface User {
  id: number;
  name: string;
  username: string;
  email: string;
}

export const fetchUsers = createAsyncThunk<User[], void>(
  "user/fetchUsers",
  async (_, { rejectWithValue }) => {
    try {
      const apiCall = async () => await axios.get<User[]>(API_URL);
      const response = await recursiveApiCall(apiCall);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.message || "Failed to fetch users");
    }
  }
);

export const fetchUserDetailPage = createAsyncThunk<User, number | string>(
  "user/fetchUserDetailPage",
  async (id, { rejectWithValue }) => {
    try {
      const apiCall = async () => await axios.get<User>(`${API_URL}?id=${id}`);
      const response = await recursiveApiCall(apiCall);
      return response.data;
    } catch (error) {
      if(error instanceof Error){
        return rejectWithValue(error.message);
      }
      return rejectWithValue("Failed to fetch user details");
    }
  }
);
