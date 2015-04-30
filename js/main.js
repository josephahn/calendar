(function() {
  'use strict';

  function Calendar() {
    var d = new Date();
    this.day = d.getDay();
    this.date = d.getDate();
    this.month = d.getMonth();
    this.year = d.getFullYear();
    this.days = [
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday'
    ];
    this.months = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December'
    ];
  }

  Calendar.prototype._getFirstDay = function(year, month) {
    var d = new Date(year, month, 1);
    return d.getDay();
  };

  Calendar.prototype._getNumDays = function(year, month) {
    var numDays = [31,28,31,30,31,30,31,31,30,31,30,31];

    if(isLeapYear(year) && month === 1) {
      return 29;
    } else {
      return numDays[month];
    }

    function isLeapYear(year) {
      if (year % 4 === 0) {
        if (year % 100 === 0) {
          if (year % 400 === 0) {
            return true;
          } else {
            return false;
          }
        } else {
          return true;
        }
      } else {
        return false;
      }
    }
  };

  Calendar.prototype.render = function(elId) {
    var $container = document.getElementById(elId);
    var cal = document.createElement('x-calendar');
    var firstDay = this._getFirstDay(this.year, this.month);
    var numDays = this._getNumDays(this.year, this.month);

    cal.update(firstDay, numDays);
    // cal.highlight(today);
    $container.appendChild(cal);
  };

  document.addEventListener("DOMContentLoaded", function() {
    var calendar = new Calendar();
    calendar.render('cal-container');
  });

})();
