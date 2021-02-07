<template>
  <div>
    <h1>Create Product</h1>
    <ValidationError :errors="errors" />
    <form @submit.prevent="createProduct">
      <input
        class="form-control"
        type="text"
        v-model="product.title"
        placeholder="title"
      />
      <input
        class="form-control"
        type="text"
        v-model="product.description"
        placeholder="description"
      />
      <input
        class="form-control"
        type="number"
        v-model="product.price"
        placeholder="price"
      />
      <input
        class="form-control"
        type="file"
        accept="image/*"
        multiple
        @change="imagesSelected"
      />
      <button type="submit" class="btn btn-info">Submit</button>
    </form>
  </div>
</template>

<script>
import objectToFormData from '../../utils/objectToFormData';
export default {
  data() {
    return {
      product: {
        title: "",
        description: "",
        price: "",
        images: [],
      },
      errors: [],
    };
  },
  methods: {
    imagesSelected(event) {
      if (event.target.files[0]) {
        this.product.images.splice(
          0,
          this.product.images.length,
          ...event.target.files
        );
      } else {
        this.product.images = [];
      }
    },
    createProduct() {
      let form_data = objectToFormData(this.product);

      this.$axios
        .post("products", form_data)
        .then(() => this.$router.push({ name: "Products" }))
        .catch((err) => {
          this.errors.splice(
            0,
            this.errors.length,
            ...err.response.data.errors
          );
        });
    },
  },
};
</script>

<style>
</style>