'use strict';
(function () {
  var lodgeTemplate = document.querySelector('#lodge-template');
  var dialogTitle = document.querySelector('.dialog__title');
  var closeButton = document.querySelector('.dialog__close');
  var oldDialogPanel = document.querySelector('.dialog__panel');
  var dialogPanelParent = oldDialogPanel.parentNode;
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
    lodgePrice.textContent = offerObj.offer.price + '₽/ночь';
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

  var changeDialogContent = function (inputObj) {
    var newDialogPanel = createNewDialogPanel(inputObj).querySelector('.dialog__panel');
    dialogTitle.querySelector('img').src = inputObj.author.avatar;
    dialogPanelParent.replaceChild(newDialogPanel, oldDialogPanel);
    oldDialogPanel = newDialogPanel;
  };

  var getOfferByID = function (pin) {
    var pinID = pin.dataset.searchIndex;
    return window.data[pinID];
  };

  var openDialog = function (pin, callback) {
    changeDialogContent(getOfferByID(pin));
    dialogPanelParent.classList.remove('hidden');
    document.addEventListener('keydown', onCloseDialogEscPress);
    callback(pin);
  };

  var closeDialog = function () {
    window.pin.deactivatePin();
    dialogPanelParent.classList.add('hidden');
    document.removeEventListener('keydown', onCloseDialogEscPress);
  };

  var onCloseDialogEscPress = function (evt) {
    if (window.utils.isEscPress(evt)) {
      closeDialog();
    }
  };

  var onClickCloseButton = function () {
    closeDialog();
  };

  document.addEventListener('keydown', onCloseDialogEscPress);
  closeButton.addEventListener('click', onClickCloseButton);

  window.card = {
    openDialog: openDialog,
    closeDialog: closeDialog
  };
}());
