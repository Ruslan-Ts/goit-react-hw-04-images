import axios from 'axios';

export async function getImages({ value, page }) {
  return await axios(
    `https://pixabay.com/api/?q=${value}&page=${page}&key=34365353-78897900aa8d53aff07d0a12e&image_type=photo&orientation=horizontal&per_page=12`
  );
}
