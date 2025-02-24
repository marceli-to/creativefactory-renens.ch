document.addEventListener('DOMContentLoaded', function() {
  // const objects = document.querySelectorAll('[data-id="objects"] [data-iso]');
  // const floors = document.querySelectorAll('[data-id="floors"] [data-floor-image]');

  // objects.forEach(object => {
  //   object.addEventListener('mouseover', function() {
  //     const floor = this.getAttribute('data-floor');
  //     floors.forEach(floorImage => {
  //       if (floorImage.getAttribute('data-floor-image') === floor) {
  //         floorImage.classList.add('block');
  //         floorImage.classList.remove('hidden');
  //       } 
  //       else {
  //         floorImage.classList.remove('block');
  //         floorImage.classList.add('hidden');
  //       }
  //     });
  //   });
  // });

  const listTable = document.querySelector('[data-objects]');

  // on mouseleave, hide all floor images and show only data-floor-image="3"
  listTable.addEventListener('mouseleave', function() {
    document.querySelectorAll('[data-floor-image]').forEach(floorImage => {
      floorImage.classList.remove('block');
      floorImage.classList.add('hidden');
    });
    document.querySelector(`[data-floor-image="3"]`).classList.remove('hidden');
    document.querySelector(`[data-floor-image="3"]`).classList.add('block');
  });


  const listObjects = document.querySelectorAll('[data-object]');

  listObjects.forEach(object => {
    object.addEventListener('mouseover', function() {
      const floor = this.dataset.objectFloor;
      const number = this.dataset.objectNumber;
      const state = this.dataset.objectState;

      // hide all data-floor-image
      document.querySelectorAll('[data-floor-image]').forEach(floorImage => {
        floorImage.classList.remove('block');
        floorImage.classList.add('hidden');
      });

      // show specific data-floor-image
      document.querySelector(`[data-floor-image="${floor}"]`).classList.remove('hidden');
      document.querySelector(`[data-floor-image="${floor}"]`).classList.add('block');

      // hide all data-iso where data-floor does not equal to floor
      document.querySelectorAll(`[data-iso]`).forEach(iso => {
        if (iso.getAttribute('data-floor') !== floor) {
          iso.classList.add('hidden');
          iso.classList.remove('is-active');
        }
      });

      // find data-iso="number"
      document.querySelectorAll(`[data-iso="${number}"]`).forEach(iso => {
        iso.classList.remove('hidden');
        iso.classList.add('is-active');
      });
    });

    object.addEventListener('mouseleave', function() {
      // hide all data-floor-image
      document.querySelectorAll('[data-floor-image]').forEach(floorImage => {
        floorImage.classList.remove('block');
        floorImage.classList.add('hidden');
      });

      // show all data-iso
      document.querySelectorAll('[data-iso]').forEach(iso => {
        iso.classList.remove('is-active');
        iso.classList.add('hidden');
      });
    });

  });

});