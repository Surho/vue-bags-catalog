import api from '../services/axios'
import cart from './modules/cart'

export const state = () => {
    return {
        baseUrl: 'https://frontend-test.idaproject.com',
        goods: [],
        categories: [],
        loadedCategories: [],
    }
}

export const modules = {
    cart
}

export const mutations = {
    SET_CATEGOREIS(state, categories) {
        state.categories = categories
    },
    SET_GOODS(state, goods) {
        state.goods = [...state.goods, ...goods]
    },
    SET_LOADED_CATEGORIES(state, categoryId) {
        state.loadedCategories.push(+categoryId)
    },
}

export const actions = {

    async fetchCategories ({ commit }) {
        try {
            let { data } = await api.get('product-category')
            commit('SET_CATEGOREIS', data)
        } catch (e) {
            console.log(`Error while fetching categories: ${e}`)
        }
    },

    async fetchGoods({ commit, state }, categoryId) {
        try {
            if(state.loadedCategories.indexOf(categoryId) !== -1) return
            let { data } = await api.get(`product?category=${categoryId}`)
            commit('SET_GOODS', data)
            commit('SET_LOADED_CATEGORIES', categoryId)
        }
        catch (e) {
            console.log(`Error while fetching goods: ${e}`)
        }
    },

    async nuxtServerInit({ dispatch }) {
        await dispatch('fetchCategories')
    }
}

export const getters = {
    firstCategoryId: state => {
        return (state.categories[0]) ? state.categories[0].id : null
    },
    goodsByCategory: state => category => {
        return state.goods.filter(item => item.category === category)
    },
}

