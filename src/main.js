import Vue from 'vue';
import App from './App.vue';
import VueMaterial from 'vue-material';
import 'vue-material/dist/vue-material.min.css';
import 'vue-material/dist/theme/default.css';
import VueApollo from 'vue-apollo';

Vue.use(VueMaterial);
Vue.config.productionTip = false;
import apolloClient from './services/apolloClient';

Vue.config.productionTip = false;
Vue.use(VueApollo);

const apolloProvider = new VueApollo({
  defaultClient: apolloClient,
  defaultOptions: { $query: { fetchPolicy: 'no-cache' } },
});

new Vue({
  el: '#app',
  apolloProvider,
  render: h => h(App),
});
