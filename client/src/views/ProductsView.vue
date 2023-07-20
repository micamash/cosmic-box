<template>
  <div class="products">
    <div class="product-search-div">
      <h1>Products <loading-spinner id="spinner" v-bind:spin="isLoading" /></h1>

      <p id="login-message" v-if="!isLoggedIn">
        Welcome! You may browse anonymously as much as you wish,<br />
        but you must login to add items to your shopping cart.
      </p>

      <div id="search-container">
        <font-awesome-icon
          v-bind:class="{ 'view-icon': true, active: cardView }"
          v-on:click="cardView = true"
          icon="fa-solid fa-grip"
          title="View tiles"
        />
        <font-awesome-icon
          v-bind:class="{ 'view-icon': true, active: !cardView }"
          v-on:click="cardView = false"
          icon="fa-solid fa-table"
          title="View table"
        />
        <input type="text" id="search" placeholder="Search for product..." />
      </div>
    </div>

    <div v-if="cardView" class="card-container">
      <div v-for="product in products" :key="product.productId" class="card">
        <div class="top-line">
          <div class="sku">{{ product.productSku }}</div>
          <div class="price">${{ product.price }}</div>
        </div>
        <router-link
          :to="{ name: 'product-detail', params: { id: product.productId } }"
          class="name"
        >
          {{ product.name }}</router-link
        >
        <router-link
          :to="{ name: 'product-detail', params: { id: product.productId } }"
          class="product-image"
        >
          <img :src="product.imageName" :alt="product.name" />
        </router-link>

        <div v-if="isLoggedIn" class="bottom-line">
          <router-link
            v-bind:to="{ name: 'wishlist' }"
            v-if="$store.state.token"
            >Add to Wishlist</router-link
          >
          <router-link v-bind:to="{ name: 'wishlist' }" v-else
            >Added to Wishlist</router-link
          >

          <div class="cart">
            <font-awesome-icon
              icon="fa-solid fa-cart-plus"
              @click="($event) => addProductToCart(product)"
            />
          </div>
        </div>

        <div v-if="!isLoggedIn" class="bottom-line">
          <span></span>
        </div>
      </div>
    </div>

    <div v-if="!cardView">
      <table class="product-table">
        <thead>
          <tr>
            <th>SKU</th>
            <th>Product</th>
            <th>Price</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="product in products" :key="product.productId">
            <td>{{ product.productSku }}</td>
            <td>
              <router-link
                :to="{
                  name: 'product-detail',
                  params: { id: product.productId },
                }"
              >
                {{ product.name }}
              </router-link>
            </td>

            <td>{{ product.price }}</td>
            <td>
              <font-awesome-icon
                icon="fa-solid fa-cart-plus"
                class="cart"
                title="Add to cart"
                @click="($event) => addProductToCart(product)"
              />
            </td>
            <td>
              <router-link
                v-bind:to="{ name: 'wishlist' }"
                v-if="$store.state.token"
                >Add to Wishlist</router-link
              >
              <router-link v-bind:to="{ name: 'wishlist' }" v-else
                >Added to Wishlist</router-link
              >
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import LoadingSpinner from "../components/LoadingSpinner.vue";
import ProductService from "../services/ProductService.js";
import CartService from "../services/CartService.js";
import WishlistService from "../services/WishlistService";

export default {
  name: "ProductsView",
  components: {
    LoadingSpinner,
  },
  data() {
    return {
      searchTerm: "",
      isLoading: false,
      cardView: true,
      products: [],
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
      ProductService.getProducts(this.searchTerm, null)
        .then((response) => {
          this.products = response.data;
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

<style scoped>
.products {
  background-color: rgba(29, 22, 80, 1);
  height: 100vh;
  padding-top: 240px;
  padding-bottom: 40px;
  overflow: auto;
  color: aliceblue;
}

.card-container {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  gap: 50px;
  padding-top: 25px;
}

.card {
  border: 1px solid aliceblue;
  border-radius: 30px;
  padding: 5px;
  width: 370px;
  height: 370px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
}

.top-line {
  display: flex;
  align-items: center;
  gap: 200px;
}

.bottom-line {
  display: flex;
  align-items: center;
  gap: 100px;
  padding-bottom: 10px;
}

.product-image {
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 30px;
}

.product-image img {
  box-shadow: 0px 0px 20px 5px rgba(46, 197, 19, 0.678);
  border-radius: 30px;
  margin: 0;
}

.cart {
  max-height: 25px;
  margin: 0px;
  padding: 0;
}

.sku {
  grid-area: sku;
  font-weight: bold;
}

.price {
  font-weight: bold;
}

.name {
  padding-bottom: 10px;
  text-align: left;
  padding: 0;
  margin: 0;
}

.name:hover {
  cursor: pointer;
}

.cart:hover {
  cursor: pointer;
}

.product-search-div {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 25px;
}

.product-table {
  width: 800px;
  margin: 50px 0 0 25px;
}

.product-table th {
  text-align: left;
}

#search {
  border: 1px solid black;
  border-radius: 5px;
  padding: 5px;
  text-align: center;
}

#search-container {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>