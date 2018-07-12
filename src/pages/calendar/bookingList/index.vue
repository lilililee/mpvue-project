<template>
  <div class="page-calendar__booking_list">
    <div class="page-container">
      <scroll-view scroll-y>
        <!-- solt内不能写v-if -->
        <div class="user-list-container" v-if="system=='company'">
          <user-list :userData="nowUser" @assistClick="changeAddress">
            <div class="c-user-list__assets">修改地址</div>
          </user-list>
        </div>
        <div class="user-list-container" v-else>
          <user-list :userData="nowUser" @assistClick="changeAddress">
          </user-list>
        </div>

        <ul class="booking-list">
          <li class="" v-for="(item, index) in bookingList" :key="index">
            <div class="img">
              <img :src="item.img" :alt="item.name">
            </div>
            <div class="text">
              <div class="name">{{item.name}}</div>
              <div class="buy">
                <div class="price">
                  <span>¥</span>{{item.price}}
                </div>
              </div>
            </div>

            <div class="stop btn-group" v-if="item.is_can_stop=='1'">
              <div class="btn btn__mini">停餐</div>
            </div>

          </li>

        </ul>

      </scroll-view>
    </div>

  </div>
</template>

<script>
import utils from '@/utils'
import config from '@/config'
import UserList from '@/components//UserList'

export default {
  data() {
    return {
      system: config.system,
      bookingList: []
    }
  },
  computed: {
    nowUser() {
      return this.$store.state.nowUser
    }
  },

  mounted() {
    console.log(this.system)
    this.getUserBookingList()
  },

  methods: {
    getUserBookingList() {
      utils.ajax({
        action: 'getUserBookingList',
        data: {
          user_id: this.nowUser.user_id,
          role_id: this.nowUser.role_id,
          date: this.$root.$mp.query.notice_id
        },
        success: res => {
          if (res.code == 0) {
            this.bookingList = res.data.list
          }
        }
      })
    },
    changeAddress() {
      console.log('changeAddress')
    }
  },
  components: {
    UserList
  }
}
</script>
<style lang="less">
@import '../../../assets/css/mixin.less';
.page-calendar__booking_list {
  .page-container {
    .full-page();

    padding: 12px 12px 60px 12px;
    background: url(~@/assets/img/comfirm_order.png) top center no-repeat;
    background-size: contain;

    scroll-view {
      height: 100%;
      // padding-bottom: 60px;
    }
  }

  .user-list-container {
    .c-user-list__assets {
      color: @theme;
      font-size: 14px;
    }
  }
  .booking-list {
    // width: 75%;
    // height: 100%;
    padding: 0 16px;
    margin: 12px 0;
    background: #fff;

    li {
      padding: 20px 0;
      .flex-start();

      + li {
        border-top: 1px solid @borderColor;
      }
    }

    .img {
      img {
        display: block;
        .wh(60px);
      }
    }

    .text {
      height: 60px;
      width: 200px;
      padding: 0 12px;
    }

    .name {
      font-size: 14px;
      padding: 8px 0 12px 0;
      .limit();
    }

    .buy {
    }

    .price {
      font-size: 16px;
      color: #ff7c00;

      span {
        font-size: 10px;
        vertical-align: 1px;
      }
    }

    .stop {
      padding: 0;
      .btn {
        background: #fff;
        border: 1rpx solid rgba(0, 0, 0, 0.1);
        color: @red;
      }
    }
  }
}
</style>

