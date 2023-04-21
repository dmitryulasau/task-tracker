import React from "react";
import { Link } from "react-router-dom";
import style from "./TaskCard.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faTrashAlt, faPenAlt } from "@fortawesome/free-solid-svg-icons";

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
  function handleDelete() {
    onDelete(task.id);
  }
  function redirect() {
    return <Link to={`/edit-task/${task.id}`}>Edit</Link>;
  }

  return (
    <div className="task-card">
      <div className="task-card-header">
        <h3>{task.title}</h3>
        <div className="task-card-buttons">
          <button className="edit-button" onClick={redirect}>
            <FontAwesomeIcon icon="pen-alt" />
          </button>
          <button className="delete-button" onClick={handleDelete}>
            <FontAwesomeIcon icon="trash-alt" />
          </button>
        </div>
      </div>
      <p>{task.description}</p>
      <p>Due Date: {convertDate(task.dueDate)}</p>
      <p>Status: {task.status[0]}</p>
    </div>
  );
}

export default TaskCard;
