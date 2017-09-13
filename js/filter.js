'use strict';
(function () {
  var houseType = document.getElementById('housing_type');
  var houseTypeValue = houseType.value;
  var roomNumber = document.getElementById('housing_room-number');
  var roomNumberValue = roomNumber.value;
  var guestsNumber = document.getElementById('housing_guests-number');
  var guestsNumberValue = guestsNumber.value;
  var price = document.getElementById('housing_price');
  var priceValue = price.value;
  var wifiCheckbox = document.querySelector('input[value = "wifi"]');
  var dishwasherCheckbox = document.querySelector('input[value = "dishwasher"]');
  var parkingCheckbox = document.querySelector('input[value = "parking"]');
  var washerCheckbox = document.querySelector('input[value = "washer"]');
  var elevatorCheckbox = document.querySelector('input[value = "elevator"]');
  var conditionerCheckbox = document.querySelector('input[value = "conditioner"]');
  var lastTimeout;
  var DEBOUNCE_INTERVAL = 300;

  window.debounce = function (fun) {
    if (lastTimeout) {
      window.clearTimeout(lastTimeout);
    }
    lastTimeout = window.setTimeout(fun, DEBOUNCE_INTERVAL);
  };

  var initializeSort = function () {
    window.pin.hidePins();
    window.card.closeDialog();
    var indexesToShow = [];
    var ads = window.data;
    var adsSorted = ads.filter(function (ad) {
      return checkElement(ad);
    });
    adsSorted.forEach(function (ad) {
      indexesToShow.push(ads.indexOf(ad));
    });
    window.pin.showPins(indexesToShow);
  };

  var onHouseTypeChange = function (evt) {
    houseTypeValue = evt.target.value;
    window.debounce(initializeSort);
  };

  var onRoomNumberChange = function (evt) {
    roomNumberValue = evt.target.value;
    window.debounce(initializeSort);
  };

  var onGuestsNumberChange = function (evt) {
    guestsNumberValue = evt.target.value;
    window.debounce(initializeSort);
  };

  var onPriceChange = function (evt) {
    priceValue = evt.target.value;
    window.debounce(initializeSort);
  };

  var onWifiChange = function () {
    window.debounce(initializeSort);
  };

  var onDishWasherInputChange = function () {
    window.debounce(initializeSort);
  };

  var onParkingInputChange = function () {
    window.debounce(initializeSort);
  };

  var onWasherInputChange = function () {
    window.debounce(initializeSort);
  };

  var onElevatorInputChange = function () {
    window.debounce(initializeSort);
  };

  var onConditionerInputChange = function () {
    window.debounce(initializeSort);
  };

  var getPriceOption = function (value) {
    if (value < 10000) {
      return 'low';
    } else if (value >= 1000 && value <= 50000) {
      return 'middle';
    } else {
      return 'high';
    }
  };

  var filterByCheckbox = function (featuresArray, checkFeature) {
    if (!checkFeature.checked) {
      return true;
    } else {
      return (featuresArray.indexOf(checkFeature.value) >= 0);
    }
  };

  var filterBySelectInput = function (elementValue, valueSelected) {
    if (valueSelected === 'any') {
      return true;
    } else {
      return (elementValue === valueSelected);
    }
  };

  var checkElement = function (element) {
    return filterBySelectInput(element.offer.type, houseTypeValue) &&
      filterBySelectInput(element.offer.rooms.toString(), roomNumberValue) &&
      filterBySelectInput(element.offer.guests.toString(), guestsNumberValue) &&
      filterBySelectInput(getPriceOption(element.offer.price), priceValue) &&
      filterByCheckbox(element.offer.features, wifiCheckbox) &&
      filterByCheckbox(element.offer.features, dishwasherCheckbox) &&
      filterByCheckbox(element.offer.features, parkingCheckbox) &&
      filterByCheckbox(element.offer.features, washerCheckbox) &&
      filterByCheckbox(element.offer.features, elevatorCheckbox) &&
      filterByCheckbox(element.offer.features, conditionerCheckbox);
  };

  washerCheckbox.addEventListener('change', onWasherInputChange);
  elevatorCheckbox.addEventListener('change', onElevatorInputChange);
  conditionerCheckbox.addEventListener('change', onConditionerInputChange);
  parkingCheckbox.addEventListener('change', onParkingInputChange);
  dishwasherCheckbox.addEventListener('change', onDishWasherInputChange);
  wifiCheckbox.addEventListener('change', onWifiChange);
  price.addEventListener('change', onPriceChange);
  guestsNumber.addEventListener('change', onGuestsNumberChange);
  roomNumber.addEventListener('change', onRoomNumberChange);
  houseType.addEventListener('change', onHouseTypeChange);

  window.filter = {
    initializeSort: initializeSort,
  };
}());
