import throttle from 'lodash.throttle';

const LOCAL_KEY = 'feedback-form-state';

form = document.querySelector('.feedback-form');

form.addEventListener('input', throttle(onTextAreaInput, 500));
form.addEventListener('submit', onFormSubmit);

const { email, message } = form.elements;
let dataForm = JSON.parse(localStorage.getItem(LOCAL_KEY));
reloadPage();

function onTextAreaInput(e) {
  dataForm = { email: email.value, message: message.value };
  localStorage.setItem(LOCAL_KEY, JSON.stringify(dataForm));
  console.log(dataForm);
}

function onFormSubmit(e) {
  e.preventDefault();

  console.log({ email: email.value, message: message.value });

  e.currentTarget.reset();
  localStorage.removeItem(LOCAL_KEY);
}

function reloadPage() {
  if (dataForm) {
    email.value = dataForm.email;
    message.value = dataForm.message;
  }
}
