import { createApp } from 'vue'
import './index.css'
import store from "./store";
import App from './App.vue'



createApp(App)
    .use(store)
    .mount('#app')
