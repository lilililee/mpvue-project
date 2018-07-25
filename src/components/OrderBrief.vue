<template>
    <div class="c-order-brief">
        <div class="panel">
            <div class="panel-header">
                <div class="panel-header__title">订单信息</div>

            </div>
            <div class="panel-body">
                <ul v-if="system!='shop'">
                    <li>
                        <div class="left">订单编号</div>
                        <div class="right">{{orderInfo.order_no}}</div>
                    </li>
                    <template v-if="orderInfo.status!='1'">
                        <template v-if="orderInfo.pay_batch > 0">
                            <li>
                                <div class="left">批量支付</div>
                                <div class="right">¥ {{orderInfo.pay_batch}}</div>
                            </li>
                        </template>
                        <template v-else>
                            <li v-if="orderInfo.pay_balance > 0">
                                <div class="left">余额支付</div>
                                <div class="right">¥ {{orderInfo.pay_balance}}</div>
                            </li>
                            <li v-if="orderInfo.pay_credit > 0 && system=='company'">
                                <div class="left">积分支付</div>
                                <div class="right">¥ {{orderInfo.pay_credit}}</div>
                            </li>
                            <li v-if="orderInfo.pay_wx > 0 ">
                                <div class="left">微信支付</div>
                                <div class="right">¥ {{orderInfo.pay_wx}}</div>
                            </li>
                        </template>
                    </template>
                    <li>
                        <div class="left">下单时间</div>
                        <div class="right">{{orderInfo.start_time}}</div>
                    </li>

                    <template v-if="orderInfo.status!='1'">
                        <li>
                            <div class="left">停餐份数</div>
                            <div class="right">{{orderInfo.cancel_num}}份</div>
                        </li>
                        <li>
                            <div class="left">停餐退款</div>
                            <div class="right">¥ {{orderInfo.cancel_money}}</div>
                        </li>
                    </template>

                </ul>
                <ul v-else>
                    <li>
                        <div class="left">订单编号</div>
                        <div class="right">{{orderInfo.order_no}}</div>
                    </li>
                    <template v-if="orderInfo.status=='2'">
                      
                            <li v-if="orderInfo.pay_balance > 0">
                                <div class="left">余额支付</div>
                                <div class="right">¥ {{orderInfo.pay_balance}}</div>
                            </li>
                            <li v-if="orderInfo.pay_credit > 0 && system=='company'">
                                <div class="left">积分支付</div>
                                <div class="right">¥ {{orderInfo.pay_credit}}</div>
                            </li>
                            <li v-if="orderInfo.pay_wx > 0 ">
                                <div class="left">微信支付</div>
                                <div class="right">¥ {{orderInfo.pay_wx}}</div>
                            </li>
                        
                    </template>
                    <li v-if="orderInfo.status=='1'">
                        <div class="left">下单时间</div>
                        <div class="right">{{orderInfo.start_time}}</div>
                    </li>
                    <li>
                        <div class="left">预计到货时间</div>
                        <div class="right">现在下单预计 {{orderInfo.expect_time}} 后到货</div>
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
  },
  data() {
    return {
      system: utils._config.system
    }
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
