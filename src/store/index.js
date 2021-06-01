import Vue from 'vue'
import Vuex from 'vuex'
import axios from "axios";
import {setWithoutExpiry, getWithoutExpiry} from "../helpers/localStorage";
import i18n from "../locales";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: {},
    countries: [],
    departments: [],
    ranks: [],
    degrees: [],
    russiaCities: [],
    payedOrder: [],
    userCart: [],
    userBasket: [],
    products: [],
    workshops:[],
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
        // setWithoutExpiry('lsUser', payload)
      state.user = payload;
    },
    setPayedOrders(state, payload) {
      state.payedOrder = payload
    },
    setProducts(state, payload) {
      state.products = payload
    },
    addProduct(state, payload) {
      state.userCart.push(payload)
    },
    deleteProduct(state, payload) {
      state.userCart = state.userCart.filter(product => +product.id !== payload)
    },
    deleteAllSingleProducts(state) {
      state.userCart = state.userCart.filter(product => product.type !== 'single')
    },
    deleteAllDates(state){
      state.userCart = state.userCart.filter(product => !(product.type === 'single' || product.type === 'all'))
    },
    deleteAllProducts(state) {
      state.userCart = [];
    },
    setUserBasket(state, payload) {
      state.userBasket = payload
    },
    setWorkshops(state,payload){
      state.workshops = payload
    },
    clearUser(state){
      localStorage.removeItem('lsUser');
      state.user = {};
      state.userBasket = [];
      state.userForm = [];
      localStorage.removeItem('orders');
      state.payedOrder =[];
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

            const user = res.data.user;
            if (res.data.status === 'ok') {
              commit('setUser', user);
            }
            return res;
          }
        )
    },
    fetchUser({commit}) {
      const lsUser = getWithoutExpiry('lsUser')
      if (lsUser){
        commit('setUser', lsUser);
        return Promise.resolve(lsUser)
      }
      return axios
        .get('/api/user/')
        .then(res => {
          console.log(res)
          if (res.data.auth) {
            const user = res.data.user;
            commit('setUser', user)
            return user
          } else {
            commit('clearUser')
            return false
          }
        })
    },
    fetchCountries({commit}) {
      const lsCountries = getWithoutExpiry('countries')
      if (lsCountries){
        return commit('setCountries', lsCountries);
      }
      axios
        .get('/api/location/country/')
        .then(res => {
          if (res.data.status === 'ok') {
            commit('setCountries', res.data.country);
            setWithoutExpiry('countries', res.data.country)
          }
        })
    },
    fetchDepartments({commit}) {
      const lsDepartments = getWithoutExpiry('departments')
      if (lsDepartments){
        return commit('setDepartments', lsDepartments);
      }
      axios
        .get('/api/specializations/')
        .then(res => {
          if (res.data.status === 'ok') {
            const departments = res.data.items;
            departments.push(i18n.t('message.departments.other'))
            commit('setDepartments', departments)
            setWithoutExpiry('departments', departments)
          }

        })
    },
    fetchRanks({commit}) {
      const lsRanks = getWithoutExpiry('ranks')
      if (lsRanks){
        return commit('setRanks', lsRanks);
      }
      axios
        .get('/api/ranks/')
        .then(res => {
          if (res.data.status === 'ok') {
            const ranks = res.data.items;
            ranks.push('\u2014')
            commit('setRanks', ranks);
            setWithoutExpiry('ranks', ranks)
          }

        })
    },
    fetchDegrees({commit}) {
      const lsDegrees = getWithoutExpiry('degrees')
      if (lsDegrees){
        return commit('setDegrees', lsDegrees);
      }
      axios
        .get('/api/degrees/')
        .then(res => {
          if (res.data.status === 'ok') {
            const degrees = res.data.items;
            degrees.push('\u2014')
            commit('setDegrees', degrees);
            setWithoutExpiry('degrees', degrees)
          }

        })
    },
    fetchCities({commit}) {
      const lsCities = getWithoutExpiry('cities')
      if (lsCities){
        return commit('setRussiaCities', lsCities);
      }
      axios
        .get('/api/location/city/1/')
        .then(res => {
          if (res.data.status === 'ok') {
            commit('setRussiaCities', res.data.city);
            setWithoutExpiry('cities', res.data.city)
          }
        })
    },
    fetchPayedOrders({commit}) {
      const lsOrders = getWithoutExpiry('orders')
      if (lsOrders){
        commit('setPayedOrders', lsOrders);
        return Promise.resolve(true)
      }
      return axios
        .get('/api/user/orders/')
        .then(res => {
          if (res.data.status === 'ok') {
            commit('setPayedOrders', res.data.orders);
            // setWithoutExpiry('orders', res.data.orders)
            return true
          } else {
            return false
          }
        })
    },
    fetchProducts({commit}) {
      return axios
        .get('/api/catalog/items/')
        .then(res => {
          console.log(res)
          if (res.data.status === 'ok') {
            commit('setProducts', res.data.sections)
          }
          return res.data.status;
        })
    },
    fetchWorkshops({commit}){
      return axios
        .get('/api/catalog/workshops/')
        .then(res => {
          console.log(res)
          if (res.data.status === "ok" || res.data.status === 'done') {
            const workshops = res.data.items ? res.data.items : []
            commit('setWorkshops', workshops)
          }
        })
    },
    logout({commit}){
      commit('clearUser');
      return axios
        .post('/?logout=yes');
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
    payedOrders(state) {
      return state.payedOrder
    },
    userCart(state) {
      return state.userCart
    },
    products(state) {
      return state.products
    },
    workshops(state){
      return state.workshops
    },
    userBasket(state) {
      return state.userBasket
    }
  }
})
