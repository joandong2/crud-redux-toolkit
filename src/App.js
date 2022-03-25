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

  const formNeeds = {
    title: { required: "Title is required" },
    body: { required: "Body is required" },
    password: {
      required: "Password is required",
      minLength: {
        value: 8,
        message: "Password must have at least 8 characters",
      },
    },
  };

  const {
    register,
    handleSubmit,
    reset,
    // watch,
    formState: { errors },
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
      <div className="container mx-auto md flex items-center flex-col mt-20">
        <div className="mb-10 mx-auto md">
          <form onSubmit={handleSubmit(onSubmit)} className="flex ">
            {/* register your input into the hook by invoking the "register" function */}
            <div>
              <input type="hidden" {...register("hidden_id")} />
            </div>
            <div>
              <input
                placeholder="Title"
                {...register("title", formNeeds.title)}
                className="w-full border border-gray-600 rounded-md focus:outline focus:border-red-600 px-2 py-2"
              />
              {errors?.title && <p>{errors.title.message}</p>}
            </div>
            <div>
              {" "}
              <textarea
                placeholder="Body"
                {...register("body", formNeeds.body)}
                className="w-full border border-gray-600 rounded-md focus:outline-none focus:border-red-600 px-2 py-2"
              />
              {errors?.body && <p>{errors.body.message}</p>}
            </div>
            <div>
              <input
                className="bg-red-600 px-6 py-2 text-white  rounded-md"
                type="submit"
                value={Object.keys(post).length === 0 ? "Submit" : "Update"}
              />
            </div>
          </form>
        </div>
        <div>
          <table class="table-auto">
            <thead>
              <tr>
                <th>Title</th>
                <th>Body</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {!loading
                ? posts?.map((post, i) => (
                    <tr key={post._id}>
                      <td>
                        <h2 className="text-3xl font-bold underline">
                          {post.title}
                        </h2>
                      </td>
                      <td>
                        <p>{post.body}</p>
                      </td>
                      <td>
                        <button
                          className="bg-green-600 px-6 py-2 text-white  rounded-md mr-2"
                          onClick={() => onEdit(post._id)}
                        >
                          Edit
                        </button>
                        <button
                          className="bg-red-600 px-6 py-2 text-white  rounded-md"
                          onClick={() => onDelete(post._id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                : ""}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default App;
