/**
 * ============================================
 * about.js - Script xử lý animation và tương tác
 * 
 * Chức năng chính:
 * 1. Scroll reveal animation - hiện elements khi scroll
 * 2. Rotating quote text - đổi quote mỗi 2.5 giây
 * 3. Scroll progress indicator - thanh chỉ báo scroll
 * 4. Smooth scrolling - cuộn mượt khi click anchor links
 * ============================================
 */

// Đợi DOM load hoàn toàn trước khi chạy script
document.addEventListener("DOMContentLoaded", () => {

    /* ============================================
       SCROLL REVEAL ANIMATION
       Phát hiện khi elements vào viewport và thêm class "visible"
       ============================================ */
    
    // Lấy tất cả elements cần reveal khi scroll
    // querySelectorAll trả về NodeList của tất cả elements match
    const revealEls = document.querySelectorAll(".hero, .section, .showcase, .review, .partners");

    /**
     * Hàm reveal: Kiểm tra vị trí element so với viewport
     * Được gọi mỗi khi user scroll hoặc load page
     */
    const reveal = () => {
        // Trigger point: 90% chiều cao viewport
        // Nghĩa là khi element còn cách đáy viewport 10% thì sẽ trigger
        const trigger = window.innerHeight * 0.9;

        // Loop qua tất cả elements cần reveal
        revealEls.forEach((el) => {
            // getBoundingClientRect() trả về vị trí và kích thước element
            // .top: khoảng cách từ top của element đến top của viewport
            const top = el.getBoundingClientRect().top;

            // Nếu top < trigger nghĩa là element đã vào vùng nhìn thấy
            if (top < trigger) {
                el.classList.add("visible"); // Thêm class để trigger CSS animation
            }
        });
    };

    // Lắng nghe sự kiện scroll trên window
    window.addEventListener("scroll", reveal);
    
    // Gọi ngay lần đầu để reveal các elements đã có sẵn trên màn hình
    // (không cần scroll)
    reveal();

    /* ============================================
       ROTATING QUOTE TEXT
       Thay đổi text của quote mỗi 2.5 giây
       ============================================ */
    
    // Lấy element chứa quote text bằng ID
    const quote = document.getElementById("quote-text");

    // Kiểm tra quote element có tồn tại không (defensive programming)
    if (quote) {
        // Array chứa các quote sẽ xoay vòng hiển thị
        const quotes = [
            "One of 50 Best Websites – TIME",
            "Trusted by Millions of Gamers",
            "Your Library, Your Rules",
        ];

        let index = 0; // Biến đếm index hiện tại

        /**
         * setInterval: Chạy function mỗi 2500ms (2.5 giây)
         * Arrow function để giữ context của this
         */
        setInterval(() => {
            // Xóa class "fade" để reset animation
            quote.classList.remove("fade");
            
            // Trigger reflow - đảm bảo browser apply CSS trước khi thêm class lại
            // offsetWidth là thuộc tính trigger reflow (force browser repaint)
            void quote.offsetWidth;

            // Tăng index, sử dụng modulo (%) để loop về 0 khi đến cuối array
            // Ví dụ: (2 + 1) % 3 = 0 (quay lại đầu)
            index = (index + 1) % quotes.length;
            
            // Đổi text content thành quote mới
            quote.textContent = quotes[index];
            
            // Thêm lại class "fade" để trigger animation CSS
            quote.classList.add("fade");
        }, 2500); // 2500 milliseconds = 2.5 seconds
    }

    /* ============================================
       ANIMATION: SCROLL PROGRESS INDICATOR
       Tạo thanh progress bar ở top trang hiển thị % scroll
       ============================================ */
    
    // Tạo progress bar element
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-indicator';
    document.body.appendChild(progressBar);
    
    /**
     * Update progress bar width dựa trên scroll position
     */
    function updateProgressBar() {
        // scrollTop: số pixel đã scroll từ top
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // scrollHeight: tổng chiều cao có thể scroll
        // clientHeight: chiều cao viewport
        const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        
        // Tính % đã scroll (0-100)
        const scrollPercent = (scrollTop / scrollHeight) * 100;
        
        // Cập nhật width của progress bar
        progressBar.style.width = scrollPercent + '%';
    }
    
    // Lắng nghe scroll event
    window.addEventListener('scroll', updateProgressBar);
    
    // Gọi lần đầu
    updateProgressBar();

    /* ============================================
       ANIMATION: CARD SHIMMER EFFECT
       Tạo hiệu ứng ánh sáng lướt qua card khi load
       ============================================ */
    
    /**
     * Intersection Observer để phát hiện khi card vào viewport
     * Sau đó trigger shimmer animation
     */
    const cards = document.querySelectorAll('.section__card');
    
    const cardObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Delay khác nhau cho mỗi card
                setTimeout(() => {
                    entry.target.style.animation = 'shimmer 1.5s ease-out';
                }, index * 100); // Delay 100ms giữa mỗi card
                
                // Unobserve sau khi đã animate
                cardObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.2 // Trigger khi 20% card visible
    });
    
    // Observe tất cả cards
    cards.forEach(card => cardObserver.observe(card));

    /* ============================================
       BỎ: SECTION ICON ROTATION
       Đã bỏ animation xoay icon khi scroll vào view
       ============================================ */

    /* ============================================
       ANIMATION: SMOOTH SCROLL TO TOP
       Nút scroll to top xuất hiện khi scroll xuống
       ============================================ */
    
    // Tạo nút scroll to top
    const scrollTopBtn = document.createElement('button');
    scrollTopBtn.innerHTML = '↑';
    scrollTopBtn.className = 'scroll-to-top';
    scrollTopBtn.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: var(--green);
        color: var(--bg1);
        border: none;
        font-size: 24px;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        z-index: 9999;
        box-shadow: 0 4px 12px rgba(0, 225, 34, 0.4);
    `;
    document.body.appendChild(scrollTopBtn);
    
    // Hiện/ẩn nút dựa trên scroll position
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            scrollTopBtn.style.opacity = '1';
            scrollTopBtn.style.visibility = 'visible';
        } else {
            scrollTopBtn.style.opacity = '0';
            scrollTopBtn.style.visibility = 'hidden';
        }
    });
    
    // Click để scroll to top
    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth' // Smooth scroll
        });
    });
    
    // Hover effect
    scrollTopBtn.addEventListener('mouseenter', () => {
        scrollTopBtn.style.transform = 'scale(1.1)';
        scrollTopBtn.style.boxShadow = '0 6px 20px rgba(0, 225, 34, 0.6)';
    });
    
    scrollTopBtn.addEventListener('mouseleave', () => {
        scrollTopBtn.style.transform = 'scale(1)';
        scrollTopBtn.style.boxShadow = '0 4px 12px rgba(0, 225, 34, 0.4)';
    });

    /* ============================================
       ANIMATION: TEXT TYPING EFFECT
       Hero title xuất hiện như đang được gõ
       ============================================ */
    
    const heroTitle = document.querySelector('.hero__title');
    
    if (heroTitle) {
        const originalText = heroTitle.textContent;
        heroTitle.textContent = ''; // Xóa text ban đầu
        heroTitle.style.opacity = '1';
        
        let charIndex = 0;
        
        /**
         * Typing effect: thêm từng ký tự
         */
        function typeChar() {
            if (charIndex < originalText.length) {
                heroTitle.textContent += originalText.charAt(charIndex);
                charIndex++;
                setTimeout(typeChar, 50); // 50ms giữa mỗi ký tự
            }
        }
        
        // Bắt đầu typing sau 200ms
        setTimeout(typeChar, 200);
    }

    // Log message khi script load xong
    console.log('✅ about.js loaded successfully!');
    console.log('🎮 GSW Platform - Making games last forever');
    console.log('🎨 Active animations: Scroll Progress, Shimmer, Breathing, Float, Scroll to Top, Typing Effect');
    console.log('❌ Removed: Icon rotation animations');
});

/* ============================================
   CSS ANIMATIONS ĐƯỢC THÊM VÀO
   Inject vào document để sử dụng
   ============================================ */

// Tạo style element
const style = document.createElement('style');
style.textContent = `
    /* Shimmer animation cho cards */
    @keyframes shimmer {
        0% {
            background-position: -200%;
        }
        100% {
            background-position: 200%;
        }
    }
`;
document.head.appendChild(style);
