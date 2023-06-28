const countMovies = () => {
  const moviesLink = document.getElementById('movies-link');
  const moviesCount = document.querySelectorAll('.card').length;
  moviesLink.textContent = `Movies (${moviesCount})`;
};

export default countMovies;
