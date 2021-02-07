<template>
  <div>
    <select v-model="order.order_status" class="form-control">
      <option
        v-for="(status, index) in order_statuses"
        :value="status"
        :key="index"
      >
        {{ status }}
      </option>
    </select>
    <button @click="updateOrderStatus">Save</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      order: {},
      order_statuses: ["draft", "confirmed", "cancelled"],
    };
  },
  mounted() {
    this.$axios.get(`/orders/${this.$route.params.id}`).then(({ data }) => {
      this.order = { ...data.data.order };
    });
  },
  methods: {
    updateOrderStatus() {
      this.$axios
        .post(`/orders/${this.$route.params.id}/change-status`, {
            'order_status': this.order.order_status
        })
        .then(() => {
          this.$router.push({ name: "Orders" });
        })
        .catch(({ response }) => {
          alert(response.data.message);
        });
    },
  },
};
</script>

<style>
</style>