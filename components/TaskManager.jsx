
"use client";
import { useState } from "react";
import { FaEdit, FaTrash, FaCheck, FaUndo } from "react-icons/fa"; 
import Tooltip from '@mui/material/Tooltip'; 

const TaskManager = ({ initialTasks }) => {
  const [tasks, setTasks] = useState(initialTasks || []);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("low");
  const [searchTerm, setSearchTerm] = useState("");

  const addTask = () => {
    if (title) {
      setTasks([
        ...tasks,
        { title, description, priority, completed: false },
      ]);
      setTitle("");
      setDescription("");
      setPriority("low");
    }
  };

  const editTask = (index) => {
    const updatedTasks = [...tasks];
    const task = updatedTasks[index];

    setTitle(task.title);
    setDescription(task.description);
    setPriority(task.priority);

    updatedTasks.splice(index, 1);
    setTasks(updatedTasks);
  };

  const toggleComplete = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].completed = !updatedTasks[index].completed;

    const sortedTasks = sortTasks(updatedTasks);
    setTasks(sortedTasks);
  };

  const deleteTask = (index) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
  };

  const sortTasks = (tasksList) => {
    return tasksList.sort((a, b) => {
      const priorityOrder = { high: 1, medium: 2, low: 3 };

      if (a.completed !== b.completed) {
        return a.completed ? 1 : -1; 
      }

      if (priorityOrder[a.priority] !== priorityOrder[b.priority]) {
        return priorityOrder[a.priority] - priorityOrder[b.priority];
      }

      return 0;
    });
  };

  const filteredTasks = tasks.filter((task) =>
    task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    task.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-lg mx-auto p-5 bg-gray-50 rounded-lg shadow-lg">
      <h1 className="text-4xl font-bold mb-4 text-gray-800 text-center">Task Manager</h1>

      <div className="mb-4">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search Tasks..."
          className="border border-gray-300 p-3 w-full mb-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="mb-4">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Task Title"
          className="border border-gray-300 p-3 w-full mb-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Task Description"
          className="border border-gray-300 p-3 w-full mb-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          className="border border-gray-300 p-3 w-full mb-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
        <button
          onClick={addTask}
          className="bg-blue-600 hover:bg-blue-700 text-white p-3 w-full rounded-md transition duration-200"
        >
          Add Task
        </button>
      </div>

      <ul>
        {sortTasks(filteredTasks).map((task, index) => (
          <li
            key={index}
            className={`border border-gray-300 p-4 mb-4 flex justify-between items-center rounded-lg shadow-sm ${
              task.completed ? "bg-green-100" : "bg-white"
            } transition duration-200`}
          >
            <div>
              <h2 className="font-semibold text-lg">{task.title}</h2>
              <Tooltip title={task.description} arrow>
                <p className="text-gray-600 cursor-pointer overflow-hidden whitespace-nowrap text-ellipsis max-w-xs">
                  {task.description}
                </p>
              </Tooltip>
              <span
                className={`text-sm font-medium ${
                  task.priority === "high"
                    ? "text-red-600"
                    : task.priority === "medium"
                    ? "text-yellow-600"
                    : "text-green-600"
                }`}
              >
                {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)} Priority
              </span>
            </div>
            <div className="flex space-x-2">
              <Tooltip title={task.completed ? "Undo" : "Complete"} arrow>
                <button
                  onClick={() => toggleComplete(index)}
                  className={`p-2 rounded-md transition duration-200 ${
                    task.completed
                      ? "bg-gray-600 hover:bg-gray-700 text-white"
                      : "bg-green-600 hover:bg-green-700 text-white"
                  }`}
                >
                  {task.completed ? <FaUndo /> : <FaCheck />}
                </button>
              </Tooltip>

              <Tooltip title="Edit Task" arrow>
                <button
                  onClick={() => editTask(index)}
                  className="bg-yellow-600 hover:bg-yellow-700 text-white p-2 rounded-md transition duration-200"
                >
                  <FaEdit />
                </button>
              </Tooltip>

              <Tooltip title="Delete Task" arrow>
                <button
                  onClick={() => deleteTask(index)}
                  className="bg-red-600 hover:bg-red-700 text-white p-2 rounded-md transition duration-200"
                >
                  <FaTrash />
                </button>
              </Tooltip>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskManager;


