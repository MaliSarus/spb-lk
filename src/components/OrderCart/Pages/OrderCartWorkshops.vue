<template>
  <div class="container">
    <div class="row">
      <div class="col-12">
        <additional-services-list/>
      </div>
    </div>
  </div>
</template>

<script>
  import AdditionalServicesList from "@/components/OrderCart/AdditionalServices/AdditionalServicesList";
  export default {
    name: "OrderCartWorkshops",
    components:{
      AdditionalServicesList
    }
  }
</script>

<style scoped>

</style>