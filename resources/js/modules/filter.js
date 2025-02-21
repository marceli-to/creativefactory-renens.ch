const Filter = (function() {
  
  // OPTIONS AND VARIABLES
  const selectors = {
    body: 'body',
    attribute: '.js-filter-attribute',
    building: '[data-building]',
    object: '[data-object]',
    btnReset: '.js-btn-reset',
  };

  const classes = {
    hidden: 'is-hidden',
    visible: 'is-visible',
  };

  let userFilter = {};

  // METHODS
  const initialize = function() {
    bind();
  };

  const bind = function() {
    document.querySelector(selectors.body).addEventListener('change', function(event) {
      if (event.target.matches(selectors.attribute)) {
        add(event.target);
      }
    });

    document.querySelector(selectors.body).addEventListener('click', function(event) {
      if (event.target.matches(selectors.btnReset)) {
        reset(event);
      }
    });
  };

  const add = function(el) {
    const type = el.getAttribute('data-filterType');
    const val = el.value;

    if (val === 'NULL') {
      delete userFilter[type];
    } else {
      userFilter[type] = String(val);
    }
    filter();
  };

  const filter = function() {
    if (Object.keys(userFilter).length > 0) {
      let attrString = '';
      Object.keys(userFilter).forEach(function(k) {
        const v = userFilter[k];
        if (v.length > 0) {
          attrString += `[data-${k}="${v}"]`;
        }

        // // if k is 'object-building' then hide all buildings except the one selected
        // if (k === 'object-building') {
        //   document.querySelectorAll(selectors.building).forEach(function(item) {
        //     item.style.display = 'none';
        //   });
        //   document.querySelector(`[data-building="${v}"]`).style.display = 'block';
        // }
      });
      if (attrString.length > 0) {
        document.querySelectorAll(selectors.object).forEach(function(item) {
          item.style.display = 'none';
        });
        document.querySelectorAll(attrString).forEach(function(item) {
          item.style.display = 'table-row';
        });
      }
    } 
    else {
      document.querySelectorAll(selectors.object).forEach(function(item) {
        item.style.display = 'table-row';
      });
      document.querySelectorAll(selectors.building).forEach(function(item) {
        item.style.display = 'block';
      });
    }
  };

  const reset = function(e) {
    e.preventDefault();
    userFilter = {};
    document.querySelectorAll('select').forEach(function(select) {
      select.selectedIndex = 0;
    });
    filter();
  };

  // RETURN PUBLIC METHODS
  return {
    init: initialize,
  };
})();

// Initialize
Filter.init();
