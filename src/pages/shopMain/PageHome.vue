<template>
  <div class="page-home__index" v-if="homeInfo.banner">
    <div class="banner">
      <image :src="homeInfo.banner[0].img" @error="onImageError" class="slide-image" />
    </div>

    <ul class="type-list">
      <li v-for="(item,index) in homeInfo.type_list" :key="index" @click="toGoodsListPage(item)">
        <img :src="item.img" @error="onTypeImageError(item)">
        <div class="name">{{item.type_name}}</div>
      </li>
    </ul>

    <goods-list :goodsList="goodsList" :isOver="isOver"></goods-list>
  </div>
</template>

<script>
import utils from '@/utils'
import GoodsList from '@/components/GoodsList'

export default {
  props: {
    onReachBottomTimes: Number
  },
  data() {
    return {
      system: utils._config.system,
      homeInfo: {},
      goodsList: [],

      page: 1,
      isOver: false
    }
  },
  watch: {
    onReachBottomTimes(val) {
      val > 0 && !this.isOver && this.getGoodsList()
    }
  },

  mounted() {
    this.getHomeInfo()
    this.getGoodsList()
  },

  methods: {
    getHomeInfo() {
      utils.ajax({
        action: 'getHomeInfo',
        success: res => {
          if (res.code == 0) {
            this.homeInfo = res.data
            
          }
        }
      })
    },
    
    getGoodsList() {
      utils.ajax({
        action: 'getGoodsList',
        data: {
          page: this.page,
          type: '0'
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
    },
    toGoodsListPage(item) {
      wx.navigateTo({
        url: `/pages/shopHome/goodsList/main?type_id=${item.type_id}&type_name=${item.type_name}`
      })
    },

    onTypeImageError(item) {
      item.img = require('../../assets/img/sort_default.png')
    },
    onImageError() {
      this.homeInfo.banner[0].img = require('../../assets/img/banner_default.png')
    }
  },
  components: {
    GoodsList
  }
}
</script>
<style lang="less">
@import '../../assets/css/mixin.less';
.page-home__index {
  swiper {
    height: 200px;
  }
  .slide-image {
    display: block;
    width: 100%;
    height: 200px;
  }
  .type-list {
    padding: 16px 13px 4px 13px;
    background: #fff;
    .flex-start();
    flex-wrap: wrap;
    li {
      width: 20%;
      padding: 0 8px 16px;

      img {
        display: block;
        .wh(54px);
        margin-bottom: 6px;
        border-radius: 50%;
      }

      .name {
        font-size: 12px;
        line-height: 17px;
        text-align: center;
      }
    }
  }
}
</style>