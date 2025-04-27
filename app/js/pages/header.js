export function setupHeader() {
  const headerContainer = document.getElementById('header');
  if (!headerContainer) return;

  // Завантажуємо HTML для header
  fetch('./app/html/components/header.html')
    .then((res) => res.text())
    .then((html) => {
      headerContainer.innerHTML = html;

      // Визначаємо, чи це mainpage
      const currentPage = window.location.hash.replace('#', '') || 'mainpage';
      headerContainer.classList.toggle('mainpage-header', currentPage === 'mainpage');

      const basketLink = document.getElementById('basket-icon');
      if (basketLink) {
        basketLink.addEventListener('click', (e) => {
          e.preventDefault();

          // Очікуємо появу openBasketSidebar
          let attempts = 0;
          const maxAttempts = 10;

          const tryOpenSidebar = setInterval(() => {
            if (typeof window.openBasketSidebar === 'function') {
              window.openBasketSidebar();
              clearInterval(tryOpenSidebar);
            } else {
              attempts++;
              console.warn(`[HEADER] Пропущено перехід: basket (спроба ${attempts})`);
              if (attempts >= maxAttempts) {
                clearInterval(tryOpenSidebar);
              }
            }
          }, 200);
        });
      }

      const navLinks = headerContainer.querySelectorAll('[data-page]');
      navLinks.forEach((link) => {
        link.addEventListener('click', (e) => {
          e.preventDefault();
          const page = link.getAttribute('data-page');
          if (page && page !== 'basket') {
            window.location.hash = `#${page}`;
            loadPage(page);
          }
        });
      });

      // Додаємо функціональність для меню-бургера
      const menuBurger = document.getElementById('menu-burger');
      const nav = headerContainer.querySelector('.nav');
      if (menuBurger && nav) {
        menuBurger.addEventListener('click', () => {
          nav.classList.toggle('active');
          menuBurger.classList.toggle('active');
        });
      }

      // Оновлюємо лічильник після завантаження
      updateBasketCount();
    })
    .catch((err) => {
      console.error('[HEADER] Помилка при завантаженні header.html:', err);
    });
}

// Завантажуємо сторінки при навігації
function loadPage(page) {
  const mainContent = document.getElementById('main');
  if (!mainContent) return;

  fetch(`./app/html/pages/${page}.html`)
    .then((res) => res.text())
    .then((html) => {
      mainContent.innerHTML = html;

      if (page === 'items') {
        import('./items.js').then((module) => module.initItemsPage());
      } else if (page === 'history') {
        import('./history.js').then((module) => module.loadHistoryCards());
      }
    })
    .catch((err) => {
      console.error(`Не вдалося завантажити сторінку: ${page}`, err);
    });
}

// Функція для оновлення лічильника товарів в корзині
function updateBasketCount() {
  const basketCountElement = document.getElementById('basket-count');
  if (basketCountElement) {
    const basket = JSON.parse(localStorage.getItem('basket')) || [];
    const count = basket.reduce((total, item) => total + item.quantity, 0);
    basketCountElement.textContent = count;
  }
}

// Додамо оновлення стилів на зміну хеша
window.addEventListener('hashchange', () => {
  const headerContainer = document.getElementById('header');
  if (!headerContainer) return;

  const currentPage = window.location.hash.replace('#', '') || 'mainpage';
  headerContainer.classList.toggle('mainpage-header', currentPage === 'mainpage');
});
