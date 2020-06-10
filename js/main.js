'use strict';

var COUNT = 8;
var PIN_WIDTH = 50;
var PIN_HEIGHT = 70;

var adverts = [];

var getRandomInt = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

var types = ['palace', 'flat', 'house', 'bungalo'];

var times = ['12:00', '13:00', '14:00'];

var features = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];

var urlPhotos = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];

var shuffleArray = function (a) {
  var j;
  var x;
  var i;
  for (i = a.length - 1; i > 0; i--) {
    j = Math.floor(Math.random() * (i + 1));
    x = a[i];
    a[i] = a[j];
    a[j] = x;
  }
  return a;
};

var map = document.querySelector('.map');
map.classList.remove('map--faded');

var addAdverts = function () {
  for (var i = 0; i < COUNT; i++) {
    adverts.push({
      'author': {
        'avatar': 'img/avatars/user0' + (i + 1) + '.png'
      },
      'offer': {
        'title': 'Хата',
        'address': getRandomInt(1, 600) + ', ' + getRandomInt(1, 350),
        'price': getRandomInt(1, 10000),
        'type': types[getRandomInt(0, types.length - 1)],
        'rooms': getRandomInt(1, 5),
        'guests': getRandomInt(1, 10),
        'checkin': times[getRandomInt(0, times.length - 1)],
        'checkout': times[getRandomInt(0, times.length - 1)],
        'features': shuffleArray(features).slice(0, getRandomInt(0, features.length)),
        'description': 'Описание',
        'photos': urlPhotos[getRandomInt(0, urlPhotos.length - 1)]
      },
      'location': {
        'x': getRandomInt(0, 1200),
        'y': getRandomInt(130, 630)
      }
    });
  }
};
addAdverts();

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

  return pinElement;
};

var renderPins = function () {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < adverts.length; i++) {

    fragment.appendChild(renderPin(adverts[i]));
  }
  similarListElement.appendChild(fragment);
};
renderPins();
