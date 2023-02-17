import { createApp } from 'vue'
import App from './App.vue'
import VueJsIdle from "@/components/VueJsIdle";

const app= createApp(App)
app.use(VueJsIdle);
app.mount('#app')
