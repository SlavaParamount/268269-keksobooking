'use strict';
(function () {
  var POINTER_HEIGHT = 75;
  var POINTER_WIDTH = 56;
  var PIN_ACTIVE_CLASS = 'pin--active';
  var activePin;
  var ads = window.data;

  var deactivatePin = function () {
    if (activePin) {
      activePin.classList.remove(PIN_ACTIVE_CLASS);
    }
  };

  var activateCurrentPin = function (pin) {
    deactivatePin();
    activePin = pin;
    activePin.classList.add(PIN_ACTIVE_CLASS);
  };

  var generatePin = function (i) {
    ads = window.data;
    console.log(window.data[i]);
    var pointer = document.createElement('div');
    pointer.classList.add('pin');
    pointer.dataset.searchIndex = i;
    pointer.style.left = (Math.floor((ads[i].location.x) - 0.5 * POINTER_WIDTH)) + 'px';
    pointer.style.top = (ads[i].location.y - POINTER_HEIGHT) + 'px';
    var pointerImage = document.createElement('img');
    pointerImage.src = ads[i].author.avatar;
    pointer.tabIndex = '0';
    pointerImage.classList.add('rounded');
    pointerImage.style.height = '40px';
    pointerImage.style.width = '40px';
    pointer.appendChild(pointerImage);
    return pointer;
  };

  window.pin = {
    generatePin: generatePin,
    activateCurrentPin: activateCurrentPin,
    deactivatePin: deactivatePin,
  };

}());
