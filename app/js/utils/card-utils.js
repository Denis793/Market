const basketKey = 'basket';

export function getBasketItems() {
  const basket = JSON.parse(localStorage.getItem(basketKey)) || [];
  return basket;
}

export function addToBasket(item) {
  const basket = getBasketItems();
  const existingItemIndex = basket.findIndex((i) => i.id === item.id);

  if (existingItemIndex !== -1) {
    basket[existingItemIndex].quantity += 1;
  } else {
    basket.push({ ...item, quantity: 1 });
  }

  localStorage.setItem(basketKey, JSON.stringify(basket));
  updateBasketCount();
}

export function updateItemQuantity(itemId, newQuantity) {
  const basket = getBasketItems();
  const item = basket.find((i) => i.id === itemId);

  if (item) {
    item.quantity = Math.max(1, newQuantity);
    localStorage.setItem(basketKey, JSON.stringify(basket));
    updateBasketCount();
  }
}

export function removeItemFromBasket(itemId) {
  const basket = getBasketItems();
  const updatedBasket = basket.filter((item) => item.id !== itemId);
  localStorage.setItem(basketKey, JSON.stringify(updatedBasket));
  updateBasketCount();
}

export function clearBasket() {
  localStorage.removeItem(basketKey);
  updateBasketCount();
}

export function updateBasketCount() {
  const basket = getBasketItems();
  const count = basket.reduce((total, item) => total + item.quantity, 0);
  const basketCountElement = document.getElementById('basket-count');

  if (basketCountElement) {
    basketCountElement.textContent = count;
  } else {
    console.warn('❌ Basket count element not found.');
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const savedCount = localStorage.getItem('basketCount');
  const basketCountElement = document.getElementById('basket-count');
  if (basketCountElement && savedCount !== null) {
    basketCountElement.textContent = savedCount;
  }
});
