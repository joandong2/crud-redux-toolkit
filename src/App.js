import "./App.css";
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getPosts,
  getPost,
  addPost,
  deletePost,
  updatePost,
} from "./components/Posts";
import { useForm } from "react-hook-form";

function App() {
  const dispatch = useDispatch();
  const { posts, post, loading } = useSelector((state) => state.posts); // destructure/get posts, post, loading inside state post
  const {
    register,
    handleSubmit,
    reset,
    // watch,
    // formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    data.hidden_id ? dispatch(updatePost(data)) : dispatch(addPost(data));
    reset({
      hidden_id: "",
      title: "",
      body: "",
    });
  };

  const onDelete = (id) => {
    dispatch(deletePost(id));
  };

  const onEdit = (id) => {
    dispatch(getPost(id));
  };

  useEffect(() => {
    dispatch(getPosts());

    let defaultValues = {};
    defaultValues.hidden_id = post._id;
    defaultValues.title = post.title;
    defaultValues.body = post.body;
    reset({ ...defaultValues });
  }, [dispatch, post, reset]);

  return (
    <div className="App">
      <div>
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* register your input into the hook by invoking the "register" function */}
          <input type="hidden" {...register("hidden_id")} />
          <input placeholder="Title" {...register("title")} />
          <textarea placeholder="Body" {...register("body")} />

          <input type="submit" value={post ? "Update" : "Submit"} />
        </form>
      </div>

      {!loading
        ? posts?.map((post, i) => (
            <div key="{i}">
              <h2>{post.title}</h2>
              <p>{post.body}</p>
              <button onClick={() => onEdit(post._id)}>Edit</button>
              <button onClick={() => onDelete(post._id)}>Delete</button>
            </div>
          ))
        : ""}
    </div>
  );
}

export default App;
