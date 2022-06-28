// eslint-disable-next-line import/extensions
import { fetchPhotographerData } from '../utils/fetchData.js';
// eslint-disable-next-line import/extensions
import photographerFactory from '../factories/photographer.js';
/* Récupérer l'id du photographe dans l'url */
const urlParams = new URLSearchParams(window.location.search);
const photographerId = urlParams.get('id');
console.log(photographerId);

/* Récupérer les données du photographe */
fetchPhotographerData(photographerId).then((data) => {
  const container = document.getElementById('photographer-container');
  const photographerModel = photographerFactory(data.photographer);
  const summaryDOM = photographerModel.getPhotographerSummaryDOM();
  container.prepend(summaryDOM);
  const pictureDOM = photographerModel.getPhotographerPictureDom();
  container.appendChild(pictureDOM);
});
