export const UserModule = {
    namespaced: true,

    state: {
        user: null
    },

    // Functions that affect the STATE
    mutations: {
        SET_USER(state, user) {
            state.user = user
        }
    },

// Actions are functions that you call throughout your app that call mutations
    actions: {
        setUser({ commit }, user) {
            commit('SET_USER', user)
        }
    },

}