'use strict';

(function () {
  var mapFilters = document.querySelector('.map__filters-container');

  var removeCard = function () {
    var popup = window.map.city.querySelector('.popup');

    if (popup !== null) {
      popup.remove();
    }

    document.removeEventListener('keydown', onCardEscClick);
  };

  var cardTemplate = document.querySelector('#card')
    .content
    .querySelector('.map__card');

  var onCardCloseClick = function () {
    removeCard();
  };

  var onCardEscClick = function (evt) {
    if (evt.key === window.main.OUT) {
      evt.preventDefault();
      removeCard();
    }
  };

  var renderCard = function (card) {
    var cardElement = cardTemplate.cloneNode(true);

    var popupTitle = cardElement.querySelector('.popup__title');
    if (card.offer.title) {
      popupTitle.textContent;
    } else {
      popupTitle.remove();
    }

    var popupTextAddress = cardElement.querySelector('.popup__text--address');
    if (card.offer.address) {
      popupTextAddress.textContent;
    } else {
       popupTextAddress.remove();
    }

    var popupTextPrice = cardElement.querySelector('.popup__text--price');
    if (card.offer.price + '₽/ночь') {
      popupTextPrice.textContent;
    } else {
      popupTextPrice.remove();
    }

    var popupType = cardElement.querySelector('.popup__type');
    if (window.form.housinTypes[card.offer.type].ru) {
      popupType.textContent;
    } else {
       popupType.remove();
    }

    var popupTextCapacity = cardElement.querySelector('.popup__text--capacity');
    if (card.offer.rooms + 'комнаты для' + card.offer.guests + 'гостей') {
      popupTextCapacity.textContent;
    } else {
       popupTextCapacity.remove();
    }

    var popupTextTime = cardElement.querySelector('.popup__text--time');
    if ('заезд после' + card.offer.checkin + 'выезд до' + card.offer.checkout) {
      popupTextTime.textContent;
    } else {
      popupTextTime.remove();
    }

    var popupFeatures = cardElement.querySelector('.popup__features');
    var featureNodes = popupFeatures.querySelectorAll('.popup__feature');
    for (var i = 0; i < featureNodes.length; i++) {
      if (card.offer.features.indexOf(featureNodes[i].classList[1].replace('popup__feature--', '')) < 0) {
        featureNodes[i].remove();
      }
    }

    var popupDescription = cardElement.querySelector('.popup__description');
    if (card.offer.description) {
      popupDescription.textContent;
    } else {
      popupDescription.remove();
    }

    var popupPhotos = cardElement.querySelector('.popup__photos');
    var photo = popupPhotos.querySelector('img');
    if (card.offer.photos.length > 0) {
      photo.src = card.offer.photos[0];
      for (i = 1; i < card.offer.photos.length; i++) {
        var photoElement = photo.cloneNode(true);
        photoElement.src = card.offer.photos[i];
        popupPhotos.appendChild(photoElement);
      }
    } else {
      photo.remove();
    }
    popupPhotos.src = card.offer.photos.length;

    var popupAvatar = cardElement.querySelector('.popup__avatar');
    popupAvatar.src = card.author.avatar;

    var popupClose = cardElement.querySelector('.popup__close');

    popupClose.addEventListener('click', onCardCloseClick);

    document.addEventListener('keydown', onCardEscClick);

    window.map.city.insertBefore(cardElement, mapFilters);
  };

  window.card = {
    render: renderCard,
    remove: removeCard,
    mapFilters: mapFilters
  };
})();
