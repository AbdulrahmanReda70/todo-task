import { createRouter, createWebHistory } from "vue-router";
import Search from "./pages/todo/Search.vue";
import Tasks from "./pages/todo/Tasks.vue";
import TasksPending from "./pages/todo/TasksPending.vue";
import TasksInProgress from "./pages/todo/TasksInProgress.vue";
import TasksCompleted from "./pages/todo/TasksCompleted.vue";
import TasksCreate from "./pages/todo/TasksCreate.vue";
import TasksEdit from "./pages/todo/TasksEdit.vue";
import TaskDetail from "./pages/todo/TaskDetail.vue";
import Login from "./pages/auth/Login.vue";
import Register from "./pages/auth/Register.vue";

function authGuard(to, from, next) {
    console.log("hello from auth guard");

    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user"));

    if (token && user) {
        next();
    } else {
        next("/login");
    }
}

function guestGuard(to, from, next) {
    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user"));

    if (token && user) {
        next("/tasks");
    } else {
        next();
    }
}

const routes = [
    { path: "/", redirect: "/tasks" },
    { path: "/login", component: Login, beforeEnter: guestGuard },
    { path: "/register", component: Register, beforeEnter: guestGuard },
    { path: "/search", component: Search, beforeEnter: authGuard },
    { path: "/tasks", component: Tasks, beforeEnter: authGuard },
    { path: "/tasks/pending", component: TasksPending, beforeEnter: authGuard },
    {
        path: "/tasks/in-progress",
        component: TasksInProgress,
        beforeEnter: authGuard,
    },
    {
        path: "/tasks/completed",
        component: TasksCompleted,
        beforeEnter: authGuard,
    },
    { path: "/tasks/create", component: TasksCreate, beforeEnter: authGuard },
    { path: "/tasks/:id", component: TaskDetail, beforeEnter: authGuard },
    { path: "/tasks/:id/edit", component: TasksEdit, beforeEnter: authGuard },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
