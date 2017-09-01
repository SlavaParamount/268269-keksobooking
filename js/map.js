'use strict';
var ads = [];
var pointsFragment = document.createDocumentFragment();
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




ads = window.data;
console.log(ads);

tokyoPinMap.appendChild(window.allPointers);

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

  for (var i = 0; i < offerObj.offer.features.length; i++) {
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
