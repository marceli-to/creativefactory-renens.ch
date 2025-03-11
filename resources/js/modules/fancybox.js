import { Fancybox } from '@fancyapps/ui';
import '@fancyapps/ui/dist/fancybox/fancybox.css';
Fancybox.bind('[data-fancybox]', {
  hideScrollbar: false,
  Images: {
    zoom: false,
  },
  groupAll: true,
  Thumbs: false,
  Toolbar: {
    display: {
      left: [],
      middle: [],
      right: ['close'],
    },
  },
});