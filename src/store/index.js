import Vue from 'vue'
import Vuex from 'vuex'
import axios from "axios";
import {getWithExpiry, setWithExpiry} from "../helpers/localStorage";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: {},
    countries: [],
    departments: [],
    ranks: [],
    degrees: [],
    russiaCities: [],
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
          }
        )
    },
    fetchUser({commit}){
      const user = getWithExpiry('user');
      if (user){
        commit('setUser', user);
      }
      else{
        commit('setUser', []);
      }
    },
    fetchCountries({commit}) {
      axios
        .get('/api/location/country/')
        .then(res => {
          commit('setCountries', res.data.country)
        })
    },
    fetchDepartments({commit}) {
      axios
        .get('/api/user/specializations/')
        .then(res => {
          console.log(res)
          commit('setDepartments', res.data.items)
        })
    },
    fetchRanks({commit}) {
      axios
        .get('/api/user/ranks/')
        .then(res => {
          console.log(res)
          commit('setRanks', res.data.items)
        })
    },
    fetchDegrees({commit}) {
      axios
        .get('/api/user/degrees/')
        .then(res => {
          console.log(res)
          commit('setDegrees', res.data.items)
        })
    },
    fetchCities({commit}) {
      axios
        .get('/api/location/city/1/')
        .then(res => {
          commit('setRussiaCities', res.data.city)
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
  }
})
