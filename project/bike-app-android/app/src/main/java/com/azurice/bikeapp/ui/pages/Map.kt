package com.azurice.bikeapp.ui.pages

import android.Manifest
import android.bluetooth.BluetoothAdapter
import android.bluetooth.BluetoothDevice
import android.util.Log
import androidx.compose.animation.core.animateFloatAsState
import androidx.compose.animation.core.tween
import androidx.compose.foundation.background
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.Button
import androidx.compose.material3.Card
import androidx.compose.material3.CardElevation
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.LaunchedEffect
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateListOf
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.alpha
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.res.painterResource
import androidx.compose.ui.tooling.preview.Preview
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import androidx.core.content.ContextCompat
import androidx.core.content.res.ResourcesCompat
import androidx.core.graphics.drawable.toBitmap
import com.azurice.bikeapp.R
import com.azurice.bikeapp.ui.theme.BikeAppTheme
import com.google.accompanist.permissions.ExperimentalPermissionsApi
import com.google.accompanist.permissions.MultiplePermissionsState
import com.google.accompanist.permissions.rememberMultiplePermissionsState
import com.mapbox.geojson.Point
import com.mapbox.maps.MapboxExperimental
import com.mapbox.maps.extension.compose.MapEffect
import com.mapbox.maps.extension.compose.MapboxMap
import com.mapbox.maps.extension.compose.animation.viewport.MapViewportState
import com.mapbox.maps.extension.compose.annotation.generated.PointAnnotation
import com.mapbox.maps.extension.compose.style.layers.generated.CircleLayer
import com.mapbox.maps.extension.compose.style.sources.SourceState
import com.mapbox.maps.extension.style.layers.addLayer
import com.mapbox.maps.extension.style.layers.generated.lineLayer
import com.mapbox.maps.extension.style.sources.addSource
import com.mapbox.maps.extension.style.sources.generated.geoJsonSource
import com.mapbox.maps.plugin.PuckBearing
import com.mapbox.maps.plugin.annotation.AnnotationConfig
import com.mapbox.maps.plugin.annotation.AnnotationType
import com.mapbox.maps.plugin.annotation.annotations
import com.mapbox.maps.plugin.annotation.generated.PointAnnotationOptions
import com.mapbox.maps.plugin.locationcomponent.createDefault2DPuck
import com.mapbox.maps.plugin.locationcomponent.location
import io.ktor.client.HttpClient
import io.ktor.client.call.body
import io.ktor.client.plugins.ClientRequestException
import io.ktor.client.plugins.contentnegotiation.ContentNegotiation
import io.ktor.client.request.request
import io.ktor.client.request.setBody
import io.ktor.client.statement.HttpResponse
import io.ktor.http.ContentType
import io.ktor.http.HttpMethod
import io.ktor.http.contentType
import io.ktor.serialization.kotlinx.json.json
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.withContext
import kotlinx.serialization.Serializable
import kotlinx.serialization.json.Json

@Serializable
data class Map(val jwt: String, val bluetoothDevices: List<String>)

@Serializable
data class Bike (val uid: Int, val lng: Double, val lat: Double)

@Serializable
data class BikesResponse(val data: List<Bike>)

suspend fun fetchBikes(jwt: String): HttpResponse {
    val client = HttpClient() {
        expectSuccess = true
        install(ContentNegotiation) {
            json(Json {
                ignoreUnknownKeys = true
            })
        }
    }

    return client.use { client ->
        client.request("http://123.113.109.105:9999/bike/api/v1/bikes") {
            method = HttpMethod.Get
            contentType(ContentType.Application.Json)
            headers["Authorization"] = "Bearer $jwt"
        }
    }
}


@OptIn(MapboxExperimental::class, ExperimentalPermissionsApi::class)
@Composable
fun Map(map: Map) {
    @OptIn(ExperimentalPermissionsApi::class)


    var bikes by remember { mutableStateOf<List<Bike>>(emptyList()) }
    var isPanelExpanded by remember { mutableStateOf(false) }

    LaunchedEffect(true) {
        try {
            val res = fetchBikes(map.jwt)
            val data = res.body<BikesResponse>()
            Log.i("NET", data.toString())
            bikes = data.data
        } catch (e: ClientRequestException) {
            Log.i("NET", "login failed: $e")
        }
    }

        Box(Modifier.fillMaxSize()) {
            MapboxMap(
                Modifier.fillMaxSize(),
                mapViewportState = MapViewportState().apply {
                    setCameraOptions {
                        zoom(14.0)
                        center(Point.fromLngLat(116.3358, 39.9522))
                        pitch(0.0)
                        bearing(0.0)
                    }
                },
            ) {
                MapEffect(Unit) {
                    it.location.apply {
                        enabled = true
                        locationPuck = createDefault2DPuck(withBearing = true)
                        puckBearingEnabled = true
                        puckBearing = PuckBearing.HEADING
                    }
                }
                val ctx = LocalContext.current
                val drawable = ResourcesCompat.getDrawable(ctx.resources, R.drawable.ic_pointer, null)
                val bitmap = drawable!!.toBitmap(drawable.intrinsicWidth, drawable.intrinsicHeight)
                for (bike in bikes) {
                    PointAnnotation(iconImageBitmap = bitmap, iconSize = 0.9, point = Point.fromLngLat(bike.lng, bike.lat))
                }
            }
            Box(
                Modifier
                    .height(80.dp)
                    .clip(RoundedCornerShape(topStart = 20.dp, topEnd = 20.dp))
                    .background(Color.White)
                    .align(Alignment.BottomCenter)
            ) {
                Button(
                    onClick = { isPanelExpanded = true },
                    modifier = Modifier
                        .align(Alignment.Center)
                        .height(70.dp)
                        .padding(10.dp)
                        .fillMaxWidth()
                ) {
                    Text(text = "解锁单车")
                }
            }
            if (isPanelExpanded) {
                Box(
                    modifier = Modifier
                        .fillMaxSize()
                        .background(Color(0x80000000))
                        .clickable { isPanelExpanded = false }
                ) {
                    PanelContent(bluetoothDevices = map.bluetoothDevices, modifier = Modifier.align(Alignment.BottomCenter))
                }
            }
        }
}

@Composable
fun PanelContent(bluetoothDevices: List<String>, modifier: Modifier = Modifier) {
    Card(
        modifier = modifier
            .fillMaxWidth()
            .height(300.dp),
    ) {
        LazyColumn {
            items(bluetoothDevices) { item ->
                Text(
                    text = "Bluetooth Device $item",
                    fontSize = 20.sp,
                    modifier = Modifier.padding(16.dp)
                )
            }
        }
    }
}

@Preview
@Composable
fun MapPreview() {
    BikeAppTheme {
        Map("", emptyList())
    }
}
