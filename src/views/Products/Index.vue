<template>
  <div class="row">
    <div class="col-12">
      <router-link
        to="products/create"
        v-if="hasPermissionTo('Create products')"
        class="btn btn-info"
        >Create product</router-link
      >
    </div>
    
    <div class="col-4" v-for="(product, index) in products" :key="index">
      <ProductView :product="product"></ProductView>
    </div>

  </div>
</template>

<script>
import ProductView from '../../components/shared/Product/View';
export default {
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
  components: {ProductView}
};
</script>

<style>
</style>