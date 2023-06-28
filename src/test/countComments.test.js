import { count } from '../modules/displaycomments.js';

describe('count function', () => {
  let countElement;

  beforeEach(() => {
    // Create a mock count element
    countElement = {
      textContent: '',
    };

    // Mock getElementById
    document.getElementById = jest.fn().mockReturnValue(countElement);
  });

  // Test case: data has elements
  test('should update count text with the length of data when it has elements', () => {
    // Create some data with elements
    const data = [1, 2, 3, 4, 5];

    // Call the count function with the data
    count(data);

    // Check if the count text is updated correctly
    expect(countElement.textContent).toBe(`(${data.length})`);
  });

  // Test case: data is empty
  test('should update count text with (0) when data is empty', () => {
    // Create an empty data array
    const data = [];

    // Call the count function with the empty data
    count(data);

    // Check if the count text is updated correctly
    expect(countElement.textContent).toBe('(0)');
  });
});
