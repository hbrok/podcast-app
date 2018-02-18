import Vue from "vue";
import Router from "vue-router";
import PodcastView from "./views/PodcastView.vue";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "PodcastView",
      component: PodcastView
    }
  ]
});
