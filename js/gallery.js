import galleryItems from './gallery-items.js';

const galleryListEl = document.querySelector('.js-gallery');

const galleryMArkup = createGalleryMarkup(galleryItems);

galleryListEl.insertAdjacentHTML('beforeend', galleryMArkup);

galleryListEl.addEventListener('click', onGalleryListClick);

const closeBtnEl = document.querySelector(
  'button[data-action="close-lightbox"]',
);

closeBtnEl.addEventListener('click', closeModal);

const overlayEl = document.querySelector('.lightbox__overlay');

overlayEl.addEventListener('click', closeModal);

function createGalleryMarkup(galleryData) {
  return galleryData
    .map(({ preview, original, description }) => {
      return `
        <li class="gallery__item">
  <a
    class="gallery__link"
    href="${original}"
  >
    <img
      class="gallery__image"
      src="${preview}"
      data-source="${original}"
      alt="${description}"
    />
  </a>
</li>`;
    })
    .join('');
}

function onGalleryListClick(event) {
  const isGalleryImgEl = event.target.classList.contains('gallery__image');

  if (!isGalleryImgEl) {
    return;
  }

  event.preventDefault();

  const galleryImgEl = event.target;
  openModal(galleryImgEl);
}

function openModal(openImgEl) {
  window.addEventListener('keydown', onEscKeyPress);

  window.addEventListener('keydown', onArrowLeftPress);

  window.addEventListener('keydown', onArrowRightPress);

  const modal = document.querySelector('.js-lightbox');

  modal.classList.add('is-open');

  const modalImg = document.querySelector('.lightbox__image');

  modalImg.setAttribute('src', openImgEl.dataset.source);
  modalImg.setAttribute('alt', openImgEl.getAttribute('alt'));
}

function closeModal() {
  window.removeEventListener('keydown', onEscKeyPress);

  window.removeEventListener('keydown', onArrowLeftPress);

  window.removeEventListener('keydown', onArrowRightPress);

  const modal = document.querySelector('.js-lightbox');

  modal.classList.remove('is-open');

  const modalImg = document.querySelector('.lightbox__image');

  modalImg.setAttribute('src', '');
  modalImg.setAttribute('alt', '');
}

function onEscKeyPress(event) {
  if (event.code === 'Escape') {
    closeModal();
  }
}

function onArrowLeftPress(event) {
  if (event.code === 'ArrowLeft') {
    const currentImage = document.querySelector('.lightbox__image');

    const currentIndexOfImg = galleryItems.indexOf(
      galleryItems.find(
        ({ original }) => original === currentImage.getAttribute('src'),
      ),
    );

    if (currentIndexOfImg > 0) {
      currentImage.setAttribute(
        'src',
        galleryItems[currentIndexOfImg - 1].original,
      );
      currentImage.setAttribute(
        'alt',
        galleryItems[currentIndexOfImg - 1].description,
      );
    }
  }
}

function onArrowRightPress(event) {
  if (event.code === 'ArrowRight') {
    const currentImage = document.querySelector('.lightbox__image');

    const currentIndexOfImg = galleryItems.indexOf(
      galleryItems.find(
        ({ original }) => original === currentImage.getAttribute('src'),
      ),
    );

    if (currentIndexOfImg < galleryItems.length - 1) {
      currentImage.setAttribute(
        'src',
        galleryItems[currentIndexOfImg + 1].original,
      );
      currentImage.setAttribute(
        'alt',
        galleryItems[currentIndexOfImg + 1].description,
      );
    }
  }
}
