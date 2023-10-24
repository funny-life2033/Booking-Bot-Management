import { AppRegistry } from "react-native";
import { PaperProvider } from "react-native-paper";
import { Provider } from "react-redux";
import { store } from "./store";
import { AlertNotificationRoot } from "react-native-alert-notification";
import Start from "./components/Start";

export default function App() {
  return (
    <Provider store={store}>
      <PaperProvider>
        <AlertNotificationRoot>
          {/* <SafeAreaView style={styles.container}> */}
          <Start />
          {/* </SafeAreaView> */}
        </AlertNotificationRoot>
      </PaperProvider>
    </Provider>
  );
}

AppRegistry.registerComponent("Booking-Bot-Management", () => App);
