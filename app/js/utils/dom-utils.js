// Клас для керування хедером
export class HeaderManager {
  constructor(headerId = 'header') {
    this.header = document.getElementById(headerId);
    this.icons = this.header?.querySelectorAll('.header-icon');
  }

  updateHeaderBg(page) {
    if (!this.header) return;

    this.header.classList.toggle('header-bg', page === 'mainpage');

    this.updateIconColor(page);
  }

  updateIconColor(page) {
    if (!this.icons) return;

    this.icons.forEach((icon) => {
      icon.classList.toggle('header-icon', page !== 'mainpage');
    });
  }
}

export function styleMainHeadings() {
  const main = document.getElementById('main');
  const headings = main?.querySelectorAll('h2');
  if (headings && headings.length > 0) {
    headings.forEach((h2) => h2.classList.toggle('h2-custom', true));
  }
}

// Створює елемент з HTML-рядка
export function createElement(htmlString) {
  const template = document.createElement('template');
  template.innerHTML = htmlString.trim();
  return template.content.firstElementChild;
}
