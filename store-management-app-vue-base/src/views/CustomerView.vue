<script>
import FilterBar from "@/components/FilterSearchBar.vue";
import axios from "axios";
import {useUserStore} from "@/store/user.js";
import { useClientsStore } from "@/store/client.js";

export default {
  name: "ClientsView",
  components: {FilterBar},
  data() {
    return {
      clients: [],
      sortBy: "date",
      orderBy: "asc",
    };
  },
  mounted() {
    this.fetchAllCustomers();
  },
  computed: {
    clients() {
      const store = useClientsStore();
      return store.clients;
    },
  },
  methods: {
    async fetchAllCustomers() {
      const userStore = useUserStore();
      const clientStore = useClientsStore();
      const token = userStore.getToken;
      try {
        const response = await axios.get("http://localhost:3000/clients", {
          headers: {
            Authorization: `${token}`,
          },
        });
        console.log("API Response:", response.data);

        clientStore.setClients(response.data.data);
        this.clients = clientStore.clients;
      } catch (error) {
        console.log(error);
      }
    },
    updateFilters(search, sort, order) {
    }
  }
}


</script>

<template>
  <div class="container">
    <h1 class="title">Clients List</h1>
    <FilterBar @updateFilters="updateFilters"></FilterBar>
    <table>
      <thead>
      <tr>
        <th>Id</th>
        <th>Name</th>
        <th>Surname</th>
        <th>Email</th>
        <th>Phone</th>
        <th>Registration Date</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="client in clients" :key="client.id">
        <td>{{ client.id }}</td>
        <td>{{ client.name }}</td>
        <td>{{ client.surname }}</td>
        <td>{{ client.email }}</td>
        <td>{{ client.phone }}</td>
        <td>{{ client.registration_date }}</td>
      </tr>
      </tbody>
    </table>
  </div>

</template>

<style scoped>
.container {
  background-color: #ffffff;
  border-radius: 10px;
  padding: 2rem;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  margin: 2rem auto;
}

.title {
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 1.5rem;
  color: #333;
}

.clients-table {
  width: 100%;
  border-collapse: collapse;

  thead {
    background-color: #f4f4f4;

    th {
      padding: 1rem;
      text-align: left;
      font-size: 1rem;
      font-weight: bold;
      border-bottom: 2px solid #ddd;
      color: #333;
    }
  }

  tbody {
    tr {
      &:nth-child(odd) {
        background-color: #f9f9f9;
      }

      &:hover {
        background-color: #eaf3ff;
      }
    }

    td {
      padding: 0.8rem 1rem;
      border-bottom: 1px solid #ddd;
      font-size: 0.9rem;
      color: #555;

      &:nth-child(6) {
        text-align: center;
      }

      &:nth-child(5) {
        text-align: center;
      }
    }
  }
}
</style>