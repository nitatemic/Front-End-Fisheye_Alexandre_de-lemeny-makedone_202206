/**
 * It takes in a data object, and returns an object with three properties: name, picture, and
 * getUserCardDOM
 * @param data - an object with the photographer's name and portrait
 * @returns An object with the name, picture, and getUserCardDOM properties.
 */
export default function photographerFactory(data) {
  const {
    name, id, city, country, tagline, price, portrait, media
  } = data;

  const picture = `../assets/photographers/${portrait}`;

  function getUserCardDOM() {
    const article = document.createElement('article');
    const link = document.createElement('a');
    link.href = `./photographer.html?id=${id}`;
    link.className = 'card-link';
    link.setAttribute('aria-label', `${name}`);
    article.appendChild(link);

    const img = document.createElement('img');
    img.setAttribute('src', picture);
    img.className = 'photographer_picture round cover shadow';
    img.setAttribute('alt', ``);
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
  /* Fonction qui affiche le summary du photographe */
  function getPhotographerSummaryDOM() {
    const summary = document.getElementById('photographer-summary');

    const nameH1 = document.createElement('h1');
    nameH1.textContent = name;
    nameH1.className = 'photographer-name';
    nameH1.tabIndex = 0;
    summary.appendChild(nameH1);

    const cityH2 = document.createElement('h2');
    cityH2.textContent = `${city}, ${country}`;
    cityH2.className = 'photographer-city';
    cityH2.tabIndex = 0;
    summary.appendChild(cityH2);

    const taglineP = document.createElement('p');
    taglineP.textContent = tagline;
    taglineP.className = 'photographer-tagline';
    taglineP.tabIndex = 0;
    summary.appendChild(taglineP);

    return (summary);
  }

  function getPhotographerPictureDom() {
    const img = document.createElement('img');
    img.setAttribute('src', picture);
    img.className = 'photographer_picture round cover shadow img-md';
    img.setAttribute('alt', `${name}`);
    img.setAttribute('aria-label', `${name}`);
    return (img);
  }

  return { getUserCardDOM, getPhotographerSummaryDOM, getPhotographerPictureDom };
}
