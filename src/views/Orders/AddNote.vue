<template>
  <div class="row">
    <div class="col-md-6 offset-md-3">
      <form @submit.prevent="addNote">
        <ValidationError :errors="errors" />
        <input
          type="text"
          class="form-control"
          v-model="note.title"
          placeholder="note title"
        />
        <textarea
          v-model="note.description"
          class="form-control"
          placeholder="note description"
        ></textarea>
        <button type="submit" class="btn btn-info">Submit</button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      note: {
        title: "",
        description: "",
      },
      errors: []
    };
  },
  methods: {
    addNote() {
      this.$axios
        .post(`/orders/${this.$route.params.id}/add-note`, this.note)
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