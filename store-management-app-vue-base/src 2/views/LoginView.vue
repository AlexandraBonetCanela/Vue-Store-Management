<script>

import "@/styles/views/login-view.scss";
import axios from "axios";
import {useUserStore} from "@/store/user.js";
export default {
  name: "LoginView",
  data(){
    return {
      email: "",
      password: "",
    }
  },
  methods: {
    async login(){
      try {
        const response = await axios.post("http://localhost:3000/login", {
          email: this.email,
          password: this.password,
        });
        console.log(response);
        const userData = {
          name: response.data.data.name,
          token: response.data.data.tokenId,
        };
        const store = useUserStore();
        store.setUserData(userData);
        this.$router.push("/");
      } catch (error) {
        console.log(error);
      }
    }
  }
}

</script>

<template>
  <div class="home">
    <h1>Login</h1>
    <div class="login-form">
      <form @submit.prevent="login">
        <div class="login-form-item">
          <label for="email">Email</label>
          <input type="text" id="email" v-model="email"/>
        </div>
        <div class="login-form-item">
          <label for="password">Password</label>
          <input type="password" id="password" v-model="password"/>
        </div>
        <div>
          <button class="button" type="submit">Login</button>
        </div>
      </form>

    </div>
  </div>
</template>

<style scoped>

</style>