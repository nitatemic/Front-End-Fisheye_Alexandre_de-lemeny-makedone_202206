// eslint-disable-next-line import/extensions
import { fetchPhotographerData } from '../utils/fetchData.js';
// eslint-disable-next-line import/extensions
import photographerFactory from '../factories/photographer.js';
// eslint-disable-next-line import/extensions
import mediaFactory from '../factories/media.js';
/* Récupérer l'id du photographe dans l'url */
const urlParams = new URLSearchParams(window.location.search);
const photographerId = urlParams.get('id');
const filter = urlParams.get('filter');
console.log(photographerId);

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
  let mediaDOM = await mediaArray.filterByPopularity();
  switch (filter) {
    case 'date':
      mediaDOM = await mediaArray.filterByDate();
      break;

    case 'title':
      mediaDOM = await mediaArray.filterByTitle();
      break;

    default:
      mediaDOM = await mediaArray.filterByPopularity();
      break;
  }
  photographerContainer.appendChild(await mediaDOM);
});
