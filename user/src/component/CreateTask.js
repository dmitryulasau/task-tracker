import React, { useContext, useState, useEffect } from "react";
import styles from "./CreateTask.module.css";
import axios from "axios";
import { Context } from "../context/Context";

function CreateTask({ onCreate, setShowCreateTask }) {
  const { user } = useContext(Context);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [categories, setCategories] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newTask = {
      username: user.username,
      title: title,
      description,
      dueDate,
    };

    try {
      const res = await axios.post(
        "http://localhost:8800/tasks/" ||
          "https://tasktracker-mqm9.onrender.com/tasks/",
        newTask
      );
      window.location.replace("/dashboard");
    } catch (error) {}
  };

  function handleCategoryChange(event) {
    const category = event.target.value;
    setCategories((prevCategories) => [...prevCategories, category]);
  }

  function handleExit() {
    setShowCreateTask(false);
  }

  return (
    <div>
      <h1 style={{ textAlign: "center", color: "#343a40" }}>Create Task</h1>
      <form className={styles.form} onSubmit={handleSubmit}>
        <label style={{ textAlign: "center", color: "#343a40" }}>
          Title:
          <input
            className={styles.input}
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </label>
        <label style={{ textAlign: "center", color: "#343a40" }}>
          Description:
          <textarea
            className={styles.input}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </label>
        <label style={{ textAlign: "center", color: "#343a40" }}>
          Due Date:
          <input
            className={styles.input}
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
          />
        </label>
        <button
          className={styles.cancel_btn}
          type="button"
          onClick={handleExit}
        >
          Cancel
        </button>
        <button
          className={styles.create_btn}
          type="button"
          onClick={handleSubmit}
        >
          Create
        </button>
      </form>
    </div>
  );
}

export default CreateTask;
