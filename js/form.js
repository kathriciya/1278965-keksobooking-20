'use strict';

(function () {
  var PIN_WIDTH = 65;

  var map = window.map.city;
  var form = window.map.form;
  var pin = window.map.pin;

  var address = document.querySelector('input[name=address]');
  var formFields = document.querySelectorAll('fieldset, .map__filter');
  var roomNumber = form.querySelector('#room_number');
  var capacity = form.querySelector('#capacity');
  var timeIn = document.querySelector('#timein');
  var timeOut = document.querySelector('#timeout');
  var price = document.querySelector('#price');
  var type = document.querySelector('#type');
  var resetButtonForm = form.querySelector('.ad-form__reset');

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

  var setAddress = function () {
    if (map.classList.contains('map--faded')) {
      address.value = Math.floor(pin.offsetLeft + (PIN_WIDTH / 2)) + ',' + Math.floor(pin.offsetTop + (PIN_WIDTH / 2));
    } else {
      address.value = Math.floor(pin.offsetLeft + (PIN_WIDTH / 2)) + ',' + Math.floor(pin.offsetTop + PIN_WIDTH);
    }
  };
  setAddress();

  var setFormState = function () {
    for (var i = 0; i < formFields.length; i++) {
      formFields[i].disabled = !formFields[i].disabled;
    }
  };
  setFormState();

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

  timeIn.addEventListener('change', function (evt) {
    timeOut.value = evt.target.value;
  });

  timeOut.addEventListener('change', function (evt) {
    timeIn.value = evt.target.value;
  });

  var onTypeChangeHandler = function (evt) {
    var minPrice = typeTranslate[evt.target.value].min;
    price.placeholder = minPrice;
    price.min = minPrice;
  };
  type.addEventListener('change', onTypeChangeHandler);

  var onSuccess = function () {
    window.main.showSuccessMessage();
    form.reset();
    window.map.deactivate();
    window.card.mapFilter.reset();
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
    window.card.mapFilter.reset();
    window.card.remove();
    window.pin.remove();
  };

  resetButtonForm.addEventListener('click', onButtonReset);

  window.form = {
    setState: setFormState,
    setAddress: setAddress,
    typeTranslate: typeTranslate
  };
})();
