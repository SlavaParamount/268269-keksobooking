'use strict';
(function () {
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

  window.utils = {
    randomizeArray: randomizeArray,
    getValueFromRange: getValueFromRange
  };
}());
