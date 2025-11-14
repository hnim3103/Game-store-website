// Đảm bảo code chỉ chạy khi tài liệu (HTML) đã tải xong
document.addEventListener("DOMContentLoaded", function() {

    // Hàm thu gọn/mở rộng Game Description
    function initReadMore() {
        const toggleButton = document.querySelector(".js-toggle-btn");
        const content = document.querySelector(".js-description-content");
        const collapsedHeight = getComputedStyle(content).maxHeight;
        toggleButton.addEventListener("click", function() {
            const isExpanded = content.classList.contains("is-expanded");

            if (isExpanded) {
                content.classList.remove("is-expanded");
                content.style.maxHeight = collapsedHeight;
                toggleButton.textContent = "READ MORE";
            } else {
                content.classList.add("is-expanded");
                content.style.maxHeight = content.scrollHeight + "px";
                toggleButton.textContent = "SHOW LESS";
            }
        });
    }

    function initGallery() {
        // Lấy các phần tử DOM cần thiết
        const mainImage = document.querySelector(".gallery__main-image");
        const mainVideo = document.querySelector(".gallery__main-video");
        const prevBtn = document.querySelector(".gallery__nav--prev");
        const nextBtn = document.querySelector(".gallery__nav--next");
        const thumbnails = document.querySelectorAll(".gallery__thumbnail-wrapper");
        const dotsContainer = document.querySelector(".gallery__dots");
        const thumbnailContainer = document.querySelector(".gallery__thumbnails");
        const swipeArea = document.querySelector('.gallery__main');

        // Xây dựng mảng dữ liệu từ HTML
        const galleryItems = Array.from(thumbnails).map(wrapper => {
            return {
                type: wrapper.dataset.type || 'image',
                src: wrapper.dataset.largeSrc
            };
        });

        let currentImageIndex = 0;
        let touchStartX = 0;
        let touchEndX = 0;
        const swipeThreshold = 50;

        // Hàm chuyển slide
        function setActiveItem(index) {
            // Kiểm tra: Không làm gì nếu item không tồn tại hoặc đang active
            if (!galleryItems[index] || currentImageIndex === index) {
            }
            const item = galleryItems[index];
            mainVideo.src = ''; 
            // Nếu là video
            if (item.type === 'video') {
                mainImage.classList.add('is-hidden'); // ẩn ảnh
                mainVideo.classList.remove('is-hidden'); // hiện video
                mainVideo.src = item.src + '?autoplay=1&mute=0&controls=1';
            // Ngược lại nếu là ảnh
            } else { 
                mainImage.classList.remove('is-hidden');
                mainVideo.classList.add('is-hidden');
                mainImage.style.transition = 'none'; 
                mainImage.style.opacity = 0;
                setTimeout(() => {
                    mainImage.src = item.src;
                    mainImage.style.transition = 'opacity 0.4s ease-in-out';
                    void mainImage.offsetWidth; 
                    mainImage.style.opacity = 1;
                }, 50);
            }
            updateActiveUI(index, false);
            currentImageIndex = index;
        }

        // Hàm cập nhật giao diện
        function updateActiveUI(index, isInitialLoad = false) {
            // Cập nhật viền
            thumbnails.forEach((wrapper, i) => {
                wrapper.classList.toggle('gallery__thumbnail--active', i === index);
            });
            // Cập nhật chấm tròn cho mobile
            if (dotsContainer) {
                const allDots = dotsContainer.querySelectorAll(".gallery__dot");
                allDots.forEach((dot, i) => {
                    dot.classList.toggle('gallery__dot--active', i === index);
                });
            }
            // Logic cuộn thumbnail vào giữa màn hình
            const activeThumb = thumbnails[index];
            if (activeThumb && thumbnailContainer) {
                const containerWidth = thumbnailContainer.offsetWidth;
                const thumbLeft = activeThumb.offsetLeft;
                const thumbWidth = activeThumb.offsetWidth;
                const newScrollLeft = thumbLeft - (containerWidth / 2) + (thumbWidth / 2);

                thumbnailContainer.scrollTo({
                    left: newScrollLeft,
                    behavior: isInitialLoad ? 'auto' : 'smooth' 
                });
            }
        }
        
        // Hàm khởi tạo để đồng bộ thumbnail
        function initializeGallery() {
            let activeIndex = Array.from(thumbnails).findIndex(wrapper => 
                wrapper.classList.contains('gallery__thumbnail--active')
            );
            if (activeIndex === -1) {
                activeIndex = 0;
            }
            currentImageIndex = activeIndex;
            updateActiveUI(currentImageIndex, true);
            if (dotsContainer) {
                galleryItems.forEach((_, index) => {
                    const dot = document.createElement("div");
                    dot.classList.add("gallery__dot");
                    dot.dataset.index = index;
                    dot.addEventListener("click", () => {
                        setActiveItem(index);
                    });
                    dotsContainer.appendChild(dot);
                });
                updateActiveUI(currentImageIndex, true);
            }
        }

        // Hàm điều khiển
        function showNextImage() {
            let nextIndex = (currentImageIndex + 1) % galleryItems.length;
            setActiveItem(nextIndex);
        }
        
        function showPrevImage() {
            let prevIndex = (currentImageIndex - 1 + galleryItems.length) % galleryItems.length;
            setActiveItem(prevIndex);
        }

        nextBtn.addEventListener("click", showNextImage);
        prevBtn.addEventListener("click", showPrevImage);

        thumbnails.forEach((wrapper, index) => {
            wrapper.addEventListener("click", function() {
                setActiveItem(index);
            });
        });

        // Gắn sự kiện vuốt
        swipeArea.addEventListener("touchstart", (e) => {
            touchStartX = e.changedTouches[0].screenX;
        }, { passive: true });

        swipeArea.addEventListener("touchend", (e) => {
            touchEndX = e.changedTouches[0].screenX;
            
            const swipeDiff = touchEndX - touchStartX;
            if (swipeDiff > swipeThreshold) {
                showPrevImage();
            } else if (swipeDiff < -swipeThreshold) {
                showNextImage();
            }
            touchStartX = 0;
            touchEndX = 0;
        });
        initializeGallery();
    }
    initReadMore();
    initGallery();
});