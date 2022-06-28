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
  // data est un objet avec les données du photographe
  const { photographerData, mediaData } = data;
  console.log(photographerData);
  console.log(mediaData);
});
