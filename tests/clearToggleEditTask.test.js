import { clearCompletedTask, toggleTaskStatus, editTask } from '../src/modules/clearToggleEditTask.js';
import tasks from '../__mock__/localStorage.js';

// Tests for the clearCompletedTask function
describe('clearCompletedTask', () => {
  test('should return an empty array if no tasks are provided', () => {
    // Test case: No tasks provided, expect an empty array as a result
    const result = clearCompletedTask([]);
    expect(result).toEqual([]);
  });

  test('should return an array without completed tasks', () => {
    // Test case: Remove completed tasks from the provided task array
    const result = clearCompletedTask(tasks);
    expect(result).toEqual([
      { id: 1, name: 'Task 1', status: false },
      { id: 3, name: 'Task 3', status: false },
    ]);
  });

  test('should return the same array if no completed tasks are found', () => {
    // Test case: No completed tasks found, expect the same array as the result
    const noCompletedTasks = [
      { id: 1, name: 'Task 1', status: false },
      { id: 2, name: 'Task 2', status: false },
      { id: 3, name: 'Task 3', status: false },
    ];
    const result = clearCompletedTask(noCompletedTasks);
    expect(result).toEqual(noCompletedTasks);
  });
});

// Tests for the toggleTaskStatus function
describe('toggleTaskStatus', () => {
  test('should return the same array if no task with the given id is found', () => {
    // No task with the given id found,
    // expect the same array as the result
    const result = toggleTaskStatus(4, tasks);
    expect(result).toEqual(tasks);
  });

  test('should toggle the status of the task with the given id', () => {
    // Toggle the status of the task with the given id
    const result = toggleTaskStatus(2, tasks);
    expect(result).toEqual([
      { id: 1, name: 'Task 1', status: false },
      { id: 2, name: 'Task 2', status: false },
      { id: 3, name: 'Task 3', status: false },
    ]);
  });

  test('should return a new array with the updated task', () => {
    // Test case: Expect a new array with the updated task, not the same reference
    const result = toggleTaskStatus(2, tasks);
    expect(result).not.toBe(tasks);
    expect(result[1]).not.toBe(tasks[1]);
  });
});

// Tests editTask function
describe('editTask', () => {
  // Mock functions for saveTasks and displayTasks
  const mockSaveTasks = jest.fn();
  const mockDisplayTasks = jest.fn();

  test('should update the name of a task given its ID', () => {
    // Update the name of a task given its ID
    const taskId = 2;
    const newName = 'New Task Name';
    editTask(taskId, newName, tasks, mockSaveTasks, mockDisplayTasks);
    expect(tasks[1].name).toBe(newName);
  });

  test('should not update the name of a task if the ID does not exist', () => {
    // ID does not exist, expect no changes to the task array
    const taskId = 4;
    const newName = 'New Task Name';
    editTask(taskId, newName, tasks, mockSaveTasks, mockDisplayTasks);
    expect(tasks).toEqual(tasks);
  });

  test('should call saveTasks and displayTasks functions after updating a task', () => {
    // Expect saveTasks and displayTasks functions to be called
    const taskId = 1;
    const newName = 'Updated Task Name';
    editTask(taskId, newName, tasks, mockSaveTasks, mockDisplayTasks);
    expect(mockSaveTasks).toHaveBeenCalled();
    expect(mockDisplayTasks).toHaveBeenCalled();
  });
});
