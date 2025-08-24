async function loadPosts() {
  const res = await fetch('posts.json');
  const data = await res.json();
  const posts = data.posts;

  const searchInput = document.getElementById('searchInput');
  const categoryFilter = document.getElementById('categoryFilter');
  const container = document.getElementById('postsContainer');

  // fill category dropdown
  const categories = [...new Set(posts.map(p => p.category))];
  categories.forEach(cat => {
    const opt = document.createElement('option');
    opt.value = cat;
    opt.textContent = cat;
    categoryFilter.appendChild(opt);
  });

  function render() {
    const query = searchInput.value.toLowerCase();
    const category = categoryFilter.value;

    container.innerHTML = '';
    posts
      .filter(p => (category === 'all' || p.category === category))
      .filter(p => p.title.toLowerCase().includes(query) || p.description.toLowerCase().includes(query))
      .forEach(p => {
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `
          <img src="${p.image}" alt="${p.title}">
          <h3>${p.title}</h3>
          <p>${p.description}</p>
          <a href="post.html?id=${p.id}">Read More</a>
        `;
        container.appendChild(card);
      });
  }

  searchInput.addEventListener('input', render);
  categoryFilter.addEventListener('change', render);

  render();
}

loadPosts();