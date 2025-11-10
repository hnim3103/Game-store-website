document.addEventListener('DOMContentLoaded', function() {
    // Lấy tất cả các câu hỏi FAQ
    const faqQuestions = document.querySelectorAll('.faq__question');

    faqQuestions.forEach(question => {
        question.addEventListener('click', function() {
            const faqItem = this.parentElement;
            const faqAnswer = faqItem.querySelector('.faq__answer');
            const toggleIcon = this.querySelector('.faq__toggle');
            const isActive = faqItem.classList.contains('active');
    
            document.querySelectorAll('.faq__item').forEach(item => {
                const answer = item.querySelector('.faq__answer');
                const icon = item.querySelector('.faq__toggle');
                if (item !== faqItem) {
                    item.classList.remove('active');
                    answer.style.maxHeight = null;
                    icon.classList.remove('bx-minus');
                    icon.classList.add('bx-plus');
                }
            });
    
            if (isActive) {
                faqItem.classList.remove('active');
                faqAnswer.style.maxHeight = null;
                toggleIcon.classList.remove('bx-minus');
                toggleIcon.classList.add('bx-plus');
            } else {
                faqItem.classList.add('active');
                faqAnswer.style.maxHeight = faqAnswer.scrollHeight + 'px';
                toggleIcon.classList.remove('bx-plus');
                toggleIcon.classList.add('bx-minus');
            }
        });
    });
    
    // ================== LOAD LOGIN, REGISTER ON THE HOMEPAGE ==================
    const profileBtn = document.querySelector('.header__profile');
    
    if (profileBtn) {
        profileBtn.addEventListener('click', function (e) {
            e.preventDefault();

            // create overlay
            const overlay = document.createElement('div');
            overlay.classList.add('page-overlay');
            Object.assign(overlay.style, {
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100vw',
                height: '100vh',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                overflow: 'auto',
                transition: 'opacity 0.3s ease',
                opacity: '0',
                backgroundColor: 'rgba(0, 0, 0, 0.6)',
            });
    
            document.body.appendChild(overlay);
    
            // Create close button
            const closeBtn = document.createElement('button');
            closeBtn.textContent = '✕';
            Object.assign(closeBtn.style, {
                position: 'fixed',
                top: '20px',
                right: '40px',
                background: 'transparent',
                color: '#fff',
                fontSize: '36px',
                border: 'none',
                cursor: 'pointer',
                zIndex: 10000,
            });
            closeBtn.onclick = () => {
                overlay.style.opacity = '0';
                setTimeout(() => {
                    overlay.remove();
                }, 300);
            };
            overlay.appendChild(closeBtn);

    
            // get login.html and insert into iframe
            fetch('login.html')
            .then(res => res.text())
            .then(html => {
                const iframe = document.createElement('iframe');
                iframe.srcdoc = html;
                iframe.style.width = '1000px';
                iframe.style.height = '800px';
                iframe.style.border = 'none';
                iframe.style.borderRadius = '10px';
                iframe.style.zIndex = '10000';
                overlay.appendChild(iframe);
                overlay.style.opacity = '1';
            })
            .catch(err => {
                overlay.innerHTML += '<p style="color:white;">Failed to load login page.</p>';
                console.error(err);
            });

            });
    }

    // Wait for message form login.js, if success, remove overlay on the homepage.
    // Because homepage before login not yet, so if it final, add homepage after login 
    window.addEventListener("message", (event) => {
        if (event.data === "login-success") {
            const overlay = document.querySelector(".page-overlay");
            if (overlay) {
                overlay.style.opacity = "0";
                setTimeout(() => overlay.remove(), 300); // Animation
            }
        }
    });
    
    
});    
