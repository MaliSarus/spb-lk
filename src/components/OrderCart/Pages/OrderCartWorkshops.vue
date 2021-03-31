<template>
  <div class="container">
    <div class="row">
      <div class="col-12">
        <additional-services-list v-if="!$attrs.workshopsDone" :workshops="workshops"/>
        <p v-else class="done-text" style="font-size: 24px; text-align: center">{{$t('message.orderCart.orderCartWorkshops.done')}}</p>
      </div>
    </div>
  </div>
</template>

<script>
    import AdditionalServicesList from "@/components/OrderCart/AdditionalServices/AdditionalServicesList";
    import {mapGetters} from 'vuex'

    export default {
        name: "OrderCartWorkshops",
        components: {
            AdditionalServicesList
        },
      computed:{
          ...mapGetters(["workshops"])
      }
    }
</script>

<style scoped>

</style>