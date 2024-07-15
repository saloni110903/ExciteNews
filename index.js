// document.addEventListener('DOMContentLoaded', () => {
//     const apiKey = 'YOUR_API_KEY';
//     const categoryFilter = document.getElementById('categoryFilter');
//     const searchInput = document.getElementById('searchInput');
//     const articleList = document.getElementById('articleList');
//     let cachedArticles = JSON.parse(localStorage.getItem('exciteNewsArticles')) || [];

//     async function getArticles() {
//         const apiKey = '1e9150cb78af4e92adb8d12c9fc14771';
//         let url = `https://newsapi.org/v2/top-headlines?country=us&apiKey=${apiKey}`;
//         if (categoryFilter.value !== 'all') {
//             url = `https://newsapi.org/v2/top-headlines?country=us&category=${categoryFilter.value}&apiKey=${apiKey}`;
//         }
//         if (searchInput.value.trim() !== '') {
//             url = `https://newsapi.org/v2/everything?q=${searchInput.value}&apiKey=${apiKey}`;
//         }

//         try {
//             const response = await fetch(url);
//             const data = await response.json();

//             if (data.articles && data.articles.length > 0) {
//                 cachedArticles = data.articles;
//                 articleList.innerHTML = '';
//                 data.articles.forEach(article => {
//                     const articleCard = document.createElement('div');
//                     articleCard.className = 'card col';
//                     articleCard.innerHTML = `
//                         <img src="${article.urlToImage}" class="card-img-top" alt="${article.title}">
//                         <div class="card-body">
//                             <h5 class="card-title">${article.title}</h5>
//                             <p class="card-text">${article.description}</p>
//                             <a href="${article.url}" class="btn btn-primary">Read more</a>
//                         </div>
//                     `;
//                     articleList.appendChild(articleCard);
//                 });
//             } else {
//                 articleList.innerHTML = '<p>No articles found</p>';
//             }
//         } catch (error) {
//             // Display cached articles if available
//             if (cachedArticles && cachedArticles.length > 0) {
//                 articleList.innerHTML = '';
//                 cachedArticles.forEach(article => {
//                     const articleCard = document.createElement('div');
//                     articleCard.className = 'card col';
//                     articleCard.innerHTML = `
//                         <img src="${article.urlToImage}" class="card-img-top" alt="${article.title}">
//                         <div class="card-body">
//                             <h5 class="card-title">${article.title}</h5>
//                             <p class="card-text">${article.description
//                             } catch (error) {
//                                 // Display cached articles if available
//                                 if (cachedArticles && cachedArticles.length > 0) {
//                                     articleList.innerHTML = '';
//                                     cachedArticles.forEach(article => {
//                                         const articleCard = document.createElement('div');
//                                         articleCard.className = 'card col';
//                                         articleCard.innerHTML = `
//                                             <img src="${article.urlToImage}" class="card-img-top" alt="${article.title}">
//                                             <div class="card-body">
//                                                 <h5 class="card-title">${article.title}</h5>
//                                                 <p class="card-text">${article.description}</p>
//                                                 <a href="${article.url}" class="btn btn-primary">Read more</a>
//                                             </div>
//                                         `;
//                                         articleList.appendChild(articleCard);
//                                     });
//                                 } else {
//                                     articleList.innerHTML = '<p>No articles found and no cached articles available.</p>';
//                                 }
                            
document.addEventListener('DOMContentLoaded', () => {
    const apiKey = '1e9150cb78af4e92adb8d12c9fc14771'; // Replace with your actual News API key
    const categoryFilter = document.getElementById('categoryFilter');
    const searchInput = document.getElementById('searchInput');
    const articleList = document.getElementById('articleList');
    let cachedArticles = JSON.parse(localStorage.getItem('exciteNewsArticles')) || [];

    async function fetchArticles(url) {
        try {
            const response = await fetch(url);
            const data = await response.json();

            if (data.articles && data.articles.length > 0) {
                cachedArticles = data.articles;
                localStorage.setItem('exciteNewsArticles', JSON.stringify(cachedArticles));
                updateArticleList(cachedArticles);
            } else {
                articleList.innerHTML = '<p>No articles found</p>';
            }
        } catch (error) {
            console.error('Error fetching articles:', error);
            // Display cached articles if available
            if (cachedArticles && cachedArticles.length > 0) {
                updateArticleList(cachedArticles);
            } else {
                articleList.innerHTML = '<p>Failed to fetch articles and no cached articles available.</p>';
            }
        }
    }

    function updateArticleList(articles) {
        articleList.innerHTML = '';
        articles.forEach(article => {
            const articleCard = document.createElement('div');
            articleCard.className = 'card col';
            articleCard.innerHTML = `
                <img src="${article.urlToImage}" class="card-img-top" alt="${article.title}">
                <div class="card-body">
                    <h5 class="card-title">${article.title}</h5>
                    <p class="card-text">${article.description}</p>
                    <a href="${article.url}" class="btn btn-primary">Read more</a>
                </div>
            `;
            articleList.appendChild(articleCard);
        });
    }

    function handleFiltersAndSearch() {
        let url = `https://newsapi.org/v2/top-headlines?country=us&apiKey=${apiKey}`;
        if (categoryFilter.value !== 'all') {
            url = `https://newsapi.org/v2/top-headlines?country=us&category=${categoryFilter.value}&apiKey=${apiKey}`;
        }
        if (searchInput.value.trim() !== '') {
            url = `https://newsapi.org/v2/everything?q=${searchInput.value}&apiKey=${apiKey}`;
        }
        fetchArticles(url);
    }

    // Initial fetch on page load
    handleFiltersAndSearch();

    // Event listeners for filter and search input changes
    categoryFilter.addEventListener('change', handleFiltersAndSearch);
    searchInput.addEventListener('input', handleFiltersAndSearch);
});
