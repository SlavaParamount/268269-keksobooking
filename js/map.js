'use strict';
var ads = [];
var NUMBER_OF_ADS = 8;
var HEADINGS = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
var TYPES = ['flat', 'house', 'bungalo'];
var IMG_INDEXES = [1, 2, 3, 4, 5, 6, 7, 8];
var CHECKINS = ['12:00', '13.00', '14.00'];
var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var pointsFragment = document.createDocumentFragment();
var POINTER_HEIGHT = 40;
var POINTER_WIDTH = 40;
var TokyoPinMap = document.querySelector('.tokyo__pin-map');
var lodgeTemplate = document.querySelector('#lodge-template');

var getValueFromRange = function (min, max) {
  return Math.floor(Math.random() * (max - min) + min);
};

var randomizeArray = function (arr) {
  var arrCopy = arr.slice();
  var arrLenght = arrCopy.length;
  var finalArray = [];
  for (k = 0; k < arr.length; k++) {
    var randomIndex = getValueFromRange(0, (arrLenght - k));
    finalArray[k] = arrCopy.splice(randomIndex, 1)[0];
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

for (var i = 0; i < NUMBER_OF_ADS; i++) {
  ads[i] = {
    'author': {
      'avatar': 'img/avatars/user0' + IMG_INDEXES_RAND[i] + '.png'
    },
    'offer': {
      'title': HEADINGS_RAND[i],
      'adress': '',
      'price': getValueFromRange(1000, 1000000),
      'type': TYPES[getValueFromRange(0, (TYPES.length))],
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

  ads[i].adress = ads[i].location.x + ', ' + ads[i].location.y;

  var point = '<div class="pin" style="left: ' + Math.floor((ads[i].location.x) - 0.5 * POINTER_WIDTH) +
    'px; top: ' + (ads[i].location.y - POINTER_HEIGHT) + 'px">\n' +
  '  <img src="' + ads[i].author.avatar + '" class="rounded" width="40" height="40">\n' +
  '</div>';
  var k = document.createElement('div');
  k.innerHTML = point;
  pointsFragment.appendChild(k.firstChild);
}

TokyoPinMap.appendChild(pointsFragment);

var offer = (lodgeTemplate).content.cloneNode(true);
offer.querySelector('.lodge__title').textContent = ads[0].offer.title;
offer.querySelector('.lodge__address').textContent = ads[0].offer.adress;
offer.querySelector('.lodge__price').textContent = ads[0].offer.price + '&#x20bd;/ночь';

switch (ads[0].offer.type) {
  case 'flat': offer.querySelector('.lodge__type').textContent = 'Квартира';
    break;
  case 'bungalo': offer.querySelector('.lodge__type').textContent = 'Бунгало';
    break;
  case 'house': offer.querySelector('.lodge__type').textContent = 'Дом';
    break;
}

for (i = 0; i < ads[0].offer.features.length; i++) {
  var featureElement = '<span class = "feature-image feature-image--' + ads[0].offer.features[i] + '"></span>';
  offer.querySelector('.lodge__features').insertAdjacentHTML('beforeend', featureElement);
}

offer.querySelector('.lodge__rooms-and-guests').textContent = 'Для ' + ads[0].offer.guests + ' гостей в ' + ads[0].offer.rooms + ' комнатах';
offer.querySelector('.lodge__checkin-time').textContent = 'Заезд после ' + ads[0].offer.checkin + ', выезд до ' + ads[0].offer.checkout;
offer.querySelector('.lodge__description').textContent = ads[0].offer.description;
offer.querySelector('img').src = ads[0].author.avatar;
var newDialogPanel = offer.querySelector('.dialog__panel');
var oldDialogPanel = document.querySelector('.dialog__panel');
var dialogParent = oldDialogPanel.parentNode;
dialogParent.replaceChild(newDialogPanel, oldDialogPanel);

