<template>
  <div class="page-user__userFood__addUser">
    <ul class="top-bar">
      <li :class="{active:activeTab==0}" @click="activeTab=0">学生</li>
      <li :class="{active:activeTab==1}" @click="activeTab=1">教师</li>
    </ul>

    <div class="form" v-if="activeTab==0">
      <div class="input" @click="showPicker(1)">
        <div class="name">地区</div>
        <input type="text" class="content area" disabled v-model="nowArea.area1.area1_name" placeholder="选择地区">
        <div class="assist">
          <i class="icon-drop-down"></i>
        </div>
      </div>
      <div class="input" @click="showPicker(2)">
        <div class="name">学校</div>
        <input type="text" class="content area" disabled v-model="nowArea.area2.area2_name" placeholder="选择学校">
        <div class="assist">
          <i class="icon-drop-down"></i>
        </div>
      </div>
      <div class="input" @click="showPicker(3)">
        <div class="name">年级</div>
        <input type="text" class="content area" disabled v-model="nowArea.area3.area3_name" placeholder="选择年级">
        <div class="assist">
          <i class="icon-drop-down"></i>
        </div>
      </div>
      <div class="input" @click="showPicker(4)">
        <div class="name">班级</div>
        <input type="text" class="content area" disabled v-model="nowArea.area4.area4_name" placeholder="选择班级">
        <div class="assist">
          <i class="icon-drop-down"></i>
        </div>
      </div>
      <div class="input">
        <div class="name">姓名</div>
        <input type="text" class="content area" v-model="userName" placeholder="请输入姓名">

      </div>

    </div>

    <div class="form" v-else>
      <div class="input" @click="showPicker(1)">
        <div class="name">地区</div>
        <input type="text" class="content area" disabled v-model="nowArea.area1.area1_name">
        <div class="assist">
          <i class="icon-drop-down"></i>
        </div>
      </div>
      <div class="input" @click="showPicker(2)">
        <div class="name">学校</div>
        <input type="text" class="content area" disabled v-model="nowArea.area2.area2_name">
        <div class="assist">
          <i class="icon-drop-down"></i>
        </div>
      </div>
      <div class="input">
        <div class="name">姓名</div>
        <input type="text" class="content area" v-model="userName" placeholder="请输入姓名">

      </div>

    </div>

    <div class="btn-group">
      <div class="btn f16" @click="addUser">确定添加</div>
    </div>

    <list-picker v-model="isShowListPicker" :list="pickerList" @comfirm="comfirmArea"></list-picker>
  </div>
</template>

<script>
import utils from '@/utils'
import ListPicker from '@/components/ListPicker'

export default {
  data() {
    return {
      activeTab: 0,
      isShowListPicker: false,
      areaList: [],
      pickerList: [],
      nowArea: {
        area1: {},
        area2: {},
        area3: {},
        area4: {}
      },
      userName: '',
      areaType: 0
    }
  },
  watch: {
    activeTab(val) {
      this.nowArea.area3 = {}
      this.nowArea.area4 = {}
      this.userName = ''
    }
  },

  mounted() {
    this.getAreaList()
  },

  methods: {
    getAreaList() {
      utils.ajax({
        action: 'getAreaList',
        loading: true,

        success: res => {
          if (res.code == 0) {
            this.areaList = res.data.list

            this.nowArea.area1 = this.areaList[0]
            this.nowArea.area2 = this.areaList[0].childs[0]
          }
        }
      })
    },
    showPicker(areaType) {
      if (areaType == 3 && this.nowArea.area3.area3_id == '') {
        utils.showMsg('请先选择年级')
        return
      }
      let list = []
      this.areaType = areaType
      switch (areaType) {
        case 1:
          list = this.areaList
          break
        default:
          list = this.nowArea[`area${areaType - 1}`].childs
          break
      }

      this.pickerList = list.map(item => ({
        id: item[`area${areaType}_id`],
        name: item[`area${areaType}_name`]
      }))

      this.isShowListPicker = true
    },

    comfirmArea(item, index) {
      switch (this.areaType) {
        case 1:
          this.nowArea.area1 = this.areaList[index]
          this.nowArea.area2 = this.nowArea.area1.childs[0]
          this.nowArea.area3 = {}
          this.nowArea.area4 = {}
          break
        case 2:
          this.nowArea.area2 = this.nowArea.area1.childs[index]
          this.nowArea.area3 = {}
          this.nowArea.area4 = {}
          break
        case 3:
          this.nowArea.area3 = this.nowArea.area2.childs[index]
          this.nowArea.area4 = {}
          break
        case 4:
          this.nowArea.area4 = this.nowArea.area3.childs[index]
          break
        default:
      }
    },

    addUser() {
      let area1_id = this.nowArea.area1.area1_id || ''
      let area2_id = this.nowArea.area2.area2_id || ''
      let area3_id = this.nowArea.area3.area3_id || ''
      let area4_id = this.nowArea.area4.area4_id || ''

      let area = `${area1_id}-${area2_id}`
      
      if (this.activeTab == 0) {
        if (utils.validate.isEmpty(area3_id, '$请选择年级')) return
        if (utils.validate.isEmpty(area4_id, '$请选择班级')) return
        area += `-${area3_id}-${area4_id}`
      }
      if (utils.validate.isEmpty(this.userName, '姓名')) return

      utils.ajax({
        action: 'addUser',
        method: 'POST',
        data: {
          area,
          name: this.userName,
          role: this.activeTab
        },
        success: res => {
          if (res.code == 0) {
            utils.showSuccess('添加成功')
          }
        }
      })
    }
  },
  components: {
    ListPicker
  }
}
</script>
<style lang="less">
@import '../../../../assets/css/mixin.less';
page {
  background: #fff;
}
.page-user__userFood__addUser {
  .top-bar {
    height: 44px;
    .flex-center();
    margin-bottom: 5px;

    li {
      border-bottom: 2px solid transparent;
      font-size: 16px;
      line-height: 42px;
      padding: 0 6px;
      margin: 0 42px;

      &.active {
        color: @theme;
        border-bottom-color: @theme;
      }
    }
  }

  .btn-group {
    margin-top: 36px;
  }
}
</style>

