<template>
  
  <div>
    <svg-icon icon-class="fullscreen" style="color:#fff; width: 20px; height: 20px" @click="changeScreen" />
  </div>
  
</template>

<script>

export default {
    
methods:{
   changeScreen(){
       document.documentElement.requestFullscreen()
}
}
}
</script>

<style>

</style>