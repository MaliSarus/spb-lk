<template>
  <div class="personal-cab__main-page">
    <div class="container">
      <div class="row">
        <div class="col-12">
          <div class="personal-cab__payed payed-order">
            <div class="personal-cab__subtitle">
              Оплаченные заказы
            </div>
            <PayedOrder/>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-12">
          <div class="personal-cab__controls">
            <div class="personal-cab__control control">
              <router-link :to="{name: 'UserData'}" class="control__block">
                <div class="control__title">
                  Личные данные
                </div>
                <div class="control__desc">
                  <div class="control__image">
                    <img src="/assets/img/ui/user-icon.svg" alt="">
                  </div>
                  <div class="control__text">
                    Просмотреть / изменить персональные данные, пройти верификацию
                  </div>
                </div>
              </router-link>
            </div>
            <div class="personal-cab__control control">
              <router-link :to="{name: 'Order'}" class="control__block">
                <div class="control__title">
                  Оформление, заказ услуг
                </div>
                <div class="control__desc">
                  <div class="control__image">
                    <img src="/assets/img/ui/order-icon.svg" alt="">
                  </div>
                  <div class="control__text">
                    Выбрать даты, формат участия в конгрессе, а также заказать дополнительные услуги
                  </div>
                </div>
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
    import PayedOrder from "./PayedOrder";
    export default {
        name: "MainPage",
        components: {PayedOrder}
    }
</script>

<style scoped>

</style>