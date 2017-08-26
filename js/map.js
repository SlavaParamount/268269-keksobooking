'use strict';
var ads = [];
var NUMBER_OF_ADS = 8;
var HEADINGS = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
var TYPES = ['flat', 'house', 'bungalo'];
var IMG_INDEXES = [1, 2, 3, 4, 5, 6, 7, 8];
var CHECKINS = ['12:00', '13.00', '14.00'];
var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var pointsFragment = document.createDocumentFragment();
var POINTER_HEIGHT = 75;
var POINTER_WIDTH = 56;
var tokyoPinMap = document.querySelector('.tokyo__pin-map');
var lodgeTemplate = document.querySelector('#lodge-template');
var PIN_ACTIVE_CLASS = 'pin--active';
var dialogTitle = document.querySelector('.dialog__title');
var activePin;
var closeButton = document.querySelector('.dialog__close');
var oldDialogPanel = document.querySelector('.dialog__panel');
var dialogPanelParent = oldDialogPanel.parentNode;
var ESC_CODE = 27;
var ENTER_CODE = 13;

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

var defineAdObject = function () {
  var adObject = {
    'author': {
      'avatar': 'img/avatars/user0' + IMG_INDEXES_RAND[i] + '.png'
    },
    'offer': {
      'title': HEADINGS_RAND[i],
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

var generatePointer = function (adObject) {
  var pointer = document.createElement('div');
  pointer.classList.add('pin');
  pointer.id = i;
  pointer.style.left = (Math.floor((adObject.location.x) - 0.5 * POINTER_WIDTH)) + 'px';
  pointer.style.top = (adObject.location.y - POINTER_HEIGHT) + 'px';
  var pointerImage = document.createElement('img');
  pointerImage.src = adObject.author.avatar;
  pointerImage.tabIndex = '0';
  pointerImage.classList.add('rounded');
  pointerImage.style.height = '40px';
  pointerImage.style.width = '40px';
  pointer.appendChild(pointerImage);
  return pointer;
};

var checkEnterPress = function (evt) {
  return evt.keyCode === ENTER_CODE && document.activeElement.parentNode.classList.contains('pin');
};

var onEnterPressActivatePin = function (evt) {
  if (checkEnterPress(evt)) {
    if (activePin) {
      activePin.classList.remove(PIN_ACTIVE_CLASS);
    }
    activePin = document.activeElement.parentNode;
    activePin.classList.add(PIN_ACTIVE_CLASS);
    changeDialogContent(getOfferByID(activePin));
    oldDialogPanel.parentNode.classList.remove('hidden');
  }
};

for (var i = 0; i < NUMBER_OF_ADS; i++) {
  ads[i] = defineAdObject();
  pointsFragment.appendChild(generatePointer(ads[i]));
}

tokyoPinMap.appendChild(pointsFragment);

var createFeatureElement = function (feature) {
  var newFeatureElement = document.createElement('span');
  newFeatureElement.classList.add('feature__image');
  newFeatureElement.classList.add('feature__image--' + feature);
  return newFeatureElement;
};

var createNewDialogPanel = function (offerObj) {
  var offer = lodgeTemplate.content.cloneNode(true);
  var lodgeTitle = offer.querySelector('.lodge__title');
  var lodgeAddress = offer.querySelector('.lodge__address');
  var lodgePrice = offer.querySelector('.lodge__price');
  var lodgeType = offer.querySelector('.lodge__type');
  var lodgeRoomGuests = offer.querySelector('.lodge__rooms-and-guests');
  var lodgeCheckinTime = offer.querySelector('.lodge__checkin-time');
  var lodgeDescription = offer.querySelector('.lodge__description');
  var lodgeFeatures = offer.querySelector('.lodge__features');
  lodgePrice.textContent = offerObj.offer.price + '&#x20bd;/ночь';
  lodgeTitle.textContent = offerObj.offer.title;
  lodgeAddress.textContent = offerObj.offer.adress;
  lodgeRoomGuests.textContent = 'Для ' + offerObj.offer.guests + ' гостей в ' + offerObj.offer.rooms + ' комнатах';
  lodgeCheckinTime.textContent = 'Заезд после ' + offerObj.offer.checkin + ', выезд до ' + offerObj.offer.checkout;
  lodgeDescription.textContent = offerObj.offer.description;

  switch (offerObj.offer.type) {
    case 'flat': lodgeType.textContent = 'Квартира';
      break;
    case 'bungalo': lodgeType.textContent = 'Бунгало';
      break;
    case 'house': lodgeType.textContent = 'Дом';
      break;
  }

  for (i = 0; i < offerObj.offer.features.length; i++) {
    lodgeFeatures.appendChild(createFeatureElement(offerObj.offer.features[i]));
  }
  return offer;

};

var changeDialogContent = function (inputObj) {
  var newDialogPanel = createNewDialogPanel(inputObj).querySelector('.dialog__panel');
  dialogTitle.querySelector('img').src = inputObj.author.avatar;
  dialogPanelParent.replaceChild(newDialogPanel, oldDialogPanel);
  oldDialogPanel = newDialogPanel;
};

changeDialogContent(ads[0]);

var getOfferByID = function (clickedPin) {
  var pinID = clickedPin.id;
  return ads[pinID];
};

tokyoPinMap.addEventListener('click', function (evt) {
  var clickedPin = evt.target.closest('.pin:not(.pin__main)');
  if (activePin) {
    activePin.classList.remove(PIN_ACTIVE_CLASS);
  }
  if (clickedPin) {
    activePin = clickedPin;
    activePin.classList.add(PIN_ACTIVE_CLASS);
    changeDialogContent(getOfferByID(clickedPin));
    oldDialogPanel.parentNode.classList.remove('hidden');
  }
});

var onClickCloseButton = function () {
  oldDialogPanel.parentNode.classList.add('hidden');
  if (activePin) {
    activePin.classList.remove(PIN_ACTIVE_CLASS);
  }
};

closeButton.addEventListener('click', onClickCloseButton);

var onCloseDialogEscPress = function (evt) {
  if (evt.keyCode === ESC_CODE && (activePin)) {
    oldDialogPanel.parentNode.classList.add('hidden');
    activePin.classList.remove(PIN_ACTIVE_CLASS);
  }
};

var onCloseButtonEnterPress = function (evt) {
  if (evt.keyCode === ENTER_CODE && document.activeElement === closeButton) {
    oldDialogPanel.parentNode.classList.add('hidden');
    if (activePin) {
      activePin.classList.remove(PIN_ACTIVE_CLASS);
    }
  }
};

document.addEventListener('keydown', onCloseDialogEscPress);
document.addEventListener('keydown', onEnterPressActivatePin);
document.addEventListener('keydown', onCloseButtonEnterPress);
