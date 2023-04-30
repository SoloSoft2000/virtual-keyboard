import flagsApp from './scipts/flagsApp.js';
import Keyboard from './scipts/Keyboard.js';

window.addEventListener('load', Keyboard.updateKeyboard);

const body = document.querySelector('body');
const wrapper = document.createElement('div');
wrapper.className = 'wrapper';
const headerInput = document.createElement('header');
headerInput.className = 'header';
headerInput.innerHTML = '<h1>Virtual Keyboard</h1>';
wrapper.append(headerInput);

const textarea = document.createElement('textarea');
textarea.className = 'textarea';
textarea.autofocus = true;
textarea.rows = 6;
textarea.cols = 50;
wrapper.append(textarea);

const displayBoard = document.createElement('div');
displayBoard.className = 'keyboard';
displayBoard.oncontextmenu = null;
const board = Keyboard;
board.create(displayBoard);

const instructionBlock = document.createElement('div');
instructionBlock.className = 'instruction';
instructionBlock.innerHTML = 'Клавиатура создана в операционной системе Windows<br>Для переключения языка комбинация: ctrl + левый alt';
wrapper.append(instructionBlock);

wrapper.append(displayBoard);
body.append(wrapper);

function keyDown(event) {
  if (!event.repeat) {
    if (event.code === 'AltLeft' && event.ctrlKey) {
      const domKey = document.querySelector(`#${event.code}`);
      domKey.classList.add('pushed');
      flagsApp.language = flagsApp.language === 'En' ? 'Ru' : 'En';
      Keyboard.updateKeyboard();
    } else {
      const domKey = document.querySelector(`#${event.code}`);
      board.pushKey(domKey);
    }
  }
  event.preventDefault();
}

function keyUp(event) {
  const domKey = document.querySelector(`#${event.code}`);
  if (domKey) {
    if (domKey.id === 'ShiftLeft' || domKey.id === 'ShiftRight') {
      flagsApp.shiftFlag = false;
      Keyboard.updateKeyboard();
    }
    domKey.classList.remove('pushed');
    event.preventDefault();
  }
}

window.addEventListener('keydown', keyDown);
window.addEventListener('keyup', keyUp);
