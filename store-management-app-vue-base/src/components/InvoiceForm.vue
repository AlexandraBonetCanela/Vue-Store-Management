<script>
import {useUserStore} from "@/store/user.js";
import axios from "axios";
import {useInvoicesStore} from "@/store/invoice.js";

export default {
  name: "InvoiceForm",
  props: ["invoice"],
  data() {
    return {
      clients: null,
      products: null,
      form: {
        id: null,
        idClient: "",
        idProduct: "",
        discount: 0,
        date: "",
        comment: "",
      },
    };
  },
  mounted() {
    this.initClientsData();
    this.initProductsData();
    if (this.invoice.id) {
      this.form = { ...this.invoice };
      this.form.idClient = this.invoice.client.id;
      this.form.idProduct = this.invoice.product.id;
    }
  },
  emits: ["closeModal"],
  methods: {
    async save() {
      const userStore = useUserStore();
      const token = userStore.getToken;
      const invoiceStore = useInvoicesStore();
      try {
        if(this.form.id) {
          body: this.form
          const response = await axios.put("http://localhost:3000/invoice/" + this.invoice.id,
            this.form,
            {
            headers: {
              Authorization: `${token}`,
            },
          });
          let invoice = response.data.data;
          invoice.product = this.products.find(item=> item.id === this.form.idProduct);
          invoice.client = this.clients.find(item=> item.id === this.form.idClient);
          invoiceStore.updateInvoice(invoice);
        }
        else {
          const response = await axios.post("http://localhost:3000/invoice",
            this.form,
            {
            headers: {
              Authorization: `${token}`,
            },
          });

          let invoice = response.data.data;
          invoice.product = this.products.find(item=> item.id === this.form.idProduct);
          invoice.client = this.clients.find(item=> item.id === this.form.idClient);
          invoiceStore.addInvoice(response.data.data);
        }
      }
      catch(error) {
        console.error("There was a problem persisting the invoice: ", error);
      }
      this.$emit("closeModal");
    },
    close() {
      this.$emit("closeModal");
    },
    async initClientsData() {
      const userStore = useUserStore();
      const token = userStore.getToken;
      try {
        const response = await axios.get("http://localhost:3000/clients", {
          headers: {
            Authorization: `${token}`,
          },
        });
        this.clients = response.data.data;
      }
      catch(error) {
        console.error("There was a problem loading the clients: ", error);
      }
    },
    async initProductsData() {
      const userStore = useUserStore();
      const token = userStore.getToken;
      try {
        const response = await axios.get("http://localhost:3000/products", {
          headers: {
            Authorization: `${token}`,
          },
        });
        this.products = response.data.data;
      }
      catch(error) {
        console.error("There was a problem loading the products: ", error);
      }
    }
  }
}

</script>

<template>
  <div class="modal">
    <form @submit.prevent="save">
      <input type="hidden" v-model="form.id" />
      <div>
        <label for="client">Client</label>
        <select v-model="form.idClient" required>
          <option v-for="client in clients" :key="client.id" :value="client.id">
            {{ client.name }} {{ client.surname }}
          </option>
        </select>
      </div>
      <div>
        <label for="product">Product</label>
        <select v-model="form.idProduct" required>
          <option
              v-for="product in products"
              :key="product.id"
              :value="product.id"
          >
            {{ product.name }}
          </option>
        </select>
      </div>
      <div>
        <label for="discount">Discount</label>
        <input
            type="number"
            v-model="form.discount"
            min="0"
            max="100"
            required
        />
      </div>
      <div>
        <label for="date">Date</label>
        <input type="date" v-model="form.date" required />
      </div>
      <div>
        <label for="comment">Comment</label>
        <textarea v-model="form.comment"></textarea>
      </div>
      <div>
        <button type="submit">Save</button>
        <button type="button" @click="close">Cancel</button>
      </div>
    </form>
  </div>
</template>

<style scoped>

</style>