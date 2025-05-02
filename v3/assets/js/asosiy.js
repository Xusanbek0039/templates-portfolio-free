// O'zgaruvchilar
let joriyTil = localStorage.getItem('til') || 'uz';
let joriyRej = localStorage.getItem('rej') || 'yorug';
let yuklanganMi = false;
let sahifaYol = window.location.pathname;
let threejsAylanmaFiguralar = [];
let threejsRasmlar = []; 

// DOM elementlarini yuklash
document.addEventListener('DOMContentLoaded', () => {
  // Yuklash animatsiyasini ko'rsatish
  yulkashAnimatsiyasiniKorsatish();
  
  // Navbarni yuklash
  document.getElementById('boshnav').innerHTML = '';
  fetch('/components/boshnav.html')
    .then(response => response.text())
    .then(data => {
      document.getElementById('boshnav').innerHTML = data;
      
      // Navbar elementlarini sozlash
      tilniOzgartirish(joriyTil);
      rejniOzgartirish(joriyRej);
      
      // Event listener qo'shish
      boshnavEventListenerlarniQoshish();
      
      // Aktiv menyuni belgilash
      aktive
MenyuniYoqish();
    });
  
  // Pastki qismni yuklash
  document.getElementById('pastki').innerHTML = '';
  fetch('/components/pastki.html')
    .then(response => response.text())
    .then(data => {
      document.getElementById('pastki').innerHTML = data;
      
      // Pastki qismni sozlash
      tilniOzgartirish(joriyTil);
    });
  
  // 3D orqa fonni yaratish
  threeDFonniYaratish();
  
  // Sahifa animatsiyalarini yuklash
  sahifaniAnimatsiyalash();
  
  // Formani yuklash (agar mavjud bo'lsa)
  aloqaFormasiniYuklash();
  
  // Iqtibos generatsiyalash (agar mavjud bo'lsa)
  motivatsionIqtibosGeneratsiyalash();
});

// Yuklash animatsiyasini ko'rsatish
function yulkashAnimatsiyasiniKorsatish() {
  const yuklashElement = document.getElementById('yuklash');
  const terminalLines = document.querySelectorAll('.terminal-line');
  
  // Terminal animatsiyasi
  let delay = 0;
  terminalLines.forEach((line, index) => {
    if (!line.classList.contains('terminal-progressbar')) {
      setTimeout(() => {
        line.style.opacity = '1';
      }, delay);
      delay += 500;
    }
  });
  
  // Yuklash tugash
  setTimeout(() => {
    yuklashElement.classList.add('yashirin');
    yuklanganMi = true;
    
    // Element animatsiyalarini boshlash
    document.querySelectorAll('[data-aos]').forEach(element => {
      element.classList.add('aos-animate');
    });
  }, 3000);
}

// Navbar event listenerlarini qo'shish
function boshnavEventListenerlarniQoshish() {
  // Til knopkalarini yuklash
  document.querySelectorAll('.til-knopka').forEach(knopka => {
    knopka.addEventListener('click', () => {
      const til = knopka.getAttribute('data-til');
      tilniOzgartirish(til);
      sahifaniYuklash(til);
    });
  });
  
  // Rej almashtirish knopkasini yuklash
  document.getElementById('rej-almashish').addEventListener('click', () => {
    const yangiRej = joriyRej === 'yorug' ? 'qorongu' : 'yorug';
    rejniOzgartirish(yangiRej);
  });
  
  // Mobil menyu knopkasini yuklash
  const mobilKnopka = document.getElementById('mobil-menyu-knopka');
  const asosiyMenyu = document.querySelector('.asosiy-menyu');
  
  mobilKnopka.addEventListener('click', () => {
    mobilKnopka.classList.toggle('ochiq');
    asosiyMenyu.classList.toggle('ochiq');
  });
}

// Sahifa tilini o'zgartirish
function tilniOzgartirish(til) {
  // Joriy tilni saqlash
  joriyTil = til;
  localStorage.setItem('til', til);
  
  // Til elementlarini ko'rsatish yoki yashirish
  document.querySelectorAll('.til-element').forEach(element => {
    if (element.getAttribute('data-til') === til) {
      element.style.display = 'block';
    } else {
      element.style.display = 'none';
    }
  });
  
  // Til knopkasini faollashtirish
  document.querySelectorAll('.til-knopka').forEach(knopka => {
    if (knopka.getAttribute('data-til') === til) {
      knopka.classList.add('activ');
    } else {
      knopka.classList.remove('activ');
    }
  });
}

// Sahifani yuklash
function sahifaniYuklash(til) {
  if (window.location.pathname.includes('-ru.html') || window.location.pathname.includes('.html')) {
    const asosiyNom = window.location.pathname.replace('-ru.html', '').replace('.html', '');
    let yangiManzil = '';
    
    if (til === 'uz') {
      yangiManzil = asosiyNom + '.html';
    } else {
      yangiManzil = asosiyNom + '-ru.html';
    }
    
    if (yangiManzil !== window.location.pathname) {
      window.location.href = yangiManzil;
    }
  }
}

// Rejni o'zgartirish
function rejniOzgartirish(rej) {
  // Qulaylik uchun animatsiyalarni o'chirish
  document.body.classList.add('animatsiya-taqiqlangan');
  
  // Rejni o'zgartirish
  if (rej === 'qorongu') {
    document.body.classList.add('qorongu-rej');
  } else {
    document.body.classList.remove('qorongu-rej');
  }
  
  // Joriy rejni saqlash
  joriyRej = rej;
  localStorage.setItem('rej', rej);
  
  // Animatsiyalarni qayta yoqish
  setTimeout(() => {
    document.body.classList.remove('animatsiya-taqiqlangan');
  }, 100);
}

// Aktiv menyuni belgilash
function aktiveMenyuniYoqish() {
  const sahifaYoli = window.location.pathname;
  const menuHavolalari = document.querySelectorAll('.menyu-havola');
  
  menuHavolalari.forEach(havola => {
    if (havola.getAttribute('href') === sahifaYoli || 
        havola.getAttribute('href') === sahifaYoli.split('/').pop()) {
      havola.classList.add('activ');
    } else {
      havola.classList.remove('activ');
    }
  });
}

// 3D orqa fonni yaratish
function threeDFonniYaratish() {
  if (!document.getElementById('fon-canvas')) return;
  
  // Three.js o'zgaruvchilari
  const canvas = document.getElementById('fon-canvas');
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true });
  
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(window.devicePixelRatio);
  
  // Kamerani pozitsiyalash
  camera.position.z = 20;
  
  // 3D figuralarni yaratish
  const geometry1 = new THREE.TorusGeometry(4, 1, 16, 100);
  const geometry2 = new THREE.OctahedronGeometry(3, 0);
  const geometry3 = new THREE.IcosahedronGeometry(2, 0);
  
  const material1 = new THREE.MeshBasicMaterial({ color: 0x3B82F6, wireframe: true });
  const material2 = new THREE.MeshBasicMaterial({ color: 0x14B8A6, wireframe: true });
  const material3 = new THREE.MeshBasicMaterial({ color: 0xF97316, wireframe: true });
  
  const torus = new THREE.Mesh(geometry1, material1);
  const octahedron = new THREE.Mesh(geometry2, material2);
  const icosahedron = new THREE.Mesh(geometry3, material3);
  
  torus.position.set(-15, 5, 0);
  octahedron.position.set(10, -5, 0);
  icosahedron.position.set(5, 10, 0);
  
  scene.add(torus);
  scene.add(octahedron);
  scene.add(icosahedron);
  
  threejsAylanmaFiguralar = [torus, octahedron, icosahedron];
  
  // Animatsiya
  function animate() {
    requestAnimationFrame(animate);
    
    threejsAylanmaFiguralar.forEach(figura => {
      figura.rotation.x += 0.002;
      figura.rotation.y += 0.003;
    });
    
    renderer.render(scene, camera);
  }
  
  // Oyna o'lchamini o'zgartirish
  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });
  
  animate();
}

// Sahifa animatsiyalarini yuklash
function sahifaniAnimatsiyalash() {
  const animatsiyaElementlari = document.querySelectorAll('[data-aos]');
  
  if (animatsiyaElementlari.length === 0) return;
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && yuklanganMi) {
        entry.target.classList.add('aos-animate');
      }
    });
  }, { threshold: 0.1 });
  
  animatsiyaElementlari.forEach(element => {
    observer.observe(element);
    
    // Kechikish vaqtini qo'shish
    if (element.getAttribute('data-aos-delay')) {
      const kechikish = element.getAttribute('data-aos-delay');
      element.style.transitionDelay = `${kechikish}ms`;
    }
  });
}

// Aloqa formasini yuklash
function aloqaFormasiniYuklash() {
  const forma = document.getElementById('aloqa-forma');
  if (!forma) return;
  
  forma.addEventListener('submit', (event) => {
    event.preventDefault();
    
    // Forma ma'lumotlarini olish
    const formData = new FormData(forma);
    const formJson = Object.fromEntries(formData.entries());
    
    // EmailJS orqali yuborish (shartli kod)
    console.log('Formani yuborish...', formJson);
    
    // Yuborish tugmasini o'zgartirish
    const yuborishTugma = forma.querySelector('button[type="submit"]');
    const aslTugmaMatn = yuborishTugma.innerHTML;
    
    yuborishTugma.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Yuborilmoqda...';
    yuborishTugma.disabled = true;
    
    // EmailJS serveriga yuborish (haqiqiy bo'lmagan kod)
    setTimeout(() => {
      yuborishTugma.innerHTML = '<i class="fas fa-check"></i> Yuborildi!';
      yuborishTugma.classList.add('muvaffaqiyat');
      
      // Formani tiklash
      forma.reset();
      
      // 3 sekunddan so'ng tugmani asl holatiga qaytarish
      setTimeout(() => {
        yuborishTugma.innerHTML = aslTugmaMatn;
        yuborishTugma.disabled = false;
        yuborishTugma.classList.remove('muvaffaqiyat');
      }, 3000);
    }, 1500);
  });
}

// Motivatsion iqtibos generatsiyalash
function motivatsionIqtibosGeneratsiyalash() {
  const iqtibosMatn = document.getElementById('iqtibos-matn');
  const iqtibosMuallif = document.getElementById('iqtibos-muallif');
  
  if (!iqtibosMatn || !iqtibosMuallif) return;
  
  const iqtiboslar = {
    uz: [
      {
        matn: "Kod yozish - bu san'at. Har bir qator kod o'zingizning shaxsiy imzoingizdir.",
        muallif: "Husanbek"
      },
      {
        matn: "Eng yaxshi kod - bu hujjatlashtirilgan kod. Eng yaxshi hujjat - bu oson o'qiladigan kod.",
        muallif: "Robert C. Martin"
      },
      {
        matn: "Dasturlash hayotning 90% haqida emas, bu hayotning 10% haqida. Lekin bu 10% qolgan 90% ga ta'sir qiladi.",
        muallif: "Tim Berners-Lee"
      }
    ],
    ru: [
      {
        matn: "Написание кода - это искусство. Каждая строка кода - это ваша личная подпись.",
        muallif: "Хусанбек"
      },
      {
        matn: "Лучший код - это документированный код. Лучшая документация - это легко читаемый код.",
        muallif: "Роберт Мартин"
      },
      {
        matn: "Программирование не о 90% жизни, оно о 10%. Но эти 10% влияют на остальные 90%.",
        muallif: "Тим Бернерс-Ли"
      }
    ]
  };
  
  // Tasodifiy iqtibos tanlash
  const joriyIqtiboslar = iqtiboslar[joriyTil];
  const tasodifiyIndex = Math.floor(Math.random() * joriyIqtiboslar.length);
  const tasodifiyIqtibos = joriyIqtiboslar[tasodifiyIndex];
  
  // Iqtibosni qo'yish
  iqtibosMatn.textContent = tasodifiyIqtibos.matn;
  iqtibosMuallif.textContent = `— ${tasodifiyIqtibos.muallif}`;
}