// eslint-disable-next-line import/extensions
import getPhotographers from './index.js';
// eslint-disable-next-line import/extensions
import photographerFactory from '../factories/photographer.js';
/* Récupérer l'id du photographe dans l'url */
const urlParams = new URLSearchParams(window.location.search);
const photographerId = urlParams.get('id');

export default function displayPhotographer() {
  // Récupérer les datas du photographe via l'id
  getPhotographers(photographerId).then((photographer) => {
    /* Passer les datas du photographe à la factory */
    const photographerModel = photographerFactory(photographer);
  });
}
