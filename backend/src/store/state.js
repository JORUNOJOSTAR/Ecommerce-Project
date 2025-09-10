const state = {
    user: {
        token: sessionStorage.getItem('TOKEN'),
        data: {}
    },
    products: {
        loading: false,
        from: null,
        to: null,
        data: [],
        links: [],
        page: 1,
        limit: null,
        total: null,
    }
};
export default state;
