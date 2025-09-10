import axiosClient from "../axios.js";

export function login({commit},data){
    return axiosClient.post('/login',data)
        .then(({data})=>{
            commit('setUser',data.user);
            commit('setToken',data.token);
            return data;
        });
}

export function logout({commit}){
    return axiosClient.post('/logout')
        .then((response)=>{
            commit('setToken',null);
            return response;
        });
}

export function getUser({commit}){
    return axiosClient.get('/user')
        .then(({data})=>{
            commit('setUser',data);
            return data;
        });
}

export function getProducts({commit},{url}){
    commit('setProducts',[true]);
    url = url || '/product';
    return axiosClient.get(url)
        .then(res=>{
            console.log(res);
            commit('setProducts',[false,res.data]);
        })
        .catch(()=>{
            commit('setProducts',[false]);
        });
}

