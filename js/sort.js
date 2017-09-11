'use strict';
(function () {
  var houseType = document.getElementById('housing_type');
  var houseTypeValue;
  var roomNumber = document.getElementById('housing_room-number');
  var roomNumberValue = roomNumber.value;


  var onHouseTypeChange = function (evt) {
    houseTypeValue = evt.target.value;
    window.initializeSort();
  };

  var onRoomNumberChange = function (evt) {
    roomNumberValue = evt.target.value;
    window.initializeSort();
  };

  var houseTypeCheck = function (elementHouseType) {
    if (houseTypeValue === 'any') {
      return true;
    } else {
      return (houseTypeValue === elementHouseType);
    }
  };

  var checkElement = function (element) {
    return houseTypeCheck(element.offer.type) && element.offer.rooms == roomNumberValue;
  };

  roomNumber.addEventListener('change', onRoomNumberChange);
  houseType.addEventListener('change', onHouseTypeChange);
  window.initializeSort = function () {
    var ads = window.data;
    var adsSorted = ads.filter(function (ad) {
      return checkElement(ad);
    });
    console.log(adsSorted);
  };
}());
