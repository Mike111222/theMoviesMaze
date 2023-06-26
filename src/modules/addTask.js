import Task from './taskList.js';

// This function takes a taskInput (presumably an HTML input element) and an
// array of tasks.
// It extracts the trimmed value from the taskInput, representing the task name.
function addTask(taskInput, tasks) {
  const taskName = taskInput.value.trim();
  const id = tasks.length + 1;
  if (taskName !== '') {
    const task = new Task(taskName, false, id);
    tasks.push(task);
  }
  return tasks;
}

export default addTask;
