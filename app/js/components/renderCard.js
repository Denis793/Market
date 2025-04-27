import { addToBasket } from '../utils/card-utils.js';

export function createItemCard(item, _, updateBasket) {
  const card = document.createElement('div');
  card.classList.add('item-card');
  card.setAttribute('data-id', item.toggleId);
  card.setAttribute('data-name', item.name);
  card.setAttribute('data-price', item.price || 120.0);
  card.setAttribute('data-img', item.avatar);

  const safeAvatar = item.avatar || '/app/img/default-image.png';

  card.innerHTML = `
    <img src="${safeAvatar}" alt="${item.name}" />
    <div class="item-info">
      <h3>${item.name}</h3>
      <p>$${parseFloat(item.price || 100.0).toFixed(2)}</p>
      <p>★★★★★ ${item.toggleId}</p>
      <button class="add-to-basket">+ <br><span>Add</span></button>
    </div>
  `;

  const addButton = card.querySelector('.add-to-basket');
  addButton.addEventListener('click', () => {
    addToBasket(item);
    if (typeof updateBasket === 'function') updateBasket();
    if (typeof window.renderBasket === 'function') window.renderBasket();
  });

  return card;
}
