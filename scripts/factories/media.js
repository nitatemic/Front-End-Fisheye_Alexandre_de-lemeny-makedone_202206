export default function mediaFactory(media) {
  /* Defining the file path according to the photographer. */
  function getFilePath() {
    const path = '../assets/photographers_pic';
    console.log(media[0])
    switch (media[0].photographerId) {
      case 82:
        return `${path}/Tracy`;
      case 195:
        return `${path}/Marcel`;
      case 243:
        return `${path}/Mimi`;
      case 527:
        return `${path}/Nabeel`;
      case 925:
        return `${path}/Rhode`;
      case 930:
        return `${path}/Ellie-Rose`;
    }
  }

  async function getMediaDOM(mediaList) {
    const path = await getFilePath();
    const mediaContainer = document.createElement('div');
    mediaContainer.className = 'media-container';
    for (let i = 0; i < mediaList.length; i++) {
      const mediaPreview = document.createElement('div');
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
        mediaVideo.removeAttribute('controls');
        mediaPreview.appendChild(mediaVideo);
      } else {
        const mediaImage = document.createElement('img');
        mediaImage.className = 'media-image';
        mediaImage.setAttribute('src', `${path}/${mediaList[i].image}`);
        mediaImage.setAttribute('alt', mediaList[i].title);
        mediaImage.setAttribute('aria-label', mediaList[i].title);
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
      mediaLikeIcon.setAttribute('aria-label', 'J\'aime');
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
