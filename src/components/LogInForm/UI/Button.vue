<template>
  <button v-bind="$attrs">{{ text }}</button>
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
.form{
  &__submit{
    padding: 15px 35px;
    width: 100%;
    border: 1px solid #F3F3F3;
    border-radius: 5px;
    color: #686868;
    font-weight: 500;
    font-size: 18px;
    line-height: 21px;
    outline: none;
    text-align: center;
    background-color: #FFCC40;
    background-image: url('/assets/img/ui/submit-button-arrow.svg');
    background-repeat: no-repeat;
    background-size: 20px;
    background-position: calc(100% - 12px) center;
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
    width: 100%;
  }
}
</style>