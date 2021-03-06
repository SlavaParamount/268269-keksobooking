'use strict';
(function () {
  var URL_GET = 'https://1510.dump.academy/keksobooking/data';
  var URL_POST = 'https://1510.dump.academy/keksobooking';

  var sendRequest = function (onLoad, onError, url, method, data) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.timeout = 2000;

    xhr.addEventListener('load', function () {
      var errorText;

      switch (xhr.status) {
        case 200:
          onLoad(xhr.response);
          break;
        case 400:
          errorText = 'Неверный запрос';
          break;
        case 401:
          errorText = 'Пользователь не авторизован';
          break;
        case 404:
          errorText = 'Ничего не найдено';
          break;
        default:
          errorText = 'Неизвестный статус: ' + xhr.status + ' ' + xhr.statusText;
      }

      if (errorText) {
        onError(errorText);
      }
    });

    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });

    xhr.open(method, url);
    xhr.send(data);
  };

  var showError = function (errorText) {
    var errorContainer = document.createElement('div');
    var errorMessage = document.createElement('span');
    errorContainer.classList.add('xhrError');
    errorContainer.appendChild(errorMessage);

    errorMessage.textContent = errorText;

    document.body.insertAdjacentElement('afterbegin', errorContainer);
  };

  var backendLoad = function (onLoad, onError) {
    sendRequest(onLoad, onError, URL_GET, 'GET');
  };

  var backendSave = function (onLoad, onError, data) {
    sendRequest(onLoad, onError, URL_POST, 'POST', data);
  };

  window.backend = {
    load: backendLoad,
    save: backendSave,
    showError: showError
  };
}());
