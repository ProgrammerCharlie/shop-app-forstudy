<template>
  <!-- 商品分类导航 -->
  <div class="type-nav">
    <div class="container" @mouseenter="handleShow" @mouseleave="handleDispear">
      <h2 class="all">全部商品分类</h2>

      <nav class="nav">
        <a href="###">服装城</a>
        <a href="###">美妆馆</a>
        <a href="###">瑞品汇超市</a>
        <a href="###">全球购</a>
        <a href="###">闪购</a>
        <a href="###">团购</a>
        <a href="###">有趣</a>
        <a href="###">秒杀</a>
      </nav>

      <transition name="sort">
        <div class="sort" v-show="show" @mouseleave="resetIndex">
          <div class="all-sort-list2" @click="goSearch">
            <!-- 一级 -->
            <div
              class="item"
              v-for="(c1, index) in categoryList"
              :key="c1.categoryId"
            >
              <h3 @mouseenter="changeIndex(index)">
                <a :data-Flag="c1.categoryName" :data-Flag1="c1.categoryId">
                  {{ c1.categoryName}}
                </a>
              </h3>
              <!-- 二级 -->
              <div
                class="item-list clearfix"
                :style="{ display: currentIndex == index ? 'block' : 'none' }"
              >
                <div
                  class="subitem"
                  v-for="c2 in c1.categoryChild"
                  :key="c2.categoryId"
                >
                  <dl class="fore">
                    <dt>
                      <a
                        :data-Flag="c2.categoryName"
                        :data-Flag2="c2.categoryId"
                        >{{ c2.categoryName }}</a
                      >
                    </dt>
                    <!-- 三级 -->
                    <dd>
                      <em v-for="c3 in c2.categoryChild" :key="c3.categoryId">
                        <a
                          :data-Flag="c3.categoryName"
                          :data-Flag3="c3.categoryId"
                          >{{ c3.categoryName }}</a
                        >
                      </em>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
// 节流函数：commonjs的暴露
import throttle from "lodash/throttle";
import { mapState } from "vuex";
export default {
  name: "TypeNav",
  data() {
    return {
      currentIndex: -1,
      show: true,
    };
  },
  methods: {
    changeIndex: throttle(function (index) {
      this.currentIndex = index;
    }, 50),
    resetIndex() {
      this.currentIndex = -1;
    },
    // 路由跳转回调
    goSearch(e) {
      // console.log(e.target.dataset);
      let { flag, flag1, flag2, flag3 } = e.target.dataset;
      // 第一层筛选
      if (flag) {
        let location = { name: "search" };
        /**
         * flag: categoryName
         * flag1/2/3: categoryId
         */
        let query = { categoryName: flag };
        // 第二层筛选
        if (flag1) {
          // 一级
          query.category1Id = flag1;
        } else if (flag2) {
          // 二级
          query.category2Id = flag2;
        } else {
          // 三级
          query.category3Id = flag3;
        }
        // 在路由跳转之前，把参数合并
        if (this.$route.params) {
          location.params = this.$route.params;
          location.query = query;
          this.$router.push(location);
        }
      }
    },
    // 在search路由中控制展示与隐藏
    handleShow() {
      this.show = true;
    },
    handleDispear() {
      // search路由中三级联动组件默认不显示
      if (!this.$route.meta.isNavShow) {
        this.show = false;
      }
    },
  },
  // mounted钩子：每次路由跳转时该路由会被销毁，钩子同时也会销毁
  mounted() {
    // 去“app”根组件处派发任务和数据，mounted钩子只挂载一次
    // this.$store.dispatch("home/categoryList");
    // search路由中三级联动组件默认不显示
    if (!this.$route.meta.isNavShow) {
      this.show = false;
    }
  },
  computed: {
    ...mapState("home", ["categoryList"]),
  },
};
</script>

<style lang="less" scoped>
.type-nav {
  border-bottom: 2px solid #e1251b;

  .container {
    width: 1200px;
    margin: 0 auto;
    display: flex;
    position: relative;

    .all {
      width: 210px;
      height: 45px;
      background-color: #e1251b;
      line-height: 45px;
      text-align: center;
      color: #fff;
      font-size: 14px;
      font-weight: bold;
    }

    .nav {
      a {
        height: 45px;
        margin: 0 22px;
        line-height: 45px;
        font-size: 16px;
        color: #333;
      }
    }

    .sort {
      position: absolute;
      left: 0;
      top: 45px;
      width: 210px;
      height: 461px;
      position: absolute;
      background: #fafafa;
      z-index: 999;

      .all-sort-list2 {
        .item {
          h3 {
            line-height: 30px;
            font-size: 14px;
            font-weight: 400;
            overflow: hidden;
            padding: 0 20px;
            margin: 0;

            &:hover {
              background-color: #ccc;
            }
            a {
              cursor: pointer;
            }
          }

          .item-list {
            display: none;
            position: absolute;
            width: 734px;
            min-height: 460px;
            background: #f7f7f7;
            left: 210px;
            border: 1px solid #ddd;
            top: 0;
            z-index: 9999 !important;

            .subitem {
              float: left;
              width: 650px;
              padding: 0 4px 0 8px;

              a {
                cursor: pointer;
              }

              dl {
                border-top: 1px solid #eee;
                padding: 6px 0;
                overflow: hidden;
                zoom: 1;

                &.fore {
                  border-top: 0;
                }

                dt {
                  float: left;
                  width: 54px;
                  line-height: 22px;
                  text-align: right;
                  padding: 3px 6px 0 0;
                  font-weight: 700;
                }

                dd {
                  float: left;
                  width: 415px;
                  padding: 3px 0 0;
                  overflow: hidden;

                  em {
                    float: left;
                    height: 14px;
                    line-height: 14px;
                    padding: 0 8px;
                    margin-top: 5px;
                    border-left: 1px solid #ccc;
                  }
                }
              }
            }
          }
        }
      }
    }
    // 自定义过渡动画样式
    .sort-enter {
      height: 0px;
    }
    .sort-enter-to {
      height: 461px;
    }
    .sort-enter-active {
      transition: all 0.5s linear;
    }
  }
}
</style>