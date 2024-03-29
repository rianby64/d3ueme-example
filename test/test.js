(function() {
  'use strict';
  var render = window.render;

  test(function() {
    var arrayEnter = [1, 2, 3];

    render(arrayEnter);

    Array.prototype
      .slice
      .call(document.querySelectorAll('.enter'))
      .forEach(function(item, i) {
        assert_equals(item.textContent, arrayEnter[i].toString());
        assert_true(item.classList.contains('enter'));
        assert_equals(item.classList.length, 1);
      });
  }, 'Create elements by enter');

  test(function() {
    var arrayEnterUpdate = [5, 4, 3, 2];

    render(arrayEnterUpdate);

    var lastI = 0;
    Array.prototype
      .slice
      .call(document.querySelectorAll('.update'))
      .forEach(function(item, i) {
        assert_equals(item.textContent, arrayEnterUpdate[i].toString());
        assert_true(item.classList.contains('update'));
        assert_equals(item.classList.length, 1);
        lastI = i + 1;
      });

    assert_equals(lastI, 3);

    Array.prototype
      .slice
      .call(document.querySelectorAll('.enter'))
      .forEach(function(item, i) {
        var i_ = i + lastI;
        assert_equals(item.textContent, arrayEnterUpdate[i_].toString());
        assert_true(item.classList.contains('enter'));
        assert_equals(item.classList.length, 1);
      });
  }, 'Update and append elements');

  test(function() {
    var arrayEnterUpdate = [1, 2];
    var arrayExit = [1, 2, 3, 2];

    render(arrayEnterUpdate);

    var lastI = 0;
    Array.prototype
      .slice
      .call(document.querySelectorAll('.update'))
      .forEach(function(item, i) {
        assert_equals(item.textContent, arrayEnterUpdate[i].toString());
        assert_true(item.classList.contains('update'));
        assert_equals(item.classList.length, 1);
        lastI = i + 1;
      });

    assert_equals(lastI, arrayEnterUpdate.length);
    assert_equals(document.querySelectorAll('.enter').length, 0);

    /**
     * because of
     * https://github.com/rianby64/d3ueme-example/blob/master/src/enexup.js#L73
     * I may delete the following asserts
     */
    /*
    Array.prototype
      .slice
      .call(document.querySelectorAll('.exit'))
      .forEach(function(item, i) {
        var i_ = i + lastI;
        assert_equals(item.textContent, arrayExit[i_].toString());
        assert_true(item.classList.contains('exit'));
        assert_equals(item.classList.length, 1);
      });
      */
  }, 'Update and remove elements');

  test(function() {
    var arrayEnterUpdate = [];
    var arrayExit = [1, 2, 3, 2];

    render(arrayEnterUpdate);

    assert_equals(document.querySelectorAll('.enter').length, 0);
    assert_equals(document.querySelectorAll('.update').length, 0);

    /**
     * because of
     * https://github.com/rianby64/d3ueme-example/blob/master/src/enexup.js#L73
     * I may delete the following asserts
     */
    /*
    Array.prototype
      .slice
      .call(document.querySelectorAll('.exit'))
      .forEach(function(item, i) {
        assert_equals(item.textContent, arrayExit[i].toString());
        assert_true(item.classList.contains('exit'));
        assert_equals(item.classList.length, 1);
      });
      */
  }, 'Remove elements');

  var svg = document.querySelector('svg');
  test(function() {
    assert_true(svg.hasOwnProperty('data'));

    var array = [7, 8, 9, 10];
    render(array);

    (this.step_func((fixture) => {
      fixture.forEach(this.step_func(i => {
        var onecell = svg.querySelectorAll('text')[i];
        assert_equals(Number(onecell.textContent), svg.data[i]);

        svg.data[i] = 11;
        assert_equals(Number(onecell.textContent), svg.data[i]);
      }));
    }))([2, 3, 1]);
  }, 'Update an element via svg.data[i] = value');

  test(function() {
    assert_equals(svg.data.length, svg.querySelectorAll('text').length);
    svg.data.length -= 2;
    assert_equals(svg.data.length, svg.querySelectorAll('text').length);
    svg.data.length += 3;
    assert_equals(svg.data.length, svg.querySelectorAll('text').length);
  }, 'Manipulate svg.data.length');

  test(function() {
    assert_equals(svg.data.length, 5);
    svg.data.push(99);
    assert_equals(svg.data[5], 99);
    assert_equals(Number(svg.querySelectorAll('text')[5].textContent), svg.data[5]);
  });

})();
