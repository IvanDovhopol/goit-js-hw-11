import axios from 'axios';

const ACCESS_KEY = '24325435-7f403507b2d97ff755af9f968';
axios.defaults.baseURL = 'https://pixabay.com/api';

export default class PixabayAPI {
  #query = '';
  #page = 1;
  #perPage = 30;
  #totalPages = 0;
  #params = {
    params: {
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
    },
  };

  async getPhotos() {
    const url = `/?key=${ACCESS_KEY}&q=${this.#query}&page=${this.#page}`;

    const { data } = await axios.get(url, this.#params);
    return data;
  }

  get query() {
    return this.#query;
  }

  set query(newQuery) {
    this.#query = newQuery;
  }

  incrementPage() {
    this.#page += 1;
  }

  resetPage() {
    this.#page = 1;
  }

  calculateTotalPages(totalHits) {
    this.#totalPages = Math.ceil(totalHits / this.#perPage);
  }

  get isShowLoadMore() {
    return this.#page < this.#totalPages;
  }
}
