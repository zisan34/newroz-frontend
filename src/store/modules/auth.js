
import axios from 'axios';
import router from '../../router/index';
import objectToFormData from '../../utils/objectToFormData';
export default {
    namespaced: true,
    state: {
        auth_data: null,
    },
    getters: {
        isLoggedIn(state) { return !!state.auth_data; },
        authUser(state){ return state.auth_data ? state.auth_data.user : null; },
        userPermissions(state) {
            return state.auth_data ? state.auth_data.permissions : null;
        },
        userRoles(state) {
            return state.auth_data ? state.auth_data.roles : null;
        },
		hasPermissionTo:(state, getters) => (permission_name) => {
            if(getters.userPermissions){
                let permission_names = getters.userPermissions.map(permission => permission.name);
                return permission_names.includes(permission_name);
            }
            return false;
		},
		hasRole:(state, getters) => (role_name) => {
            if(getters.userRoles){
                getters.userRoles.forEach(permission => {
                   if(permission.name == role_name) return true; 
                });
            }
            return false;
		},
    },
    mutations: {
        setAuthUserData(state, userData) {
            state.auth_data = { ...userData };
            localStorage.setItem('auth_data', JSON.stringify(state.auth_data));
            axios.defaults.headers.common.Authorization = `Bearer ${userData.token}`;
        },
        clearAuthUserData(state) {
            localStorage.removeItem('auth_data');
            state.auth_data = null;
            axios.defaults.headers.common.Authorization = "";
            router.push('/').catch(err => err);
        }
    },
    actions: {
        login({ commit }, payload) {
            return axios.post('/login', payload)
                .then(({ data }) => {
                    commit('setAuthUserData', data.data)
                });
        },
        register({ commit }, payload) {
            let form_data = objectToFormData(payload);
            return axios.post('/register', form_data)
                .then(({ data }) => {
                    commit('setAuthUserData', data.data)
                });
        },
        logout({ commit }) {
            axios.post('/logout')
                .then(res => console.log(res.data))
                .catch(err => console.log(err.response));
            
            commit('clearAuthUserData');
        }
    },
}