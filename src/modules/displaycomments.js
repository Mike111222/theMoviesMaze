const displaycomments = async (data) => {
  const div = document.getElementById('comments');

  div.innerHTML = '';
  if (data.length > 0) {
    data.forEach((element) => {
      const p = document.createElement('p');
      p.classList.add('text-start');
      p.textContent = `${element.creation_date} ${element.username}: ${element.comment}`;
      div.appendChild(p);
    });
  }
};
const count = (data) => {
  const count = document.getElementById('count');
  if (data.length > 0) {
    count.textContent = `(${data.length})`;
  } else {
    count.textContent = '(0)';
  }
};
export { displaycomments, count };
