<script setup>
</script>

<template>
  <div class="home">
    <h1 class="h1">Welcome to the MGT Dashboard</h1>
    <div class="container">
      <div class="card">
        <h2>Products</h2>
        <p>Manage your products and inventory.</p>
        <router-link :to="{ name: 'products' }" class="button">Go to Products</router-link>
      </div>
      <div class="card">
        <h2>Clients</h2>
        <p>Manage your clients and customer information.</p>
        <router-link :to="{ name: 'clients' }" class="button">Go to Clients</router-link>
      </div>
      <div class="card">
        <h2>Invoices</h2>
        <p>Manage your invoices and billing.</p>
        <router-link :to="{ name: 'invoices' }" class="button">Go to Invoices</router-link>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">

// Container after the title
.container {
  display: flex;
  gap: 2rem;
  grid-template-columns: repeat(3, 1fr);
}
.h1 {
  background-color: $paperWhite ;
}

// Card
.card {
  border-radius: 20px;
  background-color: $paperWhite;
  width: 100%;
}
</style>
