import { getFilePath } from './getFilePath.js';

/* Fonction qui créer une lightbox et retourne le DOM de la lightbox */
export function createLightbox(media, video) {
  const path = getFilePath(media);
  const lightbox = document.createElement('div');
  lightbox.classList.add('lightbox');
  lightbox.setAttribute('id', 'lightbox');

  const lightboxClose = document.createElement('button');
  lightboxClose.setAttribute('class', 'lightbox-close fa-solid fa-xmark-large');
  lightboxClose.setAttribute('aria-label', 'Fermer la lightbox');
  lightboxClose.addEventListener('click', () => {
    lightbox.remove();
  });
  lightboxClose.setAttribute('id', 'lightbox-close');
  lightbox.appendChild(lightboxClose);

  const lightboxPrev = document.createElement('i');
  lightboxPrev.setAttribute('class', 'lightbox-prev fa-solid fa-chevron-left');
  lightboxPrev.setAttribute('id', 'lightbox-prev');
  lightbox.appendChild(lightboxPrev);

  const lightboxNext = document.createElement('i');
  lightboxNext.setAttribute('class', 'lightbox-next fa-solid fa-chevron-right');
  lightboxNext.setAttribute('id', 'lightbox-next');
  lightbox.appendChild(lightboxNext);

  const lightboxContent = document.createElement('div');
  lightboxContent.classList.add('lightbox-container');
  lightboxContent.setAttribute('id', 'lightbox-content');
  lightbox.appendChild(lightboxContent);

  if (video === true) {
    const videoContainer = document.createElement('div');
    videoContainer.classList.add('video-container');
    videoContainer.setAttribute('id', 'video-container');
    lightboxContent.appendChild(videoContainer);

    const mediaVideo = document.createElement('video');
    mediaVideo.setAttribute('controls', '');
	  mediaVideo.setAttribute('autoplay', '');
	  mediaVideo.setAttribute('loop', '');
	  mediaVideo.setAttribute('muted', '');
	  mediaVideo.setAttribute('playsinline', '');
	  mediaVideo.setAttribute('preload', 'auto');
	  mediaVideo.setAttribute('src', `${path}/${media.video}`);
    videoContainer.appendChild(mediaVideo);
  } else {
    const mediaImage = document.createElement('img');
    mediaImage.setAttribute('src', `${path}/${media.image}`);
    mediaImage.setAttribute('alt', media.title);
    lightboxContent.appendChild(mediaImage);
  }

  return lightbox;
}
