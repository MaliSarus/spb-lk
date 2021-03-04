import Vue from 'vue'
import Vuex from 'vuex'
import axios from "axios";

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
        setCountries(state, payload){
          state.countries = payload
        },
        setDepartments(state, payload){
            state.departments = payload
        },
        setRanks(state, payload){
            state.ranks = payload
        },
        setDegrees(state, payload){
            state.degrees = payload
        },
        setRussiaCities(state, payload){
            state.russiaCities = payload
        }

    },
    actions: {
        fetchCountries({commit}) {
            axios
                .get('/api/location/country/')
                .then(res => {
                    commit('setCountries',res.data.country)
                })
        },
        fetchDepartments({commit}) {
            axios
                .get('/api/user/specializations/')
                .then(res => {
                    console.log(res)
                    commit('setDepartments',res.data.items)
                })
        },
        fetchRanks({commit}) {
            axios
                .get('/api/user/ranks/')
                .then(res => {
                    console.log(res)
                    commit('setRanks',res.data.items)
                })
        },
        fetchDegrees({commit}) {
            axios
                .get('/api/user/degrees/')
                .then(res => {
                    console.log(res)
                    commit('setDegrees',res.data.items)
                })
        },
        fetchCities({commit}){
            axios
                .get('/api/location/city/109/')
                .then(res => {
                    commit('setRussiaCities',res.data.city)
                })
        }

    },
    getters: {
        user(state) {
            return state.user
        },
        countries(state){
            return state.countries
        },
        departments(state){
            return state.departments
        },
        ranks(state){
            return state.ranks
        },
        degrees(state){
            return state.degrees
        },
        russiaCities(state){
            return state.russiaCities
        },
    }
})
