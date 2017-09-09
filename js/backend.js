'use strict';
(function () {
  /*
  var onLoad = function (ads) {
    console.log(ads);
  };

  var onError = function (response) {
    console.log(response);
  }


  window.backend.load = function (onLoad, onError) {
    var URL = 'https://1510.dump.academy/keksobooking/data';
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.open('GET', URL);

    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        onLoad(xhr.response);
      } else {
        onError(xhr.response);
      }
    });

    xhr.send();
  };
*/
  var pinFragment = document.createDocumentFragment();
  var tokyoPinMap = document.querySelector('.tokyo__pin-map');
  var URL = 'https://1510.dump.academy/keksobooking/data';
  var xhr = new XMLHttpRequest();
  var RANDOM_ID;
  xhr.responseType = 'json';

  xhr.open('GET', URL);

  xhr.addEventListener('load', function () {
    window.data = xhr.response;
    for (var i = 0; i < window.data.length; i++) {
      pinFragment.appendChild(window.pin.generatePin(i));
    }
    tokyoPinMap.appendChild(pinFragment);

    RANDOM_ID = window.utils.getValueFromRange(0, window.data.length - 1);

    var getRandomPin = function (id) {
      var pin = document.querySelector('.pin[data-search-index="' + id + '"]');
      return pin;
    };

    var activatePinCallback = function (pin) {
      window.pin.activateCurrentPin(pin);
    };

    window.pin.activateCurrentPin(getRandomPin(RANDOM_ID));

    window.card.openDialog(getRandomPin(RANDOM_ID), activatePinCallback);
  });

  xhr.send();

}());
