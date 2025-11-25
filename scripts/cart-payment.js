document.addEventListener("DOMContentLoaded", () => {
  new PaymentHandler();
  const recList = document.getElementById("rec-list");
  const recPrev = document.getElementById("rec-prev");
  const recNext = document.getElementById("rec-next");

  if (recList && recPrev && recNext) {
    // Hàm xử lý cuộn
    const scrollList = (direction) => {
      // Lấy chiều rộng của một card + gap
      const card = recList.querySelector(".product-card");
      const cardWidth = card.offsetWidth;
      const gap = 15;
      const scrollAmount = cardWidth + gap;

      if (direction === "next") {
        recList.scrollLeft += scrollAmount;
      } else {
        recList.scrollLeft -= scrollAmount;
      }
    };

    // Gán sự kiện click
    recNext.addEventListener("click", () => scrollList("next"));
    recPrev.addEventListener("click", () => scrollList("prev"));
  }
  // 1. Render Giỏ hàng ngay khi vào trang
  renderCartPage();
  // 4. Lắng nghe sự kiện nếu Header thêm hàng mới thì tự cập nhật
  window.addEventListener("cartUpdated", renderCartPage);
});

// Xử lý logic mở/đóng và quy trình thanh toán
class PaymentHandler {
  constructor() {
    // Tìm tất cả các div có class .payment-option
    this.paymentOptions = document.querySelectorAll(".payment-option");
    // Tìm nút PLACE ORDER bằng id của nó
    this.placeOrderBtn = document.getElementById("placeOrderBtn");
    // Tạo trạng tháy null khi chưa chọn phương thức nào
    this.selectedPayment = null;

    this.init();
  }

  init() {
    // Lặp qua từng tùy chọn thanh toán
    this.paymentOptions.forEach((option) => {
      // Tìm đến phần tùy chọn thanh toán
      const header = option.querySelector(".payment-option__header");
      header.addEventListener("click", () => this.togglePaymentOption(option));
    });

    // Thêm trình xử lý nhấp chuột và nút PLACE ORDER
    if (this.placeOrderBtn) {
      this.placeOrderBtn.addEventListener("click", () =>
        this.handlePlaceOrder()
      );
    }
  }

  togglePaymentOption(clickedOption) {
    // Kiểm tra đã có option nào được mở hay chưa
    const wasActive = clickedOption.classList.contains(
      "payment-option--active"
    );

    // Lặp qua các option và đóng tất cả lại bằng cách xóa class
    this.paymentOptions.forEach((option) => {
      option.classList.remove("payment-option--active");
    });

    // Nếu option vừa nhấp chưa mở, mở nó ra
    if (!wasActive) {
      clickedOption.classList.add("payment-option--active");
      this.selectedPayment = clickedOption.dataset.payment;
      this.updatePlaceOrderButton(this.selectedPayment);
    } else {
      this.selectedPayment = null;
      this.updatePlaceOrderButton(null);
    }
  }

  updatePlaceOrderButton(paymentMethod) {
    // Xóa các class cũ
    this.placeOrderBtn.classList.remove(
      "summary__button--paypal",
      "summary__button--card",
      "summary__button--googlepay"
    );

    // Cập nhật nút dựa trên lựa chọn
    switch (paymentMethod) {
      case "paypal":
        this.placeOrderBtn.textContent = "PAY PAL";
        this.placeOrderBtn.classList.add("summary__button--paypal");
        break;
      case "card":
        this.placeOrderBtn.textContent = "PAY WITH CARD";
        this.placeOrderBtn.classList.remove("summary__button--paypal");
        break;
      case "googlepay":
        this.placeOrderBtn.textContent = "PAY WITH GOOGLE";
        this.placeOrderBtn.classList.remove("summary__button--paypal");
        break;
      default:
        this.placeOrderBtn.textContent = "PLACE ORDER";
        break;
    }
  }
}

/* ============================================================
   LOGIC QUẢN LÝ GIỎ HÀNG (RENDER & CALCULATE)
   ============================================================ */
document.addEventListener("DOMContentLoaded", () => {
  renderCartPage();
  window.addEventListener("cartUpdated", renderCartPage);
});

const CART_KEY = "gsw_cart";

function getCartData() {
  const data = localStorage.getItem(CART_KEY);
  return data ? JSON.parse(data) : [];
}

function saveCartData(items) {
  localStorage.setItem(CART_KEY, JSON.stringify(items));
  renderCartPage();
}

function renderCartPage() {
  const container = document.getElementById("cart-items-container");
  if (!container) return;

  const cartItems = getCartData();
  const subTotalEl = document.getElementById("summary-subtotal");
  const totalEl = document.getElementById("summary-total");

  container.innerHTML = "";
  let totalPrice = 0;

  if (cartItems.length === 0) {
    container.innerHTML = `<div style="text-align: center; padding: 40px; color: #fff; font-size: 30px"><p>Your cart is empty.</p></div>`;
    if (subTotalEl) subTotalEl.innerText = "$0.00";
    if (totalEl) totalEl.innerText = "$0.00";
    return;
  }

  cartItems.forEach((item) => {
    let priceNumber = 0;
    if (item.price) {
      priceNumber = parseFloat(item.price.toString().replace(/[^0-9.]/g, ""));
    }
    if (isNaN(priceNumber)) priceNumber = 0;
    totalPrice += priceNumber;

    const html = `
      <div class="cart-item">
        <img src="${item.img}" alt="Game Cover" class="cart-item__image" />
        <div class="cart-item__info">
          <h3 class="cart-item__title">Dying Light: The Beast</h3>
          <p class="cart-item__genres">Zombies, Action, Parkour, Open World</p>
          <p class="cart-item__release">Release Date: 19 Sep, 2025</p>
        </div>
        <div class="cart-item__pricing">
            <span class="cart-item__price--new">${item.price}</span>
        </div>
        <button class="cart-item__delete" aria-label="Remove item" onclick="removeCartItem('${item.id}')">
          <i class="bx bx-trash cart-item__delete-icon"></i>
        </button>
      </div>
    `;
    container.insertAdjacentHTML("beforeend", html);
  });
}

window.removeCartItem = function (id) {
  let items = getCartData();
  const newItems = items.filter((item) => item.id !== id);
  saveCartData(newItems);
  if (window.showNotification) {
    window.showNotification("Removed from cart", "remove");
  }
};
