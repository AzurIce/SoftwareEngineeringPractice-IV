<script setup>
import HelloWorld from './components/HelloWorld.vue'
import {onMounted, ref} from "vue";
import axios from 'axios';

const users = ref([])

async function updateUser() {
  const res = await axios.get("http://10.53.254.167:9090/users");
  users.value = res.data
}

onMounted(() => {
  updateUser()
})

async function onDelete(id) {
  const res = await axios.delete(`http://10.53.254.167:9090/user/${id}`)
  console.log(res)
  await updateUser()
}

const page = ref('list')


</script>

<template>
  <RouterView />
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
