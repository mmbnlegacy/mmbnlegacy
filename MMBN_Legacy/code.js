let closedInfoFirst = false;
let size = 0;

function closeInfo() {
  if (!closedInfoFirst) {
    var head = document.getElementsByTagName('head')[0];
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.onload = function() {
      _mI2();
    }
    script.src = 'MMBN_Legacy/MegamanLegacy.js?VXLZB=1933125640';
    head.appendChild(script);
  }
  closedInfoFirst = true;
  document.getElementById("myNav").style.height = "0";
  document.getElementById("myNav").style.borderWidth = "0px";
}

function openInfo() {
  document.getElementById("myNav").style.height = "90%";
  document.getElementById("myNav").style.borderWidth = "5px";
}

function buttonDown(key, pressed) {
  var keyChar = '';
  var keyCode = 0;
  var code = '';
  if (key == 'Z') {
    keyChar = 'z';
    keyCode = 90;
    code = 'KeyZ';
  } else if (key == 'X') {
    keyChar = 'x';
    keyCode = 88;
    code = 'KeyX';
  } else if (key == 'A') {
    keyChar = 'a';
    keyCode = 65;
    code = 'KeyA';
  } else if (key == 'S') {
    keyChar = 's';
    keyCode = 83;
    code = 'KeyS';
  } else if (key == 'Enter') {
    keyChar = 'Enter';
    keyCode = 13;
    code = 'Enter';
  }

  var keyEvent = new KeyboardEvent('keydown', {
    'key': keyChar,
    'keyCode': keyCode,
    'returnValue': true,
    'defaultPrevented': true,
    'bubbles': true,
    'cancelable': true,
    'code': code,
    'shiftKey': false,
    'ctrlKey': false,
    'metaKey': false
  });

  if (pressed) {
    _Mo2(keyEvent);
  } else {
    _Jo2(keyEvent);
  }
}

function changeSize() {
  size = (size + 1) % 3;
  var canvas = document.getElementsByTagName('canvas')[0];
  canvas.style.margin = "5px";
  if (size == 0) {
    canvas.style.imageRendering = "optimizeSpeed";
    canvas.style.width = "240px"
  } else if (size == 1) {
    canvas.style.imageRendering = "auto";
    canvas.style.width = "-webkit-fill-available"
  } else if (size == 2) {
    let scale = Math.floor(window.innerWidth / 240);
    if (scale == 1) {
      changeSize();
      return;
    }
    canvas.style.imageRendering = "pixelated";
    canvas.style.width = (240 * scale) + "px"
  }
}

var currDir = "C";
var currHorizKeyEvent = null;
var currVertKeyEvent = null;
var Joy1 = new JoyStick('joyDiv', {
  'internalFillColor': '#ABABAB80',
  'internalStrokeColor': '#ABABAB80',
  'externalStrokeColor': '#ABABAB80',
}, function(stickData) {
  if (stickData.x == 0 && stickData.y == 0) {
    if (currHorizKeyEvent) {
      _Jo2(currHorizKeyEvent);
    }
    if (currVertKeyEvent) {
      _Jo2(currVertKeyEvent);
    }
    currHorizKeyEvent = null;
    currVertKeyEvent = null;
  }
  newDir = stickData.cardinalDirection;
  if (newDir != "C" && currDir != newDir) {
    // handle x movement
    if (currHorizKeyEvent) {
      _Jo2(currHorizKeyEvent);
    }
    if (newDir != "N" && newDir != "S") {
      var keyEvent = null;
      if (stickData.x < 0) {
        keyEvent = new KeyboardEvent('keydown', {
          'key': 'ArrowLeft',
          'keyCode': 37,
          'returnValue': true,
          'defaultPrevented': true,
          'isTrusted': true,
          'bubbles': true,
          'cancelable': true,
          'code': 'ArrowLeft',
          'shiftKey': false, // you don't need to include values
          'ctrlKey': false, // if you aren't going to use them.
          'metaKey': false // these are here for example's sake.
        });
      } else {
        keyEvent = new KeyboardEvent('keydown', {
          'key': 'ArrowRight',
          'keyCode': 39,
          'returnValue': true,
          'defaultPrevented': true,
          'isTrusted': true,
          'bubbles': true,
          'cancelable': true,
          'code': 'ArrowRight',
          'shiftKey': false, // you don't need to include values
          'ctrlKey': false, // if you aren't going to use them.
          'metaKey': false // these are here for example's sake.
        });
      }
      _Mo2(keyEvent);
      currHorizKeyEvent = keyEvent;
    }

    // handle y movement
    if (currVertKeyEvent) {
      _Jo2(currVertKeyEvent);
    }
    if (newDir != "W" && newDir != "E") {
      var keyEvent = null;
      if (stickData.y < 0) {
        keyEvent = new KeyboardEvent('keydown', {
          'key': 'ArrowDown',
          'keyCode': 40,
          'returnValue': true,
          'defaultPrevented': true,
          'isTrusted': true,
          'bubbles': true,
          'cancelable': true,
          'code': 'ArrowDown',
          'shiftKey': false, // you don't need to include values
          'ctrlKey': false, // if you aren't going to use them.
          'metaKey': false // these are here for example's sake.
        });
      } else {
        keyEvent = new KeyboardEvent('keydown', {
          'key': 'ArrowUp',
          'keyCode': 38,
          'returnValue': true,
          'defaultPrevented': true,
          'isTrusted': true,
          'bubbles': true,
          'cancelable': true,
          'code': 'ArrowUp',
          'shiftKey': false, // you don't need to include values
          'ctrlKey': false, // if you aren't going to use them.
          'metaKey': false // these are here for example's sake.
        });
      }
      _Mo2(keyEvent);
      currVertKeyEvent = keyEvent;
    }
    currDir = newDir;
  }
});

var pressStartText = "PRESS START";
var pressXText = "Press B to end";
document.addEventListener("DOMContentLoaded", function(event) {
  // Non mobile
  if (window.innerWidth > window.innerHeight) {
    pressStartText = "PRESS ENTER";
    pressXText = "Press X to end";
    var mobileOnlys = document.getElementsByClassName('mobileOnly');
    Array.prototype.forEach.call(mobileOnlys, function(e) {
      e.style.display = 'none';
    });
  } else {
    document.getElementById('moveDD').innerHTML = 'Joypad: Move';
    document.getElementById('zDD').innerHTML = 'A: Interact';
    document.getElementById('xDD').innerHTML = 'B: Run';
    document.getElementById('enterDD').innerHTML = 'Start: Open Menu';
    document.getElementById('aDD').innerHTML = 'L: Speak to Spyman for insight on current map';
    document.getElementById('sDD').innerHTML = 'R: Jack In/Jack Out';
    document.getElementById('toggleDD').style.display = 'none';
  }
});
