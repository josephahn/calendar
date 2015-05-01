(function() {
  'use strict';

  function Calendar() {
    var d = new Date();
    this.day = d.getDay();
    this.date = d.getDate();
    this.month = d.getMonth();
    this.year = d.getFullYear();
    this.selected = [this.date, this.month, this.year];
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

  // returns day of week for the first of the month
  Calendar.prototype._getFirstDay = function(year, month) {
    var d = new Date(year, month, 1);
    return d.getDay();
  };

  // returns day of week for a specific date
  Calendar.prototype._getDay = function(year, month, date) {
    var d = new Date(year, month, date);
    return d.getDay();
  };

  // returns the number of days for a specific month
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

  // rerenders month selector and calendar elements with updated month and year values
  Calendar.prototype._changeMonth = function(direction, monthSelector, cal) {
    if (direction === 'prev') {
      if (this.month === 0) {
        this.month = 11;
        this.year--;
      } else {
        this.month--;
      }
    } else if (direction === 'next') {
      if (this.month === 11) {
        this.month = 0;
        this.year++;
      } else {
        this.month++;
      }
    }
    monthSelector.update(this.months[this.month], this.year);
    cal.update(this._getFirstDay(this.year, this.month), this._getNumDays(this.year, this.month));
    // remember selected date, and highlight if user navigates back to it
    if (this.month === this.selected[1] && this.year === this.selected[2]) {
      cal.highlight(this.date);
    }
  };

  Calendar.prototype.render = function(elId) {
    var $container = document.getElementById(elId);

    // create custom elements
    var dayDate = document.createElement('x-day-date');
    var monthSelector = document.createElement('x-month-selector');
    var cal = document.createElement('x-calendar');

    var firstDay = this._getFirstDay(this.year, this.month);
    var numDays = this._getNumDays(this.year, this.month);

    // render custom element innerHTML
    dayDate.update(this.days[this.day], this.date);
    monthSelector.update(this.months[this.month], this.year);
    cal.update(firstDay, numDays);
    cal.highlight(this.date);

    // maintain context
    var that = this;

    // listen for click events on dates and selector arrows
    document.addEventListener('click', function(e) {
      var targetId = e.path[0].id;
      var reDay = /^day-(\d+)/;

      if (reDay.test(targetId)) {
        var date = targetId.match(reDay)[1];
        cal.highlight(date);
        var day = that.days[that._getDay(that.year, that.month, date)];
        dayDate.update(day, date);
        that.date = date;
        // update selected date
        that.selected = [that.date, that.month, that.year];
      } else if (targetId === 'prev') {
        that._changeMonth('prev', monthSelector, cal);
      } else if (targetId === 'next') {
        that._changeMonth('next', monthSelector, cal);
      }
    });
    document.addEventListener('keydown', function(e) {
      if (e.keyCode === 37) {
        that._changeMonth('prev', monthSelector, cal);
      } else if (e.keyCode === 39) {
        that._changeMonth('next', monthSelector, cal);  
      }
    });

    // append custom elements to container node
    $container.appendChild(dayDate);
    $container.appendChild(monthSelector);
    $container.appendChild(cal);
  };

  document.addEventListener("DOMContentLoaded", function() {
    var calendar = new Calendar();
    calendar.render('cal-container');
  });

})();
