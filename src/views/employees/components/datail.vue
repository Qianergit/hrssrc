<template>
  <div>
    <el-card>
      <el-tabs v-model="activeName" :rules="rules" @tab-click="handleClick">
        <el-tab-pane label="登陆账户设置" name="first">
          <el-form ref="userForm" :model="userInfo" label-width="120px" style="margin-left:120px ; margin-top:30px">
            <el-form-item label="姓名" prop="username">
              <el-input v-model="userInfo.username" style="width:400px" />
            </el-form-item>
            <el-form-item label="密码" prop="password2">
              <el-input v-model="userInfo.password2" style="width:400px" type="password" />
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="saveUser">保存</el-button>
            </el-form-item>
          </el-form>

        </el-tab-pane>

        <el-tab-pane label="个人详情" name="second">
          <el-row type="flex" justify="end">
            <el-tooltip content="打印个人基本信息">
              <router-link :to="`/employees/print/${userId}?type=personal`">
                <i class="el-icon-printer" />
              </router-link>
            </el-tooltip>
          </el-row>
          <component :is="UserComponent" />
        </el-tab-pane>
        <el-row type="flex" justify="end">
          <el-tooltip content="打印岗位信息">
            <router-link :to="`/employees/print/${userId}?type=job`">
              <i class="el-icon-printer" />
            </router-link>
          </el-tooltip>
        </el-row>
        <el-tab-pane label="岗位信息" name="third"><component :is="jobInfo" /></el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<script>
import { getUserDetailById } from '@/api/user'
import { saveUserDetailById } from '@/api/imployees'
import userInfo from './user-info.vue'
import jobInfo from './job-info.vue'
export default {
  components:{
    userInfo
  },
   data(){
    return{
      jobInfo:jobInfo,
      UserComponent:'user-info',
      userId:this.$route.params.id,
      activeName:'first',
      userInfo:{
        username:'',
        password2:''
      },
      rules: {
        username: [{ required: true, message: '姓名不能为空', trigger: 'blur' }],
        password2: [{ required: true, message: '密码不能为空', trigger: 'blur' },
          { min: 6, max: 9, message: '密码长度6-9位', trigger: 'blur' }]
      }
    }
  },
created(){
  this.getUserDetailById()
},
   
   methods: {
      handleClick(tab, event) {
        console.log(tab, event);
      },
      async getUserDetailById(){
           this.userInfo=await getUserDetailById(this.userId)
      },
     async saveUser() {
      try {
        // 校验
        await this.$refs.userForm.validate()
        await saveUserDetailById({ ...this.userInfo, password: this.userInfo.password2 }) // 将新密码的值替换原密码的值
        this.$message.success('保存成功')
      } catch (error) {
        console.log(error)
      }
    
      }

}
}
</script>

<style>

</style>