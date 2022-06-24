/* Fetch data from a JSON file */
// Language: javascript
// Path: scripts/utils/fetchData.js

/**
 * It fetches the data from the JSON file, parses it, and returns an object with the photographers and
 * media arrays
 * @returns An object with two properties, photographers and media.
 */
export default async function fetchData() {
  const response = await fetch('../../data/photographers.json');
  const responseObject = JSON.parse(await response.text());
  const { photographers, media } = responseObject;
  return ({ photographers: [...photographers], media: [...media] });
}
