'use strict';

(function () {
  var outlineY = {
    MIN: 130,
    MAX: 630
  };

  var outlineX = {
    MIN: 1,
    MAX: 1200
  };

  var Pin = {
    WIDTH: 65,
    HEIGHT: 87
  };

  var setPinPosition = function (shift) {
    var y = window.map.pin.offsetTop - shift.y;
    var x = window.map.pin.offsetLeft - shift.x;

    if (x < outlineX.MIN) {
      x = 1;
    } else if (x > outlineX.MAX - Pin.WIDTH) {
      x = outlineX.MAX - Pin.WIDTH;
    }

    if (y < outlineY.MIN - Pin.WIDTH) {
      y = outlineY.MIN - Math.floor(Pin.HEIGHT - (Pin.WIDTH / 2));
    } else if (y > outlineY.MAX - Pin.WIDTH) {
      y = outlineY.MAX - Math.floor(Pin.HEIGHT - (Pin.WIDTH / 2));
    }
    window.map.pin.style.top = y + 'px';
    window.map.pin.style.left = x + 'px';
  };

  window.map.pin.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();
      if (evt.button === 0) {

        var shift = {
          x: startCoords.x - moveEvt.clientX,
          y: startCoords.y - moveEvt.clientY
        };

        startCoords = {
          x: moveEvt.clientX,
          y: moveEvt.clientY
        };
        setPinPosition(shift);
      }
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();
      if (!window.map.city.classList.contains('map--faded')) {
        window.form.setAddress();
      }
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

})();

