// Asosiy JavaScript fayli - Main JavaScript file
document.addEventListener('DOMContentLoaded', function() {
    // Til almashtirish - Language switching
    initTilAlmashtirish();
    
    // Tema almashtirish - Theme switching
    initTemaAlmashtirish();
    
    // Navbar scroll effekti - Navbar scroll effect
    initNavbarScroll();
    
    // Mobil menyu - Mobile menu
    initMobilMenu();
    
    // Loading sahifa - Loading page
    initLoadingSahifa();
    
    // Scroll reveal animatsiyasi - Scroll reveal animation
    initScrollReveal();
    
    // Skill progresslarni animatsiya qilish - Animate skill progress bars
    initSkillProgress();
    
    // Portfolio filterlar - Portfolio filters
    initPortfolioFilter();
    
    // Portfolio modal - Portfolio modals
    initPortfolioModal();
    
    // Forma yuborish - Form submission
    initAloqaForma();
    
    // 3D modelni boshlash - Initialize 3D model
    if (document.getElementById('canvas-container')) {
        initThreeJS();
    }
});

// Til almashtirish funksiyasi - Language switching function
function initTilAlmashtirish() {
    const tilTugmalar = document.querySelectorAll('.til-tugma');
    
    // Default til - Default language
    let joriyTil = localStorage.getItem('til') || 'uz';
    tilniAlmashtir(joriyTil);
    
    // Til tugmalarini boyash - Mark active language button
    tilTugmalar.forEach(tugma => {
        if (tugma.dataset.til === joriyTil) {
            tugma.classList.add('aktiv');
        }
        
        tugma.addEventListener('click', function() {
            const yangiTil = this.dataset.til;
            localStorage.setItem('til', yangiTil);
            
            // Barcha til tugmalaridan aktiv klassni o'chirish - Remove active class from all language buttons
            tilTugmalar.forEach(t => t.classList.remove('aktiv'));
            
            // Tanlangan tugmaga aktiv klass qo'shish - Add active class to the selected button
            this.classList.add('aktiv');
            
            // Tilni o'zgartirish - Change language
            tilniAlmashtir(yangiTil);
        });
    });
}

// Tilni o'zgartirish - Change language
function tilniAlmashtir(til) {
    document.querySelectorAll('[data-lang]').forEach(element => {
        element.classList.remove('aktiv');
    });
    
    document.querySelectorAll(`[data-lang="${til}"]`).forEach(element => {
        element.classList.add('aktiv');
    });
}

// Tema almashtirish - Theme switching
function initTemaAlmashtirish() {
    const temaTugma = document.querySelector('.tema-tugma');
    if (!temaTugma) return;
    
    // Default tema - Default theme
    let joriyTema = localStorage.getItem('tema') || 'ochiq';
    document.documentElement.setAttribute('data-tema', joriyTema);
    
    // Tema ikonkasini o'zgartirish - Change theme icon
    if (joriyTema === 'qorong\'i') {
        temaTugma.innerHTML = '<i class="fas fa-sun"></i>';
    } else {
        temaTugma.innerHTML = '<i class="fas fa-moon"></i>';
    }
    
    temaTugma.addEventListener('click', function() {
        if (joriyTema === 'ochiq') {
            joriyTema = 'qorong\'i';
            temaTugma.innerHTML = '<i class="fas fa-sun"></i>';
        } else {
            joriyTema = 'ochiq';
            temaTugma.innerHTML = '<i class="fas fa-moon"></i>';
        }
        
        document.documentElement.setAttribute('data-tema', joriyTema);
        localStorage.setItem('tema', joriyTema);
    });
}

// Navbar scroll effekti - Navbar scroll effect
function initNavbarScroll() {
    const navbar = document.querySelector('.bosh-nav');
    if (!navbar) return;
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('aktiv');
        } else {
            navbar.classList.remove('aktiv');
        }
    });
}

// Mobil menyu - Mobile menu
function initMobilMenu() {
    const menuTugma = document.querySelector('.menu-tugma');
    const navMenu = document.querySelector('.nav-menyu');
    if (!menuTugma || !navMenu) return;
    
    menuTugma.addEventListener('click', function() {
        navMenu.classList.toggle('aktiv');
        
        // Menyu ikonkasini o'zgartirish - Change menu icon
        if (navMenu.classList.contains('aktiv')) {
            menuTugma.innerHTML = '<i class="fas fa-times"></i>';
        } else {
            menuTugma.innerHTML = '<i class="fas fa-bars"></i>';
        }
    });
    
    // Menyu punktlari bosilganda menyuni yopish - Close menu when menu items are clicked
    document.querySelectorAll('.nav-punkt a').forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('aktiv');
            menuTugma.innerHTML = '<i class="fas fa-bars"></i>';
        });
    });
}

// Loading sahifa - Loading page
function initLoadingSahifa() {
    const loadingSahifa = document.querySelector('.loading-sahifa');
    if (!loadingSahifa) return;
    
    // Progress animatsiyasi - Progress animation
    const progressIchki = document.querySelector('.loading-progres-ichki');
    if (progressIchki) {
        setTimeout(() => {
            progressIchki.style.width = '100%';
        }, 100);
    }
    
    // Loading sahifani yashirish - Hide loading page
    setTimeout(() => {
        loadingSahifa.style.opacity = '0';
        setTimeout(() => {
            loadingSahifa.style.display = 'none';
        }, 500);
    }, 3000);
}

// Scroll reveal animatsiyasi - Scroll reveal animation
function initScrollReveal() {
    const scrollElements = document.querySelectorAll('.scroll-reveal');
    
    const elementInView = (el, scrollOffset = 100) => {
        const elementTop = el.getBoundingClientRect().top;
        return (elementTop <= (window.innerHeight || document.documentElement.clientHeight) - scrollOffset);
    };
    
    const displayScrollElement = (element) => {
        element.classList.add('aktiv');
    };
    
    const hideScrollElement = (element) => {
        element.classList.remove('aktiv');
    };
    
    const handleScrollAnimation = () => {
        scrollElements.forEach((el) => {
            if (elementInView(el, 100)) {
                displayScrollElement(el);
            } else {
                hideScrollElement(el);
            }
        });
    };
    
    window.addEventListener('scroll', () => {
        handleScrollAnimation();
    });
    
    // Initial check on page load
    handleScrollAnimation();
}

// Skill progresslarni animatsiya qilish - Animate skill progress bars
function initSkillProgress() {
    const skillBars = document.querySelectorAll('.skill-progress-ichki');
    
    if (skillBars.length === 0) return;
    
    const showProgress = () => {
        skillBars.forEach(bar => {
            const target = bar.getAttribute('data-target');
            bar.style.width = target + '%';
        });
    };
    
    // Intersection Observer API
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                showProgress();
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });
    
    // Observe the first skill bar's parent container
    if (skillBars.length > 0) {
        const skillSection = skillBars[0].closest('.bolim');
        if (skillSection) {
            observer.observe(skillSection);
        }
    }
}

// Portfolio filterlar - Portfolio filters
function initPortfolioFilter() {
    const filterButtons = document.querySelectorAll('.filter-tugma');
    const portfolioItems = document.querySelectorAll('.loyiha-karta');
    
    if (filterButtons.length === 0 || portfolioItems.length === 0) return;
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Barcha filter tugmalaridan aktiv klassni o'chirish - Remove active class from all filter buttons
            filterButtons.forEach(btn => btn.classList.remove('aktiv'));
            
            // Tanlangan tugmaga aktiv klass qo'shish - Add active class to the selected button
            this.classList.add('aktiv');
            
            const filter = this.dataset.filter;
            
            portfolioItems.forEach(item => {
                if (filter === 'hammasi') {
                    item.style.display = 'block';
                } else if (item.dataset.category === filter) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
                
                // Animatsiya qo'shish - Add animation
                setTimeout(() => {
                    if (item.style.display === 'block') {
                        item.style.transform = 'scale(1)';
                        item.style.opacity = '1';
                    }
                }, 100);
            });
        });
    });
}

// Portfolio modal - Portfolio modals
function initPortfolioModal() {
    const loyihaKartas = document.querySelectorAll('.loyiha-karta');
    const modal = document.querySelector('.loyiha-modal');
    
    if (!modal || loyihaKartas.length === 0) return;
    
    const modalContent = modal.querySelector('.loyiha-modal-content');
    const closeButton = modal.querySelector('.modal-yopish');
    
    loyihaKartas.forEach(karta => {
        karta.addEventListener('click', function() {
            const loyihaId = this.dataset.id;
            const loyihaMalumot = getLoyihaMalumot(loyihaId);
            
            // Modalni to'ldirish - Fill the modal
            if (loyihaMalumot) {
                const currentLang = localStorage.getItem('til') || 'uz';
                modalContent.innerHTML = `
                    <button class="modal-yopish"><i class="fas fa-times"></i></button>
                    <div class="loyiha-modal-rasm">
                        <img src="${loyihaMalumot.rasm}" alt="${loyihaMalumot.nomi[currentLang]}">
                    </div>
                    <h2 class="modal-sarlavha">${loyihaMalumot.nomi[currentLang]}</h2>
                    <div class="modal-texnologiyalar">${loyihaMalumot.texnologiyalar}</div>
                    <div class="modal-tavsif">${loyihaMalumot.tavsif[currentLang]}</div>
                    <div class="modal-linklar">
                        <a href="${loyihaMalumot.demo}" target="_blank" class="tugma">${currentLang === 'uz' ? 'Ko\'rish' : 'Смотреть'}</a>
                        <a href="${loyihaMalumot.github}" target="_blank" class="tugma tugma-ikkilamchi">GitHub</a>
                    </div>
                `;
                
                // Modalni ochish - Open the modal
                modal.classList.add('aktiv');
                
                // Modalda yopish tugmasini yangilash - Update the close button in the modal
                const newCloseButton = modalContent.querySelector('.modal-yopish');
                if (newCloseButton) {
                    newCloseButton.addEventListener('click', closeModal);
                }
                
                // Body scroll lock
                document.body.style.overflow = 'hidden';
            }
        });
    });
    
    // Yopish tugmasi uchun event listener - Event listener for close button
    if (closeButton) {
        closeButton.addEventListener('click', closeModal);
    }
    
    // Modalni yopish funksiyasi - Function to close the modal
    function closeModal() {
        modal.classList.remove('aktiv');
        document.body.style.overflow = '';
    }
    
    // Modal tashqarisiga bosilganda yopish - Close when clicking outside the modal
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModal();
        }
    });
}

// Loyiha ma'lumotlarini olish - Get project details
function getLoyihaMalumot(id) {
    // Bu yerda API dan yoki statik ma'lumotlardan loyiha ma'lumotlarini olish mumkin
    // Here you can get project data from API or static data
    const loyihalar = [
        {
            id: '1',
            nomi: {
                uz: 'E-commerce Platform',
                ru: 'Платформа электронной коммерции'
            },
            texnologiyalar: 'HTML, CSS, JavaScript, Django',
            tavsif: {
                uz: 'To\'liq funksional internet do\'kon platformasi. Mahsulotlarni saralash, qidiruv, savat, to\'lov tizimi va admin panel mavjud.',
                ru: 'Полнофункциональная платформа интернет-магазина. Включает сортировку товаров, поиск, корзину, систему оплаты и админ-панель.'
            },
            rasm: 'https://images.pexels.com/photos/6956887/pexels-photo-6956887.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
            demo: '#',
            github: 'https://github.com'
        },
        {
            id: '2',
            nomi: {
                uz: 'Task Management App',
                ru: 'Приложение для управления задачами'
            },
            texnologiyalar: 'JavaScript, React, MongoDB',
            tavsif: {
                uz: 'Vazifalarni boshqarish uchun ReactJS da yaratilgan web dastur. Drag-and-drop interfeys, eslatmalar, deadline va statistika.',
                ru: 'Веб-приложение для управления задачами, созданное на ReactJS. Включает интерфейс перетаскивания, уведомления, сроки и статистику.'
            },
            rasm: 'https://images.pexels.com/photos/3183153/pexels-photo-3183153.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
            demo: '#',
            github: 'https://github.com'
        },
        {
            id: '3',
            nomi: {
                uz: 'Restoran Web Sayti',
                ru: 'Веб-сайт ресторана'
            },
            texnologiyalar: 'HTML, CSS, JavaScript, PHP',
            tavsif: {
                uz: 'Zamonaviy restoran uchun responsive dizayn. Menyu, onlayn buyurtma, mijozlar sharhlari va lokatsiya xaritasi mavjud.',
                ru: 'Адаптивный дизайн для современного ресторана. Включает меню, онлайн-заказ, отзывы клиентов и карту местоположения.'
            },
            rasm: 'https://images.pexels.com/photos/67468/pexels-photo-67468.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
            demo: '#',
            github: 'https://github.com'
        }
    ];
    
    return loyihalar.find(loyiha => loyiha.id === id);
}

// Forma yuborish - Form submission
function initAloqaForma() {
    const aloqaForma = document.querySelector('.aloqa-forma');
    if (!aloqaForma) return;
    
    aloqaForma.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Formani validatsiya qilish - Validate the form
        const ismi = aloqaForma.querySelector('#ismi').value.trim();
        const email = aloqaForma.querySelector('#email').value.trim();
        const xabar = aloqaForma.querySelector('#xabar').value.trim();
        
        if (!ismi || !email || !xabar) {
            alert(localStorage.getItem('til') === 'uz' ? 'Barcha maydonlarni to\'ldiring' : 'Заполните все поля');
            return;
        }
        
        if (!validateEmail(email)) {
            alert(localStorage.getItem('til') === 'uz' ? 'Email xato kiritildi' : 'Неверный формат электронной почты');
            return;
        }
        
        // Forma ma'lumotlarini yuborish - Send form data
        const formData = {
            ismi,
            email,
            xabar
        };
        
        // EmailJS orqali yuborish uchun tayyorlanadi
        // Ready to send via EmailJS
        console.log('Form data:', formData);
        
        // Formani tozalash - Clear the form
        aloqaForma.reset();
        
        // Muvaffaqiyatli xabar ko'rsatish - Show success message
        alert(localStorage.getItem('til') === 'uz' ? 'Xabaringiz yuborildi!' : 'Ваше сообщение отправлено!');
    });
}

// Email validatsiya - Email validation
function validateEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

// ThreeJS uchun funksiya - Function for ThreeJS
function initThreeJS() {
    // THREE.JS va orttirmasi uchun skript yuklash - Load scripts for THREE.JS and dependency
    const loadScript = (src) => {
        return new Promise((resolve, reject) => {
            const script = document.createElement('script');
            script.src = src;
            script.onload = resolve;
            script.onerror = reject;
            document.head.appendChild(script);
        });
    };
    
    // THREE.JS va kerakli skriptlarni yuklash - Load THREE.JS and required scripts
    Promise.all([
        loadScript('https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js'),
        loadScript('https://cdn.jsdelivr.net/npm/three@0.128.0/examples/js/loaders/GLTFLoader.min.js')
    ]).then(() => {
        // THREE.JS logikasi - THREE.JS logic
        createThreeScene();
    }).catch(err => {
        console.error('THREE.JS yuklanishida xatolik:', err);
    });
}

// THREE.JS uchun asosiy funksiya - Main function for THREE.JS
function createThreeScene() {
    if (typeof THREE === 'undefined') {
        console.error('THREE.JS yuklanmagan');
        return;
    }
    
    const container = document.getElementById('canvas-container');
    
    // Sahna, kamera va renderer yaratish - Create scene, camera, and renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 5;
    
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0); // Transparent background
    container.appendChild(renderer.domElement);
    
    // Yorug'lik qo'shish - Add lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);
    
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(1, 1, 1);
    scene.add(directionalLight);
    
    // Texnologiya logolari uchun geometriyalar - Geometries for technology logos
    const logos = [];
    const colors = [0x3498db, 0x2ecc71, 0x9b59b6, 0xe74c3c, 0xf39c12];
    
    // Oddiy geometriyalar yaratish (modellar o'rniga) - Create simple geometries (instead of models)
    for (let i = 0; i < 5; i++) {
        let geometry;
        
        switch (i % 5) {
            case 0: // HTML
                geometry = new THREE.BoxGeometry(1, 1, 1);
                break;
            case 1: // CSS
                geometry = new THREE.SphereGeometry(0.6, 32, 32);
                break;
            case 2: // JS
                geometry = new THREE.TorusGeometry(0.6, 0.2, 16, 100);
                break;
            case 3: // Python
                geometry = new THREE.ConeGeometry(0.6, 1, 32);
                break;
            case 4: // Django
                geometry = new THREE.DodecahedronGeometry(0.6);
                break;
        }
        
        const material = new THREE.MeshStandardMaterial({ color: colors[i % colors.length], transparent: true, opacity: 0.8 });
        const logo = new THREE.Mesh(geometry, material);
        
        // Logolarni aylanada joylash - Place logos in a circle
        const angle = (i / 5) * Math.PI * 2;
        const radius = 3;
        logo.position.x = Math.cos(angle) * radius;
        logo.position.y = Math.sin(angle) * radius;
        logo.position.z = 0;
        
        scene.add(logo);
        logos.push({ mesh: logo, initialX: logo.position.x, initialY: logo.position.y, angle: angle });
    }
    
    // Animatsiya - Animation
    function animate() {
        requestAnimationFrame(animate);
        
        // Logolarni aylantirish - Rotate logos
        logos.forEach((logo, i) => {
            logo.angle += 0.002;
            const radius = 3;
            logo.mesh.position.x = Math.cos(logo.angle) * radius;
            logo.mesh.position.y = Math.sin(logo.angle) * radius;
            
            // O'z o'qi atrofida aylantirish - Rotate around its own axis
            logo.mesh.rotation.x += 0.01;
            logo.mesh.rotation.y += 0.01;
        });
        
        renderer.render(scene, camera);
    }
    
    // Oyna o'lchamini o'zgartirish uchun event listener - Event listener for window resize
    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });
    
    animate();
}