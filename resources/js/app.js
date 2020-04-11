/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

require('./bootstrap');

window.Vue = require('vue');

import VueRouter from 'vue-router'
import routes from "./routes.js";
import VueBroadCast from "./VueBroadcast";
import CKEditor from '@ckeditor/ckeditor5-vue';
import Toasted from 'vue-toasted';
import _ from 'lodash';
    
    

const router = new VueRouter({
    mode: 'history',    
    routes  
})

/**
 * The following block of code may be used to automatically register your
 * Vue components. It will recursively scan this directory for the Vue
 * components and automatically register them with their "basename".
 *
 * Eg. ./components/ExampleComponent.vue -> <example-component></example-component>
 */

// const files = require.context('./', true, /\.vue$/i)
// files.keys().map(key => Vue.component(key.split('/').pop().split('.')[0], files(key).default))

Vue.component('app',require('./App.vue').default);

Vue.use(VueRouter);
Vue.use(VueBroadCast);
Vue.use(CKEditor)
Vue.use(Toasted,{position:'bottom-right',duration:5000,fitToScreen:true})

/**
 * Next, we will create a fresh Vue application instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */

window.app = new Vue({
    el: '#app',
    router
});
