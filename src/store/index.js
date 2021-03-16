import Vue from 'vue'
import Vuex from 'vuex'
import axios from "axios";
import { setWithExpiry} from "../helpers/localStorage";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: {},
    countries: [],
    departments: [],
    ranks: [],
    degrees: [],
    russiaCities: [],
    payedOrder:[],
    userCart:[],
    products: [],
  },
  mutations: {
    setCountries(state, payload) {
      state.countries = payload
    },
    setDepartments(state, payload) {
      state.departments = payload
    },
    setRanks(state, payload) {
      state.ranks = payload
    },
    setDegrees(state, payload) {
      state.degrees = payload
    },
    setRussiaCities(state, payload) {
      state.russiaCities = payload
    },
    setUser(state, payload) {
      state.user = payload;
    },
    setPayedOrders(state, payload){
      state.payedOrder = payload
    },
    setProducts(state, payload){
      state.products = payload
    },
    addProduct(state, payload){
      state.userCart.push(payload)
    },
    deleteProduct(state, payload){
      state.userCart = state.userCart.filter(product=> +product.id !== payload)
    },
    deleteAllSingleProducts (state){
      state.userCart = state.userCart.filter(product => product.type !== 'single')
    }
  },
  actions: {
    // eslint-disable-next-line no-unused-vars
    authUser({commit}, payload) {
      // eslint-disable-next-line no-unused-vars
      const test = {
        email: 'ts@ts.ts',
        password: '123456'
      }
      return axios
        .post('/api/auth/', payload)
        .then(res => {

            const data = res.data;
            const user = {
              ordinator: data.ordinator,
              verify: data.verify,
              ...data.user
            }
            if (data.status === 'ok') {
              commit('setUser', user);
              setWithExpiry('user', user, 3600 * 1000)
            }
            this._vm.$toast.info(JSON.stringify(res.data));
            return res;
          }
        )
    },
    fetchUser({commit}) {
      return axios
          .get('/api/user/')
          .then(res=> {
            console.log(res)
            if (res.data.auth) {
              const data = res.data;
              const user = {
                ...data.user,
                ordinator: data.ordinator,
                verify: data.verify,
              }
              commit('setUser', user)
              return user
            }
            else {
                return false
            }
          })
    },
    fetchCountries({commit}) {
      axios
        .get('/api/location/country/')
        .then(res => {
          if (res.data.status === 'ok') {
            commit('setCountries', res.data.country);
            this._vm.$toast.info('fetch Departments: ' + res.data.status);
          }
          else{
            this._vm.$toast.error('fetch Departments error', res.data.message);
          }
        })
    },
    fetchDepartments({commit}) {
      axios
        .get('/api/specializations/')
        .then(res => {
          if (res.data.status === 'ok') {
            commit('setDepartments', res.data.items)
          }
          this._vm.$toast.info('fetch Departments: ' + res.data.status);
        })
    },
    fetchRanks({commit}) {
      axios
        .get('/api/ranks/')
        .then(res => {
          if (res.data.status === 'ok') {
            commit('setRanks', res.data.items);
          }
          this._vm.$toast.info('fetch Ranks: ' + res.data.status);
        })
    },
    fetchDegrees({commit}) {
      axios
        .get('/api/degrees/')
        .then(res => {
          if (res.data.status === 'ok') {
            commit('setDegrees', res.data.items);
          }
          this._vm.$toast.info('fetch Degrees: ' + res.data.status);

        })
    },
    fetchCities({commit}) {
      axios
        .get('/api/location/city/1/')
        .then(res => {
          if (res.data.status === 'ok') {
            commit('setRussiaCities', res.data.city);
          }
          this._vm.$toast.info('fetch City: ' + res.data.status);
        })
    },
    fetchPayedOrders({commit}){
      return axios
        .get('/api/user/orders/')
        .then(res=>{
          if (res.data.status === 'ok') {
            commit('setPayedOrders', res.data.orders);
            return true
          }
          else {
            return false
          }
        })
    },
    fetchProducts({commit}){
      return axios
        .get('/api/catalog/items/')
        .then(res => {
          if (res.data.status === 'ok') {
            commit('setProducts', res.data.sections)
            this._vm.$toast.info('fetch Products: ' + res.data.status);
          }
          else{
            this._vm.$toast.warning('fetch City: something wrong');
          }
          return res.data.status;
        })
        .catch(e => this._vm.$toast.warning('fetch Products: ' + e))
    }
  },
  getters: {
    user(state) {
      return state.user
    },
    countries(state) {
      return state.countries
    },
    departments(state) {
      return state.departments
    },
    ranks(state) {
      return state.ranks
    },
    degrees(state) {
      return state.degrees
    },
    russiaCities(state) {
      return state.russiaCities
    },
    payedOrders(state){
      return state.payedOrder
    },
    userCart(state){
      return state.userCart
    },
    products(state){
      return state.products
    }
  }
})
