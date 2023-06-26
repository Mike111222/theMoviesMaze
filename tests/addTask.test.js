import Task from '../src/modules/taskList.js';
import addTask from '../src/modules/addTask.js';

// I think we should have 1-2 tests group together so we can easily find errors
// Test suite for the addTask function
describe('addTask function', () => {
  // Test case 1: Adding a new task to an empty array
  it('should add a new task to an empty array', () => {
    const tasks = [];
    const taskInput = { value: 'Buy groceries' };

    const result = addTask(taskInput, tasks);

    // Assert: Check that the task was added to the array
    expect(result).toEqual([new Task('Buy groceries', false, 1)]);
  });

  // Test case 2: Adding a new task to a non-empty array
  it('should add a new task to a non-empty array', () => {
    const tasks = [new Task('Buy groceries', false, 1)];
    const taskInput = { value: 'Do laundry' };

    const result = addTask(taskInput, tasks);

    // Assert: Check that the task was added to the array
    expect(result).toEqual([
      new Task('Buy groceries', false, 1),
      new Task('Do laundry', false, 2),
    ]);
  });

  // Test case 3: Not adding a new task if the input is empty
  it('should not add a new task if the input is empty', () => {
    const tasks = [];
    const taskInput = { value: '' };

    const result = addTask(taskInput, tasks);

    // Assert: Check that the array is still empty
    expect(result).toEqual([]);
  });
});
