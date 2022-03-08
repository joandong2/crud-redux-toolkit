import "./App.css";
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getPosts, addPost } from "./components/Posts";
import { useForm } from "react-hook-form";

function App() {
  const dispatch = useDispatch();
  const { posts, loading } = useSelector((state) => state.posts);
  const {
    register,
    handleSubmit,
    // watch,
    // formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    dispatch(addPost(data));
  };

  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch]);

  return (
    <div className="App">
      <div>
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* register your input into the hook by invoking the "register" function */}
          <input placeholder="Title" {...register("title")} />
          <textarea placeholder="Body" {...register("body")} />
          <input type="submit" />
        </form>
      </div>

      {!loading
        ? posts?.map((post, i) => (
            <div key="{i}">
              <h2>{post.title}</h2>
              <p>{post.body}</p>
            </div>
          ))
        : ""}
    </div>
  );
}

export default App;
