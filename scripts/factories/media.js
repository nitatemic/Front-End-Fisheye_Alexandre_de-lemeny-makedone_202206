export default function mediaFactory(media) {
  /* Fonction qui créer les previews des photos et vidéos, avec le titre et le nombre de likes */

  function getMediaDOM(mediaList) {
    console.log(mediaList);
    const mediaContainer = document.createElement('div');
    mediaContainer.className = 'media-container';
    for (let i = 0; i < mediaList.length; i++) {
      const mediaPreview = document.createElement('div');
      mediaPreview.className = 'media-preview';
      mediaContainer.appendChild(mediaPreview);
      if (mediaList[i].image === undefined) {
        console.log(mediaList[i].image);
        const mediaVideo = document.createElement('video');
        mediaVideo.className = 'media-video';
        mediaVideo.setAttribute('src', mediaList[i].video);
        mediaVideo.setAttribute('controls', 'false');
        mediaVideo.setAttribute('loop', 'false');
        mediaVideo.setAttribute('muted', 'true');
        mediaVideo.setAttribute('autoplay', 'false');
        mediaPreview.appendChild(mediaVideo);
      } else {
        const mediaImage = document.createElement('img');
        mediaImage.className = 'media-image';
        mediaImage.setAttribute('src', mediaList[i].image);
        mediaImage.setAttribute('alt', mediaList[i].title);
        mediaImage.setAttribute('aria-label', mediaList[i].title);
        mediaPreview.appendChild(mediaImage);
      }
      const mediaTitle = document.createElement('h3');
      mediaTitle.textContent = mediaList[i].title;
      mediaTitle.className = 'media-title';
      mediaPreview.appendChild(mediaTitle);
      const mediaLike = document.createElement('div');
      mediaLike.className = 'media-like';
      mediaPreview.appendChild(mediaLike);
      const mediaLikeIcon = document.createElement('i');
      mediaLikeIcon.className = 'fas fa-heart';
      mediaLikeIcon.setAttribute('aria-label', 'J\'aime');
      mediaLike.appendChild(mediaLikeIcon);
      const mediaLikeCount = document.createElement('span');
      mediaLikeCount.textContent = mediaList[i].likes;
      mediaLikeCount.className = 'media-like-count';
      mediaLike.appendChild(mediaLikeCount);
    }
    return mediaContainer;
  }

  async function filterByPopularity() {
    const mediaCopy = [...media];
    mediaCopy.sort((a, b) => a.likes - b.likes).reverse();
    console.log(mediaCopy);
    return getMediaDOM(mediaCopy);
  }

  function filterByDate() {
    const mediaCopy = [...media];
    mediaCopy.sort((a, b) => a.date - b.date);
    console.log(mediaCopy);
    return mediaCopy;
  }

  function filterByTitle() {
    const mediaCopy = [...media];
    mediaCopy.sort((a, b) => a.title.localeCompare(b.title));
    console.log(mediaCopy);
    return mediaCopy;
  }
  return { filterByPopularity, filterByDate, filterByTitle };
}
