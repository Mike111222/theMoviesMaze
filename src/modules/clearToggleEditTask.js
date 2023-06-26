// This function takes an array of tasks and filters out the completed tasks.

function clearCompletedTask(tasks) {
  return tasks.filter((task) => !task.status);
}

// This function takes an id and an array of tasks.
// It maps over the tasks array and toggles the status of the task with the given id.

function toggleTaskStatus(id, tasks) {
  return tasks.map((task) => {
    if (task.id === id) {
      return {
        ...task,
        status: !task.status,
      };
    }
    return task;
  });
}

// This function takes an id, a new name, an array of tasks,
// and two additional functions: saveTasks and displayTasks.

function editTask(id, newName, tasks, saveTasks, displayTasks) {
  const taskIndex = tasks.findIndex((task) => task.id === id);
  if (taskIndex !== -1) {
    tasks[taskIndex].name = newName;
    saveTasks();
    displayTasks();
  }
}

export { clearCompletedTask, toggleTaskStatus, editTask };
