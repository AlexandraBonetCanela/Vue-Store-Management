<script>
import axios from "axios";
import { useInvoicesStore } from "@/store/invoice";
import InvoiceForm from "@/components/InvoiceForm.vue";
import FilterBar from "@/components/FilterSearchBar.vue";
import {useUserStore} from "@/store/user.js";
import ModalLayer from "@/components/ModalLayer.vue";
export default {
  name: "InvoicesView",
  components: {ModalLayer, FilterBar, InvoiceForm},
  data() {
    return {
      showModal: false,
      editingInvoice: null,
      sortBy: "date",
      orderBy: "asc",
      };
    },
  computed: {
    invoices() {
      const invoiceStore = useInvoicesStore();
      return invoiceStore.sortedInvoices(this.sortBy, this.orderBy);
    },
  },
  mounted() {
    this.fetchInvoices();
  },
  methods: {
    async fetchInvoices(){
      const invoicesStore = useInvoicesStore();
      const userStore = useUserStore();
      const token = userStore.getToken;
      try {
        const response = await axios.get("http://localhost:3000/invoices", {
          headers: {
            Authorization: `${token}`,
          },
        });
        invoicesStore.setInvoices(response.data.data)
      }
      catch(error) {
        console.error("There was a problem fetching the invoices: ", error);
      }
    },
    openModal(invoice = null) {
      console.log("Open modal called!");
      console.log(invoice);
      this.editingInvoice = invoice; // Pass invoice to modal only when editing
      this.showModal = true;
    },
    closeModal() {
      this.showModal = false;
      this.editingInvoice = null;
    },
    async deleteInvoice(id) {
      const userStore = useUserStore();
      const token = userStore.getToken;
      try {
        const response = await axios.delete("http://localhost:3000/invoice/" + id, {
          headers: {
            Authorization: `${token}`,
          },
        });

        const invoicesStore = useInvoicesStore();
        invoicesStore.deleteInvoice(id);
      }
      catch(error) {
        console.error("There was a problem deleting the invoice: ", error);
      }
    },
  }
}



</script>

<template>
  <h1 class="h1">Invoices List</h1>
  <div>
    <FilterBar></FilterBar>
    <button @click="openModal" class="add-invoice-button">
      Add New Invoice
    </button>
  </div>
  <table>
    <thead>
    <tr>
      <th>Id</th>
      <th>Client</th>
      <th>Product</th>
      <th>Invoice date</th>
      <th>Discount</th>
      <th>Comment</th>
      <th>Actions</th>
    </tr>
    </thead>
    <tbody>
    <tr v-for="invoice in invoices" :key="invoice.id">
      <td>{{ invoice.id }}</td>
      <td>{{ invoice.client.name }}</td>
      <td>{{ invoice.product.name }}</td>
      <td>{{ invoice.date }}</td>
      <td>{{ invoice.discount }}</td>
      <td>{{ invoice.comment }}</td>
      <td>
        <button class="edit" @click="openModal(invoice)">Edit</button>
        <button class="delete" @click="deleteInvoice(invoice.id)">
          Delete
        </button>
      </td>
    </tr>
    </tbody>
  </table>
  <ModalLayer v-if="showModal" @closeModal="closeModal">
    <template v-slot:header>
      <h2 v-if="editingInvoice">Edit Invoice</h2>
      <h2 v-else>Create Invoice</h2>
    </template>
    <template v-slot:body>
      <InvoiceForm
          :invoice="editingInvoice" @closeModal="closeModal"
      />
    </template>
  </ModalLayer>
</template>


<style scoped>

</style>