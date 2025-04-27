import { removeItemFromBasket, updateItemQuantity } from '../utils/card-utils.js';

export function basketItemTemplate(item) {
  const container = document.createElement('div');
  container.className = 'item-card';

  container.innerHTML = `
    <div class="item-img">
      <img src="${item.image || item.avatar}" alt="${item.name}" />
    </div>
    <div class="item-info">
      <div>
        <p class="item-title">${item.name}</p>
        <p class="item-price">$${item.price}</p>
      </div>
      <div class="item-controls">
        <button class="decrease">-</button>
        <span class="item-qty">${item.quantity}</span>
        <button class="increase">+</button>
        <button class="remove-item">✕</button>
      </div>
    </div>
  `;

  container.querySelector('.decrease').addEventListener('click', () => {
    updateItemQuantity(item.id, item.quantity - 1);
  });

  container.querySelector('.increase').addEventListener('click', () => {
    updateItemQuantity(item.id, item.quantity + 1);
  });

  container.querySelector('.remove-item').addEventListener('click', () => {
    removeItemFromBasket(item.id);
  });

  return container;
}
