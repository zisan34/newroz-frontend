<template>
  <div>
    <input
      class="form-control"
      type="text"
      v-model="user.name"
      placeholder="name"
    />
    <input
      class="form-control"
      type="email"
      v-model="user.email"
      placeholder="email"
    />
    <input
      class="form-control"
      type="tel"
      v-model="user.phone"
      placeholder="phone"
    />
    <input
      class="form-control"
      type="file"
      accept="image/*"
      @change="profilePhotoSelected"
    />
    <input
      class="form-control"
      type="password"
      v-model="user.password"
      placeholder="password"
    />
    <input
      class="form-control"
      type="password"
      v-model="user.password_confirmation"
      placeholder="confirm password"
    />
  </div>
</template>

<script>
export default {
  props: ['user'],
  methods: {
    profilePhotoSelected(event) {
      if (event.target.files[0]) {
        this.user.profile_picture = event.target.files[0];
      } else {
        this.user.profile_picture = null;
      }
    },
  },
};
</script>

<style>
</style>