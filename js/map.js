'use strict';

(function () {
  var MAX_COUNT = 5;
  var map = document.querySelector('.map');
  var offers = [];


  var mainPin = document.querySelector('.map__pin--main');

  var activate = function () {
    map.classList.remove('map--faded');
    window.form.set();
    window.form.show();
    window.form.activate();
    mainPin.removeEventListener('mousedown', onMainPinMouseDown);
  };

  var onSuccess = function (data) {
    offers = data.slice();
    window.pin.render(offers.slice(0, MAX_COUNT));
    activate();
  };

  var onError = function () {};

  var onMainPinMouseDown = function (evt) {
    if (evt.button === 0) {
      window.backend.load(onSuccess, onError);
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

  window.map = {
    field: map,
    main: mainPin,
    onMainPinMouseDown: onMainPinMouseDown
  };
})();
