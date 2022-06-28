/**
 * It fetches the data from the JSON file, parses it, and returns an object with the photographers and
 * media arrays
 * @returns An object with two properties, photographers and media.
 */
export async function fetchData() {
  const response = await fetch('../../data/photographers.json');
  const responseObject = JSON.parse(await response.text());
  const { photographers, media } = responseObject;
  return ({ photographers: [...photographers], media: [...media] });
}

/* FIXME: This function return undefined */
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
  const photographer = photographers.find((photographer) => photographer.id === parseInt(id));
  const mediaForPhotographer = media.filter((media) => media.photographerId === parseInt(id));

  return ({ photographer, media: [...mediaForPhotographer] });
}
