<template>
  <div class="product-detail">
    <div class="top-heading-div">
      <h1>
        {{ product.name }}
        <loading-spinner id="spinner" v-bind:spin="isLoading" />
      </h1>
      <div v-if="isLoggedIn" class="wishlist-cart-buttons">
        <button @click="($event) => addProductToWishlist(product)">
          Add to Wishlist
        </button>
        <button @click="($event) => addProductToCart(product)">
          <font-awesome-icon icon="fa-solid fa-cart-plus" />
          Add to cart
        </button>
      </div>
    </div>

    <div class="detail-container">
      <div class="card">
        <div class="detail">{{ product.description }}</div>

        <div class="sku-price">
          {{ product.productSku }} <span></span>${{ product.price }}
        </div>

        <div class="name">{{ product.name }}</div>
        <div class="product-image">
          <img :src="product.imageName" :alt="product.name" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import LoadingSpinner from "../components/LoadingSpinner.vue";
import ProductService from "../services/ProductService.js";
import CartService from "../services/CartService.js";
import WishlistService from "../services/WishlistService";

export default {
  name: "ProductDetailView",
  components: {
    LoadingSpinner,
  },
  data() {
    return {
      isLoading: false,
      product: null,
    };
  },

  computed: {
    isLoggedIn() {
      return this.$store.state.token.length > 0;
    },
  },

  methods: {
    loadData() {
      this.isLoading = true;
      ProductService.getProductById(this.$route.params.id)
        .then((response) => {
          this.product = response.data;
          this.isLoading = false;
        })
        .catch((error) => {
          this.$store.commit("SET_MESSAGE", error.response.data.message);
        });
    },
    addProductToCart(product) {
      CartService.addItemToCart({ productId: product.productId, quantity: 1 })
        .then(() => {
          this.$store.commit(`SET_MESSAGE`, product.name + " added to cart");
        })
        .catch((error) => {
          this.$store.commit(`SET_MESSAGE`, error.response.data.message);
        });
    },
    addProductToWishlist(product) {
      WishlistService.addProductToWishlist({
        productId: product.productId,
        quantity: 1,
      })
        .then(() => {
          this.$store.commit(
            `SET_MESSAGE`,
            product.name + " added to wishlist"
          );
        })
        .catch((error) => {
          this.$store.commit(`SET_MESSAGE`, error.response.data.message);
        });
    },
  },

  created() {
    this.$store.commit("CLEAR_MESSAGE");
    this.loadData();
  },
};
</script>

<style>
.product-detail {
  background-color: rgba(29, 22, 80, 1);
  height: 100vh;
  padding-top: 240px;
  padding-bottom: 40px;
  overflow: auto;
  color: aliceblue;
}

h1 {
  font-size: xx-large;
}

.detail {
  font-size: x-large;
}

span {
  margin-left: 10px;
}

.detail-container {
  display: flex;
  justify-content: left;
  align-items: center;
  flex-wrap: wrap;
  gap: 50px;
  padding-top: 5px;
  margin-left: 20px;
}

.card {
  padding: 5px;
  width: 400px;
  height: 400px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
}

.product-image {
  width: 350px;
  height: 250px;
  background-color: rgba(0, 0, 0, 0.282);
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 30px;
}

.product-image img {
  border-radius: 30px;
  margin: 0;
  height: 250px;
  box-shadow: 0px 0px 20px 5px rgba(46, 197, 19, 0.678);
}

button {
  cursor: pointer;
  background: none;
  color: aliceblue;
  border: 2px solid;
  padding: 0.5em 0.5em;
  margin: 15px;
  font-size: 1em;
  transition: all 0.2s;
}

button:hover {
  border-color: white;
  color: white;
  box-shadow: 0 0.5em 3em -0.4em;
  transform: translateY(-0.25em);
  cursor: pointer;
}
</style>