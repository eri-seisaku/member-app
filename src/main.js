import { createApp } from 'vue';
import App from '@/App.vue';
import router from '@/router/router';
import { registerPlugins } from '@/plugins';
import { validationSchema } from '@/validate/validate';
import JsonCSV from 'vue-json-csv';

// import { createPinia } from 'pinia';
// const pinia = createPinia();

const app = createApp(App)

app.config.globalProperties.validationSchema = validationSchema;

// app.use(pinia)
app.use(router);
app.component('downloadCsv', JsonCSV)

registerPlugins(app)
app.mount('#app')
