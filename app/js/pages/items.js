import { setupHeader } from './header.js';
import { setupFooter } from './footer.js';
import { getBasketItems, updateBasketCount } from '../utils/card-utils.js';
import { createItemCard } from '../components/renderCard.js';

let allItems = [];
let activeFilter = '';
let activePrice = 100;
let searchQuery = ''; // Для збереження введеного тексту для пошуку

function updateBasketUI() {
  updateBasketCount();
}

function renderItems(itemsContainer, items) {
  itemsContainer.innerHTML = ''; // Очищаємо контейнер
  items.forEach((item) => {
    const card = createItemCard(item, getBasketItems(), updateBasketUI);
    itemsContainer.appendChild(card);
  });
}

function applyFilters(itemsContainer) {
  const filtered = allItems.filter((item) => {
    const matchCategory = activeFilter ? item.toggleId === activeFilter : true;
    const matchPrice = Number(item.price) <= activePrice;
    const matchName = item.name.toLowerCase().includes(searchQuery.toLowerCase()); // Фільтрація по назві
    return matchCategory && matchPrice && matchName;
  });

  renderItems(itemsContainer, filtered);
}

export async function initItemsPage() {
  setupHeader();
  setupFooter();

  const itemsContainer = document.getElementById('items-items');
  const priceInput = document.getElementById('price-filter');
  const priceValue = document.getElementById('price-value');
  const searchInput = document.getElementById('search-input'); // Інпут для фільтрації по назві

  if (!itemsContainer) return;

  try {
    const res = await fetch('./app/data/users.json');
    const data = await res.json();
    allItems = data;
    renderItems(itemsContainer, allItems);

    // Оновлюємо лічильник після завантаження карток
    updateBasketCount();

    const filterButtons = document.querySelectorAll('.filter-button');
    filterButtons.forEach((button) => {
      button.addEventListener('click', () => {
        activeFilter = button.dataset.filter || '';
        applyFilters(itemsContainer);
      });
    });

    if (priceInput && priceValue) {
      priceInput.addEventListener('input', () => {
        activePrice = Number(priceInput.value);
        priceValue.textContent = activePrice;
        applyFilters(itemsContainer);
      });
    }

    // Додаємо обробник подій для пошуку
    if (searchInput) {
      searchInput.addEventListener('input', () => {
        searchQuery = searchInput.value; // Оновлюємо текст для пошуку
        applyFilters(itemsContainer); // Фільтруємо елементи
      });
    }
  } catch (error) {
    console.error('❌ Failed to load users.json:', error);
  }
}
