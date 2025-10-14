document.addEventListener('DOMContentLoaded', function() {
    // Lấy tất cả các câu hỏi FAQ
    const faqQuestions = document.querySelectorAll('.faq-question');

    faqQuestions.forEach(question => {
        question.addEventListener('click', function() {
            // Lấy phần tử cha (faq-item)
            const faqItem = this.parentElement;
            const faqAnswer = faqItem.querySelector('.faq-answer');
            const toggleIcon = this.querySelector('.faq-toggle');
            const isActive = faqItem.classList.contains('active');

            // Đóng tất cả các item khác khi mở 1 item mới
            document.querySelectorAll('.faq-item').forEach(item => {
                const answer = item.querySelector('.faq-answer');
                const icon = item.querySelector('.faq-toggle');
                if (item !== faqItem) {
                    item.classList.remove('active');
                    answer.style.maxHeight = null; // thu gọn mượt
                    icon.classList.remove('bx-minus');
                    icon.classList.add('bx-plus');
                }
            });

            // Nếu item hiện tại đang mở thì đóng lại
            if (isActive) {
                faqItem.classList.remove('active');
                faqAnswer.style.maxHeight = null;
                // Đổi từ dấu - về dấu +
                toggleIcon.classList.remove('bx-minus');
                toggleIcon.classList.add('bx-plus');
            } 
            // Nếu item hiện tại đang đóng thì mở ra
            else {
                faqItem.classList.add('active');
                faqAnswer.style.maxHeight = faqAnswer.scrollHeight + "px"; // set maxHeight động
                // Đổi từ dấu + sang dấu -
                toggleIcon.classList.remove('bx-plus');
                toggleIcon.classList.add('bx-minus');
            }
        });
    });
});