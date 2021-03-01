<template>
  <div class="form__input">
    <input type="text" :id="inputId" >
    <label :for="inputId" >{{ label }}</label>
    <div class="select-options">
      <vuescroll :ops="ops">
        <ul>
          <li v-for="(option, index) in options" :key="`option_${option}_${index}`">{{ option }}</li>
        </ul>
      </vuescroll>
    </div>
  </div>
</template>

<script>
import vuescroll from 'vuescroll'

export default {
  name: "Select",
  props: ['options', 'inputId', 'inputType', 'label'],
  components: {
    vuescroll
  },
  data(){
    return{
      ops: {
        vuescroll: {
          detectResize: true,
        },
        rail: {
          background: '#EDEFF1',
          opacity: 1,
        },
        bar: {
          background: '#C0CDDE',
          onlyShowBarOnScroll: false
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.form {
  &__input {
    position: relative;
    border: 1px solid #F3F3F3;
    border-radius: 2px;
    background: #F4F9FF;

    label {
      position: absolute;
      top: 15px;
      left: 13px;
      transition: left .25s, top .25s, font-size .25s;

      &.active {
        font-size: 10px;
        left: 13px;
        top: 5px;
      }
    }

    input {
      display: block;
      width: 100%;
      padding: 15px 13px;
      border: none;
      background: transparent;
      outline: none;

      &:focus + label {
        font-size: 10px;
        left: 13px;
        top: 5px;
      }
    }
  }
}

.select-options {
  margin: 0;
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  padding: 18px 15px 18px 18px;
  transform: translateY(calc(100% + 4px));
  border-radius: 5px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  background: white;
  height: 300px;
  overflow: hidden;

  ul {
    margin: 0;
    padding: 0;
    list-style: none;
  }

  li {
    &:not(:last-child){
      margin-bottom: 30px;
    }
  }
}
</style>