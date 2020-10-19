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

// функция перелистывания вправо
const flipRightImage = event => {
  if (event.code !== 'ArrowRight') {
    return;
  }

  const arePicturesSame = image => {
    return image.original === lightboxImgEl.getAttribute('src');
  };
  let index = images.findIndex(arePicturesSame);
  index += 1;
  if (index < images.length) {
    lightboxImgEl.setAttribute('src', images[index].original);
    lightboxImgEl.setAttribute('alt', images[index].description);
  } else {
    return;
  }
};

document.body.addEventListener('keydown', flipRightImage);

//функция перелистывания влево
const flipLeftImage = event => {
  if (event.code !== 'ArrowLeft') {
    return;
  }

  const arePicturesSame = image => {
    return image.original === lightboxImgEl.getAttribute('src');
  };
  let index = images.findIndex(arePicturesSame);
  index -= 1;
  if (index > -1) {
    lightboxImgEl.setAttribute('src', images[index].original);
    lightboxImgEl.setAttribute('alt', images[index].description);
  } else {
    return;
  }
};

document.body.addEventListener('keydown', flipLeftImage);

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
  flipRightImage;
  flipLeftImage;
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
