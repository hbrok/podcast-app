import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import format from "date-fns/format";

Vue.config.productionTip = false;

Vue.filter("date", function(date, dateFormat = "MMMM D, YYYY") {
  return format(date, dateFormat);
});

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
