document.addEventListener('DOMContentLoaded', () => {
  const filterButtons = document.querySelectorAll('.filter-btn');
  const sortButton = document.querySelector('.sort-btn');
  const cardList = document.querySelector('.card-list');
  const cards = Array.from(cardList.querySelectorAll('.card-article'));

  let currentFilter = 'all';
  let isSortedByPopular = false;
  const originalOrder = [...cards];

  function applyFilter() {
    cards.forEach(card => {
      const cat = card.dataset.category || 'other';
      card.style.display =
        currentFilter === 'all' || currentFilter === cat ? '' : 'none';
    });
  }

  function applySort() {
    const visibleCards = cards.filter(card => card.style.display !== 'none');

    if (!isSortedByPopular) {
      visibleCards.sort((a, b) => {
        return Number(b.dataset.popular || 0) - Number(a.dataset.popular || 0);
      });
    } else {
      visibleCards.sort((a, b) => {
        return originalOrder.indexOf(a) - originalOrder.indexOf(b);
      });
    }

    visibleCards.forEach(card => cardList.appendChild(card));
  }

  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      currentFilter = btn.dataset.filter;

      filterButtons.forEach(b => b.classList.remove('is-active'));
      btn.classList.add('is-active');

      applyFilter();
      if (isSortedByPopular) applySort();
    });
  });

  if (sortButton) {
    sortButton.addEventListener('click', () => {
      isSortedByPopular = !isSortedByPopular;
      sortButton.textContent = isSortedByPopular ? '人気順（解除）' : '人気順';

      applyFilter();
      applySort();
    });
  }
});
