<template>
  <div class="card mt-3">
    <div class="card-header">
      <h5>Title: {{ product.title }}</h5>
    </div>
    <div class="card-body">
      <div>Description: {{ product.description }}</div>
      <div>Price: {{ product.price }}</div>
      <div v-if="product.images">
        <carousel :autoplay="true" :autoplayHoverPause="true" :perPage="1">
          <slide v-for="(image, index) in product.images" :key="index">
            <img :src="asset(image.image_path)" class="w-100" style="max-height: 200px;"/>
          </slide>
        </carousel>
      </div>
    </div>
    <div class="card-footer">
      <template v-if="!isLoggedIn || hasPermissionTo('Add products to cart') || !disable_actions">
        <button class="btn btn-danger"
          v-if="inCart(product.id)"
          @click.prevent="removeProduct(product)"
        >
          Remove from cart
        </button>
        <button class="btn btn-info" v-else @click.prevent="addProduct(product)">Add to cart</button>
      </template>

      <slot></slot>
    </div>
  </div>
</template>

<script>
import { Carousel, Slide } from "vue-carousel";
import { mapActions } from "vuex";
export default {
  props: ["product", "disable_actions"],
  methods: {
    inCart(product_id) {
      return this.$store.getters["cart/inCart"](product_id);
    },
    ...mapActions({
      addProduct: "cart/addProduct",
      removeProduct: "cart/removeProduct",
    }),
  },
  components: {
    Carousel,
    Slide,
  },
};
</script>

<style>
</style>