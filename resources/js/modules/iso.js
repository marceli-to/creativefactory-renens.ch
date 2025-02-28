(() => {
  document.addEventListener('DOMContentLoaded', function() {
    // Target all tables with data-objects attribute
    const listTables = document.querySelectorAll('[data-objects]');
    const listObjects = document.querySelectorAll('[data-object]');

    // Abort if either list tables or list objects is not found
    if (!listTables.length || !listObjects.length) {
      return;
    }
    
    // Utility functions
    const hideAllFloorImages = () => {
      document.querySelectorAll('[data-floor-image]').forEach(floorImage => {
        floorImage.classList.remove('block');
        floorImage.classList.add('hidden');
      });
    };
    
    const showFloorImage = (floor) => {
      document.querySelector(`[data-floor-image="${floor}"]`).classList.remove('hidden');
      document.querySelector(`[data-floor-image="${floor}"]`).classList.add('block');
    };
    
    const hideIsoExceptFloor = (floor) => {
      document.querySelectorAll(`[data-iso]`).forEach(iso => {
        if (iso.getAttribute('data-floor') !== floor) {
          iso.classList.add('hidden');
          iso.classList.remove('is-active');
          iso.classList.remove('is-active-free');
          iso.classList.remove('is-active-taken');
        }
      });
    };
    
    const showIsoByNumber = (number, state) => {
      document.querySelectorAll(`[data-iso="${number}"]`).forEach(iso => {
        iso.classList.remove('hidden');
        
        // Add appropriate active class based on state
        if (state === 'taken' || state === 'reserved') {
          iso.classList.add('is-active-taken');
        } else if (state === 'free') {
          iso.classList.add('is-active-free');
        } else {
          iso.classList.add('is-active'); // Fallback for any other state
        }
      });
    };
    
    const hideAllIso = () => {
      document.querySelectorAll('[data-iso]').forEach(iso => {
        iso.classList.remove('is-active');
        iso.classList.remove('is-active-free');
        iso.classList.remove('is-active-taken');
        iso.classList.add('hidden');
      });
    };
    
    // Default state - show floor 3
    const resetToDefaultState = () => {
      hideAllFloorImages();
      showFloorImage('3');
      hideAllIso();
    };
    
    // Attach events to each table and its header
    listTables.forEach(listTable => {
      const listTableHeader = listTable.querySelector('thead');
      
      // Mouseleave event on the list table
      listTable.addEventListener('mouseleave', resetToDefaultState);
      
      if (listTableHeader) {
        listTableHeader.addEventListener('mouseover', resetToDefaultState);
        listTableHeader.addEventListener('mouseleave', resetToDefaultState);
      }
    });
    
    // Mouse events for each object
    listObjects.forEach(object => {
      object.addEventListener('mouseover', function() {
        const floor = this.dataset.objectFloor;
        const number = this.dataset.objectNumber;
        const state = this.dataset.objectState;
        
        hideAllFloorImages();
        showFloorImage(floor);
        hideIsoExceptFloor(floor);
        showIsoByNumber(number, state);
      });
      
      object.addEventListener('mouseleave', function() {
        hideAllFloorImages();
        hideAllIso();
      });
    });
  });
})();