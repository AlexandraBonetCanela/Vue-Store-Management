import { defineStore } from "pinia";

export const useClientsStore = defineStore("clients", {
    state: () => ({
        clients: [],
    }),
    actions: {
        setClients(data) {
            console.log("Setting clients in store:", data);
            this.clients = data;
        },
        clearClients() {
            this.clients = []; // Clear the clients list
        },
    },
});
