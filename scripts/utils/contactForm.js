/**
 * When the user clicks the button, display the modal.
 */
function displayModal() {
  const modal = document.getElementById('contact_modal');
  modal.style.display = 'block';
  const overlay = document.createElement('div');
  overlay.classList.add('overlay');
  overlay.setAttribute('id', 'contactOverlay');
  document.body.appendChild(overlay);
}

/**
 * When the user clicks on the close button, the modal is hidden
 */
function closeModal() {
  const modal = document.getElementById('contact_modal');
  modal.style.display = 'none';
  document.getElementById('contactOverlay').remove();
}
