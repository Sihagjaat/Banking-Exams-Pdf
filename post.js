async function loadPost() {
  const params = new URLSearchParams(window.location.search);
  const id = params.get('id');

  const res = await fetch('posts.json');
  const data = await res.json();
  const post = data.posts.find(p => p.id === id);

  const container = document.getElementById('postContainer');
  if (!post) {
    container.innerHTML = "<h2>Post not found</h2>";
    return;
  }

  container.innerHTML = `
    <h1>${post.title}</h1>
    <img src="${post.image}" alt="${post.title}">
    <p>${post.contentHtml || post.description}</p>
    <a class="download-btn" href="${post.drive}" target="_blank">Download PDF</a>
  `;
}

loadPost();