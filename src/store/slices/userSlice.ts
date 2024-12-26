import { createSlice } from "@reduxjs/toolkit";
import { fetchUserDetailPage, fetchUsers } from "../../utils/apiService";
import { initialStatePayload } from "../Types/userSliceInterface";
const initialState: initialStatePayload = {
  users: [],
  detailedUser: [{
    id: 0,
    name: "",
    username: "",
    email: "",
    address: {
      street: "",
      suite: "",
      city: "",
      zipcode: "",
      geo: {
        lat: "",
        lng: "",
      },
    },
    phone: "",
    website: "",
    company: {
      name: "",
      catchPhrase: "",
      bs: "",
    },
  }],
  loading: false,
  error: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch Users List";
      })
      .addCase(fetchUserDetailPage.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUserDetailPage.fulfilled, (state, action) => {
        state.loading = false;
        state.detailedUser = action.payload;
      })
      .addCase(fetchUserDetailPage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch User Detail Page";
      });



      
  },
});

export default userSlice.reducer;
