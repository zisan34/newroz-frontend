
<template>
  <div class="row">
    <div class="col-md-6 offset-md-3">
      <h1>Login</h1>
      <form @submit.prevent="login">
        <ValidationError :errors="errors"/>
        <input type="email" class="form-control" v-model="email" placeholder="email" />
        <input type="password" class="form-control" v-model="password" placeholder="password" />
        <button type="submit" class="btn btn-info">Login</button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: "",
      password: "",
      errors: [],
    };
  },

  methods: {
    login() {
      this.$store
        .dispatch("auth/login", {
          email: this.email,
          password: this.password,
        })
        .then(() => {
          this.$router.push({ name: "Home" });
        })
        .catch((err) => {
          this.errors.splice(0, this.errors.length, ...err.response.data.errors);
        });
    },
  },
};
</script>