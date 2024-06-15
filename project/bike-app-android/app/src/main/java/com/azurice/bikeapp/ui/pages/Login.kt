package com.azurice.bikeapp.ui.pages

import androidx.compose.foundation.layout.Column
import androidx.compose.material3.Button
import androidx.compose.material3.Text
import androidx.compose.material3.TextField
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import kotlinx.serialization.Serializable

@Serializable
object Login

@Composable
fun Login(onSuccess: () -> Unit) {
    var username by remember { mutableStateOf("") }
    var password by remember { mutableStateOf("") }

    Column {
        TextField(
            value = username,
            onValueChange = { username = it },
            Modifier.align(Alignment.CenterHorizontally)
        )
        TextField(
            value = password,
            onValueChange = { password = it },
            Modifier.align(Alignment.CenterHorizontally)
        )
        Button(onClick = {
            onSuccess()
        }, Modifier.align(Alignment.CenterHorizontally)) {
            Text(text = "登录")
        }
    }
}