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
        this.placeOrderBtn.classList.add('summary__button--card');
        break;
      case 'googlepay':
        this.placeOrderBtn.textContent = 'PAY WITH GOOGLE';
        this.placeOrderBtn.classList.add('summary__button--googlepay');
        break;
      default:
        this.placeOrderBtn.textContent = 'PLACE ORDER';
        break;
    }
  }

  handlePlaceOrder() {
    if (!this.selectedPayment) {
      this.showNotification('Please select a payment method', 'error');
      return;
    }
    // Hiện trạng thái xử lý
    this.placeOrderBtn.disabled = true;
    this.placeOrderBtn.textContent = 'PROCESSING...';

    // Mô phỏng xử lý thanh toán (1.5 giây)
    setTimeout(() => {
      this.processPayment(this.selectedPayment);
    }, 1500);
  }
  // Xử lý thanh toán thành công
  processPayment(method) {
    this.placeOrderBtn.disabled = false;
    this.updatePlaceOrderButton(method);
    // Chuyển hướng đến trang thành công
    window.location.href = './payment-success.html';
  }
  // Lấy tên phương thức thanh toán để hiển thị
  getPaymentMethodName(method) {
    const names = {
      'paypal': 'PayPal',
      'card': 'Card',
      'googlepay': 'Google Pay'
    };
    return names[method] || method;
  }

  // Hàm hiển thị thông báo dạng toast
  showNotification(message, type = 'error') {
    let container = document.getElementById('toast-container');
    // Tạo container
    if (!container) {
      container = document.createElement('div');
      container.id = 'toast-container';
      document.body.appendChild(container);
    }
    // Tạo thông báo mới
    const notification = document.createElement('div');
    notification.textContent = message;
    // Thêm class chung
    notification.classList.add('toast-notification');
    
    // Thêm class theo loại thông báo
    if (type === 'error') {
      notification.classList.add('toast-error');
    }
    // Thêm thông báo vào container
    container.appendChild(notification);
    // Kích hoạt hiệu ứng hiển thị
    requestAnimationFrame(() => {
      notification.classList.add('toast-show');
    });
    // Hàm xóa thông báo
    const removeToast = () => {
      notification.classList.remove('toast-show');
      notification.classList.add('toast-hide');
      notification.addEventListener('transitionend', () => {
        // Xóa thông báo khỏi DOM
        if (notification.parentNode) {
          notification.remove();
        }
        // Nếu không còn thông báo nào, xóa container
        if (container.childElementCount === 0) {
          container.remove();
        }
      });
    };
    // Giới hạn số lượng thông báo hiển thị tối đa là 3
    if (container.childElementCount > 2) {
        const oldestToast = container.firstElementChild;
        // Xóa thông báo cũ nhất
        if (oldestToast) {
             oldestToast.classList.remove('toast-show');
             oldestToast.classList.add('toast-hide');
             oldestToast.addEventListener('transitionend', () => oldestToast.remove());
        }
    }
    // Tự động xóa thông báo sau 3 giây
    setTimeout(() => {
      removeToast();
    }, 3000);
  }
}

