## 项目路由分析
 - 路由组件：
 home组件/search组件/login组件/register组件
 - 非路由组件：可复用的全局组件
 Header、Footer【首页、搜索页】

 ## 安装less依赖解决兼容性问题
 npm i less less-loader@版本号(注：版本号取决于node的版本号)

 ## 使用组件步骤
 1. 创建组件(结构 -> 样式 -> 图片)
 2. 引入
 3. 注册
 4. 使用

 ## 路由
 $route:【路径、query、param】
 $router: 【push、replace => 编程式路由导航】

 - 声明式导航：router-link
 - 编程式导航

 ## Footer组件的显示与隐藏
 - 直接$route调用path判断
 - meta元信息保存布尔值

 ## 路由传参
 - params参数必须和name属性配合使用，且需要在路由处占位参数
 - 如果路由规则处占位了参数(即要求了传递params参数)，不传递params参数会导致url发生错误
如要指定一个params参数可传可不传：path:'/search/:keyword?' 加个?即可
 - params参数可传可不传，但如果传入一个空字符串则：params:{keyword:""||undefined}
 - 路由组件也传递props来简化属性

## push||replace注意问题
 - 当多次使用push||replace给路由传入相同参数时，控制台会报错
 - 通过在router中重写push||replace方法，解决该问题

## 请求后端接口
 - axios
 - 在发请求的api文件夹内对axios进行二次封装：
   - 挂载请求拦截器：在请求发出之前做一些事情
   - 挂载响应拦截器：服务器数据发出之后做一些事情
 - axios.create({})实例化并配置一个request对象(依然为axios对象)
 - 挂载拦截器：request.interceptors

## 请求与客户端非同源的服务器时解决跨域
 - 配置代理服务器：
  - 与客户端协议同源(localhost:8080)
  - 可以和真正请求的(target)服务器(http://39.98.123.211)请求资源

## nprogress(插件)进度条：
一旦发送ajax请求就会出现进度条

## vuex的使用(大型项目)：
集中式管理共享状态(数据)

## 组件获取后端数据
 - 三级联动组件(模块化的通过vuex存储从服务器请求来的数据)

## 函数的节流与防抖
 - 防抖
  (例子: 百度搜索关键词时，用户在输入完关键词后才会触发一次ajax请求行为
  不会在用户在搜索框打字期间不断发送ajax请求)
  前面的所有触发都被取消，最后一次执行在规定时间之后才会触发
即当联系快速的触发时，只会执行一次
  解决方案：闭包定时器异步/lodash插件
  ```js
  // res为一个防抖函数
  let res = _.debounce(fun,[wait:s],[options])
  // 例如文本框：全部输入完再过1s后才会执行回调
  input.onchange = _.debounce(()=>{
    console.log('ajax请求')
  },1000)
  ```
 - 节流
  在规定的间隔时间范围内不会重复触发回调，只有大于这个时间间隔才会触发回调
把频繁触发变为少量触发
  ```js
  // res为一个节流函数
  let res = _.throttle(fun,[wait:s],[options])
  // 1s间隔内只会执行一次回调，1s后才可再执行一次
  button.onclick = _.throttle(()=>{
    count++
    span.innerHTML = count
    console.log('执行')
  },1000)
  ```


## 三级联动组件每级进行路由跳转操作
    Home路由 => Search路由
    性能最优：编程式路由导航 + 事件委托(全部事件给父节点)
    需解决问题：
 - 如何确定所点击的是哪个超链接
    给每级链接绑定自定义属性
 - 如何传参给Search路由组件

## 三级联动的过渡动画
过渡动画只可在有v-show/v-if指令的盒子上使用

## 不同路由组件向同一路由组件传参数时，合并参数
  通过if条件判断route是否带有query或params参数，
并自定义一个location合并query和params参数

## mock数据 (ListContainer&floor组件)
前台自己mock一些数据，不会向后台发送任何ajax请求
使用步骤：
- 创建根目录下mock文件夹
- 创建相应数据的json文件
- 把mock数据需要的图片资源放置在public文件夹下得images里
因为项目打包时public文件夹内的静态资源会原封不动打包进dist文件夹
- mockServe.js文件内模拟数据(模拟一个假的数据接口)
- vuex内存储模拟而来的数据(像真实接口一样发ajax,三步走处理数据)
- 然后组件内使用

## swiper库封装轮播图
1. 第一步npm引包(js&css)
2. 第二步页面结构
3. 初始化Swiper的实例对象
    - 初始化swiper的代码不可放在mounted中
    - 解决初始化swiper的时间点问题
      watch(监听模板内bannerList数据变化) + nextTick钩子(初始化swiper)

## search路由
1. 搭建好了静态页面、配置好了路由规则
2. 请求到了后端服务器数据，并模块化的保存在了vuex库中(一部分数据还进行了getters计算)
3. 在商品列表、品牌和商品属性模块动态的展示了数据
4. 实现发送的参数一改变，就向服务器发请求

## search路由
1. 以下三个路由可向其传参：TypeNav(query)/SearchSelector(trademark、props)/Header(params)
2. search路由内合并参数于searchParams，通过dispatch与后端联络，继而请求到数据，储存于
vuex库

## pagination分页器
1. pageNo:  表示当前页数
2. pageSize:表示每一页需展示多少条数据
3. total: 整个分页器一共有多少条数据
4. continues: 连续的页码个数

## 商品详情页
1. 搭建好了静态页面、配置好了路由规则
2. 路由内配置路由跳转后的滚动行为
3. 请求到了后端服务器数据，并模块化的保存在了vuex库中
4. 动态的展示了数据

## 登录业务
1. 注册 --获取验证码，以及通过后台数据库存储前台收集的用户信息
2. 登录 --登录成功的时候，后台为了区分用户，服务器会下发token
【vuex存储数据并不持久化，刷新就没了】
3. 获取用户信息 --通过登录成功后拿到的token向服务器请求用户信息
- 将dispatch放在home路由mounted钩子里，其他组件不会请求到用户信息
- 登录成功后仍然可以跳转到login路由