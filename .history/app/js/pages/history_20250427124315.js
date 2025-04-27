import { setupHeader } from './header.js';
import { setupFooter } from './footer.js';

export function loadHistoryCards() {
  setupHeader();
  setupFooter();

  waitForElement('.history-content', (container) => {
    fetch('/Task-2.8/app/data/users.json')
      .then((response) => {
        if (!response.ok) throw new Error('Failed to fetch users.json');
        return response.json();
      })
      .then((users) => {
        let currentIndex = 0;
        const cardsPerPage = 3;

        const renderCards = () => {
          const nextIndex = currentIndex + cardsPerPage;
          const cardsToRender = users.slice(currentIndex, nextIndex);

          cardsToRender.forEach((user, index) => {
            const card = document.createElement('div');
            card.className = 'history-card';
            card.classList.toggle('reverse', (currentIndex + index) % 2 === 1);

            card.innerHTML = `
              <img class='history-card_img' src="${user.avatar}" alt="${user.name}" />
              <div class="text-block_description">
                <h3 class="history-title">${user.name}</h3>
                <p class="history-description">${user.description}</p>
                <p class="history-description">${user.description2}</p>
              </div>
            `;

            container.appendChild(card);
          });

          currentIndex = nextIndex;
          container.appendChild(loadMoreButton);

          if (currentIndex >= users.length) {
            loadMoreButton.style.display = 'none';
          }
        };

        const loadMoreButton = document.createElement('button');
        loadMoreButton.textContent = 'Load More';
        loadMoreButton.className = 'load-more-button';
        loadMoreButton.addEventListener('click', () => {
          renderCards();
        });

        renderCards();
      })
      .catch((error) => console.error('[HISTORY] Помилка при завантаженні карток:', error));
  });
}

function waitForElement(selector, callback, timeout = 2000) {
  const element = document.querySelector(selector);
  if (element) {
    callback(element);
    return;
  }

  const observer = new MutationObserver((mutations, obs) => {
    const el = document.querySelector(selector);
    if (el) {
      obs.disconnect();
      callback(el);
    }
  });

  observer.observe(document.body, {
    childList: true,
    subtree: true,
  });

  setTimeout(() => {
    observer.disconnect();
  }, timeout);
}
