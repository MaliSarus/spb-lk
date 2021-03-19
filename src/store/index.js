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

          }


        })
    },
    fetchDepartments({commit}) {
      axios
        .get('/api/specializations/')
        .then(res => {
          if (res.data.status === 'ok') {
            const departments = res.data.items;
            departments.push('другое')
            commit('setDepartments', departments)
          }

        })
    },
    fetchRanks({commit}) {
      axios
        .get('/api/ranks/')
        .then(res => {
          if (res.data.status === 'ok') {
            const ranks = res.data.items;
            ranks.push('\u2014')
            commit('setRanks', ranks);
          }

        })
    },
    fetchDegrees({commit}) {
      axios
        .get('/api/degrees/')
        .then(res => {
          if (res.data.status === 'ok') {
            const degrees = res.data.items;
            degrees.push('\u2014')
            commit('setDegrees', degrees);
          }

        })
    },
    fetchCities({commit}) {
      axios
        .get('/api/location/city/1/')
        .then(res => {
          if (res.data.status === 'ok') {
            commit('setRussiaCities', res.data.city);
          }
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
          }
          return res.data.status;
        })
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
