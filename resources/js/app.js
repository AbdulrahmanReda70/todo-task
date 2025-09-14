import { createApp } from "vue";
import App from "@/App.vue"; // resources/js/App.vue
import router from "./router";

// Import Tailwind CSS
import "../css/app.css";

createApp(App).use(router).mount("#app");
