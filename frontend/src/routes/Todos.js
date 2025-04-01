import React, { useState, useEffect, useContext } from "react";
import TodoProgress from "../components/TodoProgress";
import TodoForm from "../components/TodoForm";
import TodoList from "../components/TodoList";
import * as api from "../api/api";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import LeaderBoard from "../components/LeaderBoard";

function Todos() {
  const { userData } = useContext(UserContext);

  const [todos, setTodos] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTodosData = async () => {
      console.log(userData?._id);
      const data = await api.getTodos(userData?._id);
      if (data?.data) {
        setTodos(data.data);
      } else if (data.err) {
        alert(data.err);
        navigate("/login");
      }
    };

    fetchTodosData();
  }, []);

  return (
    <section className="todosContainer">
      <div>
        <Link to="/profile">Go to Profile</Link>
        <hr />
        {todos && <TodoProgress todos={todos} />}
        <TodoForm setTodos={setTodos} userData={userData} />
        <TodoList todos={todos} setTodos={setTodos} userData={userData} />
      </div>
      <LeaderBoard />
    </section>
  );
}

export default Todos;
