'use strict';

(function () {
  var MAX_COUNT = 5;

  var map = document.querySelector('.map');
  var pin = document.querySelector('.map__pin--main');
  var form = document.querySelector('.ad-form');

  var offers = [];


  var Pin = {
    LEFT: pin.offsetLeft,
    TOP: pin.offsetTop
  };

  var setDefeultPositon = function () {
    pin.style.top = Pin.TOP + 'px';
    pin.style.left = Pin.LEFT + 'px';
  };

  var toggleClassForm = function () {
    form.classList.toggle('ad-form--disabled');
  };

  var activate = function () {
    map.classList.remove('map--faded');
    window.form.setState();
    toggleClassForm();
    window.form.setAddress();
    pin.removeEventListener('mousedown', onPinMouseDown);
  };

  var deactivate = function () {
    map.classList.add('map--faded');
    window.form.setState();
    toggleClassForm();
    setDefeultPositon();
    window.form.setAddress();
    pin.addEventListener('mousedown', onPinMouseDown);
    pin.addEventListener('keydown', onPinKeyDown);
  };

  var onSuccess = function (data) {
    offers = data.slice();
    window.pin.render(offers.slice(0, MAX_COUNT));
    activate();
  };

  var onError = function () {};

  var onPinMouseDown = function (evt) {
    if (evt.button === 0) {
      window.backend.load(onSuccess, onError);
    }
  };

  pin.addEventListener('mousedown', onPinMouseDown);

  var onPinKeyDown = function (evt) {
    if (evt.key === window.main.INTO) {
      window.backend.load(onSuccess, onError);
      pin.removeEventListener('keydown', onPinKeyDown);
    }
  };
  pin.addEventListener('keydown', onPinKeyDown);

  window.map = {
    city: map,
    form: form,
    pin: pin,
    onPinMouseDown: onPinMouseDown,
    deactivate: deactivate
  };
})();
