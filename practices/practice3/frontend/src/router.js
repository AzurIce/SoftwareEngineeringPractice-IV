import { createMemoryHistory, createRouter } from 'vue-router'

import UserList from './pages/UserList.vue'
import UpdateUser from './pages/UpdateUser.vue'
import CreateUser from "./pages/CreateUser.vue";
import Login from "./pages/Login.vue";

const routes = [
    { path: '/', component: UserList },
    { path: '/update/:id', component: UpdateUser },
    { path: '/create', component: CreateUser },
    { path: '/login', component: Login },
]

const router = createRouter({
    history: createMemoryHistory(),
    routes,
})

export default router;