document.addEventListener("DOMContentLoaded", () => {
  new PaymentHandler();
  const recList = document.getElementById("rec-list");
  const recPrev = document.getElementById("rec-prev");
  const recNext = document.getElementById("rec-next");

  if (recList && recPrev && recNext) {
    // function to scroll the list
    const scrollList = (direction) => {
      // get card with gap
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

    // attach event listeners
    recNext.addEventListener("click", () => scrollList("next"));
    recPrev.addEventListener("click", () => scrollList("prev"));
  }
  // render cart page
  renderCartPage();
  // listen for cart updates
  window.addEventListener("cartUpdated", renderCartPage);
});

//handle payment option selection and order placement
class PaymentHandler {
  constructor() {
    // find all payment options
    this.paymentOptions = document.querySelectorAll(".payment-option");
    // find place order button
    this.placeOrderBtn = document.getElementById("placeOrderBtn");
    // creare variable to track selected payment
    this.selectedPayment = null;

    this.init();
  }

  init() {
    // loop through payment options and add click listeners
    this.paymentOptions.forEach((option) => {
      // find header inside option
      const header = option.querySelector(".payment-option__header");
      header.addEventListener("click", () => this.togglePaymentOption(option));
    });

    //add listener to place order button
    if (this.placeOrderBtn) {
      this.placeOrderBtn.addEventListener("click", () =>
        this.handlePlaceOrder()
      );
    }
  }

  togglePaymentOption(clickedOption) {
    // check if click option is ready active
    const wasActive = clickedOption.classList.contains(
      "payment-option--active"
    );

    // lôop through all options and deactivate them
    this.paymentOptions.forEach((option) => {
      option.classList.remove("payment-option--active");
    });

    // if clicked option was not active, activate it
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
    // remove old class
    this.placeOrderBtn.classList.remove(
      "summary__button--paypal",
      "summary__button--card",
      "summary__button--googlepay"
    );

    // update button
    switch (paymentMethod) {
      case "paypal":
        this.placeOrderBtn.textContent = "PAY PAL";
        this.placeOrderBtn.classList.add("summary__button--paypal");
        break;
      case "card":
        this.placeOrderBtn.textContent = "PAY WITH CARD";
        this.placeOrderBtn.classList.add("summary__button--card");
        break;
      case "googlepay":
        this.placeOrderBtn.textContent = "PAY WITH GOOGLE";
        this.placeOrderBtn.classList.add("summary__button--googlepay");
        break;
      default:
        this.placeOrderBtn.textContent = "PLACE ORDER";
        break;
    }
  }

  handlePlaceOrder() {
    if (!this.selectedPayment) {
      this.showNotification("Please select a payment method", "error");
      return;
    }
    this.placeOrderBtn.disabled = true;
    this.placeOrderBtn.textContent = "PROCESSING...";

    setTimeout(() => {
      this.processPayment(this.selectedPayment);
    }, 1500);
  }
  // handle payment processing
  processPayment(method) {
    this.placeOrderBtn.disabled = false;
    this.updatePlaceOrderButton(method);
    window.location.href = "./payment-success.html";
  }
  getPaymentMethodName(method) {
    const names = {
      paypal: "PayPal",
      card: "Card",
      googlepay: "Google Pay",
    };
    return names[method] || method;
  }

  // function to show notification
  showNotification(message, type = "error") {
    let container = document.getElementById("toast-container");
    if (!container) {
      container = document.createElement("div");
      container.id = "toast-container";
      document.body.appendChild(container);
    }
    // create notification
    const notification = document.createElement("div");
    notification.textContent = message;
    // add base class
    notification.classList.add("toast-notification");

    // add type class
    if (type === "error") {
      notification.classList.add("toast-error");
    }
    container.appendChild(notification);
    requestAnimationFrame(() => {
      notification.classList.add("toast-show");
    });
    // emove notification function
    const removeToast = () => {
      notification.classList.remove("toast-show");
      notification.classList.add("toast-hide");
      notification.addEventListener("transitionend", () => {
        if (notification.parentNode) {
          notification.remove();
        }
        if (container.childElementCount === 0) {
          container.remove();
        }
      });
    };
    // limit to 3 notifications
    if (container.childElementCount > 2) {
      const oldestToast = container.firstElementChild;
      //remove oldest toast
      if (oldestToast) {
        oldestToast.classList.remove("toast-show");
        oldestToast.classList.add("toast-hide");
        oldestToast.addEventListener("transitionend", () =>
          oldestToast.remove()
        );
      }
    }
    setTimeout(() => {
      removeToast();
    }, 3000);
  }
}

/*CART MANEGEMENT*/
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
        <img src="${item.img}" alt="${item.title}" class="cart-item__image" />
        <div class="cart-item__info">
          <h3 class="cart-item__title">${
            item.title || "Dying Light: The Beast"
          }</h3>
          <p class="cart-item__genres">Zombies, Action, Parkour, Open World</p>
          <p class="cart-item__release">Release Date: 19 Sep, 2025</p>
        </div>
        <div class="cart-item__pricing">
            <span class="cart-item__price--new">${item.price}</span>
        </div>
        <button class="cart-item__delete" aria-label="Remove item" onclick="removeCartItem('${
          item.id
        }')">
          <i class="bx bx-trash cart-item__delete-icon"></i>
        </button>
      </div>
    `;
    container.insertAdjacentHTML("beforeend", html);
  });
}

window.removeCartItem = function (id) {
  let items = getCartData();
  const newItems = items.filter((item) => {
    return String(item.id) !== String(id);
  });

  saveCartData(newItems);
  if (items.length === newItems.length) {
    console.warn("Không tìm thấy ID này trong kho để xóa!");
  } else {
    if (window.showNotification) {
      window.showNotification("Item removed from cart", "remove");
    }
  }
};
