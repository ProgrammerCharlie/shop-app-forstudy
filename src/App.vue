<template>
  <div>
    <Header />
    <router-view></router-view>
    <Footer v-show="$route.meta.isFooterShow" />
  </div>
</template>

<script>
import Header from "./components/Header";
import Footer from "./components/Footer";
export default {
  name: "App",
  components: { Header, Footer },
  mounted() {
    // 第一次打开页面时挂载一次该钩子
    // store的action就只会发送一次ajax请求
    this.$store.dispatch("home/getCategoryList");
  },
};
</script>