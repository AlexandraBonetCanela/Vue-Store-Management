<script setup>

import "@/styles/components/app.scss";
import { useRouter} from "vue-router";
import { useUserStore} from "@/store/user.js";

const router = useRouter();
const store = useUserStore();

function navigateToLogin() {
  router.push({name: "login"});
}

function logout(){
  store.logout();
  router.push({name: "home"});
}

</script>


<template>
  <div id="app" class="app">
    <header class="main-header">
      <div class="logo">
        <img src="@/assets/images/logo.png" alt="Logo" class="main-header" />
      </div>
      <div class="user-actions">
        <button v-if="!store.isLogged" class="button" @click="navigateToLogin">Login</button>
        <div v-else class="user">
          <img src="@/assets/images/user.svg" alt="userImage" class="user__image"/>
          <span class="user__info"> {{store.getName}}</span>
          <button class="button button--logout" @click="logout">
            Logout
            <img src="@/assets/images/logout.svg"/>
          </button>
        </div>
      </div>

    </header>
    <nav class="main-nav" >
      <ul>
        <li>
          <router-link to="/" class="main-nav__item">
            Home
          </router-link>
        </li>
        <li>
          <router-link to="/products" class="main-nav__item">
            Products
          </router-link>
        </li>
        <li>
          <router-link to="/clients" class="main-nav__item">
            Clients
          </router-link>
        </li>
        <li>
          <router-link to="/invoices" class="main-nav__item">
            Invoices
          </router-link>
        </li>
      </ul>
    </nav>
    <router-view />
  </div>
</template>


<style scoped>

.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}

.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}

.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
