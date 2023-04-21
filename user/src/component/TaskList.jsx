import React from "react";
import TaskCard from "./TaskCard";

function TaskList({ tasks }) {
  return (
    <div>
      {tasks.map((task) => (
        <TaskCard key={task._id} task={task} />
      ))}
    </div>
  );
}

export default TaskList;
