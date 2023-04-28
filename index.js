import { Keyboard, defaultLanguage } from './scipts/Keyboard.js';

function setLocalStorage() {
  localStorage.setItem('language', defaultLanguage.language);
}
window.addEventListener('beforeunload', setLocalStorage);

function getLocalStorage() {
  if (localStorage.getItem('language')) {
    defaultLanguage.language = localStorage.getItem('language');
  } else {
    defaultLanguage.language = 'En';
  }
}
window.addEventListener('load', getLocalStorage);
window.addEventListener('load', Keyboard.updateKeyboard);

const body = document.querySelector('body');
const wrapper = document.createElement('div');
wrapper.className = 'wrapper';
const headerInput = document.createElement('header');
headerInput.className = 'header';
headerInput.innerHTML = '<h1>Virtual Keyboard<span class="subtitle">(Windows)</span></h1>';
wrapper.append(headerInput);

const textarea = document.createElement('textarea');
textarea.className = 'textarea';
textarea.rows = 6;
textarea.cols = 50;
wrapper.append(textarea);

const displayBoard = document.createElement('div');
displayBoard.className = 'keyboard';
const board = Keyboard;
board.create(displayBoard);
wrapper.append(displayBoard);
body.append(wrapper);
