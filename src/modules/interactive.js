import addTask from './addTask.js';
import removeTask from './removeTask.js';
import { clearCompletedTask, toggleTaskStatus, editTask } from './clearToggleEditTask.js';

// This class represents a task list and manages the functionality related to tasks.
class TaskList {
  constructor() {
    this.tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    // Getting references to various elements in the DOM.
    this.taskForm = document.getElementById('task-form');
    this.taskInput = document.getElementById('task-input');
    this.taskList = document.getElementById('task-list');
    this.clearCompletedBtn = document.getElementById('clear-completed');
    this.resetBtn = document.getElementById('reset');

    // Adding an event listener to the task form's submit event.

    this.taskForm.addEventListener('submit', (e) => {
      e.preventDefault();
      this.tasks = addTask(this.taskInput, this.tasks);
      this.saveTasks();
      this.displayTasks();
      this.taskInput.value = '';
    });

    // Adding an event listener to the clear completed button's click event.

    this.clearCompletedBtn.addEventListener('click', () => {
      this.tasks = clearCompletedTask(this.tasks);
      this.saveTasks();
      this.displayTasks();
    });

    // Adding an event listener to the reset button's click event.

    this.resetBtn.addEventListener('click', () => {
      this.tasks = [];
      this.saveTasks();
      this.displayTasks();
    });

    // Displaying the tasks initially.
    this.displayTasks();
  }

  // This method allows editing a task by calling the editTask function and
  // passing the necessary arguments.

  editTask(id, newName) {
    editTask(id, newName, this.tasks, this.saveTasks.bind(this), this.displayTasks.bind(this));
  }

  // This method removes a task by calling the removeTask function
  // and passing the necessary arguments.
  removeTask(id) {
    this.tasks = removeTask(id, this.tasks);
    this.saveTasks();
    this.displayTasks();
  }

  // The tasks array is updated, and then the tasks are saved and displayed.
  toggleTaskStatus(id) {
    this.tasks = toggleTaskStatus(id, this.tasks);
    this.saveTasks();
    this.displayTasks();
  }

  // This method removes all tasks from the tasks array.

  resetTasks() {
    this.tasks = [];
    this.saveTasks();
    this.displayTasks();
  }

  // This method saves the tasks array to localStorage by
  // converting it to a JSON string.
  saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(this.tasks));
  }

  // This method updates the task list in the DOM based on the tasks array.

  displayTasks() {
    this.taskList.innerHTML = '';
    for (let i = 0; i < this.tasks.length; i += 1) {
      const task = this.tasks[i];
      const taskElement = document.createElement('li');
      taskElement.innerHTML = `
        <input type='checkbox' ${task.status ? 'checked' : ''}>
        <span ${task.status ? 'style="text-decoration: line-through"' : ''}>
          ${task.name}
        </span>
        <button class="edit-btn">Edit</button>
        <button class='delete-btn'><i class="fa fa-trash-o" aria-hidden="true"></i></button>
      `;

      const checkbox = taskElement.querySelector('input[type=checkbox]');
      checkbox.addEventListener('change', () => this.toggleTaskStatus(task.id));

      const editBtn = taskElement.querySelector('.edit-btn');
      editBtn.addEventListener('click', () => {
        const newName = prompt('Enter new task name:', task.name);
        if (newName !== null && newName.trim() !== '') {
          this.editTask(task.id, newName.trim());
        }
      });

      const deleteBtn = taskElement.querySelector('.delete-btn');
      deleteBtn.addEventListener('click', () => this.removeTask(task.id));

      this.taskList.appendChild(taskElement);
    }
  }
}

export default TaskList;
