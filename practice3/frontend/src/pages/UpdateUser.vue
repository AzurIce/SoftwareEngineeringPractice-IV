<script setup>

import {onMounted, ref} from "vue";
import axios from "axios";
import {useRoute} from "vue-router";
import router from "../router.js";

const route = useRoute()
const user = ref({})

onMounted(async () => {
  const res = await axios.get(`http://127.0.0.1:8080/practice3/user/${route.params.id}`)
  console.log(res)
  user.value = res.data
})

async function onSubmit() {
  console.log(user.value)
  const res = await axios.put(`http://127.0.0.1:8080/practice3/user/${route.params.id}`, user.value, {

  })
  console.log(res)
  await router.push("/")
}

</script>

<template>
  <div style="width:800px;height:100%;margin-left:270px;">
    <div>
      ID：
      <input class="form-control" type="text" :value="user.id" name="id" readonly="readonly"><br>
      用户名：
      <input class="form-control" type="text" v-model="user.username" name="username"><br>
      密 码：
      <input class="form-control" type="text" v-model="user.password" name="password"><br>
      <button class="btn btn-primary btn-lg btn-block" type="submit" @click="onSubmit">提交</button>
    </div>
  </div>
</template>

<style scoped>

</style>