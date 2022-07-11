/**
 * It returns the path to the photographer's picture based on the photographer's ID
 * @returns The path to the photographer's picture.
 */
export function getFilePath(media) {
  const path = '../assets/photographers_pic';
  // eslint-disable-next-line default-case
  switch (media.photographerId) {
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
