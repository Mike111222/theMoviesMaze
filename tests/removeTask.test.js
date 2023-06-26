import removeTask from '../src/modules/removeTask.js';
import tasks from '../__mock__/localStorage.js';

describe('removeTask', () => {
  // Test case: Removing a task with a given id
  test('should remove task with given id', () => {
    const updatedTasks = removeTask(2, tasks);
    // Call the removeTask function with the task id and tasks array

    // Assert: Check that the task with the given id was removed
    expect(updatedTasks).toEqual([
      { id: 1, name: 'Task 1', status: false },
      { id: 2, name: 'Task 3', status: false },
    ]); // Check that the result is an array with the expected tasks
  });

  // Test case: Not removing a task if the id is not found
  test('should not remove task if id not found', () => {
    const updatedTasks = removeTask(4, tasks);
    // Call the removeTask function with an id that doesn't exist

    // Assert: Check that the tasks array remains unchanged
    expect(updatedTasks).toEqual([
      { id: 1, name: 'Task 1', status: false },
      { id: 2, name: 'Task 2', status: true },
      { id: 3, name: 'Task 3', status: false },
    ]); // Check that the result is the same as the original tasks array
  });

  // Test case: Returning a new array and not modifying the original
  test('should return a new array and not modify the original', () => {
    const updatedTasks = removeTask(2, tasks);
    // Call the removeTask function with an id

    // Assert: Check that the returned array
    // is a new instance and not the same as the original tasks array
    expect(updatedTasks).not.toBe(tasks);
    // Check that the result is not the same object
    // reference as the original tasks array
  });
});
