import { createApp } from 'vue';
import { createPinia } from 'pinia';
import ElementPlus from 'element-plus';
import 'element-plus/theme-chalk/dark/css-vars.css';
import 'element-plus/dist/index.css';
import '@renderer/assets/scss/_base.scss';
import 'normalize.css';
import router from './router';
import App from './App.vue';
import ru from 'element-plus/es/locale/lang/ru';
import 'dayjs/locale/ru';
import dayjs from 'dayjs';

const app = createApp(App);

app.use(createPinia());
app.use(ElementPlus);
app.use(router);

app.use(ElementPlus, {
  locale: ru,
});

dayjs.locale('ru');

app.mount('#app');
