import { setupHeader } from './header.js';
import { setupFooter } from './footer.js';
import { updateBasketCount } from '../utils/card-utils.js';

export function initMainPage() {
  setupHeader();
  setupFooter();
  updateBasketCount();

  const allFoxesBtn = document.querySelector('.all-foxes-btn');
  if (allFoxesBtn) {
    allFoxesBtn.addEventListener('click', (e) => {
      e.preventDefault();
      window.location.hash = '#items';
    });
  }

  const newsletterForm = document.querySelector('.newsletter-form');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = newsletterForm.querySelector('input[type="email"]').value;
      console.log('Subscribed with email:', email);
      newsletterForm.reset();
    });
  }
}
