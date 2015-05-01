(function() {
  'use strict';

  var MonthSelectorProto = Object.create(HTMLElement.prototype);

  MonthSelectorProto.createdCallback = function() {
    var shadow = this.createShadowRoot();
    shadow.innerHTML = '<div id="prev"><</div>' +
      '<div id="month"></div>' +
      '<div id="next">></div>';
  };

  MonthSelectorProto.update = function(month, year) {
    var $month = this.shadowRoot.querySelector('#month');
    $month.innerHTML = month + ' ' + year;
  };

  var MonthSelector = document.registerElement('x-month-selector', {
    prototype: MonthSelectorProto
  });

})();
