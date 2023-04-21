import React, { useState } from 'react';

function EditTask({ task, onUpdate }) {
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);
  const [dueDate, setDueDate] = useState(task.dueDate);
  const [status, setStatus] = useState(task.status);

  function handleSubmit(event) {
    event.preventDefault();
    onUpdate({
      id: task.id,
      title: title,
      description: description,
      dueDate: dueDate,
      status: status
    });
  }

  return (
    <div>
      <h2>Edit Task</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Title:
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
        </label>
        <label>
          Description:
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} />
        </label>
        <label>
          Due Date:
          <input type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} />
        </label>
        <label>
          Status:
          <select value={status} onChange={(e) => setStatus(e.target.value)}>
            <option value="incomplete">Incomplete</option>
            <option value="complete">Complete</option>
          </select>
        </label>
        <button type="submit">Update</button>
      </form>
    </div>
  );
}

export default EditTask;
