
import details from './popup-data.js';

import addLike from './addLikes.js';

const attachEventListeners = () => {
  const comment = document.getElementsByClassName('comment');
  Array.from(comment).forEach((btn) => {
    btn.addEventListener('click', (event) => {
      const id = event.target.getAttribute('data-id');
      details(id);
    });
  });
};

const displayMovies = (movies) => {
  const mainContainer = document.querySelector('.main-container');

  const limitedMovies = movies?.slice(0, 21) || [];

  let row = document.createElement('div');
  row.className = 'row justify-content-center my-3';

  limitedMovies.forEach((movie, index) => {
    const column = document.createElement('div');
    column.classList.add('col-4', 'd-flex', 'justify-content-center');

    const imageUrl = movie?.image?.medium || 'placeholder.jpg';

    const cardContent = `
      <div class="card text-center " style="width: 23rem;">
        <img src="${imageUrl}" class="card-img-top" alt="${movie?.name}">
        <div class="card-body">
          <div class="row my-3">
            <div class="col-9"><h5 class="card-title text-start">${movie?.name}</h5></div>
            <div class="col-3">
              <button class="like-button">
                <i class="fa fa-heart" aria-hidden="true"></i>
              </button>
            </div>
          </div>
          <button  type="button" class="btn btn-primary comment" data-bs-toggle="modal" data-bs-target="#Mymodal" data-id="${movie?.id}" >Comment</button>
        </div>
      </div>
    `;

    column.innerHTML = cardContent;

    const likeButton = column.querySelector('.like-button');
    if (likeButton) {
      likeButton.addEventListener('click', () => {
        addLike(movie.id);
      });
    }

    row.appendChild(column);

    if ((index + 1) % 3 === 0) {
      mainContainer.appendChild(row);
      row = document.createElement('div');
      row.className = 'row justify-content-center my-3';
    }
  });

  mainContainer.appendChild(row);
  attachEventListeners();
};

const fetchMovies = async () => {

  try {
    const fetchUrl = 'https://api.tvmaze.com/shows?page=1';
    const response = await fetch(fetchUrl);
    const fetchedData = await response.json();
    displayMovies(fetchedData);
  } catch (error) {
    // handle error if needed
  }
};

fetchMovies();
export default displayMovies;
