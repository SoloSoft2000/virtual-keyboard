import keys from './keys.js';

const defaultLanguage = { language: 'En' };

function keyClick(event) {
  console.log(this.id, event.button);
}

const Keyboard = {
  keyList: [
    ['Backslash', 'Backquote', 'Digit1', 'Digit2', 'Digit3', 'Digit4', 'Digit5', 'Digit6', 'Digit7', 'Digit8', 'Digit9', 'Digit0', 'Minus', 'Equal', 'Backspace'],
    ['Tab', 'KeyQ', 'KeyW', 'KeyE', 'KeyR', 'KeyT', 'KeyY', 'KeyU', 'KeyI', 'KeyO', 'KeyP', 'BracketLeft', 'BracketRight', 'Delete'],
    ['CapsLock', 'KeyA', 'KeyS', 'KeyD', 'KeyF', 'KeyG', 'KeyH', 'KeyJ', 'KeyK', 'KeyL', 'Semicolon', 'Quote', 'Enter'],
    ['ShiftL', 'KeyZ', 'KeyX', 'KeyC', 'KeyV', 'KeyB', 'KeyN', 'KeyM', 'Comma', 'Period', 'Slash', 'ArrowUp', 'ShiftR'],
    ['ControlLeft', 'MetaLeft', 'AltLeft', 'Space', 'AltRight', 'ArrowLeft', 'ArrowDown', 'ArrowRight', 'ControlRight']],
  updateKeyboard: () => {
    console.log('update', defaultLanguage.language);
  },
  create: (node) => {
    for (let row = 0; row < Keyboard.keyList.length; row += 1) {
      const newRow = document.createElement('div');
      newRow.className = `row row${row}`;
      for (let keyI = 0; keyI < Keyboard.keyList[row].length; keyI += 1) {
        const keyButton = document.createElement('button');
        keyButton.className = 'key__button';
        keyButton.id = Keyboard.keyList[row][keyI];
        if (keys[Keyboard.keyList[row][keyI]].service) {
          if (keys[Keyboard.keyList[row][keyI]].double) {
            keyButton.className += ' key__double';
          }
          if (Keyboard.keyList[row][keyI] === 'Space') {
            keyButton.className += ' key__space';
            keyButton.innerHTML = ' ';
          } else {
            keyButton.innerHTML = keys[Keyboard.keyList[row][keyI]].name;
          }
        } else {
          keyButton.innerHTML = keys[Keyboard.keyList[row][keyI]][defaultLanguage.language];
        }
        keyButton.addEventListener('mouseup', keyClick);
        newRow.append(keyButton);
      }
      node.append(newRow);
    }
  },
};

export { Keyboard, defaultLanguage };
