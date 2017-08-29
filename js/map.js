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
  pointer.dataset.searchIndex = i;
  pointer.style.left = (Math.floor((adObject.location.x) - 0.5 * POINTER_WIDTH)) + 'px';
  pointer.style.top = (adObject.location.y - POINTER_HEIGHT) + 'px';
  var pointerImage = document.createElement('img');
  pointerImage.src = adObject.author.avatar;
  pointer.tabIndex = '0';
  pointerImage.classList.add('rounded');
  pointerImage.style.height = '40px';
  pointerImage.style.width = '40px';
  pointer.appendChild(pointerImage);
  return pointer;
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
// Блок работы с пинами
var changeDialogContent = function (inputObj) {
  var newDialogPanel = createNewDialogPanel(inputObj).querySelector('.dialog__panel');
  dialogTitle.querySelector('img').src = inputObj.author.avatar;
  dialogPanelParent.replaceChild(newDialogPanel, oldDialogPanel);
  oldDialogPanel = newDialogPanel;
};

var RANDOM_ID = 2;
changeDialogContent(ads[RANDOM_ID]);

var getOfferByID = function (pin) {
  var pinID = pin.dataset.searchIndex;
  return ads[pinID];
};

var deactivatePin = function () {
  if (activePin) {
    activePin.classList.remove(PIN_ACTIVE_CLASS);
  }
};

var activateCurrentPin = function (pin) {
  deactivatePin();
  activePin = pin;
  activePin.classList.add(PIN_ACTIVE_CLASS);
};

var getRandomPin = function (id) {
  var pin = tokyoPinMap.querySelector('.pin[data-search-index="' + id + '"]');
  return pin;
};

activateCurrentPin(getRandomPin(RANDOM_ID));

var openDialog = function (pin) {
  changeDialogContent(getOfferByID(pin));
  dialogPanelParent.classList.remove('hidden');
  document.addEventListener('keydown', onCloseDialogEscPress);
};

var closeDialog = function () {
  deactivatePin();
  dialogPanelParent.classList.add('hidden');
  document.removeEventListener('keydown', onCloseDialogEscPress);
};

var onOpenDialogClick = function (evt) {
  var currentPin = evt.target.closest('.pin:not(.pin__main)');
  if (currentPin) {
    activateCurrentPin(currentPin);
    openDialog(currentPin);
  }
};

var onOpenDialogEnterPress = function (evt) {
  var currentPin = evt.target.closest('.pin:not(.pin__main)');
  if (evt.keyCode === ENTER_CODE && currentPin) {
    activateCurrentPin(currentPin);
    openDialog(activePin);
  }
};

var onClickCloseButton = function () {
  closeDialog();
};

var onCloseDialogEscPress = function (evt) {
  if (evt.keyCode === ESC_CODE && activePin) {
    closeDialog();
  }
};

closeButton.addEventListener('click', onClickCloseButton);
document.addEventListener('keydown', onCloseDialogEscPress);
tokyoPinMap.addEventListener('keydown', onOpenDialogEnterPress);
tokyoPinMap.addEventListener('click', onOpenDialogClick);

// Блок валидации формы

var offerFormHeader = document.getElementById('title');
var checkinInput = document.querySelector('#timein');
var checkoutInput = document.querySelector('#timeout');
var houseType = document.querySelector('#type');
var housePrice = document.querySelector('#price');
var roomNumber = document.querySelector('#room_number');
var capacity = document.querySelector('#capacity');
var formButton = document.querySelector('.form__submit');
var sendOfferForm = document.querySelector('.notice__form');
var allInput = sendOfferForm.querySelectorAll('input');
var HEADER_MIN_LENGTH = 30;
var HEADER_MAX_LENGTH = 100;
var GUESTS_AMOUNT = {
  ONE_ROOM: ['1'],
  TWO_ROOMS: ['1', '2'],
  THREE_ROOMS: ['1', '2', '3'],
  HUNDRED_ROOMS: ['0']
};

var defineAvailableGuestAmount = function (inputArray) {
  var numbersOfGuests = GUESTS_AMOUNT[inputArray];
  var maxGuest = 0;
  for (i = 0; i < capacity.options.length; i++) {
    var option = capacity[i];
    if (inputArray.indexOf(option.value) === -1) {
      option.disabled = true;
    } else {
      option.disabled = false;
      maxGuest = option.value > maxGuest ? option.value : maxGuest;
    }
  }
  capacity.value = maxGuest;
};

var checkHeaderString = function (evt) {
  var target = evt.target;
  if (target.value.length < HEADER_MIN_LENGTH || target.value.length > HEADER_MAX_LENGTH) {
    target.setCustomValidity('Минимальная длина строки - 30, максимальная - 100');
  } else {
    target.setCustomValidity('');
  }
};

var setMinPrice = function (evt) {
  var target = evt.target;
  switch (target.value) {
    case 'bungalo':
      housePrice.min = 0;
      housePrice.value = 0;
      break;
    case 'flat':
      housePrice.min = 1000;
      housePrice.value = 1000;
      break;
    case 'house':
      housePrice.min = 5000;
      housePrice.value = 5000;
      break;
    case 'palace':
      housePrice.min = 10000;
      housePrice.value = 10000;
      break;
  }
};

var synchCheckout = function (evt) {
  checkoutInput.value = evt.target.value;
};

var synchCheckin = function (evt) {
  checkinInput.value = evt.target.value;
};

var setGuestAmount = function (evt) {
  switch (evt.target.value) {
    case '1':
      defineAvailableGuestAmount(GUESTS_AMOUNT.ONE_ROOM);
      break;
    case '2':
      defineAvailableGuestAmount(GUESTS_AMOUNT.TWO_ROOMS);
      break;
    case '3':
      defineAvailableGuestAmount(GUESTS_AMOUNT.THREE_ROOMS);
      break;
    case '100':
      defineAvailableGuestAmount(GUESTS_AMOUNT.HUNDRED_ROOMS);
      break;
  }
};

var checkValid = function (evt) {
  for (i = 0; i < allInput.length; i++) {
    if (!allInput[i].validity.valid) {
      allInput[i].style.outline = '2px solid red';
      evt.preventDefault();
    } else if (allInput[i].style.outline && allInput[i].validity.valid) {
      allInput[i].style.outline = '';
    }
  }
};

offerFormHeader.addEventListener('change', checkHeaderString);
checkinInput.addEventListener('change', synchCheckout);
checkoutInput.addEventListener('change', synchCheckin);
houseType.addEventListener('change', setMinPrice);
roomNumber.addEventListener('change', setGuestAmount);
formButton.addEventListener('click', checkValid);

