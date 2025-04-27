import { getBasketItems, removeItemFromBasket, updateItemQuantity, clearBasket } from '../utils/card-utils.js';
import { basketItemTemplate } from '../components/basketItemTemplate.js';

function renderCart() {
  const overlay = document.querySelector('.cart-overlay');
  const cartItemsContainer = document.getElementById('cart-items');
  const cartTotal = document.getElementById('cart-total');
  const clearCartBtn = document.querySelector('.clear-cart');

  if (!overlay || !cartItemsContainer || !cartTotal) return;

  const items = getBasketItems();
  cartItemsContainer.innerHTML = '';
  let total = 0;

  if (clearCartBtn) {
    clearCartBtn.style.display = items.length ? 'block' : 'none';
    clearCartBtn.onclick = () => {
      clearBasket();
      renderCart();
    };
  }

  items.forEach((item) => {
    const itemEl = basketItemTemplate(item);

    const removeBtn = itemEl.querySelector('.remove-item');
    const decreaseBtn = itemEl.querySelector('.decrease');
    const increaseBtn = itemEl.querySelector('.increase');

    if (removeBtn) {
      removeBtn.addEventListener('click', () => {
        removeItemFromBasket(item.id);
        renderCart();
      });
    }

    if (decreaseBtn) {
      decreaseBtn.addEventListener('click', () => {
        updateItemQuantity(item.id, item.quantity - 1);
        renderCart();
      });
    }

    if (increaseBtn) {
      increaseBtn.addEventListener('click', () => {
        updateItemQuantity(item.id, item.quantity + 1);
        renderCart();
      });
    }

    total += item.price * item.quantity;
    cartItemsContainer.appendChild(itemEl);
  });

  cartTotal.textContent = `$${total.toFixed(2)}`;
}

document.addEventListener('basket-ready', () => {
  renderCart();
  window.renderBasket = renderCart;
});

document.addEventListener('DOMContentLoaded', () => {
  if (window.basketReady) {
    renderCart();
    window.renderBasket = renderCart;
  }
});
