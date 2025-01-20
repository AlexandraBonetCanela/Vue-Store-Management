<script>

import "@/styles/components/filter-bar.scss"
export default {
  name: "FilterBar",
  methods: {
    emitFilters() {
      this.$emit("updateFilters", {
        searchQuery: this.searchQuery,
        sortBy: this.sortBy,
        orderBy: this.orderBy,
      });
    },
  },
}
</script>

<template>
  <div class="filter-bar">
    <div class="search-bar">
      <input type="text" placeholder="Search" v-model="search" />
    </div>
    <div class="filter-bar__select">
      <label for="sort">Sort by</label>
      <select v-model="sortBy" @change="emitFilters">
        <option value="empty"></option>
        <option value="name">Name</option>
        <option value="surname">Surname</option>
        <option value="date">Registration date</option>
      </select>
    </div>
    <div class="filter-bar__select">
      <label for="sort">Sort by</label>
      <select v-model="orderBy" @change="emitFilters">
        <option value="asc">Ascending</option>
        <option value="desc">Descending</option>
      </select>
    </div>
  </div>
</template>

<style scoped>

</style>