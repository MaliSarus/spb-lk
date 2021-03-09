<template>
  <div class="form__input form__input-select" ref="select" :class="{open:isOpen}">
    <input type="text" :id="inputId" v-model="selectedOption"  @focus="inputFocus" @input="search" autocomplete="nope">
    <label v-if="label" :for="inputId" :class="{active: labelActive}">{{ label }}</label>
    <div class="select-options" v-show="isOpen" :class="selectMenuPos">
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
      selectedOption:this.inputOption,
      isOpen: false,
      searchString:'',
      selectMenuPos:'bottom',
      selectMenuOverflow: false,
    }
  },
  methods:{
    selectOption(option){
      this.selectedOption = option;
      this.isOpen = false;
      this.$emit('pick',option)
    },
    search($event){
      this.searchString = $event.target.value
    },
    inputFocus(){
      this.isOpen = true;
      const inputEl = this.$refs.select;
      const inputElBottom = inputEl.getBoundingClientRect().top + inputEl.offsetHeight;
      const windowHeight = window.innerHeight
      this.selectMenuPos = inputElBottom + 300 < windowHeight ? 'bottom' : 'top'
    }
  },
  computed:{
    labelActive() {
        return !!this.selectedOption;

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
  &__input-select {
    &::before {
      position: absolute;
      right: 15px;
      top: 50%;
      display: block;
      content: '';
      width: 18px;
      height: 6px;
      transform: translateY(-50%);
      background: url("/assets/img/ui/select-icon.svg") center no-repeat;
      transition: transform .25s;
      background-size: contain;
    }
    &.open{
      &::before{
        transform: translateY(-50%) rotate(180deg);
      }
    }

    input {
      padding-right: 35px;
    }
  }
}
.select-options {
  margin: 0;
  position: absolute;
  left: 0;
  right: 0;
  padding: 18px 15px 18px 18px;
  border-radius: 5px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  background: white;
  overflow: hidden;
  z-index: 10;
  height: 300px;
  &.bottom{
    bottom: 0;
    transform: translateY(calc(100% + 4px));
  }
  &.top{
    top: 0;
    transform: translateY( calc(-100% - 4px));
  }


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