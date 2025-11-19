document.addEventListener('DOMContentLoaded', () => {
  new PaymentHandler();
  const recList = document.getElementById('rec-list');
  const recPrev = document.getElementById('rec-prev');
  const recNext = document.getElementById('rec-next');

  if (recList && recPrev && recNext) {
    
    // Hàm xử lý cuộn
    const scrollList = (direction) => {
      // Lấy chiều rộng của một card + gap
      const card = recList.querySelector('.product-card');
      const cardWidth = card.offsetWidth; 
      const gap = 15;
      const scrollAmount = cardWidth + gap;

      if (direction === 'next') {
        recList.scrollLeft += scrollAmount;
      } else {
        recList.scrollLeft -= scrollAmount;
      }
    };

    // Gán sự kiện click
    recNext.addEventListener('click', () => scrollList('next'));
    recPrev.addEventListener('click', () => scrollList('prev'));
  }
});

// Xử lý logic mở/đóng và quy trình thanh toán
class PaymentHandler {
  constructor() {
    // Tìm tất cả các div có class .payment-option
    this.paymentOptions = document.querySelectorAll('.payment-option');
    // Tìm nút PLACE ORDER bằng id của nó
    this.placeOrderBtn = document.getElementById('placeOrderBtn');
    // Tạo trạng tháy null khi chưa chọn phương thức nào
    this.selectedPayment = null;
    
    this.init();
  }

  init() {
    // Lặp qua từng tùy chọn thanh toán
    this.paymentOptions.forEach(option => {
      // Tìm đến phần tùy chọn thanh toán
      const header = option.querySelector('.payment-option__header');
      header.addEventListener('click', () => this.togglePaymentOption(option));
    });

    // Thêm trình xử lý nhấp chuột và nút PLACE ORDER
    if (this.placeOrderBtn) {
      this.placeOrderBtn.addEventListener('click', () => this.handlePlaceOrder());
    }
  }

  togglePaymentOption(clickedOption) {
    // Kiểm tra đã có option nào được mở hay chưa
    const wasActive = clickedOption.classList.contains('payment-option--active');

    // Lặp qua các option và đóng tất cả lại bằng cách xóa class
    this.paymentOptions.forEach(option => {
      option.classList.remove('payment-option--active');
    });

    // Nếu option vừa nhấp chưa mở, mở nó ra
    if (!wasActive) {
      clickedOption.classList.add('payment-option--active');
      this.selectedPayment = clickedOption.dataset.payment;
      this.updatePlaceOrderButton(this.selectedPayment);
    } else {
      this.selectedPayment = null;
      this.updatePlaceOrderButton(null);
    }
  }

  updatePlaceOrderButton(paymentMethod) {
    // Xóa các class cũ
    this.placeOrderBtn.classList.remove('summary__button--paypal', 'summary__button--card', 'summary__button--googlepay');

    // Cập nhật nút dựa trên lựa chọn
    switch (paymentMethod) {
      case 'paypal':
        this.placeOrderBtn.textContent = 'PAY PAL';
        this.placeOrderBtn.classList.add('summary__button--paypal');
        break;
      case 'card':
        this.placeOrderBtn.textContent = 'PAY WITH CARD';
        this.placeOrderBtn.classList.remove('summary__button--paypal');
        break;
      case 'googlepay':
        this.placeOrderBtn.textContent = 'PAY WITH GOOGLE';
        this.placeOrderBtn.classList.remove('summary__button--paypal');
        break;
      default:
        this.placeOrderBtn.textContent = 'PLACE ORDER';
        break;
    }
  }
}

