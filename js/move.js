'use strict';

(function () {
  var Y = {
    MIN: 130,
    MAX: 630
  };

  var X = {
    MIN: 1,
    MAX: 1200
  };

  var Pin = {
    WIDTH: 65,
    CENTER: 65 / 2,
    END: 87
  };

  var setMainPinPosition = function (shift) {
    var y = window.map.main.offsetTop - shift.y;
    var x = window.map.main.offsetLeft - shift.x;

    if (x < X.MIN) {
      x = 1;
    } else if (x > X.MAX - Pin.WIDTH) {
      x = X.MAX - Pin.WIDTH;
    }

    if (y < Y.MIN - Pin.WIDTH) {
      y = Y.MIN - Math.floor(Pin.END - Pin.CENTER);
    } else if (y > Y.MAX - Pin.WIDTH) {
      y = Y.MAX - Math.floor(Pin.END - Pin.CENTER);
    }
    window.map.main.style.top = y + 'px';
    window.map.main.style.left = x + 'px';
  };

  window.map.main.addEventListener('mousedown', function (evt) {
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
        setMainPinPosition(shift);
      }
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();
      if (window.map.field.classList.contains('map--faded')) {
        window.map.onMainPinMouseDown(upEvt);
      } else {
        window.form.activate();
      }
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

})();

