<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-card>
        <el-tabs v-model="activeName">
          <el-tab-pane label="角色管理" name="first">
            <el-button type="primary" icon="el-icon-plus" size="small" @click="showDialog=true">角色管理</el-button>

            <el-table border="" :data="list">
              <el-table-column type="index" label="序号" width="120" />
              <el-table-column prop="name" label="角色名称" width="240" />
              <el-table-column prop="description" label="描述" />
              <el-table-column label="操作">
                <!-- 作用域插槽 -->
                <template slot-scope="{row}">
                  <el-button size="small" type="success">分配权限</el-button>
                  <el-button size="small" type="primary" @click="editRole(row.id)">编辑</el-button>
                  <el-button size="small" type="danger" @click="dleteRole(row.id)">删除</el-button>
                </template>
              </el-table-column>
            </el-table>
            
          </el-tab-pane>
         
          <el-tab-pane label="公司信息" name="second">
            <el-alert 
              title="对公司名称、公司地址、营业执照、公司地区的更新，将使得公司资料被重新审核，请谨慎修改"
              type="info"
              show-icon
              :closable="false"
            />
            <el-form label-width="120px" style="margin-top:50px">
              <el-form-item label="企业名称">
                <el-input v-model="formData.name" disabled style="width:400px" />
              </el-form-item>
              <el-form-item label="公司地址">
                <el-input v-model="formData.companyAddress" disabled style="width:400px" />
              </el-form-item>
              <el-form-item label="电话">
                <el-input disabled style="width:400px" />
              </el-form-item>
              <el-form-item label="邮箱">
                <el-input v-model="formData.mailbox" disabled style="width:400px" />
              </el-form-item>
              <el-form-item label="备注">
                <el-input v-model="formData.remarks" type="textarea" rows="3" disabled style="width:400px" />
              </el-form-item>
            </el-form>
          </el-tab-pane>
          <!-- 分页组件 -->
          <el-row type="flex" justify="center" align="middle" style="height: 60px">
            <el-pagination
              layout="prev, pager, next"
              :page-size="page.pagesize"
              :total="page.total"
              :current-page="page.page"
              @current-change="changePage"
            />
          </el-row>
        </el-tabs>
      </el-card>
    </div>
    <el-dialog title="编辑部门" :visible="showDialog" @close="btnCancel">
      <el-form ref="roleForm" :model="roleForm" :rules="ruless">
        <el-form-item label="角色名称" prop="name">
          <el-input v-model="roleForm.name" />
        </el-form-item>
        <el-form-item label="角色描述">
          <el-input v-model="roleForm.description" />
        </el-form-item>
        <!-- 放置footer插槽 -->
        <el-row>
          <el-col :span="8">
            <el-button size="small" @click="btnCancel">取消</el-button>
            <el-button size="small" type="primary" @click="btnOk">确定</el-button>
          </el-col>
        </el-row>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import {getRoleList,getCompanyInfo,deleteRoleAPI,updateRoleAPI,getRoleDetailAPI,addRoleAPI} from '@/api/setting'
import {mapGetters} from 'vuex'
export default {
  name:'Setting',
   data(){
    return{
       activeName: 'first',
      list:[], //承接数组
      page:{
        page:1,
        pagesize:10,
        total:0//记录总数
      },
      formData:{},//公司信息
      showDialog:false,
      roleForm:{
        description:'',
        name:''
      },
      ruless:{
        name:[{ required: true, message: '角色名称不能为空', trigger: 'blur' }]
      }
     
    }
   },
   computed: {
    ...mapGetters(['companyId'])
  },
   created(){
        this.getRolList() // 获取角色列表
        this.getCompanyInfos()
   },
   methods:{
    
     async getRolList(){
      try{
        const {total,rows }= await getRoleList(this.page)
        this.list=rows
        this.page.total=total
        console.log(rows)
        }catch(err){
           console.log(err) 
}
     },
     changePage(newPage){
      this.page.page=newPage
      this.getRolList()

     },
     async getCompanyInfos() {
      try{
      const data = await getCompanyInfo(this.companyId)
      console.log('1111')
      this.formData=data
      
      }catch(err){ 
        console.log(err+'111') 
          }
    },
    async deleteRole(id){
      try{
         await this.$confirm('确认删除该角色么')
         await deleteRoleAPI(id)
         this.getRolList()
         this.$message('删除角色成功')
      }catch(err){
         console.log(err)
          }
     
    },
   async editRole(id){
     this.roleForm =  await getRoleDetailAPI(id)
     this.showDialog=true
    },
   async btnOk(){
    try{
      await this.$refs.roleForm.validate()
      // 只有校验通过才会进入await下方的代码
      //这里的roleForm是服务器传过来 的数据所以有id这个值而新增的数据是我们自己编辑的没有idid
      if(this.roleForm.id){
              await updateRoleAPI(this.roleForm)
      }else{
        await  addRoleAPI(this.roleForm)
      }
      // 重新拉取数据
      this.getRolList()
      this.$message('修改成功')
      this.showDialog=false
      }catch(err){
         console.log(err) 
         }
    },
    btnCancel(){
      this.roleForm={
        name:'',
        description:''
      }
      this.$refs.roleForm.resetFields()
      this.showDialog=false
    }
   }
}
</script>

<style>

</style>
