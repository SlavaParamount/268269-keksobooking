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
    var pointer = document.createElement('div');
    pointer.classList.add('pin');
    pointer.classList.add('hidden');
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

  var activateRandomPin = function (indexes) {
    var randomID = indexes[window.utils.getValueFromRange(0, indexes.length - 1)];
    var randomPin = document.querySelector(('.pin[data-search-index="' + randomID + '"]'));
    activateCurrentPin(randomPin);
    window.card.openDialog(randomPin, activateCurrentPin);
  };

  function showPins(indexes) {
    indexes.forEach(function (index) {
      var pinToShow = document.querySelector(('.pin[data-search-index="' + index + '"]'));
      pinToShow.classList.remove('hidden');
    });
    activateRandomPin(indexes);
  }


  var hidePins = function () {
    var pinsCollection = document.querySelectorAll('.pin:not(.pin__main)');
    [].forEach.call(pinsCollection, function (pin) {
      pin.classList.add('hidden');
    });
  };

  window.pin = {
    generatePin: generatePin,
    activateCurrentPin: activateCurrentPin,
    deactivatePin: deactivatePin,
    showPins: showPins,
    hidePins: hidePins
  };

}());
