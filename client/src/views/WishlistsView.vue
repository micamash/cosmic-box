<template>
  <div class="wishlist">
    <div class="top-heading-div">
      <h1>Wishlist <loading-spinner id="spinner" v-bind:spin="isLoading" /></h1>
    </div>
  </div>
</template>

<script>
import LoadingSpinner from "../components/LoadingSpinner.vue";
import WishlistService from "../services/WishlistService.js";

export default {
  name: "WishlistView",
  components: {
    LoadingSpinner,
  },
  data() {
    return {
      isLoading: false,
      cardView: true,
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
      WishlistService.getCart()
        .then((response) => {
          this.wishlist = response.data;
          this.isLoading = false;
        })
        .catch((error) => {
          this.$store.commit("SET_MESSAGE", error.response.data.message);
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
.wishlist {
  background-color: rgba(29, 22, 80, 1);
  color: aliceblue;
}

.top-heading-div {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 25px;
}
</style>