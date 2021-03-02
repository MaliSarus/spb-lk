<template>
  <div class="form__input form__input-select" ref="select">
    <input type="text" :id="inputId" v-model="selectedOption"  @focus="isOpen = true" @input="search" autocomplete="nope">
    <label :for="inputId" :class="{active: labelActive}">{{ label }}</label>
    <div class="select-options" v-show="isOpen">
      <vuescroll :ops="ops">
        <ul>
          <li v-for="(option, index) in searchingOptions" :key="`option_${option}_${index}`" @click="selectOption(option)">{{ option }}</li>
        </ul>
      </vuescroll>
    </div>
  </div>
</template>

<script>
import vuescroll from 'vuescroll'

export default {
  name: "Select",
  props: ['options', 'inputId', 'inputType', 'label', 'inputOption'],
  model:{
    prop: 'inputOption',
    event: 'selectOption'
  },
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
          onlyShowBarOnScroll: false,
          opacity: 1,
          keepShow: true
        }
      },
      selectedOption:'',
      isOpen: false,
      searchString:''
    }
  },
  methods:{
    selectOption(option){
      this.selectedOption = option;
      this.isOpen = false;
    },
    search($event){
      this.searchString = $event.target.value
    }
  },
  computed:{
    labelActive() {
      return this.selectedOption !== ''
    },
    searchingOptions (){
      if(this.searchString !== ''){
        return this.options.filter(option => {
          if(option.toLowerCase().includes(this.searchString.toLowerCase())){
            return option
          }
        })
      }
      else {
        return this.options
      }
    }
  },
  watch:{
    selectedOption(val){
      this.$emit('selectOption', val);
      if (val) {
        this.labelActive = true
      } else {
        this.labelActive = false
      }
    }

  },

  mounted() {
    const that = this
    document.addEventListener('click', function(event) {
      const elementToDetect = that.$refs.select;
      if (elementToDetect) {
        const isClickInside = elementToDetect.contains(event.target);
        that.isOpen = isClickInside;
      }
    })
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
  z-index: 10;

  ul {
    margin: 0;
    padding: 0;
    list-style: none;
  }

  li {
    cursor: pointer;
    &:not(:last-child){
      margin-bottom: 30px;
    }
    &:hover{
      color: #3b7dee;
    }
  }
}
</style>