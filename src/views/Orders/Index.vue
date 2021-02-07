<template>
  <div class="row">
    <div class="col-12">
      <table class="table">
        <thead>
          <th>Customer Info</th>
          <th>Order info</th>
          <th>Notes</th>
          <th>Action</th>
        </thead>
        <tbody>
          <tr v-for="(order, index) in orders" :key="index">
            <td>
              Name: {{ order.name }} <br />
              Email: {{ order.email }} <br />
              Address: {{ order.address }} <br />
              Remarks: {{ order.remarks }} <br />
            </td>
            <td>
              Order date: {{ order.created_at }} <br />
              Order status: {{ order.order_status }} <br />
              Tracking status: {{ order.tracking_status }} <br />
              Payment status: {{ order.payment_status }} <br />
            </td>
            <td>
              <div v-for="(note, index) in order.notes" :key="index">
                Title: {{ note.title }} <br />
                Description: {{ note.description }} <br />
                Date: {{ note.created_at }}
                <hr />
              </div>
            </td>
            <td>
              <router-link
                class="btn btn-sm btn-info"
                v-if="hasPermissionTo('Change order status')"
                :to="`/orders/${order.id}/change-status`"
                >Change status</router-link
              >
              <router-link
                class="btn btn-sm btn-info"
                v-if="hasPermissionTo('Add notes to order')"
                :to="`/orders/${order.id}/add-note`"
                >Add note</router-link
              >
              <router-link
                class="btn btn-sm btn-info"
                v-if="hasPermissionTo('Edit orders')"
                :to="`/orders/${order.id}/edit`"
                >Edit</router-link
              >
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      orders: [],
    };
  },
  mounted() { this.fetchOrders(); },
  computed:{
    query(){
      return this.$route.query;
    }
  },
  methods: {
    fetchOrders() {
      this.$axios
        .get("/orders", {
          params: this.query || {},
        })
        .then(({ data }) => {
          this.orders.splice(0, this.orders.length, ...data.data.orders);
        });
    },
  },
  watch: {
    $route() {
        this.fetchOrders()
    }
  },
};
</script>

<style>
</style>