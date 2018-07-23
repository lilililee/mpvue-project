<template>
  <div class="page-home__goods_list"  :class="{'x-margin': isIphoneX}">
    <goods-list :goodsList="goodsList" :isOver="isOver"></goods-list>
  </div>
</template>

<script>
import utils from '@/utils'
import GoodsList from '@/components/GoodsList'

export default {
  data() {
    return {
      isIphoneX: utils.isIphoneX,
      goodsList: [],

      page: 1,
      isOver: false
    }
  },

  onReachBottom() {
    !this.isOver && this.getGoodsList()
  },
  onUnload() {
    this.page = 1
    this.goodsList = []
    this.isOver = false
  },

  mounted() {
    this.getGoodsList()
    wx.setNavigationBarTitle({
      title: this.$root.$mp.query.type_name
    })
  },

  methods: {
    getGoodsList() {
      utils.ajax({
        action: 'getGoodsList',
        data: {
          page: this.page,
          type: this.$root.$mp.query.type_id
        },
        loading: this.page == 1,
        success: res => {
          if (res.code == 0) {
            if (res.data.list.length < 10) {
              this.isOver = true
            }
            this.page++
            this.goodsList = this.goodsList.concat(res.data.list)
          }
        }
      })
    }
  },
  components: { GoodsList }
}
</script>
<style lang="less">
@import '../../../assets/css/mixin.less';
.page-home__goods_list {
}
</style>

