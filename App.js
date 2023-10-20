import { useEffect, useRef, useState } from "react";
import { AppRegistry, SafeAreaView, StyleSheet } from "react-native";
import Home from "./components/Home";
import Slots from "./components/Slots";
import { PaperProvider } from "react-native-paper";
import { Provider } from "react-redux";
import { store } from "./store";
import Bots from "./components/Bots";

export default function App() {
  const [page, setPage] = useState("home");

  return (
    <Provider store={store}>
      <PaperProvider>
        {/* <SafeAreaView style={styles.container}> */}
        {page === "home" ? <Home gotoBotsPage={() => setPage("bots")} /> : ""}
        {page === "bots" ? (
          <Bots
            gotoLoginPage={() => setPage("home")}
            gotoSlotsPage={() => setPage("slots")}
          />
        ) : (
          ""
        )}
        {page === "slots" ? (
          <Slots
            gotoBotsPage={() => setPage("bots")}
            gotoLoginPage={() => setPage("home")}
          />
        ) : (
          ""
        )}
        {/* </SafeAreaView> */}
      </PaperProvider>
    </Provider>
  );
}

AppRegistry.registerComponent("Booking-Bot-Management", () => App);
