export function setUser(state,user){
    state.user.data = user;
}

export function setToken(state,token){
    state.user.token = token;
    if(token) {
        sessionStorage.setItem('TOKEN',token);
    } else {
        sessionStorage.removeItem('TOKEN');
    }
}

export function setProducts(state,[loading,response]){
    

    if(response){
        state.products = {
            data : response.data,
            from : response.meta.from,
            to : response.meta.to,
            links : response.meta.links,
            total : response.meta.total,
            page : response.meta.current_page,
            limit : response.meta.per_page,
        }
    }
    state.products.loading = loading;
}
