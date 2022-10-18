<template>
  <el-dialog :title="showTitle" :visible="showDialog" @close="btnCancel">
    <el-form ref="deptForm" label-width="120px" :model="formData" :rules="ruless">
      <el-form-item label="部门名称" prop="name">
        <el-input v-model="formData.name" style="width:80%" placeholder="1-50个字符" />
      </el-form-item>
      <el-form-item label="部门编码" prop="code">
        <el-input v-model="formData.code" style="width:80%" placeholder="1-50个字符" />
      </el-form-item>
      <el-form-item label="部门负责人" prop="manager">
        <el-select v-model="formData.manager" style="width:80%" placeholder="请选择" @focus="getEmployeesSimple">
          <el-option v-for="item in peoples" :key="item.id" :label="item.username" :value="item.username" />
        </el-select>
      </el-form-item>
      <el-form-item label="部门介绍" prop="introduce">
        <el-input v-model="formData.introduce" style="width:80%" placeholder="1-300个字符" type="textarea" :rows="3" />
      </el-form-item> 
    </el-form>
    <!-- 确定和取消 -->
    <el-row slot="footer" type="flex" justify="center">
      <el-col :span="6">
        <el-button size="small" @click="btnCancel">取消</el-button>
        <el-button size="small" type="primary" @click="btnOk">确定</el-button>
      </el-col>
    </el-row>
  </el-dialog>
</template>

<script>
import {getDepartmentsAPI,addDepartments, getDepartDetail,updateDepartmentsAPI} from '@/api/deparments'
import {getEmployeeSimpleAPI} from '@/api/imployees'
export default {
props:{
    showDialog:{
        type:Boolean,
        require:true
    },
    treenode:{
      default:null,
      type:Object
    }
},
data(){
  const cheackNmaeRepeat = async (rule,value,callback)=>{
      const {depts} = await getDepartmentsAPI()
      let isRepeat = false
      if(this.formData.id){
        // 数据再数据库中，编辑的数据，    同级部门下我的名字不能和其它的名字相同
           isRepeat = depts.filter(item => item.id !== this.formData.id && item.pid === this.formData.pid).some(item => item.name === value)
      }else{
        //没有id就是新增模式
           isRepeat = depts.filter(item=>item.pid===this.treenode.id).some(item=>item.name===value)
      }
      
       isRepeat ? callback(new Error(`同级部门下已经存在这个${value}部门了`)):callback()
    }
    // 这个位置是编码
    const cheackCodeRepeat = async (rule,value,callback)=>{
      const {depts} = await getDepartmentsAPI()
      let isRepeat=false
      if(this.formData.id){
          isRepeat = depts.some(item => item.id !== this.formData.id && item.code === value && value)
      }else{
       isRepeat = depts.some(item=>item.code === value && value) //空字符串也是false这里加了判定value就是防止有些数据没有编码
      }
      
      isRepeat ? callback(new Error(`组织架构下已经存在你这个${value}编码了`)):callback()
    }
  return {
    peoples:[],
    formData:{
      name:'',
      code:'',
      manager:'',
      introduce:''
    },
    ruless:{
   name:[{required:true, message:'部门名称不能为空', trigger:'blur'},
   {min:1 ,max:50,message:'部门名称为1-50个字符',trigger:'blur'},
   {validator:cheackNmaeRepeat,trigger:'blur'}
   ],
      code:[{required:true,message:'部门编码不能为空',trigger:'blur'},
       {min:1 ,max:50,message:'部门名称为1-50个字符',trigger:'blur'},
       {validator:cheackCodeRepeat,trigger:'blur'}
       ],
      manager:[{required:true,message:'部门管理者不能为空',trigger:'blur'}],
      introduce:[{required:true,message:'部门介绍不能为空',trigger:'blur'},
      {min:1 ,max:300,message:'部门名称为1-50个字符',trigger:'blur'}]
    }
  }
},
computed:{
  showTitle(){
    return this.formData.id ? '编辑部门' : '新增子部门'
  }
},
methods:{
  async getEmployeesSimple(){
     try{
     this.peoples= await getEmployeeSimpleAPI()
         console.log('1111')
     }catch(err){ console.log(err) }
  },
  //获取详情的方法
async getDepartDetail(id){
  this.formData = await getDepartDetail(id)
},
  btnOk(){
    this.$refs.deptForm.validate(async isOK=>{
      if(isOK){
        if(this.formData.id){
          await updateDepartmentsAPI(this.formData)
        }else{
          await addDepartments({...this.formData,pid:this.treenode.id})
        }
       
       this.$emit('addDepts')
       //父组件重新获取数据
       this.$emit('update:showDialog',false)
       //关闭dialog的时候会触发el-dialog的close事件所以不需要再单独清除数据
      }
    })
  },
  btnCancel(){
    this.formData={
       name:'',
      code:'',
      manager:'',
      introduce:''
    }
    //因为resetFields方法只能重置表单中的属性不能重置表单中没有的属性id是表单中没有的所以需要重置一下数据
    //关闭弹出层
    this.$refs.deptForm.resetFields()
    this.$emit('update:showDialog',false)
  }
}
}
</script>

<style>

</style>