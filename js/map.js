'use strict';
(function () {
  var tokyoPinMap = document.querySelector('.tokyo__pin-map');
  var mainPin = tokyoPinMap.querySelector('.pin__main');
  var mainPinMinX = 400;
  var mainPinMaxX = 900;
  var mainPinMinY = 100;
  var mainPinMaxY = 500;
  var pinFragment = document.createDocumentFragment();
  var adressInput = document.getElementById('address');
  var pinStartX = mainPin.offsetLeft + (mainPin.offsetWidth / 2);
  var pinStartY = mainPin.offsetTop + mainPin.offsetHeight;

  adressInput.readOnly = true;
  adressInput.value = 'x: ' + Math.floor(pinStartX) + ', y: ' + Math.floor(pinStartY);

  var activatePin = function (pin) {
    window.pin.activateCurrentPin(pin);
  };

  var putAdsContent = function (data) {
    var ads = data;
    window.data = ads;
    for (var i = 0; i < ads.length; i++) {
      pinFragment.appendChild(window.pin.generatePin(i));
    }
    tokyoPinMap.appendChild(pinFragment);

    window.filter.initializeSort();

  };

  var onOpenDialogClick = function (evt) {
    var currentPin = evt.target.closest('.pin:not(.pin__main)');
    if (currentPin) {
      window.card.openDialog(currentPin, activatePin);
    }
  };

  var onOpenDialogEnterPress = function (evt) {
    var currentPin = evt.target.closest('.pin:not(.pin__main)');
    if (window.utils.isEnterPress(evt) && currentPin) {
      window.card.openDialog(currentPin, activatePin);
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

      var nextX = mainPin.offsetLeft - shift.x + mainPin.offsetWidth * 0.5;
      var nextY = mainPin.offsetTop - shift.y + mainPin.offsetHeight;

      if (nextX < mainPinMaxX && nextX > mainPinMinX && nextY > mainPinMinY && nextY < mainPinMaxY) {
        startPosition = {
          x: moveEvt.clientX,
          y: moveEvt.clientY
        };

        mainPin.style.top = (mainPin.offsetTop - shift.y) + 'px';
        mainPin.style.left = (mainPin.offsetLeft - shift.x) + 'px';

        adressInput.value = 'x: ' + Math.floor(nextX) + ', y: ' + Math.floor(nextY);
      }
    };
    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  };

  window.backend.backendLoad(putAdsContent, window.backend.showError);
  mainPin.addEventListener('mousedown', onMainPinHandle);
  tokyoPinMap.addEventListener('keydown', onOpenDialogEnterPress);
  tokyoPinMap.addEventListener('click', onOpenDialogClick);
}());
