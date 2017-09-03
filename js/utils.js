'use strict';
(function () {
  var NUMBER_OF_ADS = 8;
  var ESC_CODE = 27;
  var ENTER_CODE = 13;

  var randomizeArray = function (arr) {
    var arrCopy = arr.slice();
    var arrLength = arrCopy.length;
    var finalArray = [];
    for (var i = 0; i < arr.length; i++) {
      var randomIndex = getValueFromRange(0, arrLength - i);
      finalArray[i] = arrCopy.splice(randomIndex, 1)[0];
    }
    return finalArray;
  };

  var getValueFromRange = function (min, max) {
    return Math.floor(Math.random() * (max - min) + min);
  };

  var isEscPress = function (evt) {
    return evt.keyCode === ESC_CODE;
  };

  var isEnterPress = function (evt) {
    return evt.keyCode === ENTER_CODE;
  };

  window.utils = {
    NUMBER_OF_ADS: NUMBER_OF_ADS,
    isEscPress: isEscPress,
    isEnterPress: isEnterPress,
    randomizeArray: randomizeArray,
    getValueFromRange: getValueFromRange
  };
}());
