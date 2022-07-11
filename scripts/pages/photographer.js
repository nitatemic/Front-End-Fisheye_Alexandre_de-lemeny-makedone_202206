// eslint-disable-next-line import/extensions
import { fetchPhotographerData } from '../utils/fetchData.js';
// eslint-disable-next-line import/extensions
import photographerFactory from '../factories/photographer.js';
// eslint-disable-next-line import/extensions
import mediaFactory from '../factories/media.js';
// eslint-disable-next-line import/extensions
import { openLightbox } from '../utils/lightbox.js';

/* Récupérer l'id du photographe dans l'url */
const urlParams = new URLSearchParams(window.location.search);
const photographerId = urlParams.get('id');
const filter = urlParams.get('filter');

if (urlParams.get('showMedia') === 'true') {
  openLightbox();
}

/* Récupérer les données du photographe */
fetchPhotographerData(photographerId).then(async (data) => {
  const container = document.getElementById('photographer-container');
  const photographerModel = photographerFactory(data.photographer);
  const summaryDOM = photographerModel.getPhotographerSummaryDOM();
  container.prepend(summaryDOM);
  const pictureDOM = photographerModel.getPhotographerPictureDom();
  container.appendChild(pictureDOM);

  const mediaArray = mediaFactory(data.media);
  const photographerContainer = document.getElementById('photograph-content');
  let mediaDOM = '';
  const dropbtn1 = document.getElementById('dropdown-btn-first');
  const dropbtn2 = document.getElementById('dropdown-btn-second');
  const dropbtn3 = document.getElementById('dropdown-btn-third');
  switch (filter) {
    case 'date':
      mediaDOM = await mediaArray.filterByDate();
      dropbtn1.innerText = 'Date';
      dropbtn1.setAttribute('aria-label', 'Trié par date');
      dropbtn2.innerText = 'Popularité';
      dropbtn2.setAttribute('href', `?id=${photographerId}&filter=popularity`);
      dropbtn2.setAttribute('aria-label', 'Trier par popularité');
      dropbtn3.innerText = 'Titre';
      dropbtn3.setAttribute('href', `?id=${photographerId}&filter=title`);
      dropbtn3.setAttribute('aria-label', 'Trier par titre');
      break;

    case 'title':
      mediaDOM = await mediaArray.filterByTitle();
      dropbtn1.innerText = 'Titre';
      dropbtn1.setAttribute('aria-label', 'Trié par titre');
      dropbtn2.innerText = 'Popularité';
      dropbtn2.setAttribute('href', `?id=${photographerId}&filter=popularity`);
      dropbtn2.setAttribute('aria-label', 'Trier par popularité');
      dropbtn3.innerText = 'Date';
      dropbtn3.setAttribute('href', `?id=${photographerId}&filter=date`);
      dropbtn3.setAttribute('aria-label', 'Trier par date');
      break;

    default:
      mediaDOM = await mediaArray.filterByPopularity();
      dropbtn1.setAttribute('aria-label', 'Trié par popularité');
      dropbtn2.innerText = 'Date';
      dropbtn2.setAttribute('href', `?id=${photographerId}&filter=date`);
      dropbtn2.setAttribute('aria-label', 'Trier par date');
      dropbtn3.innerText = 'Titre';
      dropbtn3.setAttribute('href', `?id=${photographerId}&filter=title`);
      dropbtn3.setAttribute('aria-label', 'Trier par titre');
      break;
  }
  photographerContainer.appendChild(await mediaDOM);
});
