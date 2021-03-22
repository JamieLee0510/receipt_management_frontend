<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <router-link tag="span" to="/user">test link</router-link>
    <a-button type="primary">
      測試button
    </a-button>
    <HelloWorld msg="Welcome to Your Vue.js App" />
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";

export default {
  name: "Home",
  components: {
    HelloWorld,
  },
};
</script>
