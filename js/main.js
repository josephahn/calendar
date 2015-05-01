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

  Calendar.prototype._getDay = function(year, month, date) {
    var d = new Date(year, month, date);
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
    var dayDate = document.createElement('x-day-date');
    var monthSelector = document.createElement('x-month-selector');
    var cal = document.createElement('x-calendar');
    var firstDay = this._getFirstDay(this.year, this.month);
    var numDays = this._getNumDays(this.year, this.month);

    dayDate.update(this.days[this.day], this.date);
    monthSelector.update(this.months[this.month], this.year);
    cal.update(firstDay, numDays);
    cal.highlight(this.date);

    var that = this;
    document.addEventListener('click', function(e) {
      var targetId = e.path[0].id;
      var reDay = /^day-(\d+)/;

      if (reDay.test(targetId)) {
        var date = targetId.match(reDay)[1];
        cal.highlight(date);
        var day = that.days[that._getDay(that.year, that.month, date)];
        dayDate.update(day, date);
      } else if (targetId === 'prev') {
        if (that.month === 0) {
          that.month = 11;
          that.year--;
        } else {
          that.month--;
        }
        monthSelector.update(that.months[that.month], that.year);
        cal.update(that._getFirstDay(that.year, that.month), that._getNumDays(that.year, that.month));
      } else if (targetId === 'next') {
        if (that.month === 11) {
          that.month = 0;
          that.year++;
        } else {
          that.month++;
        }
        monthSelector.update(that.months[that.month], that.year);
        cal.update(that._getFirstDay(that.year, that.month), that._getNumDays(that.year, that.month));
      }
    });
    document.addEventListener('keydown', function(e) {
      if (e.keyCode === 37) {
        if (that.month === 0) {
          that.month = 11;
          that.year--;
        } else {
          that.month--;
        }
        monthSelector.update(that.months[that.month], that.year);
        cal.update(that._getFirstDay(that.year, that.month), that._getNumDays(that.year, that.month));
      } else if (e.keyCode === 39) {
        if (that.month === 11) {
          that.month = 0;
          that.year++;
        } else {
          that.month++;
        }
        monthSelector.update(that.months[that.month], that.year);
        cal.update(that._getFirstDay(that.year, that.month), that._getNumDays(that.year, that.month));
      }
    });

    $container.appendChild(dayDate);
    $container.appendChild(monthSelector);
    $container.appendChild(cal);
  };

  document.addEventListener("DOMContentLoaded", function() {
    var calendar = new Calendar();
    calendar.render('cal-container');
  });

})();
