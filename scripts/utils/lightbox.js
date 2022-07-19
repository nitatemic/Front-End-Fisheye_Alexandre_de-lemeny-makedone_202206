import { getFilePath } from './getFilePath.js';

export default function lightboxFactory(mediaList, mediaId) {
  let index = 0;

  function clear() {
    const lightboxMediaContainer = document.getElementById('lightbox-media-container');
    lightboxMediaContainer.innerHTML = '';
  }

  function closeLightbox() {
    /* Enable the scrollbar */
    document.body.style.overflow = 'auto';
    /* Hide the lightbox */
    document.getElementById('lightbox').classList.remove('show');
    const lightboxDom = document.getElementById('lightbox');
    clear();
    lightboxDom.close();
  }

  /* Fonction qui affiche la lightbox */
  function show() {
    /* Disable scroll */
    document.body.style.overflow = 'hidden';
    /* Show the lightbox */
    document.getElementById('lightbox').classList.add('show');
    const lightboxDom = document.getElementById('lightbox');
    /* Search index of media in mediaList */
    index = mediaList.findIndex((media) => media.id === mediaId);
    updateLightbox();
    lightboxDom.show();
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape') {
        closeLightbox();
      }
    });
  }

  function updateLightbox() {
    const path = getFilePath(mediaList[0]);
    /* Search media with the given index in mediaList */
    const media = mediaList[index];
    /* Is a pic or a video */
    let mediaType = media.image === undefined ? 'video' : 'image';
    let lightboxMedia = null;
    switch (mediaType) {
      case 'image':
        lightboxMedia = document.createElement('img');
        lightboxMedia.className = 'lightbox-media';
        lightboxMedia.setAttribute('src', `${path}/${media.image}`);
        lightboxMedia.setAttribute('alt', media.title);
        lightboxMedia.setAttribute('aria-label', media.title);
        break;

      case 'video':
        lightboxMedia = document.createElement('video');
        lightboxMedia.className = 'lightbox-media';
        lightboxMedia.setAttribute('src', `${path}/${media.video}`);
        lightboxMedia.setAttribute('controls', 'true');
        lightboxMedia.setAttribute('loop', 'false');
        lightboxMedia.setAttribute('muted', 'false');
        lightboxMedia.setAttribute('preload', 'true');
        lightboxMedia.setAttribute('alt', `Miniature de la vidéo de ${media.title}`);
        lightboxMedia.setAttribute('title', `Miniature de la vidéo de ${media.title}`);
        break;
    }
    if (document.getElementById('lightbox-media-container').firstChild !== document.getElementById('lightbox-media-title')) {
      clear();
    }
    /* Attach media to lightbox */
    const lightboxMediaContainer = document.getElementById('lightbox-media-container');
    lightboxMediaContainer.prepend(lightboxMedia);
    /* Attach media title to lightbox */
    const lightboxTitle = document.createElement('h1');
    lightboxTitle.id = 'lightbox-media-title';
    lightboxTitle.textContent = media.title;
    lightboxMediaContainer.append(lightboxTitle);
  }

  /**
   * The next function increments the index by one, and then uses the modulo operator to loop through
   * the mediaList array.
   */
  function next() {
    /* It's a modulo operation. It's a way to loop through an array. */
    index = (index + 1) % mediaList.length;
    updateLightbox(mediaList, mediaId);
  }

  /**
   * It subtracts one from the index, and if the result is less than zero, it adds the length of the
   * mediaList array to the result
   */
  function previous() {
    /* It's a modulo operation. It's a way to loop through an array. */
    index = (index - 1 + mediaList.length) % mediaList.length;
    updateLightbox();
  }



  document.getElementById('lightbox-next-button').addEventListener('click', () => {
    next();
  });

  document.getElementById('lightbox-close-button').addEventListener('click', () => {
    closeLightbox();
  });

  document.getElementById('lightbox-previous-button').addEventListener('click', () => {
    previous();
  });

  /* Navigation with keyboard */
  document.addEventListener('keydown', e => {
    if (e.key === 'ArrowRight') {
      next();
    } else if (e.key === 'ArrowLeft') {
      previous();
    } else if (e.key === 'Escape') {
      closeLightbox();
    }
  });
  return { show };
}
