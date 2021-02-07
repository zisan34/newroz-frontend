<template>
    <div class="row">
        <div class="col-md-12">
            <h6>Cart Products</h6>
        </div>
        <div class="col-md-6 offset-md-3" v-for="(product, index) in cart.products" :key="index">
            <ProductView :product="product" />
        </div>
        <div class="col-md-12">
            <router-link to="/checkout" class="btn btn-info" v-if="productCount > 0">Checkout</router-link>
        </div>
    </div>
</template>

<script>
import {mapGetters} from 'vuex';
import ProductView from '../components/shared/Product/View';
export default {
    computed:{
        ...mapGetters({
            cart: 'cart/getCart',
            productCount: 'cart/productCount'
        })
    },
    components: {ProductView}
}
</script>

<style>

</style>