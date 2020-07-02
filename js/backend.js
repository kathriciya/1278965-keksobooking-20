'use strict';

(function () {
  var URL_LOAD = 'https://javascript.pages.academy/keksobooking/data';
  var URL_UPLOAD = 'https://javascript.pages.academy/keksobooking';
  var TIMEOUT = 10000;

  var Code = {
    SUCCESS: 200
  };


  var requerst = function (onSuccess, onError, data) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.timeout = TIMEOUT;

    xhr.addEventListener('load', function () {
      if (xhr.status === Code.SUCCESS) {
        onSuccess(xhr.response);
      } else {
        onError('Cтатус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });

    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });


    if (data) {
      xhr.open('POST', URL_UPLOAD);
      xhr.send(data);
    } else {
      xhr.open('GET', URL_LOAD);
      xhr.send();
    }
  };

  window.backend = {
    load: requerst,
    save: requerst
  };

})();
