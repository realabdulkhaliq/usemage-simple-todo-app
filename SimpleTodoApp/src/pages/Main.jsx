import React, { useState } from 'react';
import { useQuery, useAction, getTasks, createTask, toggleTask, editTask, getUser } from 'wasp/client/operations';
import { Link } from 'react-router-dom';

const MainPage = () => {
  const { data: tasks, isLoading, error } = useQuery(getTasks);
  const createTaskFn = useAction(createTask);
  const toggleTaskFn = useAction(toggleTask);
  const editTaskFn = useAction(editTask);
  const { data: user } = useQuery(getUser);
  const [newTaskDescription, setNewTaskDescription] = useState('');
  const [editedTaskDescription, setEditedTaskDescription] = useState('');

  if (isLoading) return 'Loading...';
  if (error) return 'Error: ' + error;

  const handleCreateTask = () => {
    createTaskFn({ description: newTaskDescription });
    setNewTaskDescription('');
  };

  const handleToggleTask = (taskId) => {
    toggleTaskFn({ id: taskId });
  };

  const handleEditTask = (taskId) => {
    editTaskFn({ id: taskId, description: editedTaskDescription });
    setEditedTaskDescription('');
  };

  return (
    <div className='p-4'>
      <div className='flex gap-x-4 py-5'>
        <input
          type='text'
          placeholder='New Task'
          className='px-1 py-2 border rounded text-lg'
          value={newTaskDescription}
          onChange={(e) => setNewTaskDescription(e.target.value)}
        />
        <button
          onClick={handleCreateTask}
          className='bg-blue-500 hover:bg-blue-700 px-2 py-2 text-white font-bold rounded'
        >
          Add Task
        </button>
      </div>
      <div>
        {tasks.map((task) => (
          <div
            key={task.id}
            className='py-2 px-2 flex items-center justify-between bg-gray-100 mb-4 rounded-lg'
          >
            <div>
              <input
                type='checkbox'
                checked={task.isDone}
                onChange={() => handleToggleTask(task.id)}
                className='mr-2 h-6 w-6'
              />
              {task.id === editedTaskDescription && (
                <input
                  type='text'
                  placeholder='Edit Task'
                  className='px-1 py-2 border rounded text-lg'
                  value={editedTaskDescription}
                  onChange={(e) => setEditedTaskDescription(e.target.value)}
                />
              )}
              {task.id !== editedTaskDescription && (
                <p>{task.description}</p>
              )}
            </div>
            <div>
              <button
                onClick={() => handleEditTask(task.id)}
                className='bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mr-2'
              >
                Edit
              </button>
              <button
                onClick={() => handleToggleTask(task.id)}
                className='bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded'
              >
                {task.isDone ? 'Undone' : 'Done'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MainPage;