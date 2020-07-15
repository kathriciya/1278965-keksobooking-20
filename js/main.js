'use strict';

(function () {
  var OUT = 'Escape';
  var INTO = 'Enter';

  var main = document.querySelector('main');

  var successTemplate = document.querySelector('#success')
    .content
    .querySelector('.success');

  var errorTemplate = document.querySelector('#error')
    .content
    .querySelector('.error');

  var hideSuccessMessage = function () {
    var success = document.querySelector('.success');
    if (success !== null) {
      success.remove();
      document.removeEventListener('keydown', onSuccessMessageEscKeyDown);
      document.removeEventListener('click', onSuccessMessageClick);
    }
  };

  var showSuccessMessage = function () {
    var successMessage = successTemplate.cloneNode(true);
    main.appendChild(successMessage);

    document.addEventListener('keydown', onSuccessMessageEscKeyDown);
    document.addEventListener('click', onSuccessMessageClick);
  };

  var hideErrorMessage = function () {
    var error = document.querySelector('.error');
    if (error !== null) {
      error.remove();
      document.removeEventListener('keydown', onErrorMessageEscKeyDown);
      document.removeEventListener('click', onErrorMessageClick);
    }
  };

  var showErrorMessage = function () {
    var errorMessage = errorTemplate.cloneNode(true);
    main.appendChild(errorMessage);

    var errorButton = errorMessage.querySelector('.error__button');

    document.addEventListener('keydown', onErrorMessageEscKeyDown);
    document.addEventListener('click', onErrorMessageClick);
    errorButton.addEventListener('click', onErrorButtonClick);
  };

  var onSuccessMessageEscKeyDown = function (evt) {
    if (evt.key === OUT) {
      hideSuccessMessage();
    }
  };

  var onSuccessMessageClick = function (evt) {
    if (evt.button === 0) {
      hideSuccessMessage();
    }

  };

  var onErrorMessageEscKeyDown = function (evt) {
    if (evt.key === OUT) {
      hideErrorMessage();
    }
  };

  var onErrorMessageClick = function (evt) {
    if (evt.button === 0) {
      hideErrorMessage();
    }
  };

  var onErrorButtonClick = function (evt) {
    if (evt.button === 0) {
      hideErrorMessage();
    }
  };

  window.main = {
    OUT: OUT,
    INTO: INTO,
    showSuccessMessage: showSuccessMessage,
    showErrorMessage: showErrorMessage
  };
})();
