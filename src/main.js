import { createApp } from 'vue'
import App from './App.vue'
import router from './router/router';
import { createPinia } from 'pinia';
import { registerPlugins } from '@/plugins'
import { validationSchema } from './validate/validate';

const app = createApp(App)
const pinia = createPinia();

app.config.globalProperties.validationSchema = validationSchema;

app.use(pinia)
app.use(router)
registerPlugins(app)
app.mount('#app')
