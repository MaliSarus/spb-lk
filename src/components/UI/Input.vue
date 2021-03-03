<template>
  <div class="form__input">
    <input :type="inputType" :id="inputId" v-model="inputValue">
    <label :for="inputId" :class="{active: labelActive}">{{   label }}</label>
  </div>
</template>

<script>
export default {
  name: "Input",
  model:{
    prop: 'inputText',
    event: 'change'
  },
  props: ['inputId', 'inputType','label', 'inputText'],
  data(){
    return{
      inputValue: this.inputText,
    }
  },
  watch:{
    inputValue(val){
      this.$emit('change', val);
    }
  },
  computed:{
    labelActive(){
      if (this.inputValue !== ''){
        return true
      }
      else {
        return  false
      }
    }
  }

}
</script>

<style lang="scss" scoped>
  .form{
    &__input{
      position: relative;
      border: 1px solid #F3F3F3;
      border-radius: 2px;
      background: #F4F9FF;
      label{
        position: absolute;
        top: 15px;
        left: 13px;
        transition: left .25s, top .25s, font-size .25s;
        &.active{
          font-size: 10px;
          left: 13px;
          top: 5px;
        }
      }
      input{
        display: block;
        width: 100%;
        padding: 15px 13px;
        border: none;
        background: transparent;
        outline: none;
        &:focus + label{
          font-size: 10px;
          left: 13px;
          top: 5px;
        }
      }
    }
  }
</style>