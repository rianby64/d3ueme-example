(() => {
  'use strict';
  document.querySelector('button').addEventListener('click', () => {
    render();
  });

  var svg = window.d3.select('svg');
  render();

  function rnd(num) {
    return parseInt(num * Math.random() + 1, 10);
  }

  function render() {
    var array = new Array(rnd(20))
      .join()
      .split(',')
      .map(() => rnd(100));

    var text = svg.selectAll('text')
      .data(array);

    text.attr('class', 'update');

    text.enter().append('text')
      .attr('class', 'enter')
      .merge(text)
      .attr('class', 'merge')
      .text(d => d);

    text.exit()
      .attr('class', 'exit');
  }
})();
