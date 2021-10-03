import { createStore } from 'vuex';

export default createStore({
    state: {
        repositories:[],
        organisation:[],

    },
    mutations: {
        setRepositories:(state,payload)=>{
            state.repositories=payload
        },
        setOrganisation:(state,payload)=>{
            state.organisation=payload
        },
    },
    getters:{
        Repositories:(state)=>{
            return state.repositories
        },
        Organisation:(state)=>{
            return state.organisation
        },
    },
});
