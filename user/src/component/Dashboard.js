import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import TaskCard from "./TaskCard";
import style from "./Dashboard.css";
import axios from "axios";
import TaskList from "./TaskList";

function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [sortName, setSortName] = useState("name");
  const [sortDate, setSortDate] = useState("date");

  useEffect(() => {
    const fetchTasks = async () => {
      const res = await axios.get("http://localhost:8800/tasks");
      setTasks(res.data);
    };

    fetchTasks();
  }, []);

  function handleSortByName() {
    setSortName("name");
  }

  function handleSortByDate() {
    setSortDate("date");
  }

  function handleDeleteTask(id) {
    setTasks(tasks.filter((task) => task.id !== id));
  }

  function handleLogout() {
    localStorage.removeItem("user");
    window.location.href = "/login";
  }

  const sortedTasks = [...tasks].sort((a, b) => {
    if (sortName === "name") {
      return a.title.localeCompare(b.title);
    } else if (sortDate === "date") {
      return a.dueDate.localeCompare(b.dueDate);
    }
    return 0;
  });

  return (
    <div className="dashboard">
      <div className="dashboard-left">
        <button onClick={handleSortByName}>Sort by Name</button>
        <button onClick={handleSortByDate}>Sort by Date</button>
        <Link to="/create-task">Create New Task</Link>
        <div className="logout-button" onClick={handleLogout}>
          Logout
        </div>
      </div>

      <div className="dashboard-right">
        {/* {sortedTasks.map((task) => (
          <TaskCard key={task._id} task={tasks} onDelete={handleDeleteTask} />
        ))} */}
        {tasks.length === 0 ? (
          <h1 style={{ textAlign: "center" }}>YOU HAVE NO TASKS 🤗</h1>
        ) : (
          <TaskList tasks={tasks} />
        )}
      </div>
    </div>
  );
}

export default Dashboard;
