<template>
  <div class="dashboard-container">
    <div class="dashboard-text">首页</div>
    <page-tools :show-before="true">
      <template v-slot:before>
        <span>我想你们了</span>
      </template>
      <el-button slot="after" type="primary" @click="$router.push('/import')">
        导入excel
      </el-button>
       
    </page-tools>
    
  </div>
</template>

<script>

import { mapGetters } from 'vuex'
export default {
  name: 'Dashboard',
  
  computed: {
    ...mapGetters([
      'name'
    ])
  }
  
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
