<script setup>
import {onMounted, ref, watch} from "vue";
import axios from 'axios';
import router from "../router.js";
import {useRoute} from "vue-router";

const users = ref([])

async function updateUser() {
  const res = await axios.get("http://127.0.0.1:8080/practice3/user");
  users.value = res.data
}

const route = useRoute()

watch(() => route, updateUser)

onMounted(() => {
  updateUser()
})

async function onDelete(id) {
  const res = await axios.delete(`http://127.0.0.1:8080/practice3/user/${id}`)
  console.log(res)
  await updateUser()
}

const page = ref('list')


</script>

<template>

  <button class="btn btn-primary form-control" style="height:50px" @click="() => {$router.push(`create`)}">
    添加用户
  </button>

  <table class="table table-striped table-bordered table-hover text-center">
    <thead>
    <tr style="text-align:center">
      <th>Id</th>
      <th>Username</th>
      <th>Password</th>
      <th>操作</th>
    </tr>
    </thead>
    <tbody>
    <tr v-for="user in users">
      <td>{{ user.id }}</td>
      <td>{{ user.username }}</td>
      <td>{{ user.password }}</td>
      <td>
        <a class="btn btn-primary" @click="() => {$router.push(`/update/${user.id}`)}">
          更改
        </a>
        <a class="btn btn-danger" @click="onDelete(user.id)">
          删除
        </a>
      </td>
    </tr>
    </tbody>
  </table>
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
