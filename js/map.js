'use strict';

(function () {
  var map = document.querySelector('.map');

  var mainPin = document.querySelector('.map__pin--main');

  var onMainPinMouseDown = function (evt) {
    if (evt.button === 0) {
      map.classList.remove('map--faded');
      window.form.set();
      window.pin.render();
      window.form.show();
      window.form.activate();
      mainPin.removeEventListener('mousedown', onMainPinMouseDown);
    }
  };

  mainPin.addEventListener('mousedown', onMainPinMouseDown);

  var onMainPinKeyDown = function (evt) {
    if (evt.key === window.main.INTO) {
      map.classList.remove('map--faded');
      window.form.set();
      window.pin.render();
      window.form.show();
      mainPin.removeEventListener('keydown', onMainPinKeyDown);
    }
  };
  mainPin.addEventListener('keydown', onMainPinKeyDown);

  window.map = map;
})();
