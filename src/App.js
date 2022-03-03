import "./App.css";
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getUsers, addUser } from "./components/Users";
import { useForm } from "react-hook-form";

function App() {
  const dispatch = useDispatch();
  const { users, loading } = useSelector((state) => state.users);
  const {
    register,
    handleSubmit,
    // watch,
    // formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    dispatch(addUser(data));
    //console.log(data);
  };

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  return (
    <div className="App">
      <div>
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* register your input into the hook by invoking the "register" function */}
          <input placeholder="Title" {...register("title")} />
          <input type="submit" />
        </form>
      </div>

      {!loading
        ? users?.map((user, i) => (
            <div key="{i}">
              <h2>{user.name}</h2>
              <p>{user.email}</p>
            </div>
          ))
        : ""}
    </div>
  );
}

export default App;
