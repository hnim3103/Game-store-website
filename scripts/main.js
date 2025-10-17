document.addEventListener('DOMContentLoaded', function() {
    // Lấy tất cả các câu hỏi FAQ
    const faqQuestions = document.querySelectorAll('.faq__question');

    faqQuestions.forEach(question => {
        question.addEventListener('click', function() {
            // Lấy phần tử cha (faq__item)
            const faqItem = this.parentElement;
            const faqAnswer = faqItem.querySelector('.faq__answer');
            const toggleIcon = this.querySelector('.faq__toggle');
            const isActive = faqItem.classList.contains('faq__item--active');

            // Đóng tất cả các item khác khi mở 1 item mới
            document.querySelectorAll('.faq__item').forEach(item => {
                const answer = item.querySelector('.faq__answer');
                const icon = item.querySelector('.faq__toggle');
                if (item !== faqItem) {
                    item.classList.remove('faq__item--active');
                    answer.style.maxHeight = null; // thu gọn mượt
                    icon.classList.remove('bx-minus');
                    icon.classList.add('bx-plus');
                }
            });

            // Nếu item hiện tại đang mở thì đóng lại
            if (isActive) {
                faqItem.classList.remove('faq__item--active');
                faqAnswer.style.maxHeight = null;
                // Đổi từ dấu - về dấu +
                toggleIcon.classList.remove('bx-minus');
                toggleIcon.classList.add('bx-plus');
            } 
            // Nếu item hiện tại đang đóng thì mở ra
            else {
                faqItem.classList.add('faq__item--active');
                faqAnswer.style.maxHeight = faqAnswer.scrollHeight + "px"; // set maxHeight động
                // Đổi từ dấu + sang dấu -
                toggleIcon.classList.remove('bx-plus');
                toggleIcon.classList.add('bx-minus');
            }
        });
    });
});
