<template>
  <div class="payed-order__list">
    <ul>
      <li class="payed-order__item order">
        <div class="order__text">
          <p>Online доступ к фигне - <b>18 июня</b></p>
        </div>
        <div class="order__button">
          <button class="order__btn prev">Видеозапись</button>
        </div>
      </li>
      <li class="payed-order__item order">
        <div class="order__text">
          <p>Online доступ к фигне - <b>18 июня</b></p>
        </div>
        <div class="order__button">
          <button class="order__btn today">Перейти к трансляции</button>
        </div>
      </li>
      <li class="payed-order__item order">
        <div class="order__text">
          <p>Online доступ к фигне - <b>18 июня</b></p>
        </div>
        <div class="order__button">
          <button class="order__btn next">Перейти к трансляции</button>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
    // import axios from 'axios'
    import {baseURL} from "../../../helpers/defaultValues";

    export default {
        name: "PayedOrder",
        methods: {
            fetchOrders() {
                const data = {
                    email: 'ts@ts.ts',
                    password: '123456'
                };
                fetch(baseURL + '/api/auth/', {
                    method: 'post',
                    headers: {
                        "Content-type": "application/json; charset=UTF-8"
                    },
                    body: JSON.stringify(data)
                })
                    .then(res => {
                        res.json()
                        console.log(res.headers.get('set-cookie'))
                    })
                    .then(function (data) {
                        console.log('Request succeeded with JSON response', data);
                    })
                // .then((res)=>{
                //     console.log(res)
                // //     axios
                // //         .get('/api/user/orders/')
                // //         .then(res => console.log(res))
                // })

            }
        },
        created() {
            this.fetchOrders();
        }
    }
</script>

<style scoped>

</style>