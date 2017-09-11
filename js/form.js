'use strict';
(function () {
  var offerFormHeader = document.getElementById('title');
  var checkinInput = document.querySelector('#timein');
  var checkoutInput = document.querySelector('#timeout');
  var houseType = document.querySelector('#type');
  var housePrice = document.querySelector('#price');
  var roomNumber = document.querySelector('#room_number');
  var capacity = document.querySelector('#capacity');
  var formButton = document.querySelector('.form__submit');
  var sendOfferForm = document.querySelector('.notice__form');
  var allInput = sendOfferForm.querySelectorAll('input');
  var form = document.querySelector('.notice__form');
  var HEADER_MIN_LENGTH = 30;
  var HEADER_MAX_LENGTH = 100;
  var GUESTS_AMOUNT = {
    ONE_ROOM: ['1'],
    TWO_ROOMS: ['1', '2'],
    THREE_ROOMS: ['1', '2', '3'],
    HUNDRED_ROOMS: ['0']
  };

  housePrice.value = '1000';
  housePrice.min = '1000';

  var onRoomNumberChange = function (inputArray) {
    var maxGuest = 0;
    for (var i = 0; i < capacity.options.length; i++) {
      var option = capacity[i];
      if (inputArray.indexOf(option.value) === -1) {
        option.disabled = true;
      } else {
        option.disabled = false;
        maxGuest = option.value > maxGuest ? option.value : maxGuest;
      }
    }
    capacity.value = maxGuest;
  };

  var onHouseTypeChangeSetPrice = function (evt) {
    var target = evt.target;
    switch (target.value) {
      case 'bungalo':
        housePrice.min = '0';
        housePrice.value = '0';
        break;
      case 'flat':
        housePrice.min = '1000';
        housePrice.value = '1000';
        break;
      case 'house':
        housePrice.min = '5000';
        housePrice.value = '5000';
        break;
      case 'palace':
        housePrice.min = '10000';
        housePrice.value = '10000';
        break;
    }
  };

  var synchValues = function (element, value) {
    element.value = value;
  };

  var onCheckinChange = function () {
    window.synchronizeFields(checkinInput, checkoutInput, ['12:00', '13:00', '14:00'], ['12:00', '13:00', '14:00'], synchValues);
  };

  var onCheckoutChange = function () {
    window.synchronizeFields(checkoutInput, checkinInput, ['12:00', '13:00', '14:00'], ['12:00', '13:00', '14:00'], synchValues);
  };

  var onHouseTypeChange = function (evt) {
    switch (evt.target.value) {
      case '1':
        onRoomNumberChange(GUESTS_AMOUNT.ONE_ROOM);
        break;
      case '2':
        onRoomNumberChange(GUESTS_AMOUNT.TWO_ROOMS);
        break;
      case '3':
        onRoomNumberChange(GUESTS_AMOUNT.THREE_ROOMS);
        break;
      case '100':
        onRoomNumberChange(GUESTS_AMOUNT.HUNDRED_ROOMS);
        break;
    }
  };

  var formReset = function () {
    form.reset();
  };

  var onFormSubmit = function (evt) {
    evt.preventDefault();
    window.backend.backendSave(formReset, window.backend.showError, new FormData(form));
  };

  var onFormButtonClick = function (evt) {
    if (offerFormHeader.value.length < HEADER_MIN_LENGTH || offerFormHeader.value.length > HEADER_MAX_LENGTH) {
      offerFormHeader.setCustomValidity('Минимальная длина строки - 30, максимальная - 100');
    } else {
      offerFormHeader.setCustomValidity('');
    }

    for (var i = 0; i < allInput.length; i++) {
      if (!allInput[i].validity.valid) {
        allInput[i].style.border = '2px solid red';
        evt.preventDefault();
      } else if (allInput[i].style.border && allInput[i].validity.valid) {
        allInput[i].style.border = '';
      }
    }
  };


  checkinInput.addEventListener('change', onCheckinChange);
  checkoutInput.addEventListener('change', onCheckoutChange);
  houseType.addEventListener('change', onHouseTypeChangeSetPrice);
  roomNumber.addEventListener('change', onHouseTypeChange);
  formButton.addEventListener('click', onFormButtonClick);
  form.addEventListener('submit', onFormSubmit);
}());
