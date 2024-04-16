<script setup>

import {ref} from "vue";
import axios from "axios";
import router from "../router.js";

const username = ref("")
const password = ref("")

async function onSubmit() {
  const res = await axios.post("http://127.0.0.1:8080/practice3/user",
      {username: username.value, password: password.value})
  console.log(res)
  router.push("/")
}
</script>

<template>

  <div style="width:800px;height:100%;margin-left:270px;">
    <div>
      用户名：
      <input class="form-control" type="text" v-model="username" name="username"><br>
      密 码：
      <input class="form-control" type="text" v-model="password" name="password"><br>
      <button class="btn btn-primary btn-lg btn-block" @click="onSubmit">保存</button>
    </div>
  </div>
</template>

<style scoped>

</style>