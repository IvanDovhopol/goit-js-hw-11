import { pixabay } from '../index';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import clearPage from './clear-page';
import createMarkup from './create-markup';
import onOpenModalWindow from '../index';
import { refs } from './refs';

const options = {
  root: null,
  rootMargin: '100px',
  threshold: 1.0,
};

const callback = async (entries, observer) => {
  entries.forEach(async entry => {
    if (entry.isIntersecting) {
      pixabay.incrementPage();
      observer.unobserve(entry.target);

      try {
        const { hits } = await pixabay.getPhotos();

        const markup = createMarkup(hits);
        refs.list.insertAdjacentHTML('beforeend', markup);

        const target = document.querySelector('.gallery__item:last-child');
        IO.observe(target);

        onOpenModalWindow();
      } catch (error) {
        Notify.failure(error.message, 'Something went wrong!');
        clearPage();
      }
    }
  });
};

export const IO = new IntersectionObserver(callback, options);
