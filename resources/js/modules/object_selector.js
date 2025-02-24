const ObjectSelector = (function() {
  const selectors = {
    select: '.js-apartments',
    selection: '.js-apartment-selection',
    hiddenField: 'input[name="interest"]'
  };

  const createBadge = function(value) {
    const badge = document.createElement('span');
    badge.classList.add('badge');
    badge.innerHTML = `${value}<svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8.00523 0.934136L5.00002 3.93934L1.99482 0.934136L0.934159 1.9948L3.93936 5L0.934159 8.0052L1.99482 9.06586L5.00002 6.06066L8.00523 9.06586L9.06589 8.0052L6.06068 5L9.06589 1.9948L8.00523 0.934136Z" fill="#ffffff"/></svg>`;
    return badge;
  };

  const initialize = function() {

    // exit if the elements are not found
    if (!document.querySelector(selectors.select)) {
      return;
    }
    const select = document.querySelector(selectors.select);
    const selection = document.querySelector(selectors.selection);
    const hiddenField = document.querySelector(selectors.hiddenField);

    // Function to get the value of a query parameter by name
    const getQueryParam = function(param) {
      const urlParams = new URLSearchParams(window.location.search);
      return urlParams.get(param);
    };

    // Function to remove the query parameter from the URL
    const removeQueryParam = function(param) {
      const url = new URL(window.location);
      url.searchParams.delete(param);
      window.history.replaceState({}, document.title, url);
    };

    // Check if interest has a value and add the badges
    let hiddenValues = hiddenField.value ? hiddenField.value.split(',') : [];
    if (hiddenValues.length > 0) {
      hiddenValues.forEach((value) => {
        const badge = createBadge(value);
        selection.appendChild(badge);
        selection.classList.remove('hidden');
        selection.classList.add('flex');

        badge.addEventListener('click', () => {
          badge.remove();
          // remove the value from the hidden field
          hiddenValues = hiddenValues.filter((item) => item !== value);
          hiddenField.value = hiddenValues.join(',');
          // if there are no more badges, hide the selection
          if (!selection.querySelector('.badge')) {
            selection.classList.add('hidden');
          }
        });
      });
    }

    // Check if the URL has the "whg" parameter
    const whgValue = getQueryParam('whg');
    if (whgValue) {
      const formattedValue = `Wohnung ${whgValue}`;
      if (!hiddenValues.includes(formattedValue)) {
        hiddenValues.push(formattedValue);
        hiddenField.value = hiddenValues.join(',');
        const badge = createBadge(formattedValue);
        selection.appendChild(badge);
        selection.classList.remove('hidden');
        selection.classList.add('flex');

        badge.addEventListener('click', () => {
          badge.remove();
          hiddenValues = hiddenValues.filter((item) => item !== formattedValue);
          hiddenField.value = hiddenValues.join(',');
          if (!selection.querySelector('.badge')) {
            selection.classList.add('hidden');
          }
        });
      }

      // Remove the "whg" parameter from the URL
      removeQueryParam('whg');
    }

    select.addEventListener('change', (event) => {
      if (event.target.value === 'NULL') return;
      const value = event.target.value;

      // make sure the value is not already in the hidden field
      if (hiddenValues.includes(value)) return;

      const badge = createBadge(value);
      selection.appendChild(badge);
      selection.classList.remove('hidden');
      selection.classList.add('flex');

      // add a hidden field (interest) with the value of the selected option as a comma-separated string
      // add the value to the hidden field
      hiddenValues.push(value);
      hiddenField.value = hiddenValues.join(',');

      badge.addEventListener('click', () => {
        badge.remove();
        // remove the value from the hidden field
        hiddenValues = hiddenValues.filter((item) => item !== value);
        hiddenField.value = hiddenValues.join(',');

        // reset the select element
        select.value = '';

        // if there are no more badges, hide the selection
        if (!selection.querySelector('.badge')) {
          selection.classList.add('hidden');
        }
      });
    });
  };

  return {
    init: initialize,
  };
})();

// Initialize
ObjectSelector.init();
