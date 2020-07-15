'use strict';

(function () {
  var DEBOUNCE_INTERVAL = 500;

  var priceMap = {
    'low': {
      start: 0,
      end: 10000
    },
    'middle': {
      start: 10000,
      end: 50000
    },
    'high': {
      start: 50000,
      end: Infinity
    }
  };

  var filterElements = Array.from(document.querySelector('.map__filters').children);

  var filterRules = {
    'housing-type': function (data, filter) {
      return filter.value === data.offer.type;
    },
    'housing-price': function (data, filter) {
      return data.offer.price >= priceMap[filter.value].start && data.offer.price < priceMap[filter.value].end;
    },
    'housing-rooms': function (data, filter) {
      return filter.value === data.offer.rooms.toString();
    },
    'housing-guests': function (data, filter) {
      return filter.value === data.offer.guests.toString();
    },
    'housing-features': function (data, filter) {
      var checkListElements = Array.from(filter.querySelectorAll('input[type=checkbox]:checked'));


      return checkListElements.every(function (it) {
        return data.offer.features.some(function (feature) {
          return feature === it.value;
        });
      });
    }
  };

  var filterData = function (data) {
    return data.filter(function (item) {
      return filterElements.every(function (filter) {
        return (filter.value === 'any') ? true : filterRules[filter.id](item, filter);
      });
    });
  };

  var debounce = function (cb) {
    var lastTimeout = null;

    return function () {
      var args = arguments;
      if (lastTimeout) {
        window.clearTimeout(lastTimeout);
      }
      lastTimeout = window.setTimeout(function () {
        cb.apply(null, args);
      }, DEBOUNCE_INTERVAL);
    };
  };

  var onMapFiltersChange = debounce(function () {
    window.pin.remove();
    window.card.remove();
    window.pin.render(filterData(window.map.offers()).slice(0, window.map.MAX_COUNT));
  });

  window.card.mapFilters.addEventListener('change', onMapFiltersChange);

  window.filter = filterData;
})();
