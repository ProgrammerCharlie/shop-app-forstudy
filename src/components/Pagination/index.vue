<template>
  <div class="pagination">
    <button 
      :disabled="pageNo == 1" 
      @click="$emit('getPageNo',pageNo-1)"
    >上一页</button>
    <!-- pageNo = 4 为中间页码，start才开始 >= 2 -->
    <button 
      v-if="startNumAndEndNum.start > 1"
      @click="$emit('getPageNo',1)"
      :class="{active:pageNo==1}"
    >1</button>
    <!-- pageNo = 5 为中间页码，start才开始 >= 3 -->
    <button
     v-if="startNumAndEndNum.start > 2"
     >···</button>

    <!-- 中间连续的页码规定为5个 -->
    <button
      v-for="(page,index) in startNumAndEndNum.end"
      :key="index"
      v-show="page >= startNumAndEndNum.start"
      @click="$emit('getPageNo',page)"
      :class="{active:pageNo==page}"
    >{{page}}
    </button>

    <!-- 
      例如：总页数31页
      pageNo为27时，end为29 => 29 ... 31
      29 = 31 - 2
      30 = 31 - 1
     -->
    <button v-if="startNumAndEndNum.end < totalPage - 1">···</button>
    <button 
      v-if="startNumAndEndNum.end < totalPage"
      @click="$emit('getPageNo',totalPage)"
      :class="{active:pageNo==totalPage}"
    >{{totalPage}}</button>
    <button
      :disabled="pageNo == totalPage" 
      @click="$emit('getPageNo'),pageNo+1"
     >下一页</button>
    
    <button style="margin-left: 30px">共 {{total}} 条</button>
  </div>
</template>

<script>
export default {
  name: "Pagination",
  props:['pageNo','pageSize','total','continues'],
  computed:{
    totalPage(){
      return Math.ceil(this.total/this.pageSize)
    },
    startNumAndEndNum(){
      const {continues,pageNo,totalPage} = this
      let start = 0, end = 0
      // 不正常现象1【总页数(4)没有连续页码数(5)多】
      if(totalPage < continues){
        start = 1
        end = totalPage
      }else{
        // 总页数大于页码数
        start = pageNo - parseInt(continues/2)
        end = pageNo + parseInt(continues/2)
        // 不正常现象2【start为0||负数】
        // -1 0 1 2 3 => 1 2 3 4 5
        if(start < 1){
          start = 1
          end = continues
        }
        // 不正常现象3【end大于总页数】
        // 29 30 31 32 33 => 27 28 29 30 31
        if(end > totalPage){
          start = totalPage - continues + 1
          end = totalPage
        }
      }
      return {start,end}
    }
  },
}
</script>

<style lang="less" scoped>
  .pagination {
    text-align: center;
    button {
      margin: 0 5px;
      background-color: #f4f4f5;
      color: #606266;
      outline: none;
      border-radius: 2px;
      padding: 0 4px;
      vertical-align: top;
      display: inline-block;
      font-size: 13px;
      min-width: 35.5px;
      height: 28px;
      line-height: 28px;
      cursor: pointer;
      box-sizing: border-box;
      text-align: center;
      border: 0;

      &[disabled] {
        color: #c0c4cc;
        cursor: not-allowed;
      }

      &.active {
        cursor: not-allowed;
        background-color: #409eff;
        color: #fff;
      }
    }
  }
</style>