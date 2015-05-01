(function() {
  'use strict';

  // Day Date Element
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
  }

  var DayDate = document.registerElement('x-day-date', {
    prototype: DayDateProto
  });


  // Calendar Element
  var CalendarProto = Object.create(HTMLElement.prototype);

  CalendarProto.update = function(firstDay, numDays) {
    var $tbody = this.shadowRoot.querySelector('tbody');
    var markup = '<tr>';
    for (var i = 0; i < firstDay; i++) {
      markup += '<td></td>';
    }
    for (var j = 1; j < numDays + 1; j++) {
      markup += '<td id=day-' + j + '>' + j + '</td>';
      if ((firstDay + j) % 7 === 0) {
        markup += '</tr><tr>';
      }
    }
    markup += '</tr>';
    $tbody.innerHTML = markup;
  };

  CalendarProto.highlight = function(date) {
    var $day = this.shadowRoot.querySelector('#day-' + date);
    $day.classList.add('highlight');
  };

  CalendarProto.createdCallback = function() {
    var shadow = this.createShadowRoot();
    shadow.innerHTML = '<table>' +
      '<thead>' +
      '<tr>' +
      '<th>S</th>' +
      '<th>M</th>' +
      '<th>T</th>' +
      '<th>W</th>' +
      '<th>T</th>' +
      '<th>F</th>' +
      '<th>S</th>' +
      '</tr>' +
      '</thead>' +
      '<tbody></tbody>' +
      '</table>';
  };

  var Calendar = document.registerElement('x-calendar', {
    prototype: CalendarProto
  });

})();
