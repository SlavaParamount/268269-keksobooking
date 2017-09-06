'use strict';
window.synchronizeFields = function (fieldOne, fieldTwo, valuesOne, valuesTwo, synchValues) {
  var valueOne = fieldOne.value;
  var valueTwo;
  valueTwo = valuesTwo[valuesOne.indexOf(valueOne)];
  synchValues(fieldTwo, valueTwo);
};
