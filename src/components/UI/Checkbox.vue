<template>
  <div class="form__checkbox" :class="{checked}">
    <input type="checkbox" :id="inputId" v-model="checked" v-show="false">
    <label :for="inputId"><slot/></label>
  </div>
</template>

<script>
export default {
  name: "Checkbox",
  props: ['inputId', 'isChecked'],
  model:{
    prop: 'isChecked',
    event: 'check'
  },
  data() {
    return {
      checked: this.isChecked,
    }
  },
  watch:{
    checked(val){
      this.$emit('check', val);
    }
  }
}
</script>

<style lang="scss" scoped>

.form{
  &__checkbox{
    font-size: 12px;
    line-height: 14px;
    color: #5E5E5E;
    position: relative;
    label{
      padding-left: 25px;
      cursor: pointer;
      display: block;
      &::before{
        position: absolute;
        left: 0;
        top: 50%;
        width: 15px;
        height: 15px;
        content: '';
        display: block;
        background-position: center;
        background-repeat: no-repeat;
        //background-size: contain;
        transform: translateY(-50%);
      }
    }
    a{
      color: #5E5E5E;
    }
    &.invalid{
      color:red;
      a{
        color: red;
      }
    }
  }
}

</style>