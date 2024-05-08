<script setup>

import {onMounted, ref} from "vue";
import axios from "axios";
import {useRoute} from "vue-router";
import router from "../router.js";

const route = useRoute()
const user = ref({})

onMounted(() => {
})

async function onSubmit() {
  console.log(user.value)
  try {
    const res = await axios.post(`http://10.53.254.167:9090/login`, user.value)
  } catch (e) {
    alert("用户名或密码错误")
  }
  // console.log(res)
  localStorage.setItem("loggedIn", "1")
  await router.push("/")
}

</script>

<template>
  <div style="width:800px;height:100%;margin-left:270px;">
    <div>
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