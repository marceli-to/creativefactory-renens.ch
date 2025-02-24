/**
 * Import and initialize the Alpine.js
 */

import Alpine from 'alpinejs'
window.Alpine = Alpine
Alpine.start();

import './bootstrap';
import './modules/maps.js';
import './modules/iso.js';
import './modules/filter.js';
import './modules/object_selector.js';