<template>
  <div class="home">
    <h3>Welcome to Newroz Shop</h3>
    <h6>Products</h6>
    <div class="row">
      <div class="col-4" v-for="(product, index) in products" :key="index">
        <ProductView :product="product" />
      </div>
    </div>
  </div>
</template>

<script>
import ProductView from "../components/shared/Product/View";
export default {
  name: "Home",
  data() {
    return {
      products: [],
    };
  },
  mounted() {
    this.$axios.get("/products").then(({ data }) => {
      this.products.splice(0, this.products.length, ...data.data.products);
    });
  },
  components: { ProductView },
};
</script>
