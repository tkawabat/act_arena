package host.exp.exponent;

import com.facebook.react.ReactPackage;

import org.unimodules.core.interfaces.Package;

import java.util.Arrays;
import java.util.List;

import expo.loaders.provider.interfaces.AppLoaderPackagesProviderInterface;
import host.exp.exponent.generated.BasePackageList;
import okhttp3.OkHttpClient;

// Needed for `react-native link`
// import com.facebook.react.ReactApplication;
import io.sentry.RNSentryPackage;
import io.invertase.firebase.messaging.ReactNativeFirebaseMessagingPackage;
import io.invertase.firebase.database.ReactNativeFirebaseDatabasePackage;
import io.invertase.firebase.auth.ReactNativeFirebaseAuthPackage;
import io.invertase.firebase.firestore.ReactNativeFirebaseFirestorePackage;
import com.ocetnik.timer.BackgroundTimerPackage;
import com.apsl.versionnumber.RNVersionNumberPackage;
import io.invertase.firebase.app.ReactNativeFirebaseAppPackage;
import jp.micin.react.skyway.SkyWayPackage;
import com.reactnativecommunity.rnpermissions.RNPermissionsPackage;

public class MainApplication extends ExpoApplication implements AppLoaderPackagesProviderInterface<ReactPackage> {

  @Override
  public boolean isDebug() {
    return BuildConfig.DEBUG;
  }

  // Needed for `react-native link`
  public List<ReactPackage> getPackages() {
    return Arrays.<ReactPackage>asList(
        // Add your own packages here!
        // TODO: add native modules!

        // Needed for `react-native link`
        // new MainReactPackage(),
            new RNSentryPackage(),
            new ReactNativeFirebaseMessagingPackage(),
            new ReactNativeFirebaseDatabasePackage(),
            new ReactNativeFirebaseAuthPackage(),
            new ReactNativeFirebaseFirestorePackage(),
            new BackgroundTimerPackage(),
            new RNVersionNumberPackage(),
            new ReactNativeFirebaseAppPackage(),
            new RNPermissionsPackage(),
            new SkyWayPackage()
    );
  }

  public List<Package> getExpoPackages() {
    return new BasePackageList().getPackageList();
  }

  @Override
  public String gcmSenderId() {
    return getString(R.string.gcm_defaultSenderId);
  }

  public static OkHttpClient.Builder okHttpClientBuilder(OkHttpClient.Builder builder) {
    // Customize/override OkHttp client here
    return builder;
  }
}
