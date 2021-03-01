<template>
  <div class="form__input">
    <input :type="inputType" :id="inputId" @input="inputChange">
    <label :for="inputId" :class="{active: labelActive}">{{   label }}</label>
  </div>
</template>

<script>
export default {
  name: "Input",
  props: ['inputId', 'inputType','label'],
  data(){
    return{
      labelActive: false
    }
  },
  methods:{
    inputChange($event){
      this.$emit('update:inputText', $event.target.value);
      if ($event.target.value !== ''){
        this.labelActive = true
      }
      else {
        this.labelActive = false
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