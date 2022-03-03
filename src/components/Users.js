import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// export const getUsers = createAsyncThunk("posts/getUsers", async () => {
//   return await fetch("https://jsonplaceholder.typicode.com/users").then((res) =>
//     res.json()
//   );
// });

export const getUsers = createAsyncThunk(
  "users/getUsers",
  async (_, { rejectWithValue }) => {
    try {
      const data = await fetch(
        "https://my-json-server.typicode.com/joandong2/fake-rest-api/users"
      );
      return data.json();
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const addUser = createAsyncThunk(
  "users/addUser",
  async (user, { rejectWithValue }) => {
    // user from the form dispatch
    try {
      const data = await fetch(
        "https://my-json-server.typicode.com/joandong2/demo/posts",
        {
          method: "POST",
          body: JSON.stringify(user),
          header: {
            "Content-Type": "application/json",
          },
        }
      );
      return data.json();
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

const postSlice = createSlice({
  name: "users",
  initialState: {
    users: [],
    loading: false,
  },
  reducers: {},
  extraReducers: {
    [getUsers.pending]: (state, action) => {
      state.loading = true;
    },
    [getUsers.fulfilled]: (state, action) => {
      state.loading = false;
      state.users = action.payload;
    },
    [getUsers.rejected]: (state, action) => {
      state.loading = false;
    },
    [addUser.pending]: (state, action) => {
      state.loading = true;
    },
    [addUser.fulfilled]: (state, action) => {
      state.loading = false;
      state.users = action.payload;
      //console.log("action", action);
    },
    [addUser.rejected]: (state, action) => {
      state.loading = false;
      //console.log(action.payload);
    },
  },
});

export default postSlice.reducer;
