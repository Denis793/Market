// Назва файлу: app/js/components/basketSidebarSetup.js

import { getBasketItems, removeItemFromBasket, updateItemQuantity } from '../utils/card-utils.js';
import { basketItemTemplate } from './basketItemTemplate.js';

export function renderCart() {
  const cartItemsContainer = document.getElementById('cart-items');
  const cartTotal = document.getElementById('cart-total');
  const clearCartBtn = document.querySelector('.clear-cart');

  if (!cartItemsContainer || !cartTotal) return;

  const items = getBasketItems();
  cartItemsContainer.innerHTML = '';

  let total = 0;
  items.forEach((item) => {
    const el = basketItemTemplate(item);
    cartItemsContainer.appendChild(el);
    total += item.price * item.quantity;
  });

  cartTotal.textContent = `$${total.toFixed(2)}`;

  if (clearCartBtn) {
    clearCartBtn.classList.toggle('hidden', items.length === 0);
  }
}

export function bindBasketEvents() {
  const overlay = document.querySelector('.cart-overlay');
  const closeBtn = document.querySelector('.cart-close');
  const clearCartBtn = document.querySelector('.clear-cart');

  if (closeBtn && overlay) {
    closeBtn.addEventListener('click', () => overlay.classList.remove('active'));
  }

  if (overlay) {
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) overlay.classList.remove('active');
    });
  }

  if (clearCartBtn) {
    clearCartBtn.addEventListener('click', () => {
      localStorage.removeItem('basket');
      renderCart();
    });
  }
}
