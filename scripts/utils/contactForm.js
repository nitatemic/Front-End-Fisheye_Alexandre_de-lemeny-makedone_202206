/**
 * When the user clicks the button, display the modal.
 */
export function displayModal() {
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
export function closeModal() {
  const modal = document.getElementById('contact_modal');
  modal.style.display = 'none';
  if (document.getElementById('contactOverlay')) {
    document.getElementById('contactOverlay').remove();
  }
}

/* If user push 'esc' key when modal is open, close the modal */
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    closeModal();
  }
});

/* When I click on submit button, send the form */
document.getElementById('contact_submit').addEventListener('click', (e) => {
  e.preventDefault();
  const form = document.getElementById('contact_form');
  const formData = new FormData(form);
  const data = {};
  formData.forEach((value, key) => {
    data[key] = value;
  });
  console.log(data);
  closeModal();
});
