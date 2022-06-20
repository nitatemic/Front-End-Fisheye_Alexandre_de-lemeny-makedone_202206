// eslint-disable-next-line import/extensions
import photographerFactory from '../factories/photographer.js';
/**
 * It returns a promise that resolves to an object with a photographers property, which is an array
 * of objects
 * @returns An object with a photographers property.
 */
export default async function getPhotographers() {

  const photographers = [
    {
      name: 'Mimi Keel',
      id: 243,
      city: 'London',
      country: 'UK',
      tagline: 'Voir le beau dans le quotidien',
      price: 400,
      portrait: 'MimiKeel.jpg',
    },
    {
      name: 'Ellie-Rose Wilkens',
      id: 930,
      city: 'Paris',
      country: 'France',
      tagline: 'Capturer des compositions complexes',
      price: 250,
      portrait: 'EllieRoseWilkens.jpg',
    },
    {
      name: 'Tracy Galindo',
      id: 82,
      city: 'Montreal',
      country: 'Canada',
      tagline: 'Photographe freelance',
      price: 500,
      portrait: 'TracyGalindo.jpg',
    },
    {
      name: 'Nabeel Bradford',
      id: 527,
      city: 'Mexico City',
      country: 'Mexico',
      tagline: "Toujours aller de l'avant",
      price: 350,
      portrait: 'NabeelBradford.jpg',
    },
    {
      name: 'Rhode Dubois',
      id: 925,
      city: 'Barcelona',
      country: 'Spain',
      tagline: 'Je crée des souvenirs',
      price: 275,
      portrait: 'RhodeDubois.jpg',
    },
    {
      name: 'Marcel Nikolic',
      id: 195,
      city: 'Berlin',
      country: 'Germany',
      tagline: 'Toujours à la recherche de LA photo',
      price: 300,
      portrait: 'MarcelNikolic.jpg',
    },
  ];

  /* Returning an object with a property called photographers, which is an array of objects. */
  return ({ photographers: [...photographers] });
}

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
  const { photographers } = await getPhotographers();
  displayData(photographers);
}

/* Calling the function `init()` */
init();
