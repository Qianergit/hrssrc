<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-card class="tree-card">
        <!-- 用了一个行列布局 -->
        <tree-tools :treenode="company" :tree-root="true" @addDepts="addDepts" />
       
        <!-- //添加一个树形解构 -->
        <el-tree :data="departs" :props="defaultProps" :default-expand-all="true">
          <!-- 插入的内容会根据节点数量，有多少节点循环多少次 -->
          <!-- scoped-solt是作用域插槽，使用slot-scoped='变量可以拿到tree中传过来的值' -->
          <tree-tools slot-scope="{data}" :treenode="data" @delDepts="getDepartments()" @addDepts="addDepts" />
        </el-tree>
      </el-card>
      <add-dept :show-dialog="showDialog" />
    </div>
  </div>
</template>

<script>
import TreeTools from './components/treenode.vue'
import {getDepartmentsAPI} from '@/api/deparments'
import {tranListToTreeData} from '@/utils'
import AddDept from '@/views/departments/components/add-dept.vue'
export default {
components:{
  TreeTools,
  AddDept
},
data(){
  return{
    company:{name:'',manager:''},
    departs:[],
    defaultProps:{
      lable:'name'
    },
    showDialog:false,
    node:null
  }
},
created(){
  this.getDepartments()
},
methods:{
  async getDepartments(){
    try{
      const result = await getDepartmentsAPI()
          console.log(result)
          this.company={name:result.companyName,manager:'负责人'}
          this.departs=tranListToTreeData(result.depts,'')
          }catch(err){ 
            console.log(err) 
}
  },
  addDepts(node){
    this.showDialog=true
    this.node=node
  }
}
}
</script>

<style scoped>
.tree-card {
  padding: 30px  140px;
  font-size:14px;
}

</style>
