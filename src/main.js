import Vue from 'vue'
<<<<<<< HEAD
import App from './views/createExercise.vue'
=======
import App from './App.vue'
>>>>>>> 5e0b40e3806edaf633946b29dc867c529572d2a1
import vuetify from './plugins/vuetify'
import router from './router'
import { createPinia, PiniaVuePlugin } from "pinia";
import VueCompositionAPI from '@vue/composition-api';

Vue.use(PiniaVuePlugin);
const pinia = createPinia();
Vue.use(VueCompositionAPI);

Vue.config.productionTip = false

new Vue({
  pinia,
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app')