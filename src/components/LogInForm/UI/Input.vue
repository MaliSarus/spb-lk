<template>
  <div class="form__input">
    <input :type="inputType" :id="inputId">
    <label :for="inputId">{{   label }}</label>
  </div>
</template>

<script>
export default {
  name: "Input",
  props: ['inputId', 'inputType','label']
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
      }
      input{
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