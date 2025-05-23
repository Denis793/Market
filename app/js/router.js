import { updateBasketCount } from './utils/card-utils.js';
import { setupHeader } from './pages/header.js';
import { setupFooter } from './pages/footer.js';
import { showLoader, hideLoader } from './utils/loader.js';

const routes = {
  mainpage: {
    html: './app/html/pages/mainpage.html',
    script: './pages/mainpage.js',
    init: 'initMainPage',
  },
  items: {
    html: './app/html/pages/items.html',
    script: './pages/items.js',
    init: 'initItemsPage',
  },
  history: {
    html: './app/html/pages/history.html',
    script: './pages/history.js',
    init: 'loadHistoryCards',
  },
  basket: {
    html: './app/html/pages/basket.html',
    script: './app/js/pages/basket.js',
    init: null,
  },
  shop: {
    html: './app/html/pages/shop.html',
    script: './pages/shop.js',
    init: null,
  },
};

export function loadPage(page) {
  if (!page || !routes[page]) {
    console.warn('Invalid route requested:', page);
    return;
  }

  const route = routes[page];

  showLoader(); // Показуємо лоадер перед початком завантаження

  fetch(route.html)
    .then((res) => res.text())
    .then((html) => {
      const main = document.getElementById('main');
      if (main) {
        main.innerHTML = html;
      }

      // Оновлюємо header для поточної сторінки
      setupHeader();

      import(route.script).then((module) => {
        if (route.init && typeof module[route.init] === 'function') {
          module[route.init]();
        }
      });

      updateBasketCount();
    })
    .catch((err) => console.error('Failed to load page:', page, err))
    .finally(() => {
      setTimeout(() => {
        hideLoader();
      }, 500);
    });
}

document.addEventListener('DOMContentLoaded', () => {
  setupHeader();
  setupFooter();

  const page = location.hash.replace('#', '') || 'mainpage';
  loadPage(page);
});

window.addEventListener('popstate', () => {
  const page = location.hash.replace('#', '') || 'mainpage';
  loadPage(page);
});
