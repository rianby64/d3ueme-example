(() => {
  'use strict';
  var render = window.render;

  test(() => {
    var arrayEnter = [1, 2, 3];

    render(arrayEnter);

    Array.prototype
      .slice
      .call(document.querySelectorAll('.enter'))
      .forEach((item, i) => {
        assert_equals(item.textContent, arrayEnter[i].toString());
        assert_true(item.classList.contains('enter'));
        assert_equals(item.classList.length, 1);
      });
  }, 'Create elements by enter');

  test(() => {
    var arrayEnterUpdate = [5, 4, 3, 2];

    render(arrayEnterUpdate);

    var lastI = 0;
    Array.prototype
      .slice
      .call(document.querySelectorAll('.update'))
      .forEach((item, i) => {
        assert_equals(item.textContent, arrayEnterUpdate[i].toString());
        assert_true(item.classList.contains('update'));
        assert_equals(item.classList.length, 1);
        lastI = i + 1;
      });

    assert_equals(lastI, 3);

    Array.prototype
      .slice
      .call(document.querySelectorAll('.enter'))
      .forEach((item, i) => {
        var i_ = i + lastI;
        assert_equals(item.textContent, arrayEnterUpdate[i_].toString());
        assert_true(item.classList.contains('enter'));
        assert_equals(item.classList.length, 1);
      });
  }, 'Update and append elements');

  test(() => {
    var arrayEnterUpdate = [1, 2];
    var arrayExit = [1, 2, 3, 2];

    render(arrayEnterUpdate);

    var lastI = 0;
    Array.prototype
      .slice
      .call(document.querySelectorAll('.update'))
      .forEach((item, i) => {
        assert_equals(item.textContent, arrayEnterUpdate[i].toString());
        assert_true(item.classList.contains('update'));
        assert_equals(item.classList.length, 1);
        lastI = i + 1;
      });

    assert_equals(lastI, arrayEnterUpdate.length);
    assert_equals(document.querySelectorAll('.enter').length, 0);

    Array.prototype
      .slice
      .call(document.querySelectorAll('.exit'))
      .forEach((item, i) => {
        var i_ = i + lastI;
        assert_equals(item.textContent, arrayExit[i_].toString());
        assert_true(item.classList.contains('exit'));
        assert_equals(item.classList.length, 1);
      });
  }, 'Update and remove elements');

  test(() => {
    var arrayEnterUpdate = [];
    var arrayExit = [1, 2, 3, 2];

    render(arrayEnterUpdate);

    assert_equals(document.querySelectorAll('.enter').length, 0);
    assert_equals(document.querySelectorAll('.update').length, 0);

    Array.prototype
      .slice
      .call(document.querySelectorAll('.exit'))
      .forEach((item, i) => {
        assert_equals(item.textContent, arrayExit[i].toString());
        assert_true(item.classList.contains('exit'));
        assert_equals(item.classList.length, 1);
      });
  }, 'Remove elements');

})();
