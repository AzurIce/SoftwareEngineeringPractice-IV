import { createMemoryHistory, createRouter } from 'vue-router'

import UserList from './pages/UserList.vue'
import UpdateUser from './pages/UpdateUser.vue'
import CreateUser from "./pages/CreateUser.vue";

const routes = [
    { path: '/', component: UserList },
    { path: '/update/:id', component: UpdateUser },
    { path: '/create', component: CreateUser },
]

const router = createRouter({
    history: createMemoryHistory(),
    routes,
})

export default router;