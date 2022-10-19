import { pixabay } from '../index';
import { refs } from './refs';

export default function clearPage() {
  pixabay.resetPage();
  refs.list.innerHTML = '';
}
