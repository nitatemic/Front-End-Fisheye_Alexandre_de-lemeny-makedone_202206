/**
 * It fetches the data from the JSON file, parses it,
 * and returns an object with the photographers and
 * media arrays
 * @returns An object with two properties, photographers and media.
 */
export async function fetchData() {
  const response = await fetch('../../data/photographers.json');
  const responseObject = JSON.parse(await response.text());
  const { photographers, media } = responseObject;
  return ({ photographers: [...photographers], media: [...media] });
}

/**
 * It fetches the photographers.json file, parses it, and returns an object containing the
 * photographer with the given id and all media associated with that photographer
 * @param id - The id of the photographer we want to fetch data for.
 * @returns An object with two properties: photographer and media.
 */
export async function fetchPhotographerData(id) {

  const response = await fetch('../../data/photographers.json');
  const responseObject = JSON.parse(await response.text());
  const { photographers, media } = responseObject;
  const photographer = photographers.find((photographer) => photographer.id === parseInt(id, 10));
  const mediaForPhotographer = media.filter((media) => media.photographerId === parseInt(id, 10));

  let totalLikes = 0;
  /* For every media with the same photographerId, we add the likes to the totalLikes variable. */
  mediaForPhotographer.forEach((media) => {
    totalLikes += media.likes;
  });

  return ({ photographer, media: [...mediaForPhotographer], totalLikes });
}
