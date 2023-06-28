import details from './popup-data.js';
import addLike from './addLikes.js';
import getLikes from './getLikes.js';
import countMovies from './countMovies.js';

const attachEventListeners = () => {
  const comment = document.getElementsByClassName('comment');
  Array.from(comment).forEach((btn) => {
    btn.addEventListener('click', (event) => {
      const id = event.target.getAttribute('data-id');
      details(id);
    });
  });
};

const updateLikeCount = async (itemId, likeCountElement) => {
  const updatedLikes = await getLikes(itemId);
  let currentLikes = '0';

  if (Array.isArray(updatedLikes)) {
    const item = updatedLikes.find((item) => item.item_id === itemId);
    if (item) {
      currentLikes = item.likes.toString();
    }
  }

  likeCountElement.textContent = currentLikes;
};

const incrementLikeCount = async (itemId, likeCountElement) => {
  await addLike(itemId);
  await updateLikeCount(itemId, likeCountElement);
};

const displayMovies = async (movies) => {
  const mainContainer = document.querySelector('.main-container');

  const limitedMovies = movies?.slice(0, 21) || [];

  const rows = limitedMovies.reduce((acc, movie, index) => {
    if (index % 3 === 0) {
      const row = document.createElement('div');
      row.className = 'row justify-content-center my-3';
      acc.push(row);
    }

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
              <button class="like-button" data-item-id="${movie?.id}">
                <i class="fa fa-heart" aria-hidden="true"></i>
                <span class="like-count">0</span> Likes
              </button>
            </div>
          </div>
          <button type="button" class="btn btn-primary comment" data-bs-toggle="modal" data-bs-target="#Mymodal" data-id="${movie?.id}">Comment</button>
        </div>
      </div>
    `;

    column.innerHTML = cardContent;

    const likeButton = column.querySelector('.like-button');
    const likeCount = column.querySelector('.like-count');
    const itemId = likeButton.getAttribute('data-item-id');

    if (likeButton) {
      likeButton.addEventListener('click', async () => {
        await incrementLikeCount(itemId, likeCount);
      });
    }
   
    const currentRow = acc[acc.length - 1];
    currentRow.appendChild(column);
    updateLikeCount(itemId, likeCount);
    return acc;
  }, []);

  rows.forEach((row) => mainContainer.appendChild(row));

  attachEventListeners();

  countMovies(); // Invoke countMovies initially to display the initial count
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
