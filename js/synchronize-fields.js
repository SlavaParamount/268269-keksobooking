'use strict';
(function () {
  window.synchronizeFields = function (fieldOne, fieldTwo, valuesOne, valuesTwo, synchValues) {
    console.log('aaa');
    var valueTwo = fieldTwo.value;
    var valueOne;
    valuesTwo.forEach(function (item, i) {
      console.log(item);
      console.log(valueTwo);
      if (item === valueTwo) {
        valueOne = valuesOne[i];
      }
    });
    synchValues(fieldOne, valueOne);
  };
}());
