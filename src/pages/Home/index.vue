<template>
  <div>
    <!-- 全局组件：侧边栏菜单+顶部菜单(home/search) -->
    <TypeNav />
    <!-- 轮播图+ -->
    <ListContainer />
    <!-- 今日推荐 -->
    <Recommend />
    <!-- 商品排行 -->
    <Rank />
    <!-- 猜你喜欢 -->
    <Likes />
    <!-- 楼层 -->
    <Floor v-for="floor in floorList" :key="floor.id" :list="floor" />
    <!-- 品牌 -->
    <Brand />
  </div>
</template>

<script>
import ListContainer from "./ListContainer";
import Recommend from "./Recommend";
import Rank from "./Rank";
import Likes from "./Likes";
import Brand from "./Brand";
import Floor from "./Floor";
import { mapState } from "vuex";
export default {
  name: "Home",
  components: { ListContainer, Recommend, Rank, Likes, Brand, Floor },
  mounted() {
    this.$store.dispatch("home/getFloorList")
    this.$store.dispatch('user/getUserInfo')
  },
  computed: {
    ...mapState("home", ["floorList"]),
  },
};
</script>