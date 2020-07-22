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
      popupTitle.textContent = card.offer.title;
    } else {
      popupTitle.remove();
    }

    var popupTextAddress = cardElement.querySelector('.popup__text--address');
    if (card.offer.address) {
      popupTextAddress.textContent = card.offer.address;
    } else {
      popupTextAddress.remove();
    }

    var popupTextPrice = cardElement.querySelector('.popup__text--price');
    if (card.offer.price) {
      popupTextPrice.textContent = card.offer.price + '₽/ночь';
    } else {
      popupTextPrice.remove();
    }

    var popupType = cardElement.querySelector('.popup__type');
    if (card.offer.type) {
      popupType.textContent = window.form.housingTypes[card.offer.type].ru;
    } else {
      popupType.remove();
    }

    var popupTextCapacity = cardElement.querySelector('.popup__text--capacity');
    if (card.offer.rooms && card.offer.guests) {
      popupTextCapacity.textContent = card.offer.rooms + 'комнаты для' + card.offer.guests + 'гостей';
    } else {
      popupTextCapacity.remove();
    }

    var popupTextTime = cardElement.querySelector('.popup__text--time');
    if (card.offer.checkin && card.offer.checkout) {
      popupTextTime.textContent = 'заезд после' + card.offer.checkin + 'выезд до' + card.offer.checkout;
    } else {
      popupTextTime.remove();
    }

    var popupFeatures = cardElement.querySelector('.popup__features');
    var featureNodes = popupFeatures.querySelectorAll('.popup__feature');
    featureNodes.forEach(function (item) {
      if (card.offer.features.indexOf(item.classList[1].replace('popup__feature--', '')) < 0) {
        item.remove();
      }
    });

    var popupDescription = cardElement.querySelector('.popup__description');
    if (card.offer.description) {
      popupDescription.textContent = card.offer.description;
    } else {
      popupDescription.remove();
    }

    var popupPhotos = cardElement.querySelector('.popup__photos');
    var photo = popupPhotos.querySelector('img');
    if (card.offer.photos.length > 0) {
      photo.src = card.offer.photos[0];
      for (var i = 1; i < card.offer.photos.length; i++) {
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
