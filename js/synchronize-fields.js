'use strict';
(function () {
  window.synchronizeFields = function (fieldOne, fieldTwo, valuesOne, valuesTwo, synchValues) {
    var valueOne = fieldOne.value;
    var valueTwo;
    valuesOne.forEach(function (item, i) {
      if (item === valueOne) {
        valueTwo = valuesTwo[i];
      }
    });
    synchValues(fieldTwo, valueTwo);
  };
}());
