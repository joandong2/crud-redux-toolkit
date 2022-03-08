import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getPosts = createAsyncThunk(
  "posts/getPosts",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        "https://jo-test-api.herokuapp.com/api/posts/"
      );
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const addPost = createAsyncThunk(
  "posts/addPost",
  async (post, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "https://jo-test-api.herokuapp.com/api/posts/",
        {
          title: post.title,
          body: post.body,
        }
      );
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

// export const deleteUser = createAsyncThunk(
//   "users/deleteUser",
//   async (id, { rejectWithValue }) => {
//     try {
//       const data = await fetch(
//         "https://my-json-server.typicode.com/joandong2/fake-rest-api/users",
//         {
//           method: "DELETE",
//         }
//       );
//       return data.json();
//     } catch (err) {
//       return rejectWithValue(err.response.data);
//     }
//   }
// );

const postSlice = createSlice({
  name: "users",
  initialState: {
    posts: [],
    loading: false,
  },
  reducers: {},
  extraReducers: {
    [getPosts.pending]: (state, action) => {
      state.loading = true;
    },
    [getPosts.fulfilled]: (state, action) => {
      state.loading = false;
      state.posts = action.payload;
    },
    [getPosts.rejected]: (state, action) => {
      state.loading = false;
    },
    [addPost.pending]: (state, action) => {
      state.loading = true;
    },
    [addPost.fulfilled]: (state, action) => {
      state.loading = false;
      state.posts = [...state.posts, action.payload];
      console.log("action data", action);
    },
    [addPost.rejected]: (state, action) => {
      state.loading = false;
      //console.log(action.payload);
    },
  },
});

export default postSlice.reducer;
