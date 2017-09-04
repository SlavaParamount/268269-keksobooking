'use strict';
(function () {
  var tokyoPinMap = document.querySelector('.tokyo__pin-map');
  var pinFragment = document.createDocumentFragment();
  var RANDOM_ID;
  var mainPin = tokyoPinMap.querySelector('.pin__main');

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

  var onMainPinHandle = function (evt) {
    evt.preventDefault();

    var startPosition = {
      x: evt.clientX,
      y: evt.clientY
    };

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      var shift = {
        x: startPosition.x - moveEvt.clientX,
        y: startPosition.y - moveEvt.clientY
      };

      startPosition = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      mainPin.style.top = (mainPin.offsetTop - shift.y) + 'px';
      mainPin.style.left = (mainPin.offsetLeft - shift.x) + 'px';
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  };

  mainPin.addEventListener('mousedown', onMainPinHandle);
  tokyoPinMap.addEventListener('keydown', onOpenDialogEnterPress);
  tokyoPinMap.addEventListener('click', onOpenDialogClick);
}());
