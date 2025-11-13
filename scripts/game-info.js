// Đảm bảo code chỉ chạy khi tài liệu (HTML) đã tải xong
document.addEventListener("DOMContentLoaded", function() {

    // Tìm các phần tử trong DOM
    const toggleButton = document.querySelector(".js-toggle-btn");
    const content = document.querySelector(".js-description-content");

    // Lấy chiều cao cố định ban đầu
    const collapsedHeight = getComputedStyle(content).maxHeight;
    toggleButton.addEventListener("click", function() {
        // Kiểm tra xem nội dung có đang mở rộng hay không
        const isExpanded = content.classList.contains("is-expanded");
        if (isExpanded) {
            // Thu gọn
            content.classList.remove("is-expanded");
            // Đặt lại max height về chiều cao thu gọn ban đầu
            content.style.maxHeight = collapsedHeight;
            toggleButton.textContent = "READ MORE";
        } else {
            // Mở rộng
            content.classList.add("is-expanded");
            // 'scrollHeight' là chiều cao thực tế của toàn bộ nội dung
            content.style.maxHeight = content.scrollHeight + "px";
            toggleButton.textContent = "SHOW LESS";
        }
    });

    // Lấy các phần tử HTML
    const mainImage = document.querySelector(".gallery__main-image");
    const prevBtn = document.querySelector(".gallery__nav--prev");
    const nextBtn = document.querySelector(".gallery__nav--next");
    const thumbnails = document.querySelectorAll(".gallery__thumbnail");
    const dotsContainer = document.querySelector(".gallery__dots");

    // Lấy URL ảnh lớn và chỉ số hiện tại
    const largeImageUrls = Array.from(thumbnails).map(thumb => thumb.dataset.largeSrc);
    let currentImageIndex = Array.from(thumbnails).findIndex(thumb => 
        thumb.classList.contains('gallery__thumbnail--active')
    );
    if (currentImageIndex === -1) {
        currentImageIndex = 0;
    }

    // Tạo các dấu chấm (dots)
    if (dotsContainer) {
        largeImageUrls.forEach((_, index) => {
            const dot = document.createElement("div");
            dot.classList.add("gallery__dot");
            dot.dataset.index = index;
            dot.addEventListener("click", () => {
                setActiveImage(index);
            });
            dotsContainer.appendChild(dot);
        });
    }

    // Hàm cập nhật UI
    function updateActiveUI(index) {
        // Cập nhật thumbnail
        thumbnails.forEach((thumb, i) => {
            thumb.classList.toggle('gallery__thumbnail--active', i === index);
        });

        // Cập nhật dots
        if (dotsContainer) {
            const allDots = document.querySelectorAll(".gallery__dot");
            allDots.forEach((dot, i) => {
                dot.classList.toggle('gallery__dot--active', i === index);
            });
        }
    }
    
    // Đặt ảnh active
    function setActiveImage(index) {
        // Kiểm tra nếu index hợp lệ và không phải là ảnh hiện tại
        if (!largeImageUrls[index] || currentImageIndex === index) {
            return;
        }
        mainImage.style.transition = 'none'; 
        mainImage.style.opacity = 0;

        setTimeout(() => {
            mainImage.src = largeImageUrls[index];
            mainImage.style.transition = 'opacity 0.4s ease-in-out';
            mainImage.style.opacity = 1;
        }, 50);

        updateActiveUI(index);
        
        currentImageIndex = index;
    }

    // Hàm khởi tạo gallery
    function initializeGallery() {
        if (!largeImageUrls[currentImageIndex]) return;
        // Đặt ảnh chính
        mainImage.src = largeImageUrls[currentImageIndex];
        // Cập nhật UI
        updateActiveUI(currentImageIndex);
    }

    // Các hàm điều khiển
    function showNextImage() {
        let nextIndex = (currentImageIndex + 1) % largeImageUrls.length;
        setActiveImage(nextIndex);
    }
    
    function showPrevImage() {
        let prevIndex = (currentImageIndex - 1 + largeImageUrls.length) % largeImageUrls.length;
        setActiveImage(prevIndex);
    }
    nextBtn.addEventListener("click", showNextImage);
    prevBtn.addEventListener("click", showPrevImage);
    thumbnails.forEach((thumb, index) => {
        thumb.addEventListener("click", function() {
            setActiveImage(index);
        });
    });

    // Logic vuốt cho mobile
    let touchStartX = 0;
    let touchEndX = 0;
    const swipeThreshold = 50;

    mainImage.addEventListener("touchstart", (e) => {
        touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    mainImage.addEventListener("touchend", (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    });

    function handleSwipe() {
        const swipeDiff = touchEndX - touchStartX;
        
        if (swipeDiff > swipeThreshold) {
            showPrevImage();
        } else if (swipeDiff < -swipeThreshold) {
            showNextImage();
        }
        touchStartX = 0;
        touchEndX = 0;
    }

    initializeGallery();
});
