<template>
  <div>
    <form @submit.prevent="updateOrder">
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
      <select v-model="order.order_status" class="form-control">
        <option
          v-for="(status, index) in order_statuses"
          :value="status"
          :key="index"
        >
          {{ status }}
        </option>
      </select>
      <select v-model="order.tracking_status" class="form-control">
        <option
          v-for="(status, index) in tracking_statuses"
          :value="status"
          :key="index"
        >
          {{ status }}
        </option>
      </select>
      <select v-model="order.payment_status" class="form-control">
        <option
          v-for="(status, index) in payment_statuses"
          :value="status"
          :key="index"
        >
          {{ status }}
        </option>
      </select>
      <div class="row">
        <div
          class="col-md-3"
          v-for="(product, index) in order.products"
          :key="index"
        >
          <ProductView :product="product" :disable_actions="true">
            <button class="btn btn-sm btn-danger" @click.prevent="removeProduct(index)">Remove product</button>
          </ProductView>
        </div>
      </div>
      <button class="btn btn-info">Save</button>
    </form>
  </div>
</template>

<script>
import ProductView from "../../components/shared/Product/View";
export default {
  data() {
    return {
      order: {},
      order_statuses: ["draft", "confirmed", "cancelled"],
      tracking_statuses: ["pending", "label_generated", "shipped", "delivered"],
      payment_statuses: ["due", "paid"],
      errors: [],
    };
  },
  mounted() {
    this.$axios.get(`/orders/${this.$route.params.id}`).then(({ data }) => {
      this.order = { ...data.data.order };
    });
  },
  methods: {
    updateOrder() {
      this.$axios
        .put(`/orders/${this.$route.params.id}`, this.order)
        .then(() => {
          this.$router.push({ name: "Orders" });
        })
        .catch(({ response }) => {
          this.errors.splice(0, this.errors.length, ...response.data.errors);
        });
    },
    removeProduct(product_index){
        this.order.products.splice(product_index, 1);
    }
  },
  components: { ProductView },
};
</script>

<style>
</style>