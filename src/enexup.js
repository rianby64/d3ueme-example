(() => {
  'use strict';
  document.querySelector('button').addEventListener('click', () => {
    var array = new Array(rnd(20))
      .join()
      .split(',')
      .map(() => rnd(100));

    render(array);
  });

  var svg = d3.select('svg');

  function rnd(num) {
    return parseInt(num * Math.random() + 1, 10);
  }

  function render(array) {
    var array_ = array || [];
    var text = svg.selectAll('text')
      .data(array_);

    text.attr('class', 'update');

    text.enter().append('text')
      .attr('class', 'enter')
      .merge(text)
      .text(d => d);

    text.exit()
      .attr('class', 'exit');
  }

  window.render = render;
})();
