// eslint-disable-next-line import/extensions
import photographerFactory from '../factories/photographer.js';
// eslint-disable-next-line import/extensions
import fetchData from '../utils/fetchData.js';

/**
     * This function takes in an array of photographer objects and displays them on the page
     * @param photographers - an array of objects that contain the data for each photographer.
     */
async function displayData(photographers) {
  const photographersSection = document.querySelector('.photographer_section');

  photographers.forEach((photographer) => {
    const photographerModel = photographerFactory(photographer);
    const userCardDOM = photographerModel.getUserCardDOM();
    photographersSection.appendChild(userCardDOM);
  });
}

/**
 * The function `init()` is an asynchronous function that calls the function `getPhotographers()`
 * and then calls the function `displayData()` with the result of the function `getPhotographers()`
 * as an argument
 */
async function init() {
  // Récupère les datas des photographes
  const { photographers } = await fetchData();
  displayData(photographers);
}

/* Calling the function `init()` */
init();
