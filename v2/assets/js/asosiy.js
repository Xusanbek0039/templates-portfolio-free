// DOM Elements
const body = document.body;
const menyuTugma = document.querySelector('.menyu-tugma');
const asosiyMenyu = document.querySelector('.asosiy-menyu');
const yopishTugma = document.querySelector('.yopish-tugma');
const temaTugma = document.querySelector('.tema-tugma');
const tilTugmalar = document.querySelectorAll('.til-tugma');
const yuklashEkrani = document.querySelector('.yuklash');
const animateElements = document.querySelectorAll('.animate-scroll');

// Store the current theme & language
let joriyTema = localStorage.getItem('tema') || 'dark';
let joriyTil = localStorage.getItem('til') || 'uz';

// ----- Initialize the page -----
document.addEventListener('DOMContentLoaded', function() {
    // Apply saved theme & language
    temaniOzgartir(joriyTema);
    tilniOzgartir(joriyTil);
    
    // Create menu overlay
    const menyuOverlay = document.createElement('div');
    menyuOverlay.classList.add('menyu-overlay');
    body.appendChild(menyuOverlay);
    
    // Initialize scroll animations
    setTimeout(() => {
        scrollAnimations();
        window.addEventListener('scroll', scrollAnimations);
    }, 100);
    
    // Initialize 3D animations if present on the page
    if(document.getElementById('uch-d-konteyner')) {
        initThreeJS();
    }
    
    // Remove loading screen after everything is loaded
    setTimeout(() => {
        yuklashEkrani.classList.add('done');
        setTimeout(() => {
            body.classList.remove('yuklash-holat');
        }, 500);
    }, 3000); // Loading screen will disappear after 3 seconds
});

// ----- Event Listeners -----
// Menu toggle
menyuTugma.addEventListener('click', function() {
    toggleMenyu();
});

yopishTugma.addEventListener('click', function() {
    toggleMenyu();
});

document.addEventListener('click', function(e) {
    if(e.target.classList.contains('menyu-overlay')) {
        toggleMenyu();
    }
});

// Theme toggle
temaTugma.addEventListener('click', function() {
    const yangiTema = joriyTema === 'light' ? 'dark' : 'light';
    temaniOzgartir(yangiTema);
});

// Language toggle
tilTugmalar.forEach(tugma => {
    tugma.addEventListener('click', function() {
        const yangiTil = this.getAttribute('data-til');
        tilniOzgartir(yangiTil);
    });
});

// ----- Functions -----
// Toggle menu
function toggleMenyu() {
    asosiyMenyu.classList.toggle('active');
    menyuTugma.classList.toggle('active');
    document.querySelector('.menyu-overlay').classList.toggle('active');
    
    if(asosiyMenyu.classList.contains('active')) {
        body.style.overflow = 'hidden';
    } else {
        body.style.overflow = '';
    }
}

// Change theme
function temaniOzgartir(tema) {
    joriyTema = tema;
    body.setAttribute('data-theme', tema);
    localStorage.setItem('tema', tema);
}

// Change language
function tilniOzgartir(til) {
    joriyTil = til;
    
    // Update active class on language buttons
    tilTugmalar.forEach(tugma => {
        if(tugma.getAttribute('data-til') === til) {
            tugma.classList.add('active');
        } else {
            tugma.classList.remove('active');
        }
    });
    
    // Show content for the selected language
    const tilElements = document.querySelectorAll('[data-lang]');
    tilElements.forEach(el => {
        if(el.getAttribute('data-lang') === til) {
            if(el.tagName === 'SPAN' || el.tagName === 'A') {
                el.style.display = 'inline-block';
            } else {
                el.style.display = 'block';
            }
        } else {
            el.style.display = 'none';
        }
    });
    
    localStorage.setItem('til', til);
}

// Scroll animations
function scrollAnimations() {
    animateElements.forEach(element => {
        const elementPosition = element.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.2;
        
        const delay = element.getAttribute('data-delay') || 0;
        
        if(elementPosition < screenPosition) {
            setTimeout(() => {
                element.classList.add('animate-visible');
            }, delay);
        }
    });
}

// ThreeJS 3D Animation (if the container exists)
function initThreeJS() {
    // Check if the required libraries are loaded
    if(typeof THREE === 'undefined') {
        console.warn('Three.js not loaded yet');
        return;
    }
    
    const container = document.getElementById('uch-d-konteyner');
    
    // Create scene, camera and renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);
    
    // Add ambient light
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);
    
    // Add directional light
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(1, 1, 1);
    scene.add(directionalLight);
    
    // Create 3D objects (technology logos)
    const logos = [];
    const logoGeometry = new THREE.BoxGeometry(1, 1, 1);
    
    // Create different materials for each logo
    const htmlMaterial = new THREE.MeshStandardMaterial({ color: 0xE34F26, roughness: 0.5 });
    const cssMaterial = new THREE.MeshStandardMaterial({ color: 0x1572B6, roughness: 0.5 });
    const jsMaterial = new THREE.MeshStandardMaterial({ color: 0xF7DF1E, roughness: 0.5 });
    const pythonMaterial = new THREE.MeshStandardMaterial({ color: 0x3776AB, roughness: 0.5 });
    const djangoMaterial = new THREE.MeshStandardMaterial({ color: 0x092E20, roughness: 0.5 });
    
    // Create logos and position them in a circle
    const logoCount = 5;
    const radius = 3;
    
    for(let i = 0; i < logoCount; i++) {
        let material;
        
        // Assign different materials to each logo
        switch(i) {
            case 0: material = htmlMaterial; break;
            case 1: material = cssMaterial; break;
            case 2: material = jsMaterial; break;
            case 3: material = pythonMaterial; break;
            case 4: material = djangoMaterial; break;
        }
        
        const logo = new THREE.Mesh(logoGeometry, material);
        
        // Position logos in a circle
        const angle = (i / logoCount) * Math.PI * 2;
        logo.position.x = Math.cos(angle) * radius;
        logo.position.z = Math.sin(angle) * radius;
        logo.position.y = Math.sin(i * 0.5) * 0.5; // Slight up/down variation
        
        scene.add(logo);
        logos.push(logo);
    }
    
    // Set camera position
    camera.position.z = 5;
    
    // Add responsive resize handler
    window.addEventListener('resize', () => {
        const width = container.clientWidth;
        const height = container.clientHeight;
        
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
        renderer.setSize(width, height);
    });
    
    // Animation function
    function animate() {
        requestAnimationFrame(animate);
        
        // Rotate logos
        logos.forEach((logo, i) => {
            logo.rotation.x += 0.01 * (i % 2 === 0 ? 1 : -1);
            logo.rotation.y += 0.01 * (i % 3 === 0 ? 1 : -1);
            
            // Update position to create circular motion
            const time = Date.now() * 0.001;
            const angle = ((i / logoCount) * Math.PI * 2) + (time * 0.2);
            
            logo.position.x = Math.cos(angle) * radius;
            logo.position.z = Math.sin(angle) * radius;
            logo.position.y = Math.sin(time + i) * 0.5;
        });
        
        // Rotate camera slightly to create a dynamic view
        camera.position.x = Math.sin(Date.now() * 0.0005) * 1;
        camera.position.y = Math.sin(Date.now() * 0.0003) * 0.5;
        camera.lookAt(scene.position);
        
        renderer.render(scene, camera);
    }
    
    // Start animation
    animate();
}

// Create a custom cursor effect for interactive elements (optional enhancement)
document.addEventListener('mousemove', function(e) {
    const cursor = document.querySelector('.cursor') || createCursor();
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
    
    // Check if the cursor is over an interactive element
    const targetElement = document.elementFromPoint(e.clientX, e.clientY);
    if(targetElement && (
        targetElement.tagName === 'A' || 
        targetElement.tagName === 'BUTTON' ||
        targetElement.closest('a') ||
        targetElement.closest('button')
    )) {
        cursor.classList.add('cursor-active');
    } else {
        cursor.classList.remove('cursor-active');
    }
});

function createCursor() {
    const cursor = document.createElement('div');
    cursor.classList.add('cursor');
    cursor.innerHTML = `
        <div class="cursor-dot"></div>
        <div class="cursor-ring"></div>
    `;
    document.body.appendChild(cursor);
    
    // Add cursor styles
    const style = document.createElement('style');
    style.textContent = `
        .cursor {
            position: fixed;
            top: 0;
            left: 0;
            z-index: 9999;
            pointer-events: none;
            mix-blend-mode: difference;
        }
        
        .cursor-dot {
            position: absolute;
            top: -4px;
            left: -4px;
            width: 8px;
            height: 8px;
            background-color: white;
            border-radius: 50%;
            transform: translate(-50%, -50%);
            transition: transform 0.1s ease;
        }
        
        .cursor-ring {
            position: absolute;
            top: -15px;
            left: -15px;
            width: 30px;
            height: 30px;
            border: 2px solid rgba(255, 255, 255, 0.5);
            border-radius: 50%;
            transform: translate(-50%, -50%) scale(0.8);
            transition: transform 0.3s ease, opacity 0.3s ease;
            opacity: 0;
        }
        
        .cursor-active .cursor-dot {
            transform: translate(-50%, -50%) scale(0.5);
        }
        
        .cursor-active .cursor-ring {
            transform: translate(-50%, -50%) scale(1.5);
            opacity: 1;
        }
        
        @media (max-width: 768px) {
            .cursor {
                display: none;
            }
        }
    `;
    document.head.appendChild(style);
    
    return cursor;
}