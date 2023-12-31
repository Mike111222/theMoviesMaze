import add from './addcomments.js';
import { displaycomments, count } from './displaycomments.js';

const modal = ((json) => {
  const modal = document.getElementById('Mymodal');
  modal.classList.add('show');
  modal.setAttribute('aria-hidden', 'false');
  modal.style.display = 'block';
  document.body.classList.add('modal-open');
  document.getElementById('image').setAttribute('src', json.image.medium);
  document.getElementById('summary').innerHTML = json.summary;
  document.getElementById('name').innerHTML = json.name;
  document.getElementById('genres').innerHTML = `<b>Genres:</b> ${json.genres}`;
  document.getElementById('language').innerHTML = json.language;
  document.getElementById('rating').innerHTML = json.rating.average;
  document.getElementById('premiered').innerHTML = json.premiered;
  document.getElementById('averageRuntime').innerHTML = `${json.runtime} minutes`;

  // Fetch comments
  const fetchComments = async () => {
    try {
      const fetchUrl = `https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/4GPf219m22AmrD3G654e/comments?item_id=${json.id}`;
      const response = await fetch(fetchUrl);
      const fetchedData = await response.json();
      displaycomments(fetchedData);
      count(fetchedData);
    } catch (error) {
      // handle error if needed
    }
  };
  fetchComments();

  const form = document.getElementById('form');
  const onSubmit = async (event) => {
    event.preventDefault();
    const name = document.getElementById('username').value;
    const comment = document.getElementById('comment').value;
    await add(name, comment, json.id);
    fetchComments();
    document.getElementById('username').value = '';
    document.getElementById('comment').value = '';
    form.removeEventListener('submit', onSubmit);
  };
  form.addEventListener('submit', onSubmit);
  const closeIcon = document.getElementById('closeIcon');
  closeIcon.addEventListener('click', () => {
    modal.classList.remove('show');
    modal.setAttribute('aria-hidden', 'true');
    modal.style.display = 'none';
    document.body.classList.remove('modal-open');
  });
});
const details = async (id) => {
  const response = await fetch(`https://api.tvmaze.com/shows/${id}`);
  const fetchedData = await response.json();
  modal(fetchedData);
};

export default details;