<template>
  <div id="app">
    <header>
      <img src="/space-banner.jpg" alt="Banner image of space" />
    </header>
    <nav>
      <router-link v-bind:to="{ name: 'home' }">
        <font-awesome-icon icon="fa-solid fa-earth-americas" />
        Home</router-link
      >
      <router-link v-bind:to="{ name: 'cart' }">
        <font-awesome-icon icon="fa-solid fa-cart-plus" />
        Cart</router-link
      >
      <transition name="fade">
        <span
          v-if="$store.state.message"
          id="middle-nav"
          :class="{ 'fade-out': isFadingOut }"
          >{{ $store.state.message }}</span
        >
      </transition>

      <span></span>

      <router-link v-bind:to="{ name: 'logout' }" v-if="$store.state.token">
        <font-awesome-icon icon="fa-solid fa-rocket" />
        Logout</router-link
      >
      <router-link v-bind:to="{ name: 'login' }" v-else>
        <font-awesome-icon icon="fa-solid fa-rocket" />
        Login</router-link
      >
    </nav>

    <router-view />

    <footer>&copy; Copyright 2023 All Rights Reserved</footer>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isFadingOut: false,
      fadeOutTimer: null,
    };
  },
  watch: {
    "$store.state.message": {
      immediate: true,
      handler(newMessage) {
        if (newMessage) {
          this.showMessage(newMessage);
        }
      },
    },
  },
  methods: {
    showMessage(msg) {
      this.$store.commit("SET_MESSAGE", msg);

      setTimeout(() => {
        const middleNav = document.getElementById("middle-nav");
        middleNav.style.transition = "opacity 1s";
        middleNav.style.opacity = "0";

        setTimeout(() => {
          this.$store.commit("CLEAR_MESSAGE");
        }, 1000);
      }, 3000);
    },
  },
};
</script>


<style scoped>
span {
  flex-grow: 1;
  text-align: left;
  color: rgb(46, 197, 19);
}

span.fade-out {
  opacity: 0;
}

img {
  width: 100vw;
  max-height: 200px;
  min-height: 200px;
}
</style>