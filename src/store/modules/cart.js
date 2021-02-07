
export default {
    namespaced: true,
    state: {
        products: [],
    },
    getters: {
        getCart(state) {
            return state;
        },
        products(state) {
            return state.products;
        },
        productCount(state) {
            return state.products.length;
        },
        subTotalPrice(state) {
            let price = new Number();

            state.products.forEach(function (product, index) {
                price += Number(product.price);
            });
            return price;
        },
        grandTotalPrice(state, getters) {

            let price = new Number(getters.subTotalPrice - state.discountAmount);

            return price;
        },
        inCart: (state, getters) => (product_id) => {
            return !!(state.products.length > 0 && state.products.find((product) => product.id === product_id));
        }
    },
    mutations: {
        addProduct(state, added_product) {
            if (!(state.products.length > 0 && state.products.find((product) => product.id === added_product.id))) {
                state.products.push(added_product);
            }
        },
        removeProduct(state, product) {
            const index = state.products.findIndex(arr_el => arr_el.id === product.id);
            if (index > -1) {
                state.products.splice(index, 1);
            }
        },
        clearCart(state){
            state.products.splice(0, state.products.length);
        }

    },
    actions: {
        addProduct(thisModule, product) {
            thisModule.commit("addProduct", product);
        },
        removeProduct(thisModule, product) {
            thisModule.commit("removeProduct", product);
        },
        clearCart(thisModule){
            thisModule.commit('clearCart');
        }
    },
}