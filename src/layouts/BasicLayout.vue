<template>
  <!-- <div :class="[`nav-theme-${navTheme}`, `nav-layout-${navLayout}`]"> -->
  <a-layout style="min-height: 100vh">
    <a-layout-sider
      theme="dark"
      v-model="collapsed"
      :trigger="null"
      collapsible
    >
      <div class="logo">Logo</div>
      <a-menu theme="dark" mode="inline">
        <a-menu-item
          key="1"
          @click="() => $router.push({ path: 'receipt_list' })"
        >
          <a-icon type="container" />
          <span> Receipts Table</span>
        </a-menu-item>
        <a-menu-item
          key="2"
          @click="() => $router.push({ path: 'receipt_chart' })"
        >
          <a-icon type="bar-chart" />
          <span>Receipts Calculation</span>
        </a-menu-item>
        <!-- <a-menu-item key="3">
          <a-icon type="upload" />
          <span>nav 3</span>
        </a-menu-item> -->
      </a-menu>
    </a-layout-sider>
    <a-layout>
      <a-layout-header style="background: #fff; padding: 0">
        <a-row>
          <a-col :xs="8" :sm="6" :md="8" :xl="9">
            <a-icon
              class="trigger"
              :type="collapsed ? 'menu-unfold' : 'menu-fold'"
              @click="collapsed = !collapsed"
            ></a-icon> </a-col
          ><a-col :xs="13" :sm="16" :md="14" :xl="13">
            <div style="font-size:32px">
              Receipt Management
            </div>
          </a-col>
          <a-col :xs="3" :sm="2" :md="2" :xl="2">
            <a-button @click="logout">Logout</a-button>
          </a-col>
        </a-row>
      </a-layout-header>
      <a-layout-content style="margin: 0 16px">
        <router-view></router-view>
      </a-layout-content>
      <a-layout-footer style="text-align: center">
        <Footer />
      </a-layout-footer>
    </a-layout>
  </a-layout>
  <!-- </div> -->
</template>

<script>
// import SiderMenu from "./SiderMenu";
import Footer from "./Footer";

export default {
  data() {
    return {
      collapsed: false,
    };
  },
  methods: {
    logout() {
      setTimeout(() => {
        localStorage.removeItem("access_token");
      }, 0);
      this.$router.go("/");
    },
  },

  components: {
    Footer,
  },
};
</script>

<style scroped>
.trigger {
  padding: 0 20px;
  line-height: 64px;
  font-size: 20px;
}
.trigger :hover {
  background: #eeeeee;
}
.logo {
  height: 64px;
  line-height: 64px;
  text-align: center;
  overflow: hidden;
  color: #ffffff;
}
</style>
