import React from "react";
import TaskCard from "./TaskCard";

import { useContext } from "react";
import { Context } from "../context/Context";

function TaskList({ tasks }) {
  const { user } = useContext(Context);

  return (
    <div>
      {tasks.map(
        (task) =>
          task.username === user?.username && (
            <TaskCard key={task._id} task={task} />
          )
      )}
    </div>
  );
}

export default TaskList;
