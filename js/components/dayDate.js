(function() {
  'use strict';

  var DayDateProto = Object.create(HTMLElement.prototype);

  DayDateProto.createdCallback = function() {
    var shadow = this.createShadowRoot();
    shadow.innerHTML = '<div id="day"></div><div id="date"></div>';
  };

  DayDateProto.update = function(day, date) {
    var $day = this.shadowRoot.querySelector('#day');
    var $date = this.shadowRoot.querySelector('#date');
    $day.innerHTML = day;
    $date.innerHTML = date;
  };

  var DayDate = document.registerElement('x-day-date', {
    prototype: DayDateProto
  });

})();
