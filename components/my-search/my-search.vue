<template>
  <view class="my-search-container" :style="{'background-color':bgcolor}">
    <!-- 使用view组件模拟input输入框的样式 -->
    <view class="my-search-box" :style="{'border-radius':radius + 'px'}" @click="searchBoxHandler">
      <uni-icons type="search" size="17"></uni-icons>
      <text class="placeholder">搜索</text>
    </view>
  </view>
</template>

<script>
  export default {
    name: "my-search",
    // 自定义属性
    props: {
      // 背景颜色
      bgcolor: {
        type: String,
        default: '#C00000'
      },
      // 圆角尺寸
      radius: {
        type: Number,
        // 单位是px
        default: 18
      }
    },
    data() {
      return {

      };
    },
    onLoad() {
      const sysInfo = uni.getSystemInfoSync()
      // 可用高度 = 屏幕高度 - navigationBar高度 - tabBar高度 - 自定义的search组件高度
      this.wh = sysInfo.windowHeight - 50
    },
    methods: {
      // 点击了模拟的input输入框
      searchBoxHandler() {
        // 触发外界通过@myclick绑定的myclick事件处理函数(自定义事件)
        this.$emit('click')
      }
    }
  }
</script>

<style lang="scss">
  .my-search-container {
    // background-color: #c00000;
    height: 50px;
    padding: 0 10px;
    display: flex;
    align-items: center;
  }

  .my-search-box {
    height: 36px;
    background-color: #ffffff;
    // border-radius: 15px;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;

    .placeholder {
      font-size: 15px;
      margin-left: 5px;
    }
  }
</style>
