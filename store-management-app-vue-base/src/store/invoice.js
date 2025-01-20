import { defineStore } from "pinia";

export const useInvoicesStore = defineStore("invoices", {
    state: () => ({
        invoices: [],
    }),
    actions: {
        setInvoices(data) {
            this.invoices = data;
        },
        addInvoice(invoice) {
            this.invoices.push(invoice);
        },
        updateInvoice(updatedInvoice) {
            const index = this.invoices.findIndex((i) => i.id === updatedInvoice.id);
            if (index !== -1) this.invoices.splice(index, 1, updatedInvoice);
        },
        deleteInvoice(id) {
            this.invoices = this.invoices.filter((i) => i.id !== id);
        },
        sortedInvoices(sortBy, orderBy) {
            return [...this.invoices].sort((a, b) => {
                const direction = orderBy === "asc" ? 1 : -1;
                if (a[sortBy] < b[sortBy]) return -1 * direction;
                if (a[sortBy] > b[sortBy]) return 1 * direction;
                return 0;
            });
        },
    },
});
