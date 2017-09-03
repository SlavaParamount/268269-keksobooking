'use strict';
(function () {
  var tokyoPinMap = document.querySelector('.tokyo__pin-map');
  var pinFragment = document.createDocumentFragment();
  var RANDOM_ID;

  for (var i = 0; i < window.utils.NUMBER_OF_ADS; i++) {
    pinFragment.appendChild(window.pin.generatePin(i));
  }

  tokyoPinMap.appendChild(pinFragment);

  RANDOM_ID = window.utils.getValueFromRange(0, window.data.length - 1);

  var getRandomPin = function (id) {
    var pin = document.querySelector('.pin[data-search-index="' + id + '"]');
    return pin;
  };

  window.pin.activateCurrentPin(getRandomPin(RANDOM_ID));

  window.card.openDialog(getRandomPin(RANDOM_ID));

  var onOpenDialogClick = function (evt) {
    var currentPin = evt.target.closest('.pin:not(.pin__main)');
    if (currentPin) {
      window.pin.activateCurrentPin(currentPin);
      window.card.openDialog(currentPin);
    }
  };

  var onOpenDialogEnterPress = function (evt) {
    var currentPin = evt.target.closest('.pin:not(.pin__main)');
    if (window.utils.isEnterPress(evt) && currentPin) {
      window.pin.activateCurrentPin(currentPin);
      window.card.openDialog(currentPin);
    }
  };

  tokyoPinMap.addEventListener('keydown', onOpenDialogEnterPress);
  tokyoPinMap.addEventListener('click', onOpenDialogClick);
}());
