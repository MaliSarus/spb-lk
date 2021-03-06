<template>
  <button v-bind="$attrs" @click="$emit('buttonClick')">{{ text }}</button>
</template>

<script>
export default {
  name: "Button",
  props:['text'],
  data(){
    return{
      publicPath: process.env.BASE_URL
    }
  }
}
</script>

<style lang="scss" scoped>
</style>