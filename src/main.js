import Vue from 'vue';
import VueApollo from 'vue-apollo';

import apolloClient from './services/apolloClient';
import App from './App.vue';

Vue.config.productionTip = false;
Vue.use(VueApollo);

const apolloProvider = new VueApollo({
  defaultClient: apolloClient,
});

new Vue({
  el: '#app',
  apolloProvider,
  render: h => h(App),
});
