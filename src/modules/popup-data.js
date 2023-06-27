const details = async (id) => {
  await fetch(`https://api.tvmaze.com/shows/${id}`)
    .then((response) => response.json())
    .then((json) => {
      // Create the modal container
      const modalContainer = document.createElement('div');
      modalContainer.classList.add('modal', 'fade');
      modalContainer.id = 'exampleModal';
      modalContainer.setAttribute('tabindex', '-1');
      modalContainer.setAttribute('aria-labelledby', 'exampleModalLabel');
      modalContainer.setAttribute('aria-hidden', 'true');

      // Create the modal dialog
      const modalDialog = document.createElement('div');
      modalDialog.classList.add('modal-dialog');

      // Create the modal content
      const modalContent = document.createElement('div');
      modalContent.classList.add('modal-content');

      // Create the modal header
      const modalHeader = document.createElement('div');
      modalHeader.classList.add('modal-header');

      // Create the image element
      const image = document.createElement('img');
      image.classList.add('mb-2');
      image.src = `${json.image.medium}`;
      image.alt = 'flower';

      // Create the modal title
      const modalTitle = document.createElement('h1');
      modalTitle.classList.add('modal-title', 'fs-5', 'text-center', 'p-3');
      modalTitle.id = 'exampleModalLabel';
      modalTitle.innerHTML = `<b>${json.name}<b>`;

      // Create the close button
      const closeButton = document.createElement('button');
      closeButton.type = 'button';
      closeButton.classList.add('btn-close');
      closeButton.setAttribute('data-bs-dismiss', 'modal');
      closeButton.setAttribute('aria-label', 'Close');

      // Append the close button to the modal header
      modalHeader.appendChild(closeButton);

      // Create the modal body
      const modalBody = document.createElement('div');
      modalBody.classList.add('modal-body', 'text-center');
      // Append the image and title button to the modal header
      modalBody.appendChild(image);
      modalBody.appendChild(modalTitle);

      // Create the modal body content
      const bodyContent = document.createElement('div');
      bodyContent.classList.add('row', 'justify-content-center');

      const summaryParagraph = document.createElement('p');
      summaryParagraph.innerHTML = `${json.summary}`;

      const genresParagraph = document.createElement('p');
      genresParagraph.innerHTML = `<b>Genres:</b> ${json.genres}`;

      const languageRow = document.createElement('div');
      languageRow.classList.add('col-6');
      const languageLabel = document.createElement('div');
      languageLabel.classList.add('row', 'justify-content-center');
      languageLabel.innerHTML = `<div class="col-5"><b>Language:</b></div><div class="col-6">${json.language}</div>`;
      languageRow.appendChild(languageLabel);

      const ratingRow = document.createElement('div');
      ratingRow.classList.add('col-6');
      const ratingLabel = document.createElement('div');
      ratingLabel.classList.add('row', 'justify-content-center');
      ratingLabel.innerHTML = `<div class="col-5"><b>Rating:</b></div><div class="col-6 ">${json.rating.average}</div>`;
      ratingRow.appendChild(ratingLabel);

      const urlRow = document.createElement('div');
      urlRow.classList.add('col-6');
      const urlLabel = document.createElement('div');
      urlLabel.classList.add('row', 'justify-content-center');
      urlLabel.innerHTML = `<div class="col-5"><b>Premiered:</b></div><div class="col-6">${json.premiered}</div>`;
      urlRow.appendChild(urlLabel);

      const runtimeRow = document.createElement('div');
      runtimeRow.classList.add('col-6');
      const runtimeLabel = document.createElement('div');
      runtimeLabel.classList.add('row', 'justify-content-center');
      runtimeLabel.innerHTML = `<div class="col-5"><b>Runtime:</b></div><div class="col-6">${json.averageRuntime} minutes</div>`;
      runtimeRow.appendChild(runtimeLabel);

      bodyContent.appendChild(summaryParagraph);
      bodyContent.appendChild(genresParagraph);
      bodyContent.appendChild(languageRow);
      bodyContent.appendChild(ratingRow);
      bodyContent.appendChild(urlRow);
      bodyContent.appendChild(runtimeRow);

      modalBody.appendChild(bodyContent);

      // Append the modal header, body, and footer to the modal content
      modalContent.appendChild(modalHeader);
      modalContent.appendChild(modalBody);

      // Append the modal content to the modal dialog
      modalDialog.appendChild(modalContent);

      // Append the modal dialog to the modal container
      modalContainer.appendChild(modalDialog);

      // Append the modal container to the document body
      document.body.appendChild(modalContainer);
    });
};
export default details;