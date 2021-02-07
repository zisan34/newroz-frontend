<template>
  <div id="app">
    <div class="col-12">
      <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <router-link class="navbar-brand" to="/">Home</router-link>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav">
            <li class="nav-item">
              <router-link to="/products" class="nav-link">Products</router-link>
            </li>
            <li class="nav-item">
              <router-link to="/customers" class="nav-link" v-if="hasPermissionTo('View customers')">Customers</router-link>
            </li>
            <li class="nav-item">
              <router-link to="/orders" class="nav-link" v-if="hasPermissionTo('View orders')">Orders</router-link>
            </li>
            <template v-if="!!isLoggedIn">
              <li class="nav-item">
                <router-link to="/profile" class="nav-link">Your Profile</router-link>
              </li>
            </template>
            <template v-else>
              <li class="nav-item">
                <router-link to="/login" class="nav-link">Login</router-link>
              </li>
              <li class="nav-item">
                <router-link to="/register" class="nav-link">Register</router-link>
              </li>
            </template>
            <li class="nav-item">
              <a href="#" @click="$store.dispatch('auth/logout')" class="nav-link" v-if="!!isLoggedIn">Logout</a>
            </li>
            <li class="nav-item" v-if="!isLoggedIn || hasPermissionTo('Add products to cart')">
              <router-link to="/cart" class="nav-link">Cart({{productCount || 0}})</router-link>
            </li>
          </ul>
        </div>
      </nav>
    </div>
    <div class="col-12">
      <div class="container">
        <router-view />
      </div>
    </div>
  </div>
</template>
<script>
import {mapGetters} from 'vuex';
export default {
  computed:{
    ...mapGetters({
      productCount: 'cart/productCount'
    })
  }
};
</script>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
