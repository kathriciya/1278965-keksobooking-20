'use strict';

(function () {
  var map = document.querySelector('.map');

  var mainPin = document.querySelector('.map__pin--main');

  var onMainPinMouseDown = function (evt) {
    if (evt.button === 0) {
      map.classList.remove('map--faded');
      window.form.setFormState();
      window.pin.renderPins();
      window.form.showForm();
      window.form.renderAddressActive();
      mainPin.removeEventListener('mousedown', onMainPinMouseDown);
    }
  };

  mainPin.addEventListener('mousedown', onMainPinMouseDown);

  var onMainPinKeyDown = function (evt) {
    if (evt.key === window.main.INTO) {
      map.classList.remove('map--faded');
      window.form.setFormState();
      window.pin.renderPins();
      window.form.showForm();
      mainPin.removeEventListener('keydown', onMainPinKeyDown);
    }
  };
  mainPin.addEventListener('keydown', onMainPinKeyDown);

  window.map = map;
})();
