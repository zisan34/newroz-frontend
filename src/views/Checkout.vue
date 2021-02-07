<template>
  <div class="row">
    <div class="col-md-12">
      <h6>Enter order details</h6>
    </div>
    <div class="col-md-12">
      <form @submit.prevent="confirmOrder">
        <div>
          <ValidationError :errors="errors" />
          <input
            type="text"
            class="form-control"
            v-model="order.name"
            placeholder="name"
          />
          <input
            type="email"
            class="form-control"
            v-model="order.email"
            placeholder="email"
          />
          <input
            type="text"
            class="form-control"
            v-model="order.address"
            placeholder="address"
          />
          <input
            type="text"
            class="form-control"
            v-model="order.remarks"
            placeholder="remarks"
          />
        </div>
        <button class="btn btn-info">Confirm order</button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      order: {
        name: this.$store.getters["auth/authUser"].name,
        email: this.$store.getters["auth/authUser"].email,
        address: "",
        products: this.$store.getters["cart/products"],
      },
      errors: [],
    };
  },
  methods: {
    confirmOrder() {
      this.$axios
        .post("/orders", this.order)
        .then(({ data }) => {
          this.$store.dispatch('cart/clearCart');
          this.$router.push({ name: "Home" });
        })
        .catch(({ response }) => {
          this.errors.splice(0, this.errors.length, ...response.data.errors);
        });
    },
  },
};
</script>

<style>
</style>