/**
 * It takes in a data object, and returns an object with three properties: name, picture, and
 * getUserCardDOM
 * @param data - an object with the photographer's name and portrait
 * @returns An object with the name, picture, and getUserCardDOM properties.
 */
function photographerFactory(data) {
  const { name, portrait } = data;

  const picture = `assets/photographers/${portrait}`;

  function getUserCardDOM() {
    const article = document.createElement('article');
    const img = document.createElement('img');
    img.setAttribute('src', picture);
    const h2 = document.createElement('h2');
    h2.textContent = name;
    article.appendChild(img);
    article.appendChild(h2);
    return (article);
  }
  return { name, picture, getUserCardDOM };
}
