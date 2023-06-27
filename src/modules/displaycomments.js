const displaycomments = async (data) => {
  const div = document.getElementById('comments');
  const count = document.getElementById('count');
  div.innerHTML = '';
  if (data.length > 0) {
    count.textContent = `(${data.length})`;
    data.forEach((element) => {
      const p = document.createElement('p');
      p.classList.add('text-start');
      p.textContent = `${element.creation_date} ${element.username}: ${element.comment}`;
      div.appendChild(p);
    });
  } else {
    count.textContent = '(0)';
  }
};
export default displaycomments;
