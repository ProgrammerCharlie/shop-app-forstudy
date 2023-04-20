<template>
  <!-- 头部 -->
  <header class="header">
    <!-- 头部的第一行 -->
    <div class="top">
      <div class="container">
        <div class="loginList">
          <p>瑞品汇欢迎您！</p>
          <p v-if="token === null || token === ''">
            <span>请</span>
            <!-- 声明式导航 -->
            <router-link to="/login">登录 | </router-link>
            <router-link to="/register" class="register">免费注册</router-link>
          </p>
          <p v-else>
            <!-- 已登录 -->
            <a>{{userInfo.name}}</a>
            <a class="register" @click="logout">退出登录</a>
          </p>
        </div>

        <div class="typeList">
          <a href="###">我的订单</a>
          <a href="###">我的购物车</a>
          <a href="###">我的瑞品汇</a>
          <a href="###">瑞品汇会员</a>
          <a href="###">企业采购</a>
          <a href="###">关注瑞品汇</a>
          <a href="###">合作招商</a>
          <a href="###">商家后台</a>
        </div>
      </div>
    </div>
    <!--头部第二行 搜索区域-->
    <div class="bottom">
      <h1 class="logoArea">
        <router-link class="logo" to="/home">
          <img src="./images/logo.png" alt="" />
          <h2>瑞品汇</h2>
        </router-link>
      </h1>
      <div class="searchArea">
        <form action="###" class="searchForm">
          <input
            type="text"
            id="autocomplete"
            class="input-error input-xxlarge"
            v-model="keyword"
          />
          <button
            class="sui-btn btn-xlarge btn-danger"
            type="button"
            @click="goSearch"
          >
            搜索
          </button>
        </form>
      </div>
    </div>
  </header>
</template>

<script>
import {mapState} from 'vuex'
export default {
  name: "Header",
  data() {
    return {
      keyword: "",
    };
  },
  computed:{
    ...mapState('user',['userInfo', 'token'])
  },
  methods: {
    // 编程式导航跳转路由组件
    goSearch() {
      if (this.keyword === "") {
        alert("输入不可为空！");
        return;
      }
      let location = { name: "search", params: { keyword: this.keyword } };
      // 合并参数(query和params)
      if (this.$route.query) {
        location.query = this.$route.query;
      }
      this.$router.push(location)
    },
    
    // 退出登录
    async logout(){
      try {
        await this.$store.dispatch('user/userLogout')
        this.$route.push({ path:'/home' })
      } catch (error) {
        console.log(error.message)
      }
    }
  },
  mounted(){
    this.$bus.$on('clear',()=>{
      this.keyword = ''
    })
  }
};
</script>

<style lang="less" scoped>
.header {
  & > .top {
    background-color: #eaeaea;
    height: 30px;
    line-height: 30px;

    .container {
      width: 1200px;
      margin: 0 auto;
      overflow: hidden;

      .loginList {
        float: left;

        p {
          float: left;
          margin-right: 10px;

          .register {
            border-left: 1px solid #b3aeae;
            padding: 0 5px;
            margin-left: 5px;
          }
        }
      }

      .typeList {
        float: right;

        a {
          padding: 0 10px;

          & + a {
            border-left: 1px solid #b3aeae;
          }
        }
      }
    }
  }

  & > .bottom {
    width: 1200px;
    margin: 0 auto;
    overflow: hidden;

    .logoArea {
      float: left;

      .logo {
        img {
          width: 50px;
          height: 50px;
          margin: 25px 45px;
        }
        h2 {
          display: inline;
          color: red;
          font-style: italic;
          text-decoration: none;
          vertical-align: middle;
        }
      }
    }

    .searchArea {
      float: right;
      margin-top: 35px;

      .searchForm {
        overflow: hidden;

        input {
          box-sizing: border-box;
          width: 490px;
          height: 32px;
          padding: 0px 4px;
          border: 2px solid #ea4a36;
          float: left;

          &:focus {
            outline: none;
          }
        }

        button {
          height: 32px;
          width: 68px;
          background-color: #ea4a36;
          border: none;
          color: #fff;
          float: left;
          cursor: pointer;

          &:focus {
            outline: none;
          }
        }
      }
    }
  }
}
</style>