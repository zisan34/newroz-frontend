import {asset_path_prefix} from '../../config/app';
import {mapGetters} from 'vuex';
const mixins = {
    computed:{
        ...mapGetters({
            isLoggedIn: 'auth/isLoggedIn',
            authUser: 'auth/authUser',
        })
    },
    methods:{
        hasPermissionTo(permission_name){
            return this.$store.getters['auth/hasPermissionTo'](permission_name);
        },
        hasRole(role_name){
            return this.$store.getters['auth/hasRole'](role_name);
        },
        asset(path){
            return path ? asset_path_prefix.replace(new RegExp("[" + '/' + "]+$"), "") + '/' + path.replace(new RegExp("^[" + '/' + "]+"), "") : "";
        },
    }
};

export default mixins;