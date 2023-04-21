import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import TaskCard from "./TaskCard";
import style from "./Dashboard.css";
import axios from "axios";
import TaskList from "./TaskList";
import CreateTask from "./CreateTask";
import EditTask from "./EditTask";
import { useContext } from "react";
import { Context } from "../context/Context";

function Dashboard() {
  const { user } = useContext(Context);

  const [tasks, setTasks] = useState([]);
  const [sortName, setSortName] = useState("name");
  const [sortDate, setSortDate] = useState("date");
  const [showCreateTask, setShowCreateTask] = useState(false);
  const [showEditTask, setShowEditTask] = useState(false);
  const [editTask, setEditTask] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);

  console.log(tasks);
  
  useEffect(() => {
    setIsLoaded(true);

    const fetchTasks = async () => {
      const res = await axios.get("http://localhost:8800/tasks");
      setTasks(res.data);
    };
    
    fetchTasks();
  }, []);
  



  function handleDeleteTask(id) {
    setTasks(tasks.filter((task) => task.id !== id));
  }

  function handleEditTask(task) {
    setEditTask(task);
    setShowEditTask(true);
  }

  // LOGOUT
  function handleLogout() {
    localStorage.removeItem("user");
    window.location.href = "/login";
  }

  function handleSortByName() {
    setSortName("name");
    setSortDate(null);
  }
  
  function handleSortByDate() {
    setSortName(null);
    setSortDate("date");
  }
  
  const sortedTasks = [...tasks].sort((a, b) => {
    if (sortName === "name") {
      return a.title.localeCompare(b.title);
    } else if (sortDate === "date") {
      return new Date(a.dueDate) - new Date(b.dueDate);
    }
    return 0;
  });
  

  return (
    <div>
      <h2 style={{ textAlign: "center" }}>Hello, {user.username}!</h2>
      {isLoaded && (
        <span className="dividor"></span>
      )}
      <div className="dashboard">
        <div className="dashboard-left">
          <button onClick={handleSortByName}>Sort by Name</button>
          <button onClick={handleSortByDate}>Sort by Date</button>
          <button
            onClick={() => {
              //make edit button state false
              setShowCreateTask(!showCreateTask);
              if (showCreateTask) {
                setShowEditTask(false);
              }
            }}
          >
            Create New Task
          </button>

          <button className={style.logOut_btn} onClick={handleLogout}>
            Log Out
          </button>
        </div>
        <div
          className={`dashboard-right ${
            showCreateTask
              ? "dashboard-create show"
              : showEditTask
              ? "dashboard-edit show"
              : ""
          }`}
        >
          {showCreateTask ? (
            <CreateTask
              setTasks={setTasks}
              setShowCreateTask={setShowCreateTask}
            />
          ) : showEditTask ? (
            <EditTask
              task={editTask}
              setTasks={setTasks}
              setShowEditTask={setShowEditTask}
            />
          ) : (
            <div>
              {tasks.filter((t) => t.username === user.username).length ===
              0 ? (
                <h1 style={{ textAlign: "center" }}>YOU HAVE NO TASKS 🤗</h1>
              ) : (
                <TaskList
                  tasks={sortedTasks}
                  onDelete={handleDeleteTask}
                  onEdit={handleEditTask}
                />
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
