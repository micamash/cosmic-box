<template>
  <div id="login">
    <form v-on:submit.prevent="login">
      <h1>
        <font-awesome-icon class="icon" icon="fa-solid fa-user-astronaut" />
        Please Sign In
      </h1>
      <div id="fields">
        <div class="input-container">
          <label for="username">Username: </label>
          <input
            type="text"
            id="username"
            placeholder="Username"
            v-model="user.username"
            required
            autofocus
          />
        </div>
        <div class="input-container">
          <label for="password">Password: </label>
          <input
            type="password"
            id="password"
            placeholder="Password"
            v-model="user.password"
            required
          />
        </div>
        <div>
          <button class="button-container" type="submit">Sign in</button>
        </div>
      </div>
      Need an account?
      <router-link v-bind:to="{ name: 'register' }">Register!</router-link>
    </form>
  </div>
</template>

<script>
import authService from "../services/AuthService";

export default {
  name: "LoginView",
  data() {
    return {
      user: {
        username: "",
        password: "",
      },
    };
  },
  methods: {
    login() {
      authService
        .login(this.user)
        .then((response) => {
          if (response.status == 200) {
            this.$store.commit("SET_AUTH_TOKEN", response.data.token);
            this.$store.commit("SET_USER", response.data.user);
            this.$router.push("/");
          }
        })
        .catch((error) => {
          const response = error.response;
          if (!response) {
            alert(error);
          } else if (response.status === 401) {
            alert("Invalid username and password!");
          } else {
            alert(response.message);
          }
        });
    },
  },
};
</script>

<style scoped>
#login {
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: rgba(29, 22, 80, 1);
  color: aliceblue;
}

h1 {
  text-transform: uppercase;
}

.icon {
  font-size: 1.2em;
}

form {
  padding: 20px;
  background: rgb(21, 17, 48);
  border-radius: 20px;
  box-shadow: 0px 0px 35px rgba(129, 91, 254, 0.898);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

a {
  color: rgb(172, 211, 246);
  text-decoration: none;
}

#fields {
  width: 30vw;
  gap: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

label {
  text-align: right;
}

input {
  width: 100%;
  box-sizing: border-box;
  margin-left: auto;
  margin-right: auto;
}

.button-container {
  grid-column: 1/-1;
  display: flex;
  justify-content: center;
}

.icon {
  width: 50px;
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
