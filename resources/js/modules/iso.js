document.addEventListener('DOMContentLoaded', function() {
  const objects = document.querySelectorAll('[data-id="objects"] [data-iso]');
  const floors = document.querySelectorAll('[data-id="floors"] [data-floor-image]');

  objects.forEach(object => {
    object.addEventListener('mouseover', function() {
      const floor = this.getAttribute('data-floor');
      floors.forEach(floorImage => {
        if (floorImage.getAttribute('data-floor-image') === floor) {
          floorImage.classList.add('block');
          floorImage.classList.remove('hidden');
        } 
        else {
          floorImage.classList.remove('block');
          floorImage.classList.add('hidden');
        }
      });
    });
  });
});