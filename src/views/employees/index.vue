<template>
  <div class="dashboard-container">
    <div class="app-container">
      <page-tools :show-before="true">
        <!-- 左侧显示记录总数 -->
        <span slot="before">共{{ page.total }}条机录</span>
        <!-- 右侧显示按钮excel导入 -->
        <template v-slot:after>
          <el-button size="small" type="success" @click="$router.push('/import')">excel导入</el-button>
          <el-button size="samll" type="danger" @click="excelData">excel导出</el-button>
          <el-button size="samll" type="primary" @click="showDialog=true">新增员工</el-button>
        </template>
      </page-tools>
      <el-card>
        <el-table v-loading="loading" border :data="list">
          <el-table-column label="序号" sortable="" type="index" />
          <el-table-column label="姓名" sortable="" prop="username" />
          <el-table-column label="头像" sortable="" align="center">
            <template slot-scope="{row}"> 
              <img 
                v-imagerror="require('@/assets/common/bigUserHeader.png')" 
                :src="row.staffPhoto"
                alt=""
                style="border-radius: 50%; width: 100px; height: 100px; padding: 10px"
                @click="showQrCode(row.staffPhoto)"
              >
            </template>
          </el-table-column>
          <el-table-column label="工号" sortable="" prop="workNumber" />
          <!-- 使用element的formatter的方法来格式化一个数据 -->
          <el-table-column label="聘用形式" sortable="" prop="formOfEmployment" :formatter="formatterEmployment" />
          <el-table-column label="部门" sortable="" prop="departmentName" />
          <!-- 使用作用于插槽和过滤器来做这个事件的格式规范 -->
          <!-- 可以使用  -->
          <!-- <template slot-scope="obj"></template> -->
          <el-table-column label="入职时间" sortable="">
            <template v-slot="{row}">
              {{ row.timeOfEntry |formatDate }}
            </template>
          </el-table-column>
          <el-table-column label="账户状态" sortable="" prop="enableState">
            <template v-slot="{ row }">
              <el-switch :value="row.enableState===1" />
            </template>
          </el-table-column>
          <el-table-column label="操作" sortable="" fixed="right" width="280">
            <template v-slot="{row}">
              <el-button type="text" size="small" @click="$router.push(`/employees/datail/${row.id}`)">查看</el-button>
              <el-button type="text" size="small">转正</el-button>
              <el-button type="text" size="small">调岗</el-button>
              <el-button type="text" size="small">离职</el-button>
              <el-button type="text" size="small">角色</el-button>
              <el-button type="text" size="small" @click="deleteEmployee(row.id)">删除</el-button>
            </template>
          </el-table-column>
          <!-- 分页组件 -->
          
        </el-table>
        <el-row type="flex" justify="center" align="center" style="height:60px">
          <el-pagination
            :current-page="page.page" 
            :page-size="page.size" 
            :total="page.total" 
            layout="prev,pager,next" 
            @current-change="changePage"
          />
        </el-row>
        
      </el-card>
    </div>
    <!-- 防止弹出层组件 -->
    <add-employee :show-dialog.sync="showDialog" />
    <el-dialog title="二维码" :visible.sync="showCodedialog">
      <el-row type="flex" justify="center">
        <canvas ref="myCanvas" />
      </el-row>
    </el-dialog>
  </div>
</template>

<script>
import {getemployeeListAPI,deleteEmployeeAPI} from '@/api/imployees'
import EmployeeEnum from '@/api/constant/employees'
import AddEmployee from './components/add-employee.vue'
import {formatDate}from '@/filters'
import QrCode from 'qrcode'
export default {
  name:'Employees',
  components:{
    AddEmployee
  },
  data(){
    return{
     list:[],
     page:{
      page:1,
      size:10,
      total:0
     },
     loading:false, //控制显示遮罩层
     showDialog:false,
     showCodedialog:false
    }
  },
  created(){
     this.getemployeeList()
  },
  methods:{
         async getemployeeList(){
          const{total,rows}= await getemployeeListAPI(this.page)
          this.page.total=total
          this.list=rows
          this.loading=false
         },
         changePage(aaa){
          this.page.page=aaa
          this.getemployeeList()
         },
         formatterEmployment(rows,cloumn,cellValue,index){
          const obj = EmployeeEnum.hireType.find(item=>item.id===cellValue)
           return obj? obj.value : '未知'
         },
         async deleteEmployee(id){
          try{
             await this.$confirm('确定要删除该员工么')
             await deleteEmployeeAPI(id)
             this.$message('删除员工成功')
             this.getemployeeList()
             }catch(err){
              console.log(err)
             }
         },
         excelData(){
           const headers = {
            '姓名': 'username',
        '手机号': 'mobile',
        '入职日期': 'timeOfEntry',
        '聘用形式': 'formOfEmployment',
        '转正日期': 'correctionTime',
        '工号': 'workNumber',
        '部门': 'departmentName'
      }
      const multiheaders = [['姓名','主要信息','','','','','','部门']]
           import('@/vendor/Export2Excel').then(async excel=>{
             const {rows} = await getemployeeListAPI({
              page:1,
              size:this.page.total
             })
           const data = this.formatJson(headers,rows)
            excel.export_json_to_excel({
               header: Object.keys(headers), //表头 必填
                data:data, //具体数据 必填
                filename: '员工资料表', //非必填
                autoWidth: true, //非必填
                bookType: 'xlsx', //非必填
                multiHeader:multiheaders,
                merges:['A1:A2','B1:F1','G1:G2']
            })
            
           })
         },
        //  rows里是数组套对象
         formatJson(headers,rows){
              return  rows.map(item=>{
               return   Object.keys(headers).map(key=>{
                // 需要判断data字段是不是时间字段
                  if(headers[key]==='timeOfEntry' || headers[key]==='correctionTime') {
                    return formatDate(item[headers[key]])
                  }else if (headers[key]==='formOfEmployment'){
                     const obj =  EmployeeEnum.hireType.find(obj=>obj.id === item[headers[key]])
                     return obj ? obj.value : '未知'
                  }
                    return  item[headers[key]]
                     
                 })
               })
              // return  rows.map(item=>Object.keys(headers).map(keys=>item[headers[keys]])) 这时极致简写
         },
         showQrCode(url){
                if(url){
                  this.showCodedialog=true
                   this.$nextTick(() => {
                 // 此时可以确认已经有ref对象了
                    QrCode.toCanvas(this.$refs.myCanvas, url) // 将地址转化成二维码
                    // 如果转化的二维码后面信息 是一个地址的话 就会跳转到该地址 如果不是地址就会显示内容
              })
                }else{
                  this.$message.warning('该用户还未上传头像')
                }
         }
       
  }
}
</script>

<style>

</style>
