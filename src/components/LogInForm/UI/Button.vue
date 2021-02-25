<template>
  <button v-bind="$attrs">{{ text }}</button>
</template>

<script>
export default {
  name: "Button",
  props:['text']
}
</script>

<style lang="scss" scoped>
.form{
  &__submit{
    background: #FFCC40;
    border: 1px solid #F3F3F3;
    border-radius: 5px;
    color: #686868;
    font-weight: 500;
    font-size: 18px;
    line-height: 21px;
    outline: none;
  }
  &__button{
    font-weight: 500;
    font-size: 18px;
    line-height: 21px;
    text-align: center;
    color: white;
    background: #013066;
    border: 1px solid #F3F3F3;
    box-sizing: border-box;
    border-radius: 5px;
    padding: 15px 15px;
  }
}
</style>