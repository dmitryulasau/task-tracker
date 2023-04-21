import React from "react";
import { Link } from "react-router-dom";
import style from "./TaskCard.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faTrashAlt, faPenAlt } from "@fortawesome/free-solid-svg-icons";

import axios from "axios";
import { useContext, useState, useEffect } from "react";
import { Context } from "../context/Context";

import styles from "./EditTask.module.css";

library.add(faTrashAlt, faPenAlt);

function convertDate(isoDate) {
  const date = new Date(isoDate);
  const year = date.getFullYear();
  const month = new Intl.DateTimeFormat("en-US", { month: "short" }).format(
    date
  );
  const day = date.getDate();
  return `${month} ${day} ${year}`;
}

function TaskCard({ task, onDelete }) {
  const { user } = useContext(Context);

  // UPDATE TASK
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);
  const [dueDate, setDueDate] = useState(task.dueDate);
  const [status, setStatus] = useState("");
  const [updateMode, setUpdateMode] = useState(false);

  // DELETE TASK
  const handleDelete = async () => {
    try {
      await axios.delete(
        `http://localhost:8800/tasks/${task._id}` ||
          `https://tasktracker-mqm9.onrender.com/tasks/${task._id}`,
        {
          data: { username: user.username },
        }
      );
      window.location.replace("/dashboard");
    } catch (err) {}
  };

  // EDIT TASK
  const handleUpdate = async () => {
    try {
      await axios.put(
        `http://localhost:8800/tasks/${task._id}` ||
          `https://tasktracker-mqm9.onrender.com/tasks/${task._id}`,
        {
          username: user.username,
          title: title,
          description: description,
          dueDate: dueDate,
          status: [status],
        }
      );
      setUpdateMode(false);
      window.location.reload();
    } catch (err) {}
  };

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8800/tasks/${task._id}` ||
            `https://tasktracker-mqm9.onrender.com/tasks/${task._id}`
        );
        const updatedTask = response.data;
        setTitle(updatedTask.title);
        setDescription(updatedTask.description);
        setDueDate(updatedTask.dueDate);
        setStatus(updatedTask.status[0]);
      } catch (err) {}
    };

    if (!updateMode) {
      fetchTask();
    }
  }, [task._id, updateMode]);

  function redirect() {
    return <Link to={`/edit-task/${task.id}`}>Edit</Link>;
  }

  function handleStatusChange(event) {
    const newStatus = event.target.value;
    setStatus(newStatus);
  }

  return (
    <div className="task-card">
      <div className="task-card-header">
        {/* TITLE */}

        {updateMode ? (
          <input
            type="text"
            value={title}
            className={styles.input}
            autoFocus
            onChange={(e) => setTitle(e.target.value)}
          />
        ) : (
          <h3 style={{ color: "#212529" }}>{task.title}</h3>
        )}
        <div className="task-card-buttons">
          <button className="edit-button" onClick={() => setUpdateMode(true)}>
            <FontAwesomeIcon icon="pen-alt" />
          </button>
          <button className="delete-button" onClick={handleDelete}>
            <FontAwesomeIcon icon="trash-alt" />
          </button>
        </div>
      </div>

      {/* DESCRIPTION */}
      {updateMode ? (
        <textarea
          className={styles.input}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      ) : (
        <p
          style={{
            color: "#343a40",
            borderRadius: "6px",
            backgroundColor: "#f8f9fa",

            padding: "20px",
          }}
        >
          {task.description}
        </p>
      )}

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        {/* DUE DATE */}
        {updateMode ? (
          <label>
            Previous Due Date: {convertDate(task.dueDate)}
            <input
              className={styles.input}
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
            />
          </label>
        ) : (
          <p
            style={{
              display: "inline",
              color: "#343a40",
              borderRadius: "6px",
              backgroundColor: "#f8f9fa",
              textAlign: "center",
              fontWeight: 700,
              padding: "10px",
            }}
          >
            Due Date 📅: {convertDate(task.dueDate)}
          </p>
        )}

        {/* STATUS */}
        {updateMode ? (
          <label>
            Status:
            <select
              className={styles.input}
              value={status}
              onChange={handleStatusChange}
            >
              <option value="Incomplete">Incomplete</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
            </select>
          </label>
        ) : (
          <p
            style={{
              color: "#343a40",
              fontWeight: 700,
              padding: "10px",
              borderRadius: "6px",
              display: "inline",
              backgroundColor:
                task.status[0] === "Completed"
                  ? "#d3f9d8"
                  : task.status[0] === "In Progress"
                  ? "#ffec99"
                  : "#ffa8a8",
            }}
          >
            {task.status[0]}
          </p>
        )}
      </div>

      {/* UPDATE BUTTON */}
      {updateMode && (
        <div
          style={{
            marginTop: "10px",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <button className="update-button" onClick={handleUpdate}>
            Update
          </button>
          <button
            className="cancel-button"
            onClick={() => setUpdateMode(false)}
          >
            Cancel
          </button>
        </div>
      )}
    </div>
  );
}

export default TaskCard;
