<template>
  <div class="row">
      <div class="col-12">
        <table class="table">
            <thead>
                <th>Name</th>
                <th style="width: 10%!important">Photo</th>
                <th>Email</th>
                <th>Action</th>
            </thead>
            <tbody>
                <tr v-for="(user, index) in customers" :key="index">
                    <td>{{user.name}}</td>
                    <td><img style="width:100%!important" :src="asset(user.profile_picture)"> </td>
                    <td>{{user.email}}</td>
                    <td>
                        <router-link :to="{name: 'Orders', query: { customer_id: user.id }}" class="btn btn-info">View orders ({{user.orders_count || 0}})</router-link>
                    </td>
                </tr>
            </tbody>
        </table>
      </div>
  </div>
</template>

<script>
export default {
    data(){
        return {
            customers : []
        };
    },
    mounted(){
        this.$axios.get('/customers').then(({data})=>{
            this.customers.splice(0, this.customers.length, ...data.data.customers);
        });
    }
}
</script>

<style>

</style>