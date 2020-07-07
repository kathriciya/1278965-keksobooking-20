'use strict';

(function () {
  var PIN_WIDTH = 50;
  var PIN_HEIGHT = 70;

  var similarListElement = document.querySelector('.map__pins');
  var pinTemplate = document.querySelector('#pin')
    .content
    .querySelector('.map__pin');


  var removePins = function () {
    var pins = document.querySelectorAll('.map__pin:not(.map__pin--main)');

    pins.forEach(function (item) {
      item.remove();
    });
  };

  var renderPin = function (pin) {
    var pinElement = pinTemplate.cloneNode(true);
    var img = pinElement.querySelector('img');
    img.src = pin.author.avatar;
    img.alt = pin.offer.title;
    pinElement.style.left = pin.location.x - PIN_WIDTH / 2 + 'px';
    pinElement.style.top = pin.location.y - PIN_HEIGHT + 'px';

    // Событие на пине

    pinElement.addEventListener('click', function () {
      var activePin = window.map.city.querySelector('.map__pin--active');
      if (activePin !== null) {
        activePin.classList.remove('map__pin--active');
      } else {
        pinElement.classList.add('map__pin--active');
        window.card.remove();
        window.card.render(pin);
      }
    });

    return pinElement;
  };

  var renderPins = function (offers) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < offers.length; i++) {

      fragment.appendChild(renderPin(offers[i]));
    }
    similarListElement.appendChild(fragment);
  };

  window.pin = {
    render: renderPins,
    remove: removePins
  };
})();
