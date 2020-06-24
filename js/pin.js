'use strict';

(function () {
  var PIN_WIDTH = 50;
  var PIN_HEIGHT = 70;

  var similarListElement = document.querySelector('.map__pins');
  var pinTemplate = document.querySelector('#pin')
    .content
    .querySelector('.map__pin');

  var renderPin = function (pin) {
    var pinElement = pinTemplate.cloneNode(true);
    var img = pinElement.querySelector('img');
    img.src = pin.author.avatar;
    img.alt = pin.offer.title;
    pinElement.style.left = pin.location.x - PIN_WIDTH / 2 + 'px';
    pinElement.style.top = pin.location.y - PIN_HEIGHT + 'px';

    // Событие на пине

    pinElement.addEventListener('click', function () {
      window.card.removeCard();
      window.card.renderCard(pin);
    });

    return pinElement;
  };

  var renderPins = function () {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < window.data.adverts.length; i++) {

      fragment.appendChild(renderPin(window.data.adverts[i]));
    }
    similarListElement.appendChild(fragment);
  };

  window.pin = {
    renderPin: renderPin(),
    renderPins: renderPins()
  };
})();
