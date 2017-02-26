(function() {
  'use strict';
  document.querySelector('button')
    .addEventListener('click', function() {
    var array = new Array(rnd(20))
      .join()
      .split(',')
      .map(function() { return rnd(100); });

    window.render(array);
  });

  function rnd(num) {
    return parseInt(num * Math.random() + 1, 10);
  }
})();
