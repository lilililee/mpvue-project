<template>
  <div class="c-order-brief">
   <div class="panel">
      <div class="panel-header">
        <div class="panel-header__title">订单信息</div>
         
      </div>
      <div class="panel-body">
          <ul>
              <li>
                  <div class="left">订单编号</div>
                  <div class="right">{{orderInfo.order_id}}</div>
              </li>
              <li v-if="orderInfo.status!='1'">
                  <div class="left">余额支付</div>
                  <div class="right">¥ {{orderInfo.pay_balance}}</div>
              </li>
              <li v-if="orderInfo.status!='1'">
                  <div class="left">微信支付</div>
                  <div class="right">¥ {{orderInfo.pay_wx}}</div>
              </li>
              <li>
                  <div class="left">下单时间</div>
                  <div class="right">{{orderInfo.start_time}}</div>
              </li>
              <li v-if="orderInfo.status!='1'">
                  <div class="left">停餐份数</div>
                  <div class="right">{{orderInfo.cancle_num}}份</div>
              </li>
              <li v-if="orderInfo.status!='1'">
                  <div class="left">停餐退款</div>
                  <div class="right">¥ {{orderInfo.cancle_money}}</div>
              </li>

          </ul>
         
      </div>
    </div>
  </div>
</template>

<script>
import utils from '../utils'
export default {
  props: {
    orderInfo: Object
  }
}
</script>

<style lang="less">
@import '../assets/css/mixin';
.c-order-brief {
    font-size: 12px;
    color: #434343;
    li {
        .flex-between();

        .right {
            text-align: right;
        }
    }
  
}
</style>
