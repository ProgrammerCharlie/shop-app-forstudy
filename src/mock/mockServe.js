import Mock from 'mockjs'
// 引入json文件
// webpack默认对外暴露的文件：图片、json。。。
import banner from './banner.json'
import floor from './floor.json'

// mock数据
// mock(请求地址, 请求数据)
Mock.mock('/mock/banner', { code: 200, data: banner })
Mock.mock('/mock/floor', { code: 200, data: floor })
