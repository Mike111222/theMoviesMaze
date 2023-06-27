const displayMovies = (movies) => {
  const mainContainer = document.querySelector('.main-container');

  const limitedMovies = movies?.slice(0, 21) || [];

  let row = document.createElement('div');
  row.className = 'row justify-content-center my-3';

  limitedMovies.forEach((movie, index) => {
    const column = document.createElement('div');
    column.className = 'col-4';

    const imageUrl = movie?.image?.medium || 'placeholder.jpg';

    const cardContent = `
      <div class="card text-center" style="width: 18rem;">
        <img src="${imageUrl}" class="card-img-top" alt="${movie?.name}">
        <div class="card-body">
          <div class="row">
            <div class="col-5"><h5 class="card-title">${movie?.name}</h5></div>
            <div class="col-5">
              <button class="like-button">
              <i class="fa fa-heart" aria-hidden="true"></i>
              </button>
            </div>
          </div>
          <a href="#" class="btn btn-primary">Comment</a>
        </div>
      </div>
    `;

    column.innerHTML = cardContent;

    row.appendChild(column);

    if ((index + 1) % 3 === 0) {
      mainContainer.appendChild(row);
      row = document.createElement('div');
      row.className = 'row justify-content-center my-3';
    }
  });

  mainContainer.appendChild(row);
};

const fetchMovies = async () => {
  try {
    const fetchUrl = 'https://api.tvmaze.com/shows?page=1';
    const response = await fetch(fetchUrl);
    const fetchedData = await response.json();
    displayMovies(fetchedData);
  } catch (error) {
    console.error('Error fetching movies:', error);
  }
};

fetchMovies();

export default displayMovies;
