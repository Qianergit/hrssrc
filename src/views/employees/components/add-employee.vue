<template>
  <el-dialog :visible="showDialog" title="新增员工" @close="btnCancel">
    <el-form ref="addEmployee" label-width="120px" :model="formData" :rules="rules">
      <el-form-item label="姓名" prop="usernmae">
        <el-input v-model="formData.username" style="width:50%" placeholder="请输入姓名" />
      </el-form-item>
      <el-form-item label="手机" prop="mobile">
        <el-input v-model="formData.mobile" style="width:50%" placeholder="请输入手机号" />
      </el-form-item>
      <el-form-item label="入职时间" prop="timeOfEntry">
        <el-date-picker v-model="formData.timeOfEntry" style="width:50%" placeholder="请选择入职时间" />
      </el-form-item>
      <el-form-item label="聘用形式" prop="formOfEmployment">
        <el-select v-model="formData.formOfEmployment" style="width:50%" placeholder="请选择">
          <el-option v-for="item in EmployeeEnum.hireType" :key="item.id" :label="item.value" :value="item.id" />
        </el-select>
      </el-form-item>
      <el-form-item label="工号" prop="workNumber">
        <el-input v-model="formData.workNumber" style="width:50%" placeholder="请输入工号" />
      </el-form-item>
      <el-form-item label="部门" prop="departmentName">
        <el-input v-model="formData.departmentName" style="width:50%" placeholder="请选择部门" @focus="getDepartments" />
        <el-tree 
          v-if="showTree" 
          v-loading="loading" 
          :data="treeData"
          :props="{label:'name'}" 
          default-expand-all 
          @node-click="getSelect"
        />
      </el-form-item>
      <el-form-item label="转正时间">
        <el-date-picker v-model="formData.correctionTime" style="width:50%" placeholder="请选择转正时间" />
      </el-form-item>
    </el-form>
    <!-- 使用footer插槽 -->
    <el-row slot="footer" type="flex" justify="center" align="center">
      <el-col :span="6">
        <el-button size="small" @click="btnCancel">取消</el-button>
        <el-button size="small" type="primary" @click="btnOk">确定</el-button>
      </el-col>
    </el-row>
  </el-dialog>
</template>

<script>
import {getDepartmentsAPI} from'@/api/deparments/index'
import { tranListToTreeData} from '@/utils'
import EmployeeEnum from '@/api/constant/employees'
import {addEmployeesAPI} from'@/api/imployees' //引入新增接口
export default {
    props:{
        showDialog:{
             type:Boolean,
             required:true
        }
    },
data(){
    return{
        EmployeeEnum,
        showTree:false,
        loading:false,
        treeData:[],
     formData:{
        username: '',
        mobile: '',
        formOfEmployment: '',
        workNumber: '',
        departmentName: '',
        timeOfEntry: '',
        correctionTime: ''
    },
    rules:{
        username: [{required:'true',trigger:'blur',message:'用户姓名不能为空'},{min:1,max:5,message:'用户行为1-5个字符'}],
        mobile: [{required:'true',trigger:'blur',message:'用户姓名不能为空'},{pattern:/^1[3-9]\d{9}$/,message:'手机号格式不正确',trigger:'blur'}], //partten是正则表达式的意思
        formOfEmployment: [{ required: true, message: '聘用形式不能为空', trigger: 'blur' }],
        workNumber: [{ required: true, message: '工号不能为空', trigger: 'blur' }],
        departmentName: [{ required: true, message: '部门不能为空', trigger: 'change' }],
        timeOfEntry: [{ required: true, message: '入职时间', trigger: 'blur' }]
    }
}
},
methods:{
    async getDepartments(){
        this.loading=true
        this.showTree=true
        try{
      const {depts}= await getDepartmentsAPI()
      this.treeData= tranListToTreeData(depts,'')
      }catch(err){ 
        console.log(err) 
}
      this.loading=false
    },
    getSelect(node){
      this.formData.departmentName=node.name
      this.showTree=false
    },
    async btnOk(){
        // 效验表单
        try{
       await this.$refs.addEmployee.validate().then()
         await addEmployeesAPI(this.formData)
         //然后通知父组件更新数据
        //  this.$parent 可以直接拿到父组件实例
        this.$parent.getemployeeList()&& this.$parent.getemployeeList()
        this.$parent.showDialog=false

       }catch(err){ 
        console.log(err) 
       }
    },
    btnCancel(){
           this.formData={
            username: '',
        mobile: '',
        formOfEmployment: '',
        workNumber: '',
        departmentName: '',
        timeOfEntry: '',
        correctionTime: ''
           }
           this.$refs.addEmployee.resetFields() //移除之前的校验
           this.$emit('update:showDialog',false)
    }
}
}
</script>

<style>

</style>