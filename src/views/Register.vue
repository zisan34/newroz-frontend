
<template>
  <div class="row">
    <div class="col-md-6 offset-md-3">
      <h1>Register</h1>
      <form @submit.prevent="register">
        <ValidationError :errors="errors"/>
        <FormFields :user="user"></FormFields>
        <button type="submit" class="btn btn-info">Register</button>
      </form>
    </div>
  </div>
</template>

<script>
import FormFields from '../components/shared/User/FormFields';
export default {
  data() {
    return {
      user: {
        name: "",
        email: "",
        phone: "",
        password: "",
        password_confirmation: "",
        profile_picture: "",
      },
      errors: [],
    };
  },

  methods: {
    register() {
      this.$store
        .dispatch("auth/register", this.user)
        .then(() => this.$router.push({ name: "Home" }))
        .catch((err) => {
          // console.dir(err.response.data.errors, 'catch');
          this.errors.splice(0, this.errors.length, ...err.response.data.errors);
        });
    },
  },
  components: {FormFields}
};
</script>