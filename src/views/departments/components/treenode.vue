<template>
  <el-row type="flex" justify="space-between" align="middle" style="height: 40px; width:100%">
    <el-col>
      <span>{{ treenode.name }}</span>
    </el-col>
    <el-col :span="5">
      <el-row type="flex" justify="end">
        <!-- 两个内容 -->
        <el-col>{{ treenode.manager }}</el-col>
        <el-col>
          <!-- 下拉菜单 element -->
          <el-dropdown @command="operateDepts">
            <span>
              操作<i class="el-icon-arrow-down" />
            </span>
            <!-- 下拉菜单 -->
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="add">添加子部门</el-dropdown-item>
              <el-dropdown-item v-if="!treeRoot" command="edit">编辑部本</el-dropdown-item>
              <el-dropdown-item v-if="!treeRoot" command="del">删除部门</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </el-col>
      </el-row>
    </el-col>
  </el-row>
</template>

<script>
import {delDepartmentAPI} from '@/api/deparments/index'
export default {
  props:{
    treenode:{
        type:Object,
        required:true
    },
    treeRoot:{
      type:Boolean,
      default:false
    }
  },
  methods:{
    operateDepts(type){
        if(type === 'add'){
            //这里是添加
             this.$emit('addDepts',this.treeNode)
        }else if(type === 'edit'){
           //这里是编辑
            alert('您点击了编辑')
        }else{
          
          this.$confirm('您确定要删除这个部门么').then(()=>{
            return delDepartmentAPI(this.treenode.id)
          }).then(()=>{
            //这里的confirm本身就是一个异步操作了，使用then这个方法就不需要async和await这两个方法了
            //这个then是调取接口成功之后的then
            this.$emit('delDepts')
            this.$message.success('部门删除成功')
          })
        }
    }
  }
}
</script>

<style>

</style>