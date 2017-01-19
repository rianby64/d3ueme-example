(() => {
  'use strict';
  function render(array) {
    var array_ = array || [];
    var text = d3.select('svg')
      .selectAll('text')
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
