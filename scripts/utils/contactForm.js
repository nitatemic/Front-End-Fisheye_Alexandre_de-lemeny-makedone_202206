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
  const firstInput = document.getElementById('firstname');
  firstInput.focus();
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
  /* Reset the form */
  const form = document.getElementById('contact_form');
  form.reset();
  document.getElementById('contactMeButton').focus();
}

/* If user push 'esc' key when modal is open, close the modal */
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    closeModal();
  }
});

/**
 * It checks if the email address is valid
 * @param email - The email address to validate.
 * @returns A boolean value.
 */
function checkMail(email) {
  const regex = /^([a-z0-9]+(?:[._-][a-z0-9]+)*)@([a-z0-9]+(?:[.-][a-z0-9]+)*\.[a-z]{2,})$/i;
  return regex.test(email);
}

/**
 * "If the form is valid, send it to the server, otherwise show errors where they need to be."
 *
 * The first thing we do is get the form element and all the input elements. Then we check if all the
 * inputs are valid. If they are, we create a FormData object and send it to the server. If they
 * aren't, we add the error class to the invalid inputs
 */
function sendForm() {
  const form = document.getElementById('contact_form');
  const firstname = form.firstname.value;
  const lastname = form.lastname.value;
  const email = form.email.value;
  const message = form.message.value;

  if (firstname && lastname && email && checkMail(email) && message) {
    const formData = new FormData(form);
    const data = [];
    formData.forEach((value, key) => {
      data[key] = value;
    });

    // eslint-disable-next-line no-console
    console.log(data); // skipcq : JS-0002
    closeModal();
  } else {
    /* Show errors where they need to be */
    if (!firstname) {
      form.firstname.classList.add('error');
    }
    if (!lastname) {
      form.lastname.classList.add('error');
    }
    if (!email || !checkMail(email)) {
      form.email.classList.add('error');
    }
    if (!message) {
      form.message.classList.add('error');
    }
  }
}
/* When I click on submit button, send the form */
document.getElementById('contact_submit').addEventListener('click', (event) => {
  event.preventDefault();
  sendForm();
});

/* When I press enter, send the form */
document.getElementById('contact_form').addEventListener('keyup', (e) => {
  if (e.key === 'Enter') {
    sendForm();
  }
});
