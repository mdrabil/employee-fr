import React, { useState, useEffect } from "react";

import { showToast } from "../../utils/toastHelper";
import { getMyTasks, updateTaskStatus } from "../../api/TaskApi";
import TaskPopup from "./TaskPopup";

const TaskPage = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [popupOpen, setPopupOpen] = useState(false);
  const [editTask, setEditTask] = useState(null);

  const fetchTasks = async () => {
    setLoading(true);
    const res = await getMyTasks();
    if (res.success) setTasks(res.data);
    console.log('taks data',res?.data)
    setLoading(false);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  // Add task button click
  const handleAddClick = () => {
    setEditTask(null);
    setPopupOpen(true);
  };

  // Edit task button click
  const handleEditClick = (task) => {
    setEditTask(task);
    setPopupOpen(true);
  };

  // Mark task completed
  const handleComplete = async (dailyTaskId, taskId) => {
    const res = await updateTaskStatus(dailyTaskId, taskId, { status: "completed" });
    if (res.success) {
      showToast("Task completed!", "success");
      fetchTasks();
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between mb-4">
        <h2 className="text-2xl font-semibold">My Tasks</h2>
        <button
          onClick={handleAddClick}
          className="px-4 py-2 bg-blue-500 text-white rounded-md"
        >
          Add Task
        </button>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : tasks.length === 0 ? (
        <p>No tasks found</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {tasks?.map?.(daily => (
            <div key={daily._id} className="border p-4 rounded-md shadow">
              <h3 className="font-semibold mb-2">Date: {new Date(daily.date).toDateString()}</h3>
              {daily.tasks.map(task => (
                <div key={task._id} className="border p-2 rounded mb-2">
                  <div className="flex justify-between items-center">
                    <p className={`font-medium ${task.status==="completed"?"line-through text-green-600":""}`}>
                      {task.title} ({task.status})
                    </p>
                    <div className="flex gap-2">
                      {task.status !== "completed" && (
                        <button
                          onClick={() => handleComplete(daily._id, task._id)}
                          className="px-2 py-1 bg-green-500 text-white rounded text-sm"
                        >
                          Complete
                        </button>
                      )}
                      <button
                        onClick={() => handleEditClick({ ...task, dailyTaskId: daily._id })}
                        className="px-2 py-1 bg-yellow-500 text-white rounded text-sm"
                      >
                        Edit
                      </button>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600">{task.description}</p>
                </div>
              ))}
            </div>
          ))}
        </div>
      )}

      {popupOpen && (
        <TaskPopup
          isEdit={!!editTask}
          data={editTask}
          close={() => { setPopupOpen(false); fetchTasks(); }}
        />
      )}
    </div>
  );
};

export default TaskPage;
