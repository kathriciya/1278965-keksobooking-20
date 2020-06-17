'use strict';

var COUNT = 8;
var INTO = 'Enter';
var PIN_WIDTH = 50;
var PIN_HEIGHT = 70;
var PIN_LEFT = 570;
var PIN_TOP = 375;
var PIN_SIZE = 65;

var adverts = [];

var getRandomInt = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

var types = ['palace', 'flat', 'house', 'bungalo'];

var times = ['12:00', '13:00', '14:00'];

var features = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];

var urlPhotos = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];

var typeTranslate = {'palace': {ru: 'дворец', min: 0}, 'flat': {ru: 'квартира'}, 'house': {ru: 'дом'}, 'bungalo': {ru: 'бунгало'}};

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
// map.classList.remove('map--faded');

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


// Ветка3-задача3

// var cardTemplate = document.querySelector('#card')
//     .content
//     .querySelector('.map__card');

// var renderCard = function (card) {
//   var cardElement = cardTemplate.cloneNode(true);

//   var popupTitle = cardElement.querySelector('.popup__title');
//   popupTitle.textContent = card.offer.title;

//   var popupTextAddress = cardElement.querySelector('.popup__text--address');
//   popupTextAddress.textContent = card.offer.address;

//   var popupTextPrice = cardElement.querySelector('.popup__text--price');
//   popupTextPrice.textContent = card.offer.price + '₽/ночь';

//   var popupType = cardElement.querySelector('.popup__type');
//   popupType.textContent = typeTranslate[card.offer.type].ru;

//   var popupTextCapacity = cardElement.querySelector('.popup__text--capacity');
//   popupTextCapacity.textContent = card.offer.rooms + 'комнаты для' + card.offer.guests + 'гостей';

//   var popupTextTime = cardElement.querySelector('.popup__text--time');
//   popupTextTime.textContent = 'заезд после' + card.offer.checkin + 'выезд до' + card.offer.checkout;

//   var popupFeatures = cardElement.querySelector('.popup__features');
//   var featureNodes = popupFeatures.querySelectorAll('.popup__feature');
//   for (var i = 0; i < featureNodes.length; i++) {
//     if (card.offer.features.indexOf(featureNodes[i].classList[1].replace('popup__feature--', '')) >= 0) {
//       featureNodes[i].remove();
//     }
//   }

//   var popupDescription = cardElement.querySelector('.popup__description');
//   popupDescription.textContent = card.offer.description;

//   var popupPhotos = cardElement.querySelector('.popup__photos');
//   var photo = popupPhotos.querySelector('img');
//   if (card.offer.photos.length > 0) {
//     photo.src = card.offer.photos[0];
//     for (i = 1; i < card.offer.photos.length; i++) {
//       var photoElement = photo.cloneNode(true);
//       photoElement.src = card.offer.photos[i];
//       popupPhotos.appendChild(photoElement);
//     }
//   } else {
//     photo.remove();
//   }
//   popupPhotos.src = card.offer.photos.length;

//   var popupAvatar = cardElement.querySelector('.popup__avatar');
//   popupAvatar.src = card.author.avatar;

//   return cardElement;
// };

// var mapFilters = map.querySelector('.map__filters-container');
// map.insertBefore(renderCard(adverts[0]), mapFilters);

var form = document.querySelector('.ad-form');

var showForm = function () {
  form.classList.remove('ad-form--disabled');
};

var address = document.querySelector('input[name=address]');

var renderAddressNoActive = function () {
  address.value = Math.floor(PIN_LEFT + (PIN_SIZE / 2)) + ',' + Math.floor(PIN_TOP + (PIN_SIZE / 2));
};
renderAddressNoActive();

var renderAddressActive = function () {
  address.value = Math.floor(PIN_LEFT + (PIN_SIZE / 2)) + ',' + (PIN_TOP + PIN_SIZE);
};

var formFields = document.querySelectorAll('fieldset, .map__filter');

var setFormState = function () {
  for (var i = 0; i < formFields.length; i++) {
    formFields[i].disabled = !formFields[i].disabled;
  }
};
setFormState();

var mainPin = document.querySelector('.map__pin--main');

var onMainPinMouseDown = function (evt) {
  if (evt.button === 0) {
    map.classList.remove('map--faded');
    setFormState();
    renderPins();
    showForm();
    renderAddressActive();
    mainPin.removeEventListener('mousedown', onMainPinMouseDown);
  }
};

mainPin.addEventListener('mousedown', onMainPinMouseDown);

var onMainPinKeyDown = function (evt) {
  if (evt.key === INTO) {
    map.classList.remove('map--faded');
    setFormState();
    renderPins();
    showForm();
    mainPin.removeEventListener('keydown', onMainPinKeyDown);
  }
};

mainPin.addEventListener('keydown', onMainPinKeyDown);
