// Назва файлу: app/js/pages/footer.js

export function setupFooter() {
  const footerContainer = document.getElementById('footer');
  if (!footerContainer) return;

  fetch('/Task-2.8/app/html/components/footer.html')
    .then((res) => res.text())
    .then((html) => {
      footerContainer.innerHTML = html;
    });
}
