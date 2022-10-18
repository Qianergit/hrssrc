<template>
  <div>
    <el-upload
      action="#"
      :limit="1"
      list-type="picture-card"
      :on-preview="preview"
      :on-remove="handlerremove"
      :on-change="changeFile"
      :file-list="fileList"
      :before-upload="beforeUpload"
      :http-request="uploads"
      :class="{disabled:fileComputed}"
    >
      <i class="el-icon-plus" />
    </el-upload>
    <el-progress v-if="showpercent" style="width:180px" :percentage="percent" />
    <el-dialog title="图片预览" :visible.sync="showDialog">
      
      <img :src="imgUrl" alt="" style="width:100%">
      
    </el-dialog>
  </div>

</template>

<script>
import COS from 'cos-js-sdk-v5'
const cos = new COS({
  SecretId: 'AKIDAEBweaMxLUSEn8HF3hARTMyNZk4Unupa', // 身份识别 ID
  SecretKey: 'lJm9MWWLxMYZRBmWDj294mQyX1Lgv1yq' // 身份密钥
})
export default {
 data(){
    return {
        fileList:[],
        showDialog:false,
        imgUrl:'',
        Currentid:'',
        percent:0,
        showpercent:false
    }
 },
 computed:{
    fileComputed(){
        return this.fileList.length ===1
    }
 },
 methods:{
    preview(file){
        console.log(file)
       
       this.imgUrl = file.url
        this.showDialog=true
    },
    handlerremove(file,fileList){
          // this.fielList=fileList.filter(item=>item.uid!==file.uid) //将被删出的排除在外组成一个新的数组
          this.fileList=fileList //与上面的代码达成的效果是相同的
          console.log(this.fileList)
    },
    changeFile(file,fileList){
           this.fileList = fileList.map(item => item)
           console.log(this.fileList)
           return
      
    },
    beforeUpload(file){
     const types=['image/jpeg', 'image/gif', 'image/bmp', 'image/png']
     if(!types.some(item=>item===file.type)){
      this.$message.error('上传图片是能是 JPG/FIG/BMP/PNG 格式！')
      return false
     }
     const maxSize=5*1024*1024
     if(file.size>maxSize){
      this.$message('上传的图片不能大于5M')
     }
     this.Currentid=file.uid
     this.showpercent = true
     return true //调用这个函数最后异能要return true 要不然就认为在中途卡死了不继续乡下执行
    },
    uploads(params){
    if(params.file){
        //执行上传操作
    cos.putObject({
    Bucket: 'qianqianer-photo-1314432602', /* 填入您自己的存储桶，必须字段 */
    Region: 'ap-beijing',  /* 存储桶所在地域，例如ap-beijing，必须字段 */
    Key: params.file.name,  /* 存储在桶里的对象键（例如1.jpg，a/b/test.txt），必须字段 */
    Body: params.file, /* 必须，上传文件对象，可以是input[type="file"]标签选择本地文件后得到的file对象 */
    StorageClass: 'STANDARD',
     onProgress: (params) => {
            this.percent = params.percent * 100
          }
},(err, data) =>{
     if(!err&&data.statusCode===200){
      
      this.fileList = this.fileList.map(item => {
              // 去找谁的uid等于刚刚记录下来的id
              if (item.uid === this.Currentid) {
                // 将成功的地址赋值给原来的url属性
                return { url: 'http://' + data.Location, upload: true }
                // upload 为true 表示这张图片已经上传完毕 这个属性要为我们后期应用的时候做标记
                // 保存  => 图片有大有小 => 上传速度有快又慢 =>要根据有没有upload这个标记来决定是否去保存
               
              }
               console.log('222')
               console.log(item.uid===this.Currentid)
              return item
      })
     setTimeout(() => {
              this.showpercent = false
              this.percent = 0
              
            }, 1000)
    }
})
      }
        
    }
 }
}
</script>

<style lang="scss">
.disabled .el-upload--picture-card{
  display: none;
}
</style>