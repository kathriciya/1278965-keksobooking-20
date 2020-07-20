'use strict';

(function () {
  var PIN_WIDTH = 65;

  var map = window.map.city;
  var form = window.map.form;
  var pin = window.map.pin;

  var address = document.querySelector('input[name=address]');
  var formFilters = map.querySelector('.map__filters');
  var formFields = document.querySelectorAll('fieldset, .map__filter');
  var numberRooms = form.querySelector('#room_number');
  var capacity = form.querySelector('#capacity');
  var timeIn = form.querySelector('#timein');
  var timeOut = form.querySelector('#timeout');
  var price = form.querySelector('#price');
  var type = form.querySelector('#type');
  var resetButtonForm = form.querySelector('.ad-form__reset');

  var roomPersons = {
    '1': ['1'],
    '2': ['1', '2'],
    '3': ['1', '2', '3'],
    '100': ['0']
  };

  var housingTypes = {
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

  var setAddress = function () {
    if (map.classList.contains('map--faded')) {
      address.value = Math.floor(pin.offsetLeft + (PIN_WIDTH / 2)) + ',' + Math.floor(pin.offsetTop + (PIN_WIDTH / 2));
    } else {
      address.value = Math.floor(pin.offsetLeft + (PIN_WIDTH / 2)) + ',' + Math.floor(pin.offsetTop + PIN_WIDTH);
    }
  };
  setAddress();

  var setFormState = function () {
    formFields.forEach(function (item) {
      item.disabled = !item.disabled;
    });
  };
  setFormState();

  var onNumberRoomsChange = function () {
    if (capacity.options.length > 0) {
      [].forEach.call(capacity.options, function (item) {
        var persons = roomPersons[numberRooms.value];
        var isHidden = !(persons.indexOf(item.value) >= 0);

        item.selected = persons[0] === item.value;
        item.hidden = isHidden;
        item.disabled = isHidden;
      });
    }
  };
  onNumberRoomsChange();

  numberRooms.addEventListener('change', onNumberRoomsChange);

  timeIn.addEventListener('change', function (evt) {
    timeOut.value = evt.target.value;
  });

  timeOut.addEventListener('change', function (evt) {
    timeIn.value = evt.target.value;
  });

  var onTypeChangePrice = function (evt) {
    var minPrice = housingTypes[evt.target.value].min;
    price.placeholder = minPrice;
    price.min = minPrice;
  };
  type.addEventListener('change', onTypeChangePrice);

  var onSuccess = function () {
    window.main.showSuccessMessage();
    form.reset();
    window.map.deactivate();
    formFilters.reset();
    window.card.remove();
    window.pin.remove();
  };

  var onError = function () {
    window.main.showErrorMessage();
  };

  form.addEventListener('submit', function (evt) {
    evt.preventDefault(evt);
    window.backend.save(onSuccess, onError, new FormData(form));
  });

  var onButtonReset = function (evt) {
    evt.preventDefault();
    form.reset();
    window.map.deactivate();
    formFilters.reset();
    window.card.remove();
    window.pin.remove();
  };

  resetButtonForm.addEventListener('click', onButtonReset);

  window.form = {
    setState: setFormState,
    setAddress: setAddress,
    housingTypes: housingTypes
  };
})();
