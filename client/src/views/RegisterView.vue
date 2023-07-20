<template>
  <div id="register">
    <form v-on:submit.prevent="register">
      <h1>
        <font-awesome-icon
          class="icon"
          icon="fa-solid fa-lg fa-user-astronaut"
        />
        Create Account
      </h1>
      <div id="fields">
        <div>
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
        <div>
          <label for="name">Name: </label>
          <input
            type="text"
            id="name"
            placeholder="Name"
            v-model="user.name"
            required
          />
        </div>
        <div>
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
          <label for="confirmPassword">Confirm password: </label>
          <input
            type="password"
            id="confirmPassword"
            placeholder="Confirm Password"
            v-model="user.confirmPassword"
            required
          />
        </div>
        <div>
          <label for="address">Address: </label>
          <input
            type="text"
            id="address"
            placeholder="Address"
            v-model="user.address"
          />
        </div>
        <div>
          <label for="city">City</label>
          <input type="text" id="city" placeholder="City" v-model="user.city" />
        </div>
        <div>
          <label for="state">State: </label>
          <input
            type="text"
            id="state"
            placeholder="State"
            v-model="user.stateCode"
            maxlength="2"
            required
          />
        </div>
        <div>
          <label for="zip">ZIP: </label>
          <input
            type="number"
            id="zip"
            placeholder="ZIP"
            v-model="user.zip"
            required
            minlength="5"
            maxlength="5"
          />
        </div>
        <div></div>
        <div class="button-container">
          <button type="submit">Create Account</button>
        </div>
      </div>
      Have an account?
      <router-link v-bind:to="{ name: 'login' }">Sign in!</router-link>
    </form>
  </div>
</template>

<script>
import authService from "../services/AuthService";

export default {
  name: "RegisterView",
  data() {
    return {
      user: {
        username: "",
        name: "",
        password: "",
        confirmPassword: "",
        address: "",
        city: "",
        stateCode: "",
        zip: "",
        role: "user",
      },
    };
  },
  methods: {
    error(msg) {
      alert(msg);
    },
    success(msg) {
      alert(msg);
    },
    register() {
      if (this.user.password != this.user.confirmPassword) {
        this.error("Password & Confirm Password do not match");
      } else {
        authService
          .register(this.user)
          .then((response) => {
            if (response.status == 201) {
              this.success("Thank you for registering, please sign in.");
              this.$router.push({
                path: "/login",
              });
            }
          })
          .catch((error) => {
            const response = error.response;
            if (!response) {
              this.error(error);
            } else if (response.status === 400) {
              if (response.data.errors) {
                // Show the validation errors
                let msg = "Validation error: ";
                for (let err of response.data.errors) {
                  msg += `'${err.field}':${err.defaultMessage}. `;
                }
                this.error(msg);
              } else {
                this.error(response.data.message);
              }
            } else {
              this.error(response.data.message);
            }
          });
      }
    },
  },
};
</script>

<style scoped>
#register {
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: rgba(29, 22, 80, 1);
  color: aliceblue;
}

form {
  padding: 30px;
  background: rgb(21, 17, 48);
  border-radius: 20px;
  box-shadow: 0px 0px 35px rgba(129, 91, 254, 0.898);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
  text-align: center;
  margin-top: 100px;
}

h1 {
  text-transform: uppercase;
}

.icon {
  font-size: 1.2em;
}

a {
  color: rgb(172, 211, 246);
  text-decoration: none;
}

#fields {
  display: grid;
  grid-template-columns: 1fr 1fr;
  width: 30vw;
  gap: 5px 15px;
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
