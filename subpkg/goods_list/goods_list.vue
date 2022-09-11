<template>
  <view>
    <view class="goods-list">
      <view v-for="(goods, i) in goodsList" :key="i" @click="gotoDetail(goods)">
        <!-- 为 my-goods 组件动态绑定 goods 属性的值 -->
        <my-goods :goods="item"></my-goods>
      </view>
    </view>
  </view>
</template>
<script>
  export default {
    data() {
      return {
        // 节流阀
        isloading: false,
        goodsList: [], //商品列表的数据
        total: 0, //总数量，用来实现分页
        // 默认的空图片
        defaultPic: 'https://img3.doubanio.com/f/movie/8dd0c794499fe925ae2ae89ee30cd225750457b4/pics/movie/celebrity-default-medium.png',
        // 请求参数对象
        queryObj: {
          query: '', // 查询关键词
          cid: '', // 商品分类id
          pagenum: 1, // 页码值
          pagesize: 10, // 每页显示多少条数据
        }
      };
    },
    onLoad(options) {
      // console.log(options);
      // 点击图片拿到的参数是cid,关键字搜索拿到的参数是关键字，拿到之后向服务器发送请求拿到数据在页面渲染
      // 将页面参数转存到this.queryObj对象中
      this.queryObj.query = options.query || ''
      this.queryObj.cid = options.cid || ''
      this.getGoodsList()

    },
    methods: {
      // 点击跳转到商品详情页面
      gotoDetail(goods) {
        uni.navigateTo({
          url: '/subpkg/goods_detail/goods_detail?goods_id=' + goods.goods_id
        })
      },

      // 获取商品列表数据的方法
      async getGoodsList(cb) {
        // 打开节流阀
        this.isloading = true
        // 发起请求
        const {
          data: res
        } = await uni.$http.get('/api/public/v1/goods/search', this.queryObj)
        // 关闭节流阀
        this.isloading = false
        // 只要数据请求完毕，就立即按需调用cb回调函数
        cb && cb()
        if (res.meta.status !== 200) return uni.$showMsg()
        // 为数据赋值: 通过展开运算符的形式，进行新旧数据的拼接
        this.goodsList = [...this.goodsList, ...res.message.goods]
        this.total = res.message.total
      }
    },
    // 触底事件
    onReachBottom() {
      // 判断是否还有下一页数据
      if (this.queryObj.pagenum * this.queryObj.pagesize >= this.total) return uni.$showMsg('数据加载完毕！')

      // 判断是否正在请求其他数据，如果是，则不发起额外的请求
      if (this.isloading) return

      // 让页码值自增+1
      this.queryObj.pagenum += 1
      // 重新获取列表数据
      this.getGoodsList()
    },
    // 下拉刷新的事件
    onPullDownRefresh() {
      // 1.重置关键数据
      this.queryObj.pagenum = 1
      this.total = 0
      this.isloading = false
      this.goodsList = []
      // 2.重新发起请求
      this.getGoodsList(() => uni.stopPullDownRefresh())
    }

  }
</script>

<style lang="scss">
  .goods-item {
    display: flex;
    padding: 10px 5px;
    border-bottom: 1px solid #f0f0f0;

    .goods-item-left {
      margin-right: 5px;

      .goods-pic {
        width: 100px;
        height: 100px;
        display: block;
      }
    }

    .goods-item-right {
      display: flex;
      flex-direction: column;
      justify-content: space-between;

      .goods-name {
        font-size: 13px;
      }

      .goods-price {
        font-size: 16px;
        color: #c00000;
      }
    }
  }
</style>
