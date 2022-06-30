export default function mediaFactory(media) {

  function filterByPopularity() {
    const mediaCopy = [...media];
    mediaCopy.sort((a, b) => a.likes - b.likes).reverse();
    console.log(mediaCopy);
    return mediaCopy;
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
