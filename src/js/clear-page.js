import { pixabay } from '../index';

export default function clearPage() {
  pixabay.resetPage();
  refs.list.innerHTML = '';
}
