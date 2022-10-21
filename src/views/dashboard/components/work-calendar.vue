<template>
  <!-- 工作日历组件 -->
  <div>
    <!-- 年和月 -->
    <el-row type="flex" justify="end">
      <el-select v-model="currentYear" size="small" style="width:120px" @change="dataChange">
        <el-option v-for="item in yearList" :key="item" :label="item" :value="item" />
      </el-select>    
      <el-select v-model="currentMonth" size="small" style="width:120px ; margin-left:10px" @change="dataChange">
        <el-option v-for="item in 12" :key="item" :label="item" :value="item" />
      </el-select> 
    </el-row>
    <el-calendar v-model="currentDate">
      <template v-slot:dateCell="{date,data}" class="">
        <!-- date是单元格日期，data是单元格信息和day -->
        <div class="date-content">
          <span class="text">{{ data.day|getDay }}</span> 
          <span v-if="isWeek(date)" class="rest">休</span>
        </div>
      </template>
    </el-calendar>
  </div>
</template>

<script>
export default {
    filters:{
        getDay(value){
            const day = value.split('-')[2]
            return day.startsWith('0')? day.substr(1):day
        }
    },
    props:{
     startDate:{
        type:Date,
        default:()=>new Date() //如果没有传值就读取当前时间
                           //因为是事件类型所以在下面被调用时可以直接使用时间的方法
                           //要使用回调函数的形式因为date是obj或者数组
     }
    },
data(){
    return{
        yearList:[], //这里是要遍历的年的数组
        currentYear:null,
        currentMonth:null,
        currentDate:null
    }
   
},
 created(){
  this.currentYear= this.startDate.getFullYear()
  this.currentMonth=this.startDate.getMonth()
  console.log(new Date().getMonth()+1)
  this.yearList=Array.from(Array(11),(v,i)=>this.currentYear+i-5)
  this.dataChange()
    },
    methods:{
        dataChange(){
          const days=new Date().getDate()
          console.log(days)
         this.currentDate=new Date(`${this.currentYear}-${this.currentMonth}-1`)
        },
        isWeek(date){
           return date.getDay()=== 6 || date.getDay() === 0
        }
    }
}

</script>

<style>
.el-calendar-day {
  height:  auto;
 }
.el-calendar-table__row td,.el-calendar-table tr td:first-child,.el-calendar-table__row td.prev{
  border:none;
 }
.date-content {
  height: 40px;
  text-align: center;
  line-height: 40px;
  font-size: 14px;
}
.date-content .rest {
  color: #fff;
  border-radius: 50%;
  background: rgb(250, 124, 77);
  width: 20px;
  height: 20px;
  line-height: 20px;
  display: inline-block;
  font-size: 12px;
  margin-left: 10px;
}
.date-content .text{
  width: 20px;
  height: 20px;
  line-height: 20px;
 display: inline-block;

}
.el-calendar-table td.is-selected .text{
   background: #409eff;
   color: #fff;
   border-radius: 50%;
 }
.el-calendar__header {
   display: none
 }
</style>
