import { initModule } from "@/store";

const TheCalculation = () =>
  import(/* webpackChunkName: "calculation" */ "@/components/Calculation/TheCalculation");
const calculationStore = () =>
  import(/* webpackChunkName: "calculation" */ "@/store/modules/calculation");

const TheChain = () =>
  import(/* webpackChunkName: "chain" */ "@/components/Chain/TheChain");
const chainStore = () =>
  import(/* webpackChunkName: "chain" */ "@/store/modules/chain");

const TheMessages = () =>
  import(/* webpackChunkName: "messages" */ "@/components/Messages/TheMessages");
const messagesStore = () =>
  import(/* webpackChunkName: "messages" */ "@/store/modules/messages");

const routes = [
  {
    path: "/",
    component: TheCalculation,
    beforeEnter: (to, from, next) => {
      calculationStore().then(module => {
        initModule({ module: module.default, name: "calculation" });
        next();
      });
    }
  },
  {
    path: "/chain",
    component: TheChain,
    beforeEnter: (to, from, next) => {
      chainStore().then(module => {
        initModule({ module: module.default, name: "chain" });
        next();
      });
    }
  },
  {
    path: "/messages",
    component: TheMessages,
    beforeEnter: (to, from, next) => {
      messagesStore().then(module => {
        initModule({ module: module.default, name: "messages" });
        next();
      });
    }
  }
];
export default routes;
