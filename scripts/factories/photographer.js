/**
 * It takes in a data object, and returns an object with three properties: name, picture, and
 * getUserCardDOM
 * @param data - an object with the photographer's name and portrait
 * @returns An object with the name, picture, and getUserCardDOM properties.
 */
function photographerFactory(data) {
  const { name, id, city, country, tagline, price, portrait } = data;

  const picture = `../assets/photographers_pic/${portrait}`;

  function getUserCardDOM() {
    const article = document.createElement('article');
    const link = document.createElement('a');
    link.href = `../pages/photographer.html?id=${id}`;
    link.className = 'card-link';
    article.appendChild(link);

    const img = document.createElement('img');
    img.setAttribute('src', picture);
    img.className = 'photographer_picture round cover shadow';
    link.appendChild(img);

    const h2 = document.createElement('h2');
    h2.textContent = name;
    link.appendChild(h2);

    const photographerInfo = document.createElement('div');
    photographerInfo.className = 'photographer-info';
    article.appendChild(photographerInfo);

    const h3 = document.createElement('h3');
    h3.textContent = `${city}, ${country}`;
    h3.className = 'photographer-city';
    photographerInfo.appendChild(h3);

    const p = document.createElement('p');
    p.textContent = tagline;
    p.className = 'photographer-tagline';
    photographerInfo.appendChild(p);

    const p2 = document.createElement('p');
    p2.textContent = `${price}€/jour`;
    p2.className = 'photographer-price';
    photographerInfo.appendChild(p2);

    return (article);
  }
  return { getUserCardDOM };
}
