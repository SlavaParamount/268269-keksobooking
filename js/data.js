'use strict';
(function getAdObject() {
  var HEADINGS = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
  var TYPES = ['flat', 'house', 'bungalo'];
  var IMG_INDEXES = [1, 2, 3, 4, 5, 6, 7, 8];
  var CHECKINS = ['12:00', '13.00', '14.00'];
  var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];


  var getValueFromRange = function (min, max) {
    return Math.floor(Math.random() * (max - min) + min);
  };

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

  var generateFeatures = function () {
    var FEATURES_RAND = randomizeArray(FEATURES);
    var featuresNumber = getValueFromRange(1, FEATURES_RAND.length);
    var featuresArray = FEATURES_RAND.splice(0, featuresNumber);
    return featuresArray;
  };

  var HEADINGS_RAND = randomizeArray(HEADINGS);
  var IMG_INDEXES_RAND = randomizeArray(IMG_INDEXES);

  window.defineAdObject = function (j) {
    var adObject = {
      'author': {
        'avatar': 'img/avatars/user0' + IMG_INDEXES_RAND[j] + '.png'
      },
      'offer': {
        'title': HEADINGS_RAND[j],
        'price': getValueFromRange(1000, 1000000),
        'type': TYPES[getValueFromRange(0, TYPES.length)],
        'rooms': getValueFromRange(1, 5),
        'guests': getValueFromRange(1, 10),
        'checkin': CHECKINS[getValueFromRange(0, CHECKINS.length)],
        'checkout': CHECKINS[getValueFromRange(0, CHECKINS.length)],
        'features': generateFeatures(),
        'description': '',
        'photos': [],
      },
      'location': {
        'x': getValueFromRange(400, 900),
        'y': getValueFromRange(100, 500),
      }
    };
    adObject.offer.adress = adObject.location.x + ', ' + adObject.location.y;
    return adObject;
  };
}());
