// Blog page specific JS
document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const filterButtons = document.querySelectorAll('.filter-tugma');
    const blogPosts = document.querySelectorAll('.blog-post');
    
    // Blog filtering
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Get the filter value
            const filter = this.getAttribute('data-filter');
            
            // Filter blog posts
            blogPosts.forEach(post => {
                if(filter === 'hammasi' || post.getAttribute('data-category') === filter) {
                    post.style.display = 'block';
                    setTimeout(() => {
                        post.classList.add('animate-visible');
                    }, 100);
                } else {
                    post.classList.remove('animate-visible');
                    setTimeout(() => {
                        post.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
    
    // Blog post links - simulate dynamic loading
    const blogLinks = document.querySelectorAll('.blog-link');
    
    blogLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Here you would normally navigate to the full blog post page
            // For demo purposes, we'll show a simple alert
            const postTitle = this.closest('.blog-post').querySelector('.blog-sarlavha').textContent.trim();
            const joriyTil = localStorage.getItem('til') || 'uz';
            
            if(joriyTil === 'uz') {
                alert(`"${postTitle}" maqolasini to'liq o'qish uchun ushbu funksiya hali ishlab chiqilmoqda.`);
            } else {
                alert(`Функция для полного чтения статьи "${postTitle}" еще разрабатывается.`);
            }
        });
    });
    
    // Add a back-to-top button for blog posts
    const backToTopButton = document.createElement('button');
    backToTopButton.classList.add('back-to-top');
    backToTopButton.innerHTML = '<i class="fas fa-arrow-up"></i>';
    document.body.appendChild(backToTopButton);
    
    // Add styles for the back-to-top button
    const style = document.createElement('style');
    style.textContent = `
        .back-to-top {
            position: fixed;
            bottom: 20px;
            right: 20px;
            width: 50px;
            height: 50px;
            border-radius: 50%;
            background-color: var(--accent-color);
            color: white;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            box-shadow: var(--shadow-md);
            opacity: 0;
            visibility: hidden;
            transition: opacity 0.3s, visibility 0.3s, transform 0.3s;
            z-index: 1000;
        }
        
        .back-to-top.visible {
            opacity: 1;
            visibility: visible;
        }
        
        .back-to-top:hover {
            transform: translateY(-5px);
        }
    `;
    document.head.appendChild(style);
    
    // Show/hide back-to-top button based on scroll position
    window.addEventListener('scroll', function() {
        if(window.pageYOffset > 300) {
            backToTopButton.classList.add('visible');
        } else {
            backToTopButton.classList.remove('visible');
        }
    });
    
    // Scroll to top when button is clicked
    backToTopButton.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Add a Blog Search Feature
    const blogSection = document.querySelector('.sarlavha-blok');
    const searchContainer = document.createElement('div');
    searchContainer.classList.add('blog-search');
    searchContainer.innerHTML = `
        <div class="search-input-container">
            <input type="text" id="blogSearch" class="search-input" placeholder="Qidirish..." data-lang="uz">
            <input type="text" id="blogSearchRu" class="search-input" placeholder="Поиск..." data-lang="ru">
            <button class="search-button"><i class="fas fa-search"></i></button>
        </div>
    `;
    
    blogSection.after(searchContainer);
    
    // Add styles for search
    const searchStyle = document.createElement('style');
    searchStyle.textContent = `
        .blog-search {
            max-width: 500px;
            margin: 0 auto 40px;
        }
        
        .search-input-container {
            display: flex;
            position: relative;
        }
        
        .search-input {
            flex-grow: 1;
            padding: 12px 16px;
            border: 2px solid var(--border-color);
            border-radius: var(--border-radius-md);
            background-color: var(--bg-primary);
            color: var(--color-primary);
            font-size: var(--font-size-md);
            transition: border-color var(--transition-fast), box-shadow var(--transition-fast);
        }
        
        .search-input:focus {
            border-color: var(--accent-color);
            box-shadow: 0 0 0 2px rgba(var(--accent-color-rgb, 0, 98, 204), 0.2);
            outline: none;
        }
        
        .search-button {
            position: absolute;
            right: 12px;
            top: 50%;
            transform: translateY(-50%);
            background: none;
            border: none;
            color: var(--color-secondary);
            cursor: pointer;
            transition: color var(--transition-fast);
        }
        
        .search-button:hover {
            color: var(--accent-color);
        }
    `;
    document.head.appendChild(searchStyle);
    
    // Apply current language to search inputs
    const joriyTil = localStorage.getItem('til') || 'uz';
    const searchInputs = document.querySelectorAll('.search-input');
    searchInputs.forEach(input => {
        if(input.getAttribute('data-lang') === joriyTil) {
            input.style.display = 'block';
        } else {
            input.style.display = 'none';
        }
    });
    
    // Search functionality
    const searchInput = document.getElementById('blogSearch');
    const searchInputRu = document.getElementById('blogSearchRu');
    const searchButton = document.querySelector('.search-button');
    
    // Function to perform search
    function performSearch() {
        const query = joriyTil === 'uz' ? searchInput.value.toLowerCase() : searchInputRu.value.toLowerCase();
        
        if(query.trim() === '') {
            // If search query is empty, show all posts based on active filter
            const activeFilter = document.querySelector('.filter-tugma.active').getAttribute('data-filter');
            
            blogPosts.forEach(post => {
                if(activeFilter === 'hammasi' || post.getAttribute('data-category') === activeFilter) {
                    post.style.display = 'block';
                    setTimeout(() => {
                        post.classList.add('animate-visible');
                    }, 100);
                } else {
                    post.classList.remove('animate-visible');
                    setTimeout(() => {
                        post.style.display = 'none';
                    }, 300);
                }
            });
            
            return;
        }
        
        // Filter posts by search query
        blogPosts.forEach(post => {
            const title = post.querySelector('.blog-sarlavha').textContent.toLowerCase();
            const content = post.querySelector('.blog-qisqa[data-lang="' + joriyTil + '"]').textContent.toLowerCase();
            
            if(title.includes(query) || content.includes(query)) {
                post.style.display = 'block';
                setTimeout(() => {
                    post.classList.add('animate-visible');
                }, 100);
            } else {
                post.classList.remove('animate-visible');
                setTimeout(() => {
                    post.style.display = 'none';
                }, 300);
            }
        });
    }
    
    // Search on button click
    searchButton.addEventListener('click', performSearch);
    
    // Search on Enter key
    searchInput.addEventListener('keyup', function(e) {
        if(e.key === 'Enter') {
            performSearch();
        }
    });
    
    searchInputRu.addEventListener('keyup', function(e) {
        if(e.key === 'Enter') {
            performSearch();
        }
    });
    
    // Update search input visibility when language changes
    document.addEventListener('languageChanged', function(e) {
        const newLang = e.detail.language;
        
        searchInputs.forEach(input => {
            if(input.getAttribute('data-lang') === newLang) {
                input.style.display = 'block';
            } else {
                input.style.display = 'none';
            }
        });
    });
});