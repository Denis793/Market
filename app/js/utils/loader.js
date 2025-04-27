export function showLoader() {
  let loader = document.getElementById('page-loader');
  if (loader) return;

  loader = document.createElement('div');
  loader.id = 'page-loader';
  loader.innerHTML = `
    <div class="custom-loader"></div>
  `;
  document.body.appendChild(loader);
}

export function hideLoader() {
  const loader = document.getElementById('page-loader');
  if (loader) loader.remove();
}
