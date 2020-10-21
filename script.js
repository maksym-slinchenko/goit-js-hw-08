// Задача:
//Создание и рендер разметки по массиву данных и предоставленному шаблону.
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
      </li>`;
    })
    .join('');
};

const galleryEl = document.querySelector('.js-gallery');
const imagesList = creatImgItem(images);

galleryEl.insertAdjacentHTML('beforeend', imagesList);

// Задача:
// Реализация делегирования на галерее ul.js-gallery и
// получение url большого изображения.
// Открытие модального окна по клику на элементе галереи.
// Подмена значения атрибута src элемента img.lightbox__image.

// Функция сравнения картинки для определения индекса
const arePicturesSame = image => {
  return image.original === lightboxImgEl.getAttribute('src');
};

// функция перелистывания вправо
const scrollImage = event => {
  if (event.code !== 'ArrowRight' && event.code !== 'ArrowLeft') {
    return;
  }

  let index = images.findIndex(arePicturesSame);

  if (event.code === 'ArrowRight') {
    index += 1;
  } else {
    index -= 1;
  }
  if (index < 0) {
    lightboxImgEl.setAttribute('src', images[images.length - 1].original);
    lightboxImgEl.setAttribute('alt', images[images.length - 1].description);
    return;
  }

  if (index < images.length) {
    lightboxImgEl.setAttribute('src', images[index].original);
    lightboxImgEl.setAttribute('alt', images[index].description);
  } else {
    lightboxImgEl.setAttribute('src', images[0].original);
    lightboxImgEl.setAttribute('alt', images[0].description);
  }
};

document.body.addEventListener('keydown', scrollImage);
document.body.addEventListener('keydown', scrollImage);

// вызов модального окна и подстановка картинки
const lightboxEl = document.querySelector('.js-lightbox');
const lightboxImgEl = lightboxEl.querySelector('.lightbox__image');

const displayModal = event => {
  event.preventDefault();
  if (!event.target.classList.contains('gallery__image')) {
    return;
  }
  lightboxEl.classList.add('is-open');
  lightboxImgEl.setAttribute('src', event.target.dataset.source);
  lightboxImgEl.setAttribute('alt', event.target.getAttribute('alt'));
  scrollImage;
};

galleryEl.addEventListener('click', displayModal);

// Задача:
// Закрытие модального окна по клику на кнопку button[data-action="close-lightbox"].
// Очистка значения атрибута src элемента img.lightbox__image.
// Это необходимо для того, чтобы при следующем открытии модального окна,
// пока грузится изображение, мы не видели предыдущее.

// Дополнительное задание: Закрытие модального окна по клику на div.lightbox__overlay.

const closeLightbox = event => {
  if (
    !(
      event.target.getAttribute('data-action') === 'close-lightbox' ||
      event.target.classList.contains('lightbox__content')
    )
  ) {
    return;
  }
  lightboxEl.classList.remove('is-open');
  lightboxImgEl.setAttribute('src', '');
};
document.body.addEventListener('click', closeLightbox);

//Дополнительное задание: Закрытие модального окна по нажатию клавиши ESC

const closeLightboxByKey = event => {
  if (event.code !== 'Escape') {
    return;
  }
  {
    lightboxEl.classList.remove('is-open');
    lightboxImgEl.setAttribute('src', '');
    lightboxEl.insertAdjacentHTML(
      'beforeend',
      '<i class="material-icons">close</i>',
    );
  }
};

document.body.addEventListener('keydown', closeLightboxByKey);
