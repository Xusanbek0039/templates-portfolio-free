// Contact page specific JS
document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const contactForm = document.getElementById('aloqaForma');
    const successMessage = document.getElementById('xabarMuvaffaqiyat');
    
    // Form submission
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(contactForm);
        const formObject = {};
        
        formData.forEach((value, key) => {
            formObject[key] = value;
        });
        
        // Simulate form submission
        simulateFormSubmission(formObject)
            .then(response => {
                // Show success message
                successMessage.classList.add('active');
                
                // Reset form
                contactForm.reset();
                
                // Hide success message after 5 seconds
                setTimeout(() => {
                    successMessage.classList.remove('active');
                }, 5000);
            })
            .catch(error => {
                // In case of error, show an alert
                const joriyTil = localStorage.getItem('til') || 'uz';
                
                if(joriyTil === 'uz') {
                    alert('Xatolik yuz berdi. Iltimos, qaytadan urinib ko\'ring.');
                } else {
                    alert('Произошла ошибка. Пожалуйста, попробуйте снова.');
                }
                
                console.error('Form submission error:', error);
            });
    });
    
    // Simulate form submission (in a real project, this would be an actual API call)
    function simulateFormSubmission(formData) {
        return new Promise((resolve, reject) => {
            // Simulate network delay
            setTimeout(() => {
                // Simulate successful submission (90% chance)
                if(Math.random() < 0.9) {
                    resolve({
                        success: true,
                        message: 'Form submitted successfully'
                    });
                } else {
                    // Simulate error (10% chance)
                    reject(new Error('Simulated form submission error'));
                }
            }, 1500);
        });
    }
    
    // Form validation
    const formInputs = contactForm.querySelectorAll('input, textarea');
    
    formInputs.forEach(input => {
        input.addEventListener('blur', function() {
            validateInput(this);
        });
        
        input.addEventListener('input', function() {
            validateInput(this);
        });
    });
    
    function validateInput(input) {
        const value = input.value.trim();
        const joriyTil = localStorage.getItem('til') || 'uz';
        
        // Remove any existing error message
        const existingError = input.parentElement.querySelector('.error-message');
        if(existingError) {
            existingError.remove();
        }
        
        // Remove error class
        input.classList.remove('error');
        
        // Check if required and empty
        if(input.hasAttribute('required') && value === '') {
            addErrorToInput(input, joriyTil === 'uz' ? 'Bu maydon to\'ldirilishi shart' : 'Это поле обязательно для заполнения');
            return false;
        }
        
        // Email validation
        if(input.type === 'email' && value !== '') {
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if(!emailPattern.test(value)) {
                addErrorToInput(input, joriyTil === 'uz' ? 'Noto\'g\'ri email format' : 'Неверный формат электронной почты');
                return false;
            }
        }
        
        return true;
    }
    
    function addErrorToInput(input, message) {
        // Add error class to input
        input.classList.add('error');
        
        // Create error message element
        const errorDiv = document.createElement('div');
        errorDiv.classList.add('error-message');
        errorDiv.textContent = message;
        
        // Add error message after input
        input.parentElement.appendChild(errorDiv);
    }
    
    // Add styles for validation
    const validationStyle = document.createElement('style');
    validationStyle.textContent = `
        .error {
            border-color: var(--error-color) !important;
        }
        
        .error-message {
            color: var(--error-color);
            font-size: var(--font-size-sm);
            margin-top: 4px;
        }
        
        .forma-guruh {
            position: relative;
        }
    `;
    document.head.appendChild(validationStyle);
    
    // Add map iframe to contact page
    const contactPage = document.querySelector('.ikki-ustun');
    const mapContainer = document.createElement('div');
    mapContainer.classList.add('xarita-konteyner');
    mapContainer.innerHTML = `
        <div class="malumot-karta">
            <h2 class="karta-sarlavha" data-lang="uz">Bizning joylashuv</h2>
            <h2 class="karta-sarlavha" data-lang="ru">Наше местоположение</h2>
            <div class="xarita">
                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d191885.5042869282!2d69.11455715!3d41.28266445!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38ae8b0cc379e9c3%3A0xa5a9323b4aa5cb98!2sTashkent%2C%20Uzbekistan!5e0!3m2!1sen!2s!4v1632813756601!5m2!1sen!2s" width="100%" height="300" style="border:0;" allowfullscreen="" loading="lazy"></iframe>
            </div>
        </div>
    `;
    
    contactPage.after(mapContainer);
    
    // Apply current language to map title
    const joriyTil = localStorage.getItem('til') || 'uz';
    const mapTitles = mapContainer.querySelectorAll('[data-lang]');
    
    mapTitles.forEach(title => {
        if(title.getAttribute('data-lang') === joriyTil) {
            title.style.display = 'block';
        } else {
            title.style.display = 'none';
        }
    });
    
    // Add styles for map container
    const mapStyle = document.createElement('style');
    mapStyle.textContent = `
        .xarita-konteyner {
            margin-top: var(--spacing-xl);
        }
        
        .xarita {
            margin-top: var(--spacing-lg);
            border-radius: var(--border-radius-md);
            overflow: hidden;
        }
    `;
    document.head.appendChild(mapStyle);
});