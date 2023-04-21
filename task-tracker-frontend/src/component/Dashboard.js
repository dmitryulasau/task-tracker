import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import TaskCard from './TaskCard';
import style from './Dashboard.css';

function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [sortName, setSortName] = useState('name');
  const [sortDate, setSortDate] = useState('date');

  useEffect(() => {
    // Replace this with a call to an API or database that fetches tasks
    const tasksFromAPI = [
      {
        id: 1,
        title: 'do homework',
        description: 'Complete math homework by Friday',
        dueDate: '2023-04-23',
        status: 'incomplete',
      },
      {
        id: 2,
        title: 'z laundry',
        description: 'Wash clothes and towels',
        dueDate: '2023-04-22',
        status: 'incomplete',
      },{
        id: 3,
        title: 'a laundry',
        description: 'Wash clothes and towels',
        dueDate: '2023-04-22',
        status: 'incomplete',
      },
      {
        id: 5,
        title: 'a laundry',
        description: 'Wash clothes and towels',
        dueDate: '2023-04-22',
        status: 'incomplete',
      },{
        id: 4,
        title: 'a laundry',
        description: 'Wash clothes and towels',
        dueDate: '2023-04-22',
        status: 'incomplete',
      }
    ];

    setTasks(tasksFromAPI);
  }, []);

  function handleSortByName() {
    setSortName('name');
  }

  function handleSortByDate() {
    setSortDate('date');
  }

  function handleDeleteTask(id) {
    setTasks(tasks.filter(task => task.id !== id));
  }

  const sortedTasks = [...tasks].sort((a, b) => {
    if (sortName === 'name') {
      return a.title.localeCompare(b.title);
    } else if (sortDate === 'date') {
      return a.dueDate.localeCompare(b.dueDate);
    }
    return 0;
  });

  return (
    <div className="dashboard">
      <div className="dashboard-left">
        <button onClick={handleSortByName}>Sort by Name</button>
        <button onClick={handleSortByDate}>Sort by Date</button>
        <button ><a href='/create-task'>Create New Task</a></button>
        <button ><a href='/login'>Log Out</a></button>
      </div>
      <div className="dashboard-right">
        {sortedTasks.map(task => (
          <TaskCard key={task.id} task={task} onDelete={handleDeleteTask} />
        ))}
      </div>
    </div>
  );
}

export default Dashboard;
