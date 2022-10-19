import PixabayAPI from './js/PixabayAPI';
import createMarkup from './js/create-markup';
import clearPage from './js/clear-page';
import IO from './js/IO-callback';
import refs from './js/refs';
import './sass/index.scss';

import { Notify } from 'notiflix/build/notiflix-notify-aio';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

export const pixabay = new PixabayAPI();

refs.form.addEventListener('submit', handleSubmit);
refs.list.addEventListener('click', onGalleryContainerClick);

async function handleSubmit(e) {
  e.preventDefault();

  const {
    elements: { query },
  } = e.currentTarget;
  const searchQuery = query.value.trim().toLowerCase();

  if (!searchQuery) {
    Notify.info('Enter something in the form!');
    clearPage();
    return;
  }

  pixabay.query = searchQuery;
  clearPage();

  try {
    const { hits, totalHits } = await pixabay.getPhotos();

    if (totalHits === 0) {
      return Notify.warning(
        `Sorry, there are no images matching your search query "${searchQuery}". Please try again.`
      );
    }

    const markup = createMarkup(hits);
    refs.list.insertAdjacentHTML('beforeend', markup);

    pixabay.calculateTotalPages(totalHits);
    Notify.success(`${totalHits} images were found matching your request.`);

    if (pixabay.isShowLoadMore) {
      const target = document.querySelector('.gallery__item:last-child');
      IO.observe(target);
    }
  } catch (error) {
    Notify.failure(error.message, 'Something went wrong!');
    clearPage();
  }

  onOpenModalWindow();
}

function onGalleryContainerClick(e) {
  e.preventDefault();

  if (e.target.nodeName !== 'IMG') {
    return;
  }
}

export default function onOpenModalWindow() {
  return new SimpleLightbox('.gallery a', {
    captionsData: 'alt',
    captionDelay: 250,
  });
}
