'use strict';
(function () {
  var POINTER_HEIGHT = 75;
  var POINTER_WIDTH = 56;
  var ads = window.data;
  var pointersFragment = document.createDocumentFragment();

  for (var i = 0; i < ads.length; i++) {
    var pointer = document.createElement('div');
    pointer.classList.add('pin');
    pointer.dataset.searchIndex = i;
    pointer.style.left = (Math.floor((ads[i].location.x) - 0.5 * POINTER_WIDTH)) + 'px';
    pointer.style.top = (ads[i].location.y - POINTER_HEIGHT) + 'px';
    var pointerImage = document.createElement('img');
    pointerImage.src = ads[i].author.avatar;
    pointer.tabIndex = '0';
    pointerImage.classList.add('rounded');
    pointerImage.style.height = '40px';
    pointerImage.style.width = '40px';
    pointer.appendChild(pointerImage);
    pointersFragment.appendChild(pointer);
  }

  window.allPointers = pointersFragment;
}());
