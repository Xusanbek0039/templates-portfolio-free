// Portfolio page specific JS
document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const filterButtons = document.querySelectorAll('.filter-tugma');
    const portfolioItems = document.querySelectorAll('.portfolio-loyiha');
    const modal = document.getElementById('loyihaModal');
    const modalContent = document.querySelector('.modal-body');
    const modalClose = document.querySelector('.modal-yopish');
    const projectButtons = document.querySelectorAll('[data-loyiha]');
    
    // Portfolio filtering
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Get the filter value
            const filter = this.getAttribute('data-filter');
            
            // Filter portfolio items
            portfolioItems.forEach(item => {
                if(filter === 'hammasi' || item.getAttribute('data-category') === filter) {
                    item.style.display = 'block';
                    setTimeout(() => {
                        item.classList.add('animate-visible');
                    }, 100);
                } else {
                    item.classList.remove('animate-visible');
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
    
    // Project modal functionality
    projectButtons.forEach(button => {
        button.addEventListener('click', function() {
            const projectId = this.getAttribute('data-loyiha');
            openProjectModal(projectId);
        });
    });
    
    // Close modal when clicking the close button
    modalClose.addEventListener('click', function() {
        closeModal();
    });
    
    // Close modal when clicking outside the modal content
    modal.addEventListener('click', function(e) {
        if(e.target === modal) {
            closeModal();
        }
    });
    
    // Close modal when pressing Escape key
    document.addEventListener('keydown', function(e) {
        if(e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });
    
    // Open project modal
    function openProjectModal(projectId) {
        // Get project data
        const projectData = getProjectData(projectId);
        
        // Generate modal content based on the current language
        const joriyTil = localStorage.getItem('til') || 'uz';
        
        // Populate modal with project details
        modalContent.innerHTML = `
            <div class="modal-header">
                <h2 class="modal-sarlavha">${projectData.title[joriyTil]}</h2>
            </div>
            <div class="modal-rasm">
                <img src="${projectData.image}" alt="${projectData.title[joriyTil]}">
            </div>
            <div class="modal-tavsif">
                <p>${projectData.description[joriyTil]}</p>
                
                <h3 data-lang="uz">Ishlatilgan texnologiyalar:</h3>
                <h3 data-lang="ru">Использованные технологии:</h3>
                <ul class="texnologiyalar-royxat">
                    ${projectData.technologies.map(tech => `<li>${tech}</li>`).join('')}
                </ul>
                
                <h3 data-lang="uz">Loyiha haqida:</h3>
                <h3 data-lang="ru">О проекте:</h3>
                <p>${projectData.details[joriyTil]}</p>
                
                <div class="modal-linklar">
                    <a href="${projectData.demo}" target="_blank" class="tugma tugma-birlamchi">
                        <span data-lang="uz">Demo</span>
                        <span data-lang="ru">Демо</span>
                        <i class="fas fa-external-link-alt"></i>
                    </a>
                    <a href="${projectData.github}" target="_blank" class="tugma tugma-ikkilamchi">
                        <span data-lang="uz">GitHub</span>
                        <span data-lang="ru">GitHub</span>
                        <i class="fab fa-github"></i>
                    </a>
                </div>
            </div>
        `;
        
        // Apply language display
        const tilElements = modalContent.querySelectorAll('[data-lang]');
        tilElements.forEach(el => {
            if(el.getAttribute('data-lang') === joriyTil) {
                if(el.tagName === 'SPAN' || el.tagName === 'A') {
                    el.style.display = 'inline-block';
                } else {
                    el.style.display = 'block';
                }
            } else {
                el.style.display = 'none';
            }
        });
        
        // Show modal
        modal.classList.add('active');
        
        // Add modal-open class to body to prevent scrolling
        document.body.classList.add('modal-open');
    }
    
    // Close modal
    function closeModal() {
        modal.classList.remove('active');
        
        // Remove modal-open class from body
        document.body.classList.remove('modal-open');
    }
    
    // Sample project data - in a real project this would come from a database or API
    function getProjectData(projectId) {
        const projects = {
            loyiha1: {
                title: {
                    uz: "E-Commerce Platformasi",
                    ru: "Платформа электронной коммерции"
                },
                image: "https://images.pexels.com/photos/326502/pexels-photo-326502.jpeg",
                description: {
                    uz: "Zamonaviy e-commerce platforma bo'lib, foydalanuvchilarga mahsulotlarni sotib olish, sotish va almashish imkonini beradi.",
                    ru: "Современная платформа электронной коммерции, которая позволяет пользователям покупать, продавать и обмениваться товарами."
                },
                technologies: ["React", "Node.js", "MongoDB", "Redux", "Express", "AWS"],
                details: {
                    uz: "Bu loyiha har qanday mahsulot turi uchun moslashuvchan e-commerce echimidir. Foydalanuvchilar ro'yxatdan o'tishlari, mahsulotlarni qidirishlari, savatga qo'shishlari va turli to'lov usullaridan foydalanishlari mumkin. Adminlar uchun maxsus panel orqali mahsulotlar, buyurtmalar va foydalanuvchilarni boshqarish imkoniyati mavjud.",
                    ru: "Этот проект представляет собой гибкое решение электронной коммерции для любого типа продукта. Пользователи могут регистрироваться, искать товары, добавлять их в корзину и использовать различные способы оплаты. Для администраторов есть специальная панель для управления товарами, заказами и пользователями."
                },
                demo: "https://example.com",
                github: "https://github.com/"
            },
            loyiha2: {
                title: {
                    uz: "Yo'l Qo'llanmasi Ilovasi",
                    ru: "Туристическое приложение"
                },
                image: "https://images.pexels.com/photos/631986/pexels-photo-631986.jpeg",
                description: {
                    uz: "Sayohatchilar uchun mo'ljallangan ilova bo'lib, ular o'zlarining sayohat marshrutlarini rejalashtirishlari va shahar bo'ylab navigatsiya qilishlari mumkin.",
                    ru: "Приложение для путешественников, которое позволяет им планировать свои маршруты и ориентироваться по городу."
                },
                technologies: ["Flutter", "Firebase", "Google Maps API", "Bloc Pattern", "Firestore"],
                details: {
                    uz: "Bu mobil ilova foydalanuvchilarga sayyohlik joylarini kashf etish, sayohat marshrutlarini rejalash va boshqa sayohatchilar bilan tajribalarini almashish imkonini beradi. Offline xaritalar, yo'nalishlar va jo'natmalar mavjud. Foydalanuvchilar o'z tajribalarini baholashlari va sharhlar qoldirishlari mumkin.",
                    ru: "Это мобильное приложение позволяет пользователям исследовать достопримечательности, планировать маршруты путешествий и делиться своим опытом с другими путешественниками. Доступны офлайн-карты, маршруты и уведомления. Пользователи могут оценивать свой опыт и оставлять комментарии."
                },
                demo: "https://example.com",
                github: "https://github.com/"
            },
            loyiha3: {
                title: {
                    uz: "CRM Tizimi",
                    ru: "CRM Система"
                },
                image: "https://images.pexels.com/photos/6804604/pexels-photo-6804604.jpeg",
                description: {
                    uz: "Korporativ mijozlar uchun mijozlar bilan munosabatlarni boshqarish tizimi bo'lib, sotuv, marketing va mijozlar xizmatini avtomatlashtiradi.",
                    ru: "Система управления взаимоотношениями с клиентами для корпоративных клиентов, автоматизирующая продажи, маркетинг и обслуживание клиентов."
                },
                technologies: ["Django", "PostgreSQL", "Vue.js", "Docker", "Redis", "Celery"],
                details: {
                    uz: "Bu CRM tizimi mijozlar ma'lumotlarini samarali boshqarish, sotuv jarayonlarini kuzatish va analitik hisobotlarni yaratish imkonini beradi. Mijozlar bilan muloqotni avtomatlashtirib, kompaniyalarga o'z biznesini o'stirishda yordam beradi. Real vaqt rejimida ma'lumotlarni yangilash va ko'p tizimlarga integratsiya qilish imkoniyatlari mavjud.",
                    ru: "Эта CRM-система позволяет эффективно управлять данными о клиентах, отслеживать процессы продаж и создавать аналитические отчеты. Автоматизируя общение с клиентами, она помогает компаниям развивать свой бизнес. Имеются возможности обновления данных в режиме реального времени и интеграции со многими системами."
                },
                demo: "https://example.com",
                github: "https://github.com/"
            },
            loyiha4: {
                title: {
                    uz: "Bank Ilova Dizayni",
                    ru: "Дизайн банковского приложения"
                },
                image: "https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg",
                description: {
                    uz: "Bank mobil ilovasi uchun zamonaviy va foydalanuvchilarga qulay bo'lgan UX/UI dizayn loyihasi.",
                    ru: "Проект UX/UI дизайна для банковского мобильного приложения, современный и удобный для пользователей."
                },
                technologies: ["Figma", "Sketch", "Adobe XD", "Principle", "Zeplin"],
                details: {
                    uz: "Ushbu dizayn loyihasi bank mobil ilovasining to'liq UX/UI dizaynini o'z ichiga oladi. Foydalanuvchilar turli moliyaviy operatsiyalarni amalga oshirishlari, hisob ma'lumotlarini ko'rishlari va qo'shimcha xizmatlardan foydalanishlari mumkin. Barcha ekranlar Figma, Sketch va Adobe XD formatlarida mavjud bo'lib, dizaynerlar va dasturchilarga osongina integratsiya qilish imkonini beradi.",
                    ru: "Этот дизайн-проект включает в себя полный UX/UI дизайн банковского мобильного приложения. Пользователи могут совершать различные финансовые операции, просматривать информацию о счете и пользоваться дополнительными услугами. Все экраны доступны в форматах Figma, Sketch и Adobe XD, что позволяет дизайнерам и разработчикам легко интегрировать их."
                },
                demo: "https://example.com",
                github: "https://github.com/"
            },
            loyiha5: {
                title: {
                    uz: "Task Menejmenti",
                    ru: "Управление задачами"
                },
                image: "https://images.pexels.com/photos/3194521/pexels-photo-3194521.jpeg",
                description: {
                    uz: "Jamoaviy loyihalarni boshqarish va vazifalarni taqsimlash uchun veb ilova.",
                    ru: "Веб-приложение для управления командными проектами и распределения задач."
                },
                technologies: ["React", "Redux", "Express", "Socket.io", "MongoDB", "JWT"],
                details: {
                    uz: "Bu veb ilova jamoalar uchun vazifalarni boshqarish tizimi bo'lib, loyihalarni yaratish, vazifalarni belgilash va progressni kuzatib borish imkonini beradi. Real vaqt rejimida hamkorlik qilish uchun Socket.io'dan foydalaniladi, shuning uchun jamoaviy ishlar samarali va sinxron ravishda bajarilishi mumkin. Ilova responsive dizaynda qurilgan, shuning uchun desktop, planshet va mobil qurilmalarda ishlaydi.",
                    ru: "Это веб-приложение представляет собой систему управления задачами для команд, позволяющую создавать проекты, назначать задачи и отслеживать прогресс. Для совместной работы в режиме реального времени используется Socket.io, поэтому командная работа может выполняться эффективно и синхронно. Приложение построено с использованием отзывчивого дизайна, поэтому оно работает на настольных компьютерах, планшетах и мобильных устройствах."
                },
                demo: "https://example.com",
                github: "https://github.com/"
            },
            loyiha6: {
                title: {
                    uz: "Mobil O'yin",
                    ru: "Мобильная игра"
                },
                image: "https://images.pexels.com/photos/4065864/pexels-photo-4065864.jpeg",
                description: {
                    uz: "Unity game engine'da ishlab chiqilgan, AR texnologiyalaridan foydalangan holda real dunyo bilan o'zaro bog'liq bo'lgan qiziqarli mobil o'yin.",
                    ru: "Увлекательная мобильная игра, разработанная на игровом движке Unity, взаимодействующая с реальным миром с использованием технологий AR."
                },
                technologies: ["Unity", "C#", "AR Kit", "Blender", "Firebase"],
                details: {
                    uz: "Bu mobil o'yin AR texnologiyalaridan foydalanib, foydalanuvchining haqiqiy muhiti bilan o'zaro aloqada bo'ladi. O'yinchilar real dunyoda virtual ob'ektlarni joylashtirishlari va ular bilan o'zaro ta'sir qilishlari mumkin. Unity game engine'da yaratilgan va C# tilida dasturlashtirilgan. O'yin iOS va Android platformalarida mavjud bo'lib, AR Kit va ARCore texnologiyalaridan foydalanadi.",
                    ru: "Эта мобильная игра взаимодействует с реальной средой пользователя, используя технологии AR. Игроки могут размещать виртуальные объекты в реальном мире и взаимодействовать с ними. Создана на игровом движке Unity и запрограммирована на языке C#. Игра доступна на платформах iOS и Android и использует технологии AR Kit и ARCore."
                },
                demo: "https://example.com",
                github: "https://github.com/"
            }
        };
        
        return projects[projectId];
    }
});