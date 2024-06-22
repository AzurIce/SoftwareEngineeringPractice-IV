package com.azurice.bikeapp.ui.pages

import android.util.Log
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.material3.Button
import androidx.compose.material3.Text
import androidx.compose.material3.TextButton
import androidx.compose.material3.TextField
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.rememberCoroutineScope
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.text.input.PasswordVisualTransformation
import androidx.compose.ui.tooling.preview.Preview
import androidx.compose.ui.unit.dp
import kotlinx.serialization.Serializable
import retrofit2.Retrofit
import io.ktor.client.HttpClient
import io.ktor.client.call.body
import io.ktor.client.engine.okhttp.OkHttp
import io.ktor.client.plugins.ClientRequestException
import io.ktor.client.plugins.contentnegotiation.ContentNegotiation
import io.ktor.client.request.request
import io.ktor.client.request.setBody
import io.ktor.client.statement.HttpResponse
import io.ktor.client.statement.bodyAsText
import io.ktor.http.ContentType
import io.ktor.http.HttpMethod
import io.ktor.http.contentType
import io.ktor.serialization.kotlinx.json.json
import kotlinx.coroutines.launch
import kotlinx.serialization.json.Json


@Serializable
object Login

@Serializable
data class LoginParam(val username: String, val password: String)

@Serializable
data class LoginResponse(val data: LoginResponseData)

@Serializable
data class LoginResponseData(val token: String, val user: LoginResponseUser)

@Serializable
data class LoginResponseUser(val id: Int, val username: String, val signature: String, val avatar: String)

@Composable
fun Login(onSuccess: (res: LoginResponse) -> Unit) {
    var username by remember { mutableStateOf("") }
    var password by remember { mutableStateOf("") }
    var isLogin by remember { mutableStateOf(true) }
    var responseText by remember { mutableStateOf("") }
    val coroutineScope = rememberCoroutineScope()

    Column(
        modifier = Modifier
            .fillMaxSize()
            .padding(16.dp),
        verticalArrangement = Arrangement.Center
    ) {
        TextField(
            value = username,
            onValueChange = { username = it },
            label = { Text("Username") },
            modifier = Modifier.fillMaxWidth()
        )
        Spacer(modifier = Modifier.height(8.dp))
        TextField(
            value = password,
            onValueChange = { password = it },
            label = { Text("Password") },
            modifier = Modifier.fillMaxWidth(),
            visualTransformation = PasswordVisualTransformation()
        )
        Spacer(modifier = Modifier.height(16.dp))
        Button(
            onClick = {
                coroutineScope.launch {
                    if (username.isEmpty() || password.isEmpty()) {
                        responseText = "please enter username and password"
                        return@launch
                    }
                    if (isLogin) {
                        try {
                            val res = login(username, password)
                            val data = res.body<LoginResponse>()
                            responseText = data.toString()
                            Log.i("NET", "login success: $res")
                            onSuccess(data)
                        } catch (e: ClientRequestException) {
                            responseText = e.toString()
                            Log.i("NET", "login failed: $e")
                        }
                    } else {
                        try {
                            val res = register(username, password)
                            responseText = res.toString()
                            Log.i("NET", "register success: $res")
                        } catch (e: Exception) {
                            responseText = e.toString()
                            Log.i("NET", "register failed: $e")
                        }
                    }
                }
            },
            modifier = Modifier.fillMaxWidth()
        ) {
            Text(if (isLogin) "Login" else "Register")
        }
        Spacer(modifier = Modifier.height(8.dp))
        TextButton(
            onClick = { isLogin = !isLogin },
            modifier = Modifier.align(Alignment.CenterHorizontally)
        ) {
            Text(if (isLogin) "Don't have an account? Register" else "Already have an account? Login")
        }
        Spacer(modifier = Modifier.height(16.dp))
        Text(responseText)
    }
}

suspend fun login(username: String, password: String): HttpResponse {
    val client = HttpClient() {
        expectSuccess = true
        install(ContentNegotiation) {
            json(Json { ignoreUnknownKeys = true })
        }
    }

    return client.use { client ->
        client.request("http://123.113.109.105:9999/auth/api/v1/user/login") {
            method = HttpMethod.Post
            contentType(ContentType.Application.Json)
            setBody(LoginParam(username, password))
        }
    }
}

suspend fun register(username: String, password: String): HttpResponse {
    val client = HttpClient() {
        expectSuccess = true
        install(ContentNegotiation) {
            json()
        }
    }

    return client.use { client ->
        client.request("http://123.113.109.105:9999/auth/api/v1/user") {
            method = HttpMethod.Post
            contentType(ContentType.Application.Json)
            setBody(LoginParam(username, password))
        }
    }
}

@Preview(showBackground = true)
@Composable
fun DefaultPreview() {
    Login({})
}