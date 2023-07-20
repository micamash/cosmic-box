<template>
  <div class="cart">
    <div class="top-heading-div">
      <h1>
        Shopping Cart <loading-spinner id="spinner" v-bind:spin="isLoading" />
      </h1>
      <div class="clear-cart-button">
        <button @click="clearCart()">Clear cart</button>
      </div>
    </div>

    <table class="product-table">
      <thead>
        <tr>
          <th>Qty</th>
          <th>Product</th>
          <th>Price</th>
          <th>Amount</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in cart.items" :key="item.productId">
          <td>{{ item.quantity }}</td>
          <td>
            <router-link
              :to="{
                name: 'product-detail',
                params: { id: item.productId },
              }"
            >
              {{ item.product.name }}
            </router-link>
          </td>
          <td>{{ formatPrice(item.product.price) }}</td>
          <td>{{ formatPrice(item.product.price * item.quantity) }}</td>
          <td>
            <button class="remove-btn" @click="removeFromCart(item.productId)">
              <font-awesome-icon icon="fa-solid fa-trash-can" />
            </button>
          </td>
        </tr>
      </tbody>
      <tfoot>
        <tr>
          <td colspan="5" class="subtotal-line"></td>
        </tr>
        <tr>
          <th id="total" colspan="3">Item Subtotal :</th>
          <td>{{ formatPrice(subtotal) }}</td>
        </tr>
        <tr>
          <th id="total" colspan="3">Tax :</th>
          <td>{{ formatPrice(tax) }}</td>
        </tr>
        <tr>
          <th id="total" colspan="3">Total :</th>
          <td>{{ formatPrice(total) }}</td>
        </tr>
      </tfoot>
    </table>
  </div>
</template>

<script>
import LoadingSpinner from "../components/LoadingSpinner.vue";
import CartService from "../services/CartService.js";

export default {
  name: "CartView",
  components: {
    LoadingSpinner,
  },
  data() {
    return {
      isLoading: false,
      cart: null,
    };
  },

  computed: {
    isLoggedIn() {
      return this.$store.state.token.length > 0;
    },
    subtotal() {
      if (!this.cart) return 0;
      return this.cart.items.reduce(
        (sum, item) => sum + item.product.price * item.quantity,
        0
      );
    },
    tax() {
      // Calculate the tax based on the subtotal (you can customize this)
      return this.subtotal * 0.1; // Assuming tax is 10% of the subtotal
    },
    total() {
      return this.subtotal + this.tax;
    },
  },

  methods: {
    formatPrice(price) {
      return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(price);
    },
    loadData() {
      this.isLoading = true;
      CartService.getCart()
        .then((response) => {
          this.cart = response.data;
          this.isLoading = false;
        })
        .catch((error) => {
          this.$store.commit("SET_MESSAGE", error.response.data.message);
        });
    },
    clearCart() {
      CartService.clearCart()
        .then(() => {
          this.cart.items = []; // Clear the items array directly
          this.$store.commit("SET_MESSAGE", "Cart cleared successfully");
        })
        .catch((error) => {
          this.$store.commit("SET_MESSAGE", error.response.data.message);
        });
    },
    removeFromCart(itemId) {
      const item = this.cart.items.find((item) => item.productId === itemId);

      if (item) {
        if (item.quantity > 1) {
          item.quantity--;
        } else {
          this.cart.items = this.cart.items.filter(
            (item) => item.productId !== itemId
          );
        }

        CartService.updateCart(this.cart)
          .then(() => {
            this.$store.commit("SET_MESSAGE", "Item removed from cart");
          })
          .catch((error) => {
            this.$store.commit("SET_MESSAGE", error.response.data.message);
          });
      }
    },
  },

  created() {
    this.$store.commit("CLEAR_MESSAGE");
    this.loadData();
  },
};
</script>

<style>
.cart {
  background-color: rgba(29, 22, 80, 1);
  height: 100vh;
  padding-top: 240px;
  padding-bottom: 40px;
  overflow: auto;
  color: aliceblue;
}

.top-heading-div {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 25px;
}

table {
  margin-left: 40px;
}

th {
  padding: 10px 20px;
  font-size: 1.3em;
}

td {
  padding: 10px 20px;
}

.remove-btn {
  border: none;
}

.remove-btn:hover {
  box-shadow: none;
}

.subtotal-line {
  border-top: 1px solid aliceblue;
}
</style>