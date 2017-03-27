(function() {
  'use strict';

  /**
   * Connect the SVG with the array. This is the most important
   * part of this exploration. This function is what we test indirectly
   *
   * @param {Array} array - The array to be ploted
   */
  function render(array) {
    var array_ = array || []; // be sure you're working with an array

    // I want to work with a pseudo-array... it's an object, but it behaves
    // like an array.
    var data = {};
    Object.defineProperty(data, 'length', {
      get: () => array_.length,
      set: (value) => {
        array_.length = value;
      }
    });

    /*
var text = d3.select('svg') - save selection and selectall and data into text
  .selectAll('text') - effect "Wat?" https://bost.ocks.org/mike/join/
  .data(array_); - see above
     */
    var svg = document.querySelector('svg');
    svg.data = data;
    var text = d3.select(svg)
      .attr('height', 16 * (array_.length + 1))
      .selectAll('text')
      .data(array_);

    /*
Be sure we do all the manipulations with existing elements.
This part works upon already created elements. This is usefull when you call
twice or more times the function render with an array with similar elements.
     */
    text.attr('class', 'update')
      .attr('y', (d, i) => 10 * i);

    /*
text.enter().append('text') - create every new 'text' element
  .attr('class', 'enter') - the just created element you may manipulate
  .merge(text) - but is better to perform all manipulations later, below this
  .text(function(d) { return d; }); - and here we go! The only question that
     - arises is... should I repeat the code twice? Here under merge and there
     - under update write the same things?
     */
    text.enter().append('text')
      .attr('class', 'enter')
      .merge(text)
      .attr('y', (d, i) => 16 * (1 + i))
      .each((d, i, els) => {
        Object.defineProperty(data, i, {
          get: () => array_[i],
          set: (v) => {
            d3.select(els[i])
              .text(v);
            array_[i] = v;
          },
          configurable: true
        });
      })
      .text(function(d) { return d; });

    /*
     * You should write something line text.exit().remove();
     */
    text.exit()
      .attr('class', 'exit')
      .remove();
  }

  // Expose this function. Osmani would be sad if he'd see this line...
  window.render = render;
})();
