'use strict';

(function () {
  var PIN_LEFT = 570;
  var PIN_TOP = 375;
  var PIN_SIZE = 65;

  var roomPersons = {
    '1': ['1'],
    '2': ['1', '2'],
    '3': ['1', '2', '3'],
    '100': ['0']
  };

  var typeTranslate = {
    'palace': {
      ru: 'дворец', min: 10000
    },
    'flat': {
      ru: 'квартира', min: 1000
    },
    'house': {
      ru: 'дом', min: 5000
    },
    'bungalo': {
      ru: 'бунгало', min: 0
    }
  };

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

  // Комнаты и Гости

  var roomNumber = form.querySelector('#room_number');
  var capacity = form.querySelector('#capacity');

  var onRoomNumberChange = function () {
    if (capacity.options.length > 0) {
      [].forEach.call(capacity.options, function (item) {
        var persons = roomPersons[roomNumber.value];
        var isHidden = !(persons.indexOf(item.value) >= 0);

        item.selected = persons[0] === item.value;
        item.hidden = isHidden;
        item.disabled = isHidden;
      });
    }
  };
  onRoomNumberChange();

  roomNumber.addEventListener('change', onRoomNumberChange);

  // Время заезда

  var timeIn = document.querySelector('#timein');
  var timeOut = document.querySelector('#timeout');

  timeIn.addEventListener('change', function (evt) {
    timeOut.value = evt.target.value;
  });

  timeOut.addEventListener('change', function (evt) {
    timeIn.value = evt.target.value;
  });

  // Цены и жильё

  var price = document.querySelector('#price');
  var type = document.querySelector('#type');

  var onTypeChangeHandler = function (evt) {
    var minPrice = typeTranslate[evt.target.value].min;
    price.placeholder = minPrice;
    price.min = minPrice;
  };
  type.addEventListener('change', onTypeChangeHandler);

  window.form = {
    showForm: showForm(),
    setFormState: setFormState(),
    renderAddressActive: renderAddressActive(),
    typeTranslate: typeTranslate
  };
})();
