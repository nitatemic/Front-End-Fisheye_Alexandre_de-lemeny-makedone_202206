import { getFilePath } from './getFilePath.js';

/* Fonction qui appel la lightbox quand on clic sur un media */
export function openLightbox(media, video) {

  /* Générate lightbox */
  const lightbox = createLightbox(media, video);
  document.body.appendChild(lightbox);
}

/* Fonction qui créer une lightbox et retourne le DOM de la lightbox */
function createLightbox(media, video) {
  const path = getFilePath(media);
  const lightbox = document.createElement('div');
  lightbox.classList.add('lightbox');
  lightbox.setAttribute('id', 'lightbox');

  const lightboxClose = document.createElement('button');
  lightboxClose.classList.add('lightbox-close');
  lightboxClose.setAttribute('id', 'lightbox-close');
  lightboxClose.innerText = '<i class="fa-solid fa-xmark-large"></i>';
  lightbox.appendChild(lightboxClose);

  const lightboxPrev = document.createElement('button');
  lightboxPrev.classList.add('lightbox-prev');
  lightboxPrev.setAttribute('id', 'lightbox-prev');
  lightboxPrev.innerText = '<i class="fa-solid fa-chevron-left"></i>';
  lightbox.appendChild(lightboxPrev);

  const lightboxNext = document.createElement('button');
  lightboxNext.classList.add('lightbox-next');
  lightboxNext.setAttribute('id', 'lightbox-next');
  lightboxNext.innerText = '<i class="fa-solid fa-chevron-right"></i>';
  lightbox.appendChild(lightboxNext);

  const lightboxContent = document.createElement('div');
  lightboxContent.classList.add('lightbox-content');
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
