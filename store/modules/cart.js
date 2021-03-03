const state = () => {
    return {
        cart: [],
    }
}

const mutations = {
    ADD_CART_ITEM (state, item) {
        let itemInCart = state.cart.find((cartItem) => {
            return cartItem.id === item.id
        })
        itemInCart
            ? itemInCart.count += 1
            : state.cart = [{
                id: item.id,
                count: 1,
                obj: item
            }, ...state.cart]

        localStorage.setItem('cart', JSON.stringify(state.cart))
    },
    REMOVE_CART_ITEM(state, id) {
        let itemIndex
        state.cart.forEach((cartItem, index) => {
            if (cartItem.id === id) itemIndex = index
        })
        state.cart = [...state.cart.slice(0, itemIndex), ...state.cart.slice(itemIndex + 1)]

        localStorage.setItem('cart', JSON.stringify(state.cart))
    },
    SET_CART_ITEMS (state, goods) {
        state.cart = [...goods]

        localStorage.setItem('cart', JSON.stringify(state.cart))
    },
    CLEAR_CART (state) {
        state.cart = []
        localStorage.removeItem('cart')
    }
}

const actions = {

    addToCart ({ commit }, item) {
        commit('ADD_CART_ITEM', item)
    },

    removeFromCart({ commit }, id) {
        commit('REMOVE_CART_ITEM', id)
    },

    setCartGoods ({ commit }, goods) {
        commit('SET_CART_ITEMS', goods)
    },

    clearCart ({ commit }) {
        commit('CLEAR_CART')
    },
}

const getters = {

    cartQuantity: state => {
        return state.cart.reduce((sum, item) => {
            return sum + item.count
        }, 0)
    },
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}
