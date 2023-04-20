<template>
  <div class="swiper-container">
    <div class="swiper-wrapper">
      <div class="swiper-slide" v-for="c in list" :key="c.id">
        <img :src="c.imgUrl" />
      </div>
    </div>
    <!-- 如果需要分页器 -->
    <div class="swiper-pagination"></div>

    <!-- 如果需要导航按钮 -->
    <div class="swiper-button-prev"></div>
    <div class="swiper-button-next"></div>
  </div>
</template>

<script>
import Swiper from "swiper";
// 轮播图样式
import "swiper/css/swiper.min.css";
export default {
  name: "Carousel",
  props: ["list"],
  watch: {
    list: {
      // 一上来就执行一次handler(list在父组件传过来时已经是个包含完整数据的对象)
      immediate: true,
      handler() {
        // 此时可以监听到数据list变化了，但v-for动态渲染dom没法确定最终dom结构
        // 所以使用nextTick钩子，保证页面结构完整后进行swiper初始化
        this.$nextTick(() => {
          var mySwiper = new Swiper(".swiper-container", {
            // direction: 'vertical', // 垂直切换选项
            loop: true, // 循环模式选项

            // 如果需要分页器
            pagination: {
              el: ".swiper-pagination",
              clickable: true,
            },

            // 如果需要前进后退按钮
            navigation: {
              nextEl: ".swiper-button-next",
              prevEl: ".swiper-button-prev",
            },

            // 如果需要滚动条
            // scrollbar: {
            //   el: '.swiper-scrollbar',
            // },

            // 自动播放且用户操作后也不会停止
            autoplay: {
              disableOnInteraction: false,
            },
          });
        });
      },
    },
  },
};
</script>