import countMovies from '../modules/countMovies.js';

describe('countMovies', () => {
  beforeEach(() => {
    // Create a mock DOM structure for testing
    document.body.innerHTML = `
      <div id="movies-link"></div>
      <div class="card"></div>
      <div class="card"></div>
      <div class="card"></div>
    `;
  });

  afterEach(() => {
    // Clean up the mock DOM structure after each test
    document.body.innerHTML = '';
  });

  test('updates the movies count in the link', () => {
    countMovies();

    const moviesLink = document.getElementById('movies-link');
    expect(moviesLink.textContent).toBe('Movies (3)');
  });
});
