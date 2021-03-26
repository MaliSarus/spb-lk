<template>
  <footer class="footer">
    <div class="container">
      <div class="row">
        <div class="col-12">
          <div class="footer__text">
            © 2021 {{$t('message.footer.text')}}
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
  export default {
    name: "Footer"
  }
</script>

<style lang="scss" scoped>
  .footer__text {
    padding-top: 10px;
    padding-bottom: 10px;
    color: #93acc9;
    font-size: 14px;
    line-height: 1.2;
    text-align: center;
  }

</style>