export default function mediaFactory(media) {
  function filterByPopularity() {
    const mediaCopy = [...media];
    mediaCopy.sort((a, b) => a.likes - b.likes).reverse();
    console.log(mediaCopy);
    return mediaCopy;
  }

  return { filterByPopularity };
}
