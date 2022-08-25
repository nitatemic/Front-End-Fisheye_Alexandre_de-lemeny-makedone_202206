// eslint-disable-next-line import/extensions
import { fetchPhotographerData } from '../utils/fetchData.js';
// eslint-disable-next-line import/extensions
import photographerFactory from '../factories/photographer.js';
// eslint-disable-next-line import/extensions
import mediaFactory from '../factories/media.js';
// eslint-disable-next-line import/extensions
import { closeModal, displayModal } from '../utils/contactForm.js';

/* Récupérer l'id du photographe dans l'url */
const urlParams = new URLSearchParams(window.location.search);
const photographerId = urlParams.get('id');
const filter = urlParams.get('filter');

/* Récupérer les données du photographe */
fetchPhotographerData(photographerId).then(async (data) => {
  const container = document.getElementById('photographer-container');
  const photographerModel = photographerFactory(data.photographer);
  const summaryDOM = photographerModel.getPhotographerSummaryDOM();
  container.prepend(summaryDOM);
  const pictureDOM = photographerModel.getPhotographerPictureDom();
  container.appendChild(pictureDOM);

  const mediaArray = mediaFactory(data.media);
  const photographerContainer = document.getElementById('photograph-content');
  let mediaDOM = '';
  const dropbtn1 = document.getElementById('dropdown-btn-first');
  const dropbtn2 = document.getElementById('dropdown-btn-second');
  const dropbtn3 = document.getElementById('dropdown-btn-third');

  switch (filter) {
    case 'date':
      mediaDOM = await mediaArray.filterByDate();
      dropbtn1.innerHTML = 'Date <i class="fa-solid fa-chevron-down" id="chevron"></i>';
      dropbtn1.setAttribute('aria-label', 'Trié par date');
      dropbtn2.innerText = 'Popularité';
      dropbtn2.setAttribute('href', `?id=${photographerId}&filter=popularity`);
      dropbtn2.setAttribute('aria-label', 'Trier par popularité');
      dropbtn3.innerText = 'Titre';
      dropbtn3.setAttribute('href', `?id=${photographerId}&filter=title`);
      dropbtn3.setAttribute('aria-label', 'Trier par titre');
      break;

    case 'title':
      mediaDOM = await mediaArray.filterByTitle();
      dropbtn1.innerHTML = 'Titre <i class="fa-solid fa-chevron-down" id="chevron"></i>';
      dropbtn1.setAttribute('aria-label', 'Trié par titre');
      dropbtn2.innerText = 'Popularité';
      dropbtn2.setAttribute('href', `?id=${photographerId}&filter=popularity`);
      dropbtn2.setAttribute('aria-label', 'Trier par popularité');
      dropbtn3.innerText = 'Date';
      dropbtn3.setAttribute('href', `?id=${photographerId}&filter=date`);
      dropbtn3.setAttribute('aria-label', 'Trier par date');
      break;

    default:
      mediaDOM = await mediaArray.filterByPopularity();
      dropbtn1.setAttribute('aria-label', 'Trié par popularité');
      dropbtn2.innerText = 'Date';
      dropbtn2.setAttribute('href', `?id=${photographerId}&filter=date`);
      dropbtn2.setAttribute('aria-label', 'Trier par date');
      dropbtn3.innerText = 'Titre';
      dropbtn3.setAttribute('href', `?id=${photographerId}&filter=title`);
      dropbtn3.setAttribute('aria-label', 'Trier par titre');
      break;
  }

  const dropdown = document.getElementById('dropdown');
  const dropdownContent = document.getElementById('dropdown-content');

  dropdown.addEventListener('click', () => {
    const chevron = document.getElementById('chevron');
    if (chevron.classList.contains('fa-chevron-down')) {
      chevron.classList.remove('fa-chevron-down');
      chevron.classList.add('fa-chevron-up');
      dropdownContent.classList.add('block');
      dropdown.setAttribute('aria-expanded', 'true');
      dropdownContent.setAttribute('aria-hidden', 'false');
      dropdownContent.setAttribute('aria-label', 'Menu déroulant');
    } else {
      chevron.classList.remove('fa-chevron-up');
      chevron.classList.add('fa-chevron-down');
      dropdownContent.classList.remove('block');
      dropdown.setAttribute('aria-expanded', 'false');
    }
  });

  document.getElementById('contactMeButton').addEventListener('click', () => {
    displayModal();
  });
  document.getElementById('closeContactMeButton').addEventListener('click', () => {
    closeModal();
  });

  const modalTitle = document.getElementById('modal-title');
  modalTitle.innerText = `${modalTitle.innerText} ${data.photographer.name}`;
  document.getElementById('contact_modal').setAttribute('aria-labelledby', 'modal-title');

  photographerContainer.appendChild(await mediaDOM);
  /* Setting the price of the photographer. */
  document.getElementById('photographer-price').innerText = `${data.photographer.price}€ / jour`;
  document.getElementById('photographer-price').setAttribute('aria-label', `Prix du photographe : ${data.photographer.price}€ par jour`);

  /* Setting the total of likes of the photographer. */
  document.getElementById('photographer-likes').innerText = `${data.totalLikes}`;
  document.getElementById('photographer-likes').setAttribute('aria-label', `Nombre total de like du photographe : ${data.totalLikes} likes`);
});
