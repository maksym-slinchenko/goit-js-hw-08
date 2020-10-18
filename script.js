// Задача:
//Создание и рендер разметки по массиву данных и предоставленному шаблону.
import images from './gallery-items.js';
console.log(images);

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
  lightboxEl.querySelector('i').remove();
};

galleryEl.addEventListener('click', displayModal);
// Примечание:
// Не разобрался, что делать с тегом "i" и какое его предназначение.
// Ко всему он перекрывал иконку close.
// Поэтому при открытиии модалки просто его удаляю, а при закрыти добавляю обратно)

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
  lightboxEl.insertAdjacentHTML(
    'beforeend',
    '<i class="material-icons">close</i>',
  );
};
document.body.addEventListener('click', closeLightbox);

// Примечание:
// Вместо lightbox__overlay пришлось использовать lightbox__content,
// так как при клике на фон за модалкой, всегда попадал именно в lightbox__content,
// не в lightbox__overlay

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

// Дополнительное задание:
// Пролистывание изображений галереи в открытом модальном окне
// клавишами "влево" и "вправо".

const flipRightImage = event => {
  if (
    !(lightboxEl.classList.contains('is-open') && event.code === 'ArrowRight')
  ) {
    return;
  }
  let index = 0;
  const arePicturesSame = () => {
    return lightboxImgEl.getAttribute('src') === images[index].original;
  };
  index = images.findIndex(arePicturesSame);
  if (index !== images.length) {
    index += 1;
    lightboxImgEl.setAttribute('src', images[index].original);
    lightboxImgEl.setAttribute('alt', images[index].description);
  } else {
    return;
  }
};

document.body.addEventListener('keydown', flipRightImage);

console.log(lightboxImgEl.getAttribute('src'));
console.log(images[1].original);

// Не могу разобраться почему lightboxImgEl.getAttribute('src') ничего не возвращает...
