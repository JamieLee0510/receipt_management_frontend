import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import {
  Button,
  Layout,
  Form,
  Input,
  Alert,
  Drawer,
  Menu,
  Select,
  Icon,
  Radio,
  List,
  DatePicker,
  Modal,
  TimePicker,
  FormModel,
  Popconfirm,
  Dropdown,
} from "ant-design-vue";

import { Row, Col } from "ant-design-vue/lib/grid";

Vue.use(Button);
Vue.use(Layout);
Vue.component(Row.name, Row);
Vue.component(Col.name, Col);
Vue.use(Form);
Vue.use(Input);
Vue.use(Alert);
Vue.use(Drawer);
Vue.use(Menu);
Vue.use(Select);
Vue.use(Icon);
Vue.use(Radio);
Vue.use(List);
Vue.use(DatePicker);
Vue.use(Modal);
Vue.use(TimePicker);
Vue.use(FormModel);
Vue.use(Popconfirm);
Vue.use(Dropdown);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
