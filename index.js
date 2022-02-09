import './style.css';
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import fakeAjax from './ajax';
import appendImagesToDom from './dom';

var loader = document.getElementById('loader');

var photos = [];

var ready = false;
var imagesFetchedAfterScrollEnd,
  imageAppendedToDom = 0;

getPhotos();

async function getPhotos() {
  try {
    photos = await fakeAjax(40);
    imagesFetchedAfterScrollEnd = photos.length;
    displayPhotos(photos);
  } catch (error) {
    console.error(error);
  }
}

function imageLoaded() {
  imageAppendedToDom++;
  if (imagesFetchedAfterScrollEnd === imageAppendedToDom) {
    ready = true;
    loader.hidden = true;
  }
}

function displayPhotos(photos) {
  imageAppendedToDom = 0;
  appendImagesToDom(photos, imageLoaded);
}

window.addEventListener('scroll', async function detectBottomOfPage() {
  let contentLength = document.body.offsetHeight,
    viewportLength = window.innerHeight,
    userScrollDistance = window.scrollY;

  if (ready && userScrollDistance + viewportLength >= contentLength * 0.6) {
    ready = false;

    console.log('------------------------');
    console.log('Fetching More Images');
    console.log('------------------------');
    getPhotos();
  }
});
