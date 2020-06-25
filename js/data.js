'use strict';

(function () {
  var COUNT = 8;

  var adverts = [];

  var getRandomInt = function (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

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

  var types = ['palace', 'flat', 'house', 'bungalo'];

  var times = ['12:00', '13:00', '14:00'];

  var features = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];

  var urlPhotos = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];

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
          'photos': shuffleArray(urlPhotos).slice(0, getRandomInt(0, urlPhotos.length))
        },
        'location': {
          'x': getRandomInt(0, 1200),
          'y': getRandomInt(130, 630)
        }
      });
    }
    return adverts;
  };

  window.data = {
    adverts: addAdverts()
  };
})();
