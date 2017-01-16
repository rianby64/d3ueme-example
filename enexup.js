'use strict';
document.querySelector('button').addEventListener('click', e => {
  render();
});

var svg = d3.select('svg');
render();

function render() {
  var array = Array(parseInt(20 * Math.random() + 1, 10)).join().split(',').map(item => parseInt(100 * Math.random() + 1, 10));

  console.log(array);

  var text = svg.selectAll('text').data(array);
  text.attr('class', 'update');
  text.enter().append('text')
      .attr('class', 'enter')
      .merge(text)
      .text(d => d);

  text.exit()
      .attr('class', 'exit');
}
