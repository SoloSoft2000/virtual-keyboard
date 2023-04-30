import keys from './keys.js';
import flagsApp from './flagsApp.js';

function getKeyText(keyName) {
  if (keys[keyName].name) { // service button
    return keys[keyName].name;
  }

  let result = keys[keyName][flagsApp.language] || keys[keyName].En;
  if (flagsApp.capsFlag && !flagsApp.shiftFlag) { // Заглавные буквы
    result = result.toLocaleUpperCase();
  }

  let flagString = flagsApp.language;
  if (flagsApp.shiftFlag) {
    flagString += 'Shift';
    result = keys[keyName][flagString] || keys[keyName].EnShift || result;
    if (flagsApp.capsFlag) {
      result = result.toLocaleLowerCase();
    } else {
      result = result.toLocaleUpperCase();
    }
  }

  return result;
}

const Keyboard = {
  keyList: [
    ['Backslash', 'Backquote', 'Digit1', 'Digit2', 'Digit3', 'Digit4', 'Digit5', 'Digit6', 'Digit7', 'Digit8', 'Digit9', 'Digit0', 'Minus', 'Equal', 'Backspace'],
    ['Tab', 'KeyQ', 'KeyW', 'KeyE', 'KeyR', 'KeyT', 'KeyY', 'KeyU', 'KeyI', 'KeyO', 'KeyP', 'BracketLeft', 'BracketRight', 'Delete'],
    ['CapsLock', 'KeyA', 'KeyS', 'KeyD', 'KeyF', 'KeyG', 'KeyH', 'KeyJ', 'KeyK', 'KeyL', 'Semicolon', 'Quote', 'Enter'],
    ['ShiftLeft', 'KeyZ', 'KeyX', 'KeyC', 'KeyV', 'KeyB', 'KeyN', 'KeyM', 'Comma', 'Period', 'Slash', 'ArrowUp', 'ShiftRight'],
    ['ControlLeft', 'MetaLeft', 'AltLeft', 'Space', 'AltRight', 'ArrowLeft', 'ArrowDown', 'ArrowRight', 'ControlRight']],
  updateKeyboard: () => {
    const keyArr = [].concat(...Keyboard.keyList);
    keyArr.forEach((keyChange) => {
      const domKey = document.querySelector(`#${keyChange}`);
      domKey.innerHTML = getKeyText(keyChange);
    });
  },
  keyDown: (event) => {
    if (!event.repeat) {
      Keyboard.pushKey(event.target);
      event.preventDefault();
    }
  },
  keyUp: (event) => {
    if (event.target && (event.target.id === 'ShiftLeft' || event.target.id === 'ShiftRight')) {
      flagsApp.shiftFlag = false;
      Keyboard.updateKeyboard();
      document.querySelector('#ShiftLeft').classList.remove('pushed');
      document.querySelector('#ShiftRight').classList.remove('pushed');
    } else {
      event.target.classList.toggle('pushed');
    }
    event.preventDefault();
  },
  mouseOut: (event) => {
    if (event.target.classList.contains('pushed') && !(event.target.id === 'ShiftLeft' || event.target.id === 'ShiftRight')) {
      Keyboard.keyUp(event);
    }
  },
  pushKey: (domKey) => {
    if (!domKey) {
      return;
    }
    const upperKeys = ['CapsLock', 'ShiftLeft', 'ShiftRight'];
    if (upperKeys.includes(domKey.id)) {
      if (domKey.id === 'CapsLock') {
        flagsApp.capsFlag = !flagsApp.capsFlag;
        domKey.classList.toggle('pushed');
        domKey.classList.toggle('caps-on');
        Keyboard.updateKeyboard();
      }
      if ((domKey.id === 'ShiftLeft' || domKey.id === 'ShiftRight')) {
        flagsApp.shiftFlag = true;
        domKey.classList.toggle('pushed');
        Keyboard.updateKeyboard();
      }
    } else {
      domKey.classList.toggle('pushed');
      const domTextArea = document.querySelector('.textarea');
      let idx = domTextArea.selectionStart;
      const sBef = domTextArea.value.substr(0, idx);
      const sAft = domTextArea.value.substr(idx, domTextArea.value.length);
      if (!keys[domKey.id].name || ['Space', 'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(domKey.id)) {
        domTextArea.value = sBef + getKeyText(domKey.id) + sAft;
        idx += 1;
      } else {
        switch (domKey.id) {
          case 'Tab': {
            const tabStr = '    ';
            domTextArea.value = sBef + tabStr + sAft;
            idx += 4;
            break;
          }
          case 'Enter': {
            const enterStr = '\n';
            domTextArea.value = sBef + enterStr + sAft;
            idx += 1;
            break;
          }
          case 'Backspace': {
            domTextArea.value = sBef.slice(0, -1) + sAft;
            idx -= 1;
            break;
          }
          case 'Delete': {
            domTextArea.value = sBef + sAft.slice(1);
            break;
          }
          default:
            break;
        }
      }
      domTextArea.setSelectionRange(idx, idx);
    }
    const domTextArea = document.querySelector('.textarea');
    domTextArea.focus();
  },
  create: (node) => {
    Keyboard.keyList.forEach((row, rowIdx) => {
      const newRow = document.createElement('div');
      newRow.className = `row row${rowIdx}`;
      row.forEach((keyName) => {
        const keyButton = document.createElement('button');
        keyButton.className = 'key__button';
        keyButton.id = keyName;
        if (keys[keyName].service) {
          if (keyName === 'CapsLock' && flagsApp.capsFlag) {
            keyButton.classList.add('caps-on');
          }
          if (keys[keyName].double) {
            keyButton.classList.add('key__double');
          }
          if (keyName === 'Space') {
            keyButton.classList.add('key__space');
            keyButton.innerHTML = ' ';
          } else {
            keyButton.innerHTML = keyName.name;
          }
        } else {
          keyButton.innerHTML = keyName[flagsApp.language];
        }
        keyButton.addEventListener('mousedown', Keyboard.keyDown);
        keyButton.addEventListener('mouseup', Keyboard.keyUp);
        keyButton.addEventListener('mouseout', Keyboard.mouseOut);
        newRow.append(keyButton);
      });
      node.append(newRow);
    });
  },
};

export default Keyboard;
