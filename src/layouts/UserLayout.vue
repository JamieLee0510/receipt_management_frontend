<template>
  <div class="background">
    <a-row>
      <!-- todo：要調整一下a-col在不用螢幕下的比例 -->
      <a-col :span="24" class="logo">
        Receipt Management
      </a-col>
      <a-col :span="8"></a-col>
      <a-col :span="8">
        <router-view></router-view>
      </a-col>
      <a-col :span="8"></a-col>
    </a-row>
  </div>
</template>

<script>
export default {};
</script>

<style>
.background {
  width: 100vw;
  height: 100vh;
  background-color: #f57b2e;
}
.logo {
  margin-top: 100px;
  text-align: center;
  font-size: 3em;
}
</style>
