export function setupBasketOverlay() {
  const basketContainer = document.getElementById('basket');
  if (!basketContainer) return;

  fetch('./app/html/components/basket.html')
    .then((res) => {
      if (!res.ok) {
        throw new Error('[BASKET] Невдалося завантажити basket.html');
      }
      return res.text();
    })
    .then((html) => {
      basketContainer.innerHTML = html;

      const overlay = document.querySelector('.cart-overlay');
      const closeBtn = document.querySelector('.cart-close');

      if (!overlay || !closeBtn) {
        console.warn('[BASKET] Overlay або кнопка закриття не знайдені.');
        return;
      }

      setupOverlayEvents(overlay, closeBtn);

      window.openBasketSidebar = () => overlay.classList.add('active');
      window.closeBasketSidebar = () => overlay.classList.remove('active');
      window.basketReady = true;

      document.dispatchEvent(new CustomEvent('basket-ready'));
    })
    .catch((err) => {
      console.error('[BASKET] Помилка завантаження HTML:', err);
    });
}

// Функція для налаштування подій сайдбара
function setupOverlayEvents(overlay, closeBtn) {
  closeBtn.addEventListener('click', () => overlay.classList.remove('active'));
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) overlay.classList.remove('active');
  });
}

document.addEventListener('DOMContentLoaded', setupBasketOverlay);
