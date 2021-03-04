import Vue from 'vue'
import Vuex from 'vuex'
import axios from "axios";

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        user: {},
        countries: [],
    },
    mutations: {
        setCountries(state, payload){
          state.countries = payload
        }
    },
    actions: {
        fetchCountries({commit}) {
            axios
                .get('/api/location/country/')
                .then(res => {
                    commit('setCountries',res.data.country)
                })
        }
    },
    getters: {
        user(state) {
            return state.user
        },
        countries(state){
            return state.countries

        }
    }
})
