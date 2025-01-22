import Swiper, { Navigation, Autoplay } from 'swiper';
const swiper = new Swiper('.swiper', {
  modules: [Navigation, Autoplay],
  direction: 'horizontal',
  loop: true,
  autoplay: {
    delay: 6000,
  },
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
});