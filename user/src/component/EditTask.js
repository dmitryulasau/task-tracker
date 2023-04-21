import React, { useState } from "react";
import styles from "./EditTask.module.css";

function EditTask({ onEdit, setShowEditTask }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [categories, setCategories] = useState([]);
  const [status, setStatus] = useState("Incomplete");
  const [showEditClass, setShowEditClass] = useState(false);

  function handleSubmit(event) {
    event.preventDefault();
    const taskData = {
      title: title,
      description: description,
      dueDate: dueDate,
      status: [status],
    };
  }

  function handleCategoryChange(event) {
    const category = event.target.value;
    setCategories((prevCategories) => [...prevCategories, category]);
  }

  function handleStatusChange(event) {
    const newStatus = event.target.value;
    setStatus(newStatus);
  }

  function handleExit() {
    setShowEditTask(false);
  }

  function handleEdit() {
    setShowEditClass(true);
    handleSubmit();
  }

  return (
    <div>
      <h1 style={{ textAlign: "center" }}>Edit Task</h1>

      <form
        className={`${styles.form} ${showEditClass ? styles.edit : ""}`}
        onSubmit={handleSubmit}
      >
        <label>
          Title:
          <input
          placeholder="title"
            className={styles.input}
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </label>
        <label>
          Description:
          <textarea
            className={styles.input}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </label>
        <label>
          Due Date:
          <input
            className={styles.input}
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
          />
        </label>
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
        <button
          className={styles.cancel_btn}
          type="button"
          onClick={handleExit}
        >
          Cancel
        </button>
        <button className={styles.edit_btn} type="button" onClick={handleEdit}>
          Edit
        </button>
      </form>
    </div>
  );
}

export default EditTask;
