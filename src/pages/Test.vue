<template>
  <TestDatePicker
    v-model="testDate"
  />
</template>

<script>
  import TestDatePicker from '@/components/Test/TestDatePicker.vue';

  export default {
    name: "Test",
    data(){
      return{
        testDate:'12.08.2020'
      }
    },
    components:{
      TestDatePicker
    },
  }
</script>

<style scoped lang="scss">
  .mx-datepicker{
    display: block;
    position: static;
  }
</style>