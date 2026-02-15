import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

import axios from 'axios';

const form = document.querySelector('.search-form');
const gallery = document.querySelector('.gallery');
const loader = document.querySelector('.loader');
const loaderBtn = document.querySelector('.loader-btn');
const loaderMore = document.querySelector('.loader-more');
const lightbox = new SimpleLightbox('.gallery a', {
  captions: true,
  captionsData: 'alt',
});

let page = 1;
let perPage = 40;
let currentQuery = '';

const fetchedImages = async function fetchImages(searchQuery, page) {
  try {
    const response = await axios.get('https://pixabay.com/api/', {
      params: {
        key: '54641867-0b2bd143cc574463d0ab3cc86',
        q: searchQuery,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
        page: page,
        per_page: perPage,
      },
    });
    return response.data;
  } catch (error) {
    iziToast.info({
      title: 'Info',
      message: 'Something went wrong. Please try again later.',
      position: 'topRight',
    });
    console.error(error);
  }
};

function renderImages(images) {
  const markup = images
    .map(
      hit => `<div class="photo-card">
      <a href= "${hit.largeImageURL}">
      <img src="${hit.webformatURL}" alt="${hit.tags}" loading="lazy" />
      </a>
      
      <div class="info">
        <p class="info-item">
          <b>Likes</b>${hit.likes}
        </p>
        <p class="info-item">
          <b>Views</b>${hit.views}
        </p>
        <p class="info-item">
          <b>Comments</b>${hit.comments}
        </p>
        <p class="info-item">
          <b>Downloads</b>${hit.downloads}
        </p>
      </div>
    </div>`
    )
    .join('');
  lightbox.refresh();
  return markup;
}

form.addEventListener('submit', async event => {
  event.preventDefault();
  const searchQuery = form.elements.search.value.trim();
  page = 1;
  currentQuery = searchQuery;
  gallery.innerHTML = '';

  if (searchQuery === '') {
    iziToast.warning({
      title: 'Warning',
      message: 'Please enter a search query.',
      position: 'topRight',
    });
    return;
  }

  loader.classList.remove('hidden');
  const data = await fetchedImages(searchQuery, page);
  loader.classList.add('hidden');

  if (data.hits.length === 0) {
    iziToast.error({
      title: 'Error',
      message: 'No images found. Please try a different search query.',
      position: 'topRight',
    });
    return;
  }
  gallery.innerHTML = renderImages(data.hits);
  lightbox.refresh();

  if (data.totalHits > perPage) {
    loaderBtn.classList.remove('hidden-2');
  }
});

loaderBtn.addEventListener('click', async () => {
  page += 1;
  loaderBtn.classList.add('hidden-2');
  loaderMore.classList.remove('hidden');
  const data = await fetchedImages(currentQuery, page);
  loaderMore.classList.add('hidden');
  gallery.insertAdjacentHTML('beforeend', renderImages(data.hits));
  lightbox.refresh();

  const card = document.querySelector('.photo-card');
  if (card) {
    const cardHeight = card.getBoundingClientRect().height;
    window.scrollBy({
      top: cardHeight * 2,
      behavior: 'smooth',
    });
  }
  loaderBtn.classList.remove('hidden-2');

  if (page * perPage >= data.totalHits) {
    iziToast.info({
      title: 'Info',
      message: "We're sorry, but you've reached the end of search results",
      position: 'topRight',
    });
    return;
  }
});
