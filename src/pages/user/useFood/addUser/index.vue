<template>
  <div class="page-user__userFood_addUser">
    <div class="school-area" v-if="system=='school'">

      <ul class="top-bar">
        <li :class="{active:activeTab==0}" @click="activeTab=0">学生</li>
        <li :class="{active:activeTab==1}" @click="activeTab=1">教师</li>
      </ul>

      <div class="form" v-if="activeTab==0">
        <div class="input" @click="showPicker(1)">
          <div class="name">地区</div>
          <input type="text" class="content area" disabled v-model="nowArea.area1.area1_name" placeholder="选择地区">
          <div class="assist">
            <i class="icon-drop-down-gray"></i>
          </div>
        </div>
        <div class="input" @click="showPicker(2)">
          <div class="name">学校</div>
          <input type="text" class="content area" disabled v-model="nowArea.area2.area2_name" placeholder="选择学校">
          <div class="assist">
            <i class="icon-drop-down-gray"></i>
          </div>
        </div>
        <div class="input" @click="showPicker(3)">
          <div class="name">年级</div>
          <input type="text" class="content area" disabled v-model="nowArea.area3.area3_name" placeholder="选择年级">
          <div class="assist">
            <i class="icon-drop-down-gray"></i>
          </div>
        </div>
        <div class="input" @click="showPicker(4)">
          <div class="name">班级</div>
          <input type="text" class="content area" disabled v-model="nowArea.area4.area4_name" placeholder="选择班级">
          <div class="assist">
            <i class="icon-drop-down-gray"></i>
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
            <i class="icon-drop-down-gray"></i>
          </div>
        </div>
        <div class="input" @click="showPicker(2)">
          <div class="name">学校</div>
          <input type="text" class="content area" disabled v-model="nowArea.area2.area2_name">
          <div class="assist">
            <i class="icon-drop-down-gray"></i>
          </div>
        </div>
        <div class="input" v-if="!isNeedValidate">
          <div class="name">姓名</div>
          <input type="text" class="content area" v-model="userName">

        </div>

        <div class="input" v-if="isNeedValidate">
          <div class="name">手机号</div>
          <input type="number" class="content phone" v-model="teacherPhone">

          <div v-if="count == 60" class="assist " @click="getCode">获取验证码</div>
          <div v-else class="assist ">已发送({{count}}s)</div>
        </div>
        <div class="input" v-if="isNeedValidate">
          <div class="name">验证码</div>
          <input type="number" class="content code" v-model="teacherCode">
        </div>
        <div class="input" v-if="isShowTeacherInfo">
          <div class="name">姓名</div>
          <input type="text" class="content" disabled v-model="teacherInfo.teacher_name">
        </div>
        <!-- <div class="input" v-if="isShowTeacherInfo">
          <div class="name">学校</div>
          <input type="text" class="content" disabled v-model="teacherInfo.school_name">
        </div> -->

      </div>

    </div>

    <div class="company-area" v-if="system=='company'">
      <div class="form">
        <div class="input" @click="showPicker(1)">
          <div class="name">地区</div>
          <input type="text" class="content area" disabled v-model="nowArea.area1.area1_name" placeholder="选择地区">
          <div class="assist">
            <i class="icon-drop-down-gray"></i>
          </div>
        </div>
        <div class="input" @click="showPicker(2)">
          <div class="name">企业</div>
          <input type="text" class="content area" disabled v-model="nowArea.area2.area2_name" placeholder="选择学校">
          <div class="assist">
            <i class="icon-drop-down-gray"></i>
          </div>
        </div>
        <div class="input" @click="showPicker(3)">
          <div class="name">职业</div>
          <input type="text" class="content area" disabled v-model="nowArea.area3.area3_name" placeholder="选择年级">
          <div class="assist">
            <i class="icon-drop-down-gray"></i>
          </div>
        </div>
        <div class="input">
          <div class="name">姓名</div>
          <input type="text" class="content area" v-model="userName" placeholder="请输入姓名">
        </div>
      </div>

    </div>

    <div class="btn-group" v-if="system=='school' && activeTab == 1 && isNeedValidate">
      <div class="btn f16" @click="resetAddTeacher" v-if="isShowTeacherContinue">继续添加</div>
      <!-- <div class="btn f16" @click="addTeacher" v-else-if="isNeedValidate">确定添加</div> -->
      <div class="btn f16" @click="getTeacherInfo" v-else>确定添加</div>
    </div>
    <div class="btn-group" v-else>
      <div class="btn f16" @click="addUser">确定添加</div>
    </div>

    <company-copyright></company-copyright>

    <list-picker v-model="isShowListPicker" :list="pickerList" @comfirm="comfirmArea"></list-picker>
  </div>
</template>

<script>
import utils from '@/utils'
import ListPicker from '@/components/ListPicker'
import CompanyCopyright from '@/components/CompanyCopyright'

const areaName = {
  school: ['', '地区', '学校', '年级', '班级'],
  company: ['', '地区', '企业', '职位', '班级']
}

export default {
  data() {
    return {
      system: utils._config.system,

      activeTab: 0,
      isShowListPicker: false,
      area1List: [],
      area2List: [],
      area3List: [],
      area4List: [],
      pickerList: [],
      nowArea: {
        area1: {},
        area2: {},
        area3: {},
        area4: {}
      },
      userName: '',
      areaType: 0,

      teacherPhone: '',
      teacherCode: '',
      isGetCode: false,
      count: 60,
      countInterval: '',
      isNeedValidate: false,
      isShowTeacherInfo: false,
      isShowTeacherContinue: false,
      teacherInfo: {}
    }
  },
  watch: {
    activeTab(val) {
      this.nowArea.area3 = {}
      this.nowArea.area4 = {}
      this.userName = ''
      if (val == 1) {
        this.resetAddTeacher()
        this.isNeedValidate && utils.showMsg('当前学校需要进行验证')
      }
    },
    'nowArea.area2': function(val) {
      if (val.need_validate == 1) {
        this.isNeedValidate = true
        this.system == 'school' && this.activeTab == 1 && utils.showMsg('当前学校需要进行验证')
      } else {
        this.isNeedValidate = false
      }
    }
  },

  mounted() {
    this.initData()
    this.getAreaList(1)
  },

  methods: {
    initData(){
      this.activeTab = 0
      this.isShowListPicker = false
      this.userName = ''
    },
    getAreaList(areaType, callback = () => {}) {
      let input = {}
      switch (areaType) {
        case 1:
          input = {}
          break
        case 2:
          input = {
            area1_id: this.nowArea.area1.area1_id
          }
          break
        case 3:
          input = {
            area2_id: this.nowArea.area2.area2_id
          }
          break
        case 4:
          input = {
            area2_id: this.nowArea.area2.area2_id,
            area3_id: this.nowArea.area3.area3_id
          }
          break
      }

      utils.ajax({
        action: `getArea${areaType}List`,
        data: input,
        success: res => {
          if (res.code == 0) {
            this[`area${areaType}List`] = res.data.list
            if (res.data.list.length == 0) {
              this.nowArea[`area${areaType}`] = {}

              return
            }
            if (areaType == 1) {
              // 选中area1List第一个，并获取area2List
              this.nowArea.area1 = this[`area${areaType}List`][0]
              this.getAreaList(2)
            } else if (areaType == 2) {
              // 选中area2List第一个
              this.nowArea.area2 = this[`area${areaType}List`][0]

              if ((this.system == 'school' && this.activeTab == 0) || this.system == 'company') {
                this.getAreaList(3)
              }
            }
            callback()
          }
        }
      })
    },
    showPicker(areaType) {
      if (areaType > 1 && !this.nowArea[`area${areaType - 1}`][`area${areaType - 1}_id`]) {
        utils.showMsg(`请先选择${areaName[this.system][areaType - 1]}`)
        return
      }
      if (this[`area${areaType}List`].length == 0) {
        utils.showMsg('当前选项无内容')
        return
      }
      //   if (areaType == 4 && this.nowArea.area3.area3_id == '') {
      //     utils.showMsg('请先选择年级')
      //     return
      //   }

      this.areaType = areaType

      this.pickerList = this[`area${areaType}List`].map(item => ({
        id: item[`area${areaType}_id`],
        name: item[`area${areaType}_name`]
      }))
      this.isShowListPicker = true
    },

    comfirmArea(item, index) {
      switch (this.areaType) {
        case 1:
          this.nowArea.area1 = this.area1List[index]
          this.getAreaList(2)
          // this.nowArea.area2 = this.nowArea.area1.childs[0]
          this.nowArea.area3 = {}
          this.nowArea.area4 = {}
          break
        case 2:
          this.nowArea.area2 = this.area2List[index]
          if ((this.system == 'school' && this.activeTab == 0) || this.system == 'company') {
            this.getAreaList(3)
          }
          this.nowArea.area3 = {}
          this.nowArea.area4 = {}
          break
        case 3:
          this.nowArea.area3 = this.area3List[index]
          if (this.system == 'school' && this.activeTab == 0) {
            this.getAreaList(4)
          }
          this.nowArea.area4 = {}
          break
        case 4:
          this.nowArea.area4 = this.area4List[index]
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

      if (this.system == 'school') {
        if (this.activeTab == 0) {
          if (utils.validate.isEmpty(area3_id, '$请选择年级')) return
          if (utils.validate.isEmpty(area4_id, '$请选择班级')) return
          area += `-${area3_id}-${area4_id}`
        }
      } else {
        if (utils.validate.isEmpty(area3_id, '$请选择职业')) return
        area += `-${area3_id}`
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
    },
    getTeacherInfo() {
      if (utils.validate.isEmpty(this.teacherPhone, '手机号')) return
      if (utils.validate.notPhone(this.teacherPhone)) return
      if (utils.validate.isEmpty(this.teacherCode, '验证码')) return

      utils.ajax({
        action: 'isTeacher',
        data: {
          phone: this.teacherPhone
        },
        success: res => {
          if (res.code == 0) {
            this.teacherInfo = res.data.teacherInfo
            this.isShowTeacherInfo = true
            this.addTeacher()
          }
        }
      })
    },
    addTeacher() {
      utils.ajax({
        action: 'addTeacher',
        method: 'POST',
        data: {
          teacher_id: this.teacherInfo.id,
          phone: this.teacherPhone,
          code: this.teacherCode
        },
        success: res => {
          if (res.code == 0) {
            this.isShowTeacherContinue = true
            utils.showMsg('添加教师成功')
          }
        }
      })
    },
    resetAddTeacher() {
      this.teacherPhone = ''
      this.teacherCode = ''
      this.isGetCode = false
      this.count = 60
      clearInterval(this.countInterval)
      // this.isNeedValidate = false
      this.isShowTeacherInfo = false
      this.isShowTeacherContinue = false
      this.teacherInfo = {}
    },

    getCode() {
      // 重复点击拦截
      if (this.isGetCode) return

      if (utils.validate.isEmpty(this.teacherPhone, '手机号')) return
      if (utils.validate.notPhone(this.teacherPhone)) return

      this.isGetCode = true

      utils.ajax({
        action: 'getCode',
        method: 'POST',
        data: {
          phone: this.teacherPhone
        },
        success: res => {
          if (res.code == 0) {
            // 开始倒计时
            this.count--
            this.countInterval = setInterval(() => {
              if (this.count == 0) {
                clearInterval(this.countInterval)
                this.count = 60
                return
              }
              this.count--
            }, 1000)
          }
          this.isGetCode = false
        }
      })
    }
  },
  components: {
    ListPicker,
    CompanyCopyright
  }
}
</script>
<style lang="less">
@import '../../../../assets/css/mixin.less';
page {
  background: #fff;
}
.page-user__userFood_addUser {
  .full-page();
  .form .input {
    .name {
      width: 18%;
    }
    .content {
      width: 57%;
    }
  }
  .top-bar {
    height: 44px;
    .flex-center();
    margin-bottom: 10px;
    .border-bottom();

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

