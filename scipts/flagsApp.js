const flagsApp = {
  language: 'En',
  capsFlag: false,
  shiftFlag: false,
};

function setLocalStorage() {
  localStorage.setItem('language', flagsApp.language);
  localStorage.setItem('capsFlag', flagsApp.capsFlag);
}
window.addEventListener('beforeunload', setLocalStorage);

function getLocalStorage() {
  if (localStorage.getItem('language')) {
    flagsApp.language = localStorage.getItem('language');
  } else {
    flagsApp.language = 'En';
  }
  if (localStorage.getItem('capsFlag')) {
    flagsApp.capsFlag = JSON.parse(localStorage.getItem('capsFlag'));
  } else {
    flagsApp.capsFlag = false;
  }
}
window.addEventListener('load', getLocalStorage);
getLocalStorage();

export default flagsApp;
