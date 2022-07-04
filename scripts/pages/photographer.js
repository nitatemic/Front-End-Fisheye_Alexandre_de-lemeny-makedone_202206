// eslint-disable-next-line import/extensions
import { fetchPhotographerData } from '../utils/fetchData.js';
// eslint-disable-next-line import/extensions
import photographerFactory from '../factories/photographer.js';
// eslint-disable-next-line import/extensions
import mediaFactory from '../factories/media.js';
/* Récupérer l'id du photographe dans l'url */
const urlParams = new URLSearchParams(window.location.search);
const photographerId = urlParams.get('id');
console.log(photographerId);

/* Récupérer les données du photographe */
fetchPhotographerData(photographerId).then(async (data) => {
  const container = document.getElementById('photographer-container');
  const photographerModel = photographerFactory(data.photographer);
  const summaryDOM = photographerModel.getPhotographerSummaryDOM();
  container.prepend(summaryDOM);
  const pictureDOM = photographerModel.getPhotographerPictureDom();
  container.appendChild(pictureDOM);
  console.log(data.media);
  const mediaArray = mediaFactory(data.media);
  const photographerContainer = document.getElementById('photograph-content');
  const mediaDOM = await mediaArray.filterByPopularity();
  console.log(await mediaDOM);
  photographerContainer.appendChild(await mediaDOM);
});
