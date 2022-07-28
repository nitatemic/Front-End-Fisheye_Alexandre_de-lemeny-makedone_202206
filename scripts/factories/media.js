// eslint-disable-next-line import/extensions
import { getFilePath } from '../utils/getFilePath.js';
// eslint-disable-next-line import/extensions
import lightboxFactory from '../utils/lightbox.js';

export default function mediaFactory(media) {

  async function getMediaDOM(mediaList) {
    const path = getFilePath(media[0]);
    const mediaContainer = document.createElement('div');
    mediaContainer.className = 'media-container';
    for (let i = 0; i < mediaList.length; i++) {
      const lightbox = lightboxFactory(mediaList, mediaList[i].id);
      const mediaPreview = document.createElement('a');
      mediaPreview.className = 'media-preview';
      mediaContainer.appendChild(mediaPreview);
      if (mediaList[i].image === undefined) {
        const mediaVideo = document.createElement('video');
        mediaVideo.className = 'media-video';
        mediaVideo.setAttribute('src', `${path}/${mediaList[i].video}`);
        mediaVideo.setAttribute('controls', 'false');
        mediaVideo.setAttribute('loop', 'false');
        mediaVideo.setAttribute('muted', 'true');
        mediaVideo.setAttribute('preload', 'false');
        mediaVideo.setAttribute('alt', `Miniature de la vidéo de ${mediaList[i].title}`);
        mediaVideo.setAttribute('title', `Miniature de la vidéo de ${mediaList[i].title}`);
        mediaVideo.removeAttribute('controls');
        mediaVideo.addEventListener('click', () => {
          lightbox.show();
        });
        mediaPreview.appendChild(mediaVideo);
      } else {
        const mediaImage = document.createElement('img');
        mediaImage.className = 'media-image';
        mediaImage.setAttribute('src', `${path}/${mediaList[i].image}`);
        mediaImage.setAttribute('alt', mediaList[i].title);
        mediaImage.setAttribute('aria-label', mediaList[i].title);
        mediaImage.setAttribute('loading', 'lazy');
        /* Ajouter un event listener sur l'image pour afficher la lightbox */
        mediaImage.addEventListener('click', () => {
          lightbox.show();
        });
        mediaPreview.appendChild(mediaImage);
      }

      const mediaSummary = document.createElement('div');
      mediaSummary.className = 'media-summary';
      const mediaTitle = document.createElement('h3');
      mediaTitle.textContent = mediaList[i].title;
      mediaTitle.className = 'media-title';
      mediaSummary.appendChild(mediaTitle);
      const mediaLike = document.createElement('div');
      mediaLike.className = 'media-like';
      mediaSummary.appendChild(mediaLike);
      const mediaLikeCount = document.createElement('span');
      mediaLikeCount.textContent = mediaList[i].likes;
      mediaLikeCount.className = 'media-like-count';
      mediaLike.appendChild(mediaLikeCount);
      const mediaLikeIcon = document.createElement('i');
      mediaLikeIcon.className = 'fa-solid fa-heart fa-beat like-icon';
      mediaLikeIcon.setAttribute('aria-label', 'Likes');
      let liked = false;
      mediaLikeIcon.addEventListener('click', () => {
        if (!liked) {
          mediaLikeCount.textContent = parseInt(mediaLikeCount.textContent) + 1;
          document.getElementById('photographer-likes').textContent = parseInt(document.getElementById('photographer-likes').textContent) + 1;
          mediaLikeIcon.classList.add('red');
          liked = true;
        } else {
          mediaLikeCount.textContent = parseInt(mediaLikeCount.textContent) - 1;
          document.getElementById('photographer-likes').textContent = parseInt(document.getElementById('photographer-likes').textContent) - 1;
          mediaLikeIcon.classList.remove('red');
          liked = false;
        }
      });
      mediaLike.appendChild(mediaLikeIcon);
      mediaPreview.appendChild(mediaSummary);
    }
    return mediaContainer;
  }

  /**
   * We're creating a copy of the media array, sorting it by likes, and then returning the DOM
   * elements for the sorted array
   * @returns the getMediaDOM function.
   */
  async function filterByPopularity() {
    const mediaCopy = [...media];
    mediaCopy.sort((a, b) => a.likes - b.likes).reverse();
    return getMediaDOM(mediaCopy);
  }

  /**
   * It creates a copy of the media array, sorts the copy by date, and returns the copy
   * @returns The mediaCopy array is being returned.
   */
  function filterByDate() {
    const mediaCopy = [...media];
    mediaCopy.sort((a, b) => a.date - b.date);
    return getMediaDOM(mediaCopy);
  }

  /**
   * It creates a copy of the media array, sorts the copy by title, and returns the copy
   * @returns The mediaCopy array is being returned.
   */
  function filterByTitle() {
    const mediaCopy = [...media];
    mediaCopy.sort((a, b) => a.title.localeCompare(b.title));
    return getMediaDOM(mediaCopy);
  }

  return { filterByPopularity, filterByDate, filterByTitle };
}
