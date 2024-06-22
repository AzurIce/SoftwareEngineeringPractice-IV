package com.azurice.bikeapp

import android.Manifest
import android.bluetooth.BluetoothAdapter
import android.bluetooth.BluetoothDevice
import android.bluetooth.BluetoothManager
import android.content.BroadcastReceiver
import android.content.Context
import android.content.Intent
import android.content.IntentFilter
import android.content.pm.PackageManager
import android.os.Bundle
import android.util.Log
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.height
import androidx.compose.material3.Button
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Surface
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.LaunchedEffect
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateListOf
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp
import androidx.core.app.ActivityCompat
import androidx.navigation.compose.NavHost
import androidx.navigation.compose.composable
import androidx.navigation.compose.rememberNavController
import androidx.navigation.toRoute
import com.azurice.bikeapp.ui.pages.Login
import com.azurice.bikeapp.ui.theme.BikeAppTheme
import kotlinx.serialization.Serializable
import com.azurice.bikeapp.ui.pages.Map
import com.google.accompanist.permissions.ExperimentalPermissionsApi
import com.google.accompanist.permissions.MultiplePermissionsState
import com.google.accompanist.permissions.rememberMultiplePermissionsState

class MainActivity : ComponentActivity() {
    private val bluetoothAdapter: BluetoothAdapter? by lazy {
        BluetoothAdapter.getDefaultAdapter()
    }
    private val bluetoothDevices = mutableStateListOf<String>()

    private val receiver = object : BroadcastReceiver() {
        override fun onReceive(context: Context, intent: Intent) {
            when (intent.action) {
                BluetoothDevice.ACTION_FOUND -> {
                    val device: BluetoothDevice? =
                        intent.getParcelableExtra(BluetoothDevice.EXTRA_DEVICE)
                    device?.let {
                        if (ActivityCompat.checkSelfPermission(
                                this@MainActivity,
                                Manifest.permission.BLUETOOTH_CONNECT
                            ) != PackageManager.PERMISSION_GRANTED
                        ) {
                            Log.e("BLUE", "no permission")
                            // TODO: Consider calling
                            //    ActivityCompat#requestPermissions
                            // here to request the missing permissions, and then overriding
                            //   public void onRequestPermissionsResult(int requestCode, String[] permissions,
                            //                                          int[] grantResults)
                            // to handle the case where the user grants the permission. See the documentation
                            // for ActivityCompat#requestPermissions for more details.
                            return
                        }
                        bluetoothDevices.add(it.name)
                        Log.i("BLUE", "device found ${it.name}")
                    }
                }
            }
        }
    }


    @OptIn(ExperimentalPermissionsApi::class)
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        val filter = IntentFilter(BluetoothDevice.ACTION_FOUND)
        registerReceiver(receiver, filter)

        setContent {
            BikeAppTheme {
                // A surface container using the 'background' color from the theme
                Surface(
                    modifier = Modifier.fillMaxSize(),
                    color = MaterialTheme.colorScheme.background
                ) {
                    val locationPermissionsState = rememberMultiplePermissionsState(
                        listOf(
                            Manifest.permission.ACCESS_COARSE_LOCATION,
                            Manifest.permission.ACCESS_FINE_LOCATION,
                        )
                    )
                    val bluetoothPermissionsState = rememberMultiplePermissionsState(
                        listOf(
                            Manifest.permission.BLUETOOTH,
                            Manifest.permission.BLUETOOTH_ADMIN,
                            Manifest.permission.BLUETOOTH_SCAN,
                            Manifest.permission.BLUETOOTH_CONNECT,
                        )
                    )

                    if (locationPermissionsState.allPermissionsGranted && bluetoothPermissionsState.allPermissionsGranted) {
                        App(bluetoothDevices, onStartScan = { startBluetoothScan() })
                    } else {
                        permission(locationPermissionsState, bluetoothPermissionsState)
                    }
                }
            }
        }


    }

    private fun startBluetoothScan() {
        if (ActivityCompat.checkSelfPermission(
                this,
                Manifest.permission.BLUETOOTH_SCAN
            ) != PackageManager.PERMISSION_GRANTED
        ) {
            Log.e("BLUE", "no permission")
            // TODO: Consider calling
            //    ActivityCompat#requestPermissions
            // here to request the missing permissions, and then overriding
            //   public void onRequestPermissionsResult(int requestCode, String[] permissions,
            //                                          int[] grantResults)
            // to handle the case where the user grants the permission. See the documentation
            // for ActivityCompat#requestPermissions for more details.
            return
        }
        if (bluetoothAdapter?.isDiscovering == true) {
            bluetoothAdapter?.cancelDiscovery()
        }
        Log.i("BLUE", "start discovery")
        bluetoothAdapter?.startDiscovery()
    }

    override fun onDestroy() {
        super.onDestroy()
        unregisterReceiver(receiver)
    }

}

@Serializable
data class Profile(val name: String)

// Define the ProfileScreen composable.
@Composable
fun ProfileScreen(
    profile: Profile,
    onNavigateToFriendsList: () -> Unit,
) {
    Text("Profile for ${profile.name}")
    Button(onClick = { onNavigateToFriendsList() }) {
        Text("Go to Friends List")
    }
}

// Define the FriendsListScreen composable.
@Composable
fun FriendsListScreen(onNavigateToMain: () -> Unit) {
    Text("Friends List")
    Button(onClick = { onNavigateToMain() }) {
        Text("Go to Profile")
    }
}

// Define the MyApp composable, including the `NavController` and `NavHost`.
@Composable
fun App(bluetoothDevices: List<String>, onStartScan: () -> Unit) {
    val navController = rememberNavController()

    var jwt by remember { mutableStateOf("") }

    LaunchedEffect(true) {
        onStartScan()
    }

    NavHost(navController, startDestination = Login) {
//        composable<Profile> { backStackEntry ->
//            val profile: Profile = backStackEntry.toRoute()
//            ProfileScreen(
//                profile = profile,
//                onNavigateToFriendsList = {
//                    navController.navigate(route = Login)
//                }
//            )
//        }
        composable<Login> {
            Login(
                onSuccess = {
                    jwt = it.data.token
                    navController.navigate(
                        route = Map(jwt = jwt, bluetoothDevices = bluetoothDevices)
                    )
                }
            )
        }
        composable<Map> {
            val map: Map = it.toRoute()
            Map(map)
        }
    }
}


@OptIn(ExperimentalPermissionsApi::class)
@Composable
private fun permission(
    locationPermissionsState: MultiplePermissionsState,
    bluetoothPermissionsState: MultiplePermissionsState
) {
    Column {
        val allPermissionsRevoked =
            locationPermissionsState.permissions.size ==
                    locationPermissionsState.revokedPermissions.size

        val textToShow = if (!allPermissionsRevoked) {
            // If not all the permissions are revoked, it's because the user accepted the COARSE
            // location permission, but not the FINE one.
            "Yay! Thanks for letting me access your approximate location. " +
                    "But you know what would be great? If you allow me to know where you " +
                    "exactly are. Thank you!"
        } else if (locationPermissionsState.shouldShowRationale) {
            // Both location permissions have been denied
            "Getting your exact location is important for this app. " +
                    "Please grant us fine location. Thank you :D"
        } else {
            // First time the user sees this feature or the user doesn't want to be asked again
            "This feature requires location permission"
        }

        val buttonText = if (!allPermissionsRevoked) {
            "Allow precise location"
        } else {
            "Request permissions"
        }

        Text(text = textToShow)
        Spacer(modifier = Modifier.height(8.dp))
        Button(onClick = { locationPermissionsState.launchMultiplePermissionRequest() }) {
            Text(buttonText)
        }

        val ballPermissionsRevoked =
            bluetoothPermissionsState.permissions.size ==
                    bluetoothPermissionsState.revokedPermissions.size

        val btextToShow = if (!ballPermissionsRevoked) {
            "This feature requires bluetooth permissio n"
        } else {
            ""
        }

        val bbuttonText = if (!ballPermissionsRevoked) {
            "Allow bluetooth"
        } else {
            ""
        }

        Text(text = btextToShow)
        Spacer(modifier = Modifier.height(8.dp))
        Button(onClick = { bluetoothPermissionsState.launchMultiplePermissionRequest() }) {
            Text(bbuttonText)
        }
    }
}

