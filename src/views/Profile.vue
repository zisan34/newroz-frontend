<template>
  <div class="about">
    <template v-if="!!authUser">
      <h1>Your info</h1>
      <h6>Name: {{ authUser.name }}</h6>
      <h6>Email: {{ authUser.email }}</h6>
      <h6>Phone: {{ authUser.phone }}</h6>
      <h6>
        Role:
        <span v-for="(role, index) in authUser.roles" :key="index"
          >{{ role.name }}
          <span v-if="index < authUser.roles.length - 1">, </span></span
        >
      </h6>
      <h6 v-if="authUser.profile_picture">
        Profile picture: <img :src="asset(authUser.profile_picture)" />
      </h6>
    </template>
  </div>
</template>
<script>
export default {};
</script>
