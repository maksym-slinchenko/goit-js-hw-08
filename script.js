import images from './gallery-items.js';

const creatImgItem = array => {
  return array
    .map(({ preview, original, description }) => {
      return `<li class="gallery__item">
        <a
          class="gallery__link"
          href="${original}">
          <img
            class="gallery__image"
            src="${preview}"
            data-source="${original}"
            alt="${description}"
          />
        </a>
      </li>;`;
    })
    .join('');
};

const galleryEl = document.querySelector('.js-gallery');
const imagesList = creatImgItem(images);

galleryEl.insertAdjacentHTML('beforeend', imagesList);
