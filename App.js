import { useEffect, useRef, useState } from "react";
import { AppRegistry, SafeAreaView, StyleSheet } from "react-native";
import Home from "./components/Home";
import Slots from "./components/Slots";
import { PaperProvider } from "react-native-paper";

export default function App() {
  const [page, setPage] = useState("home");
  const [errMsg, setErrMsg] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  var ws = useRef(
    new WebSocket("ws://booking-bot-management-websocket-server.onrender.com/")
  ).current;

  useEffect(() => {
    ws.onopen = () => {
      console.log("Connected to the server");
    };
    ws.onclose = (e) => {
      console.log("Disconnected. Check internet or server.");
      setPage("home");
    };
    ws.onerror = (e) => {
      console.log(e.message);
      setPage("home");
    };
    ws.onmessage = (e) => {
      const { data } = e;
      const dataArr = data.split("--");
      if (dataArr[0] === "success") {
        setIsLoading(false);
        setPage("slots");
      } else if (dataArr[0] === "failed") {
        setIsLoading(false);
        setErrMsg(dataArr[1]);
      } else if (dataArr[0] === "disconnect") {
        setPage("home");
      }
    };
  }, []);

  const connect = (deviceId) => {
    if (deviceId === "") {
      setErrMsg("Please enter your device id");
      return;
    }

    setIsLoading(true);
    ws.send(`app--${deviceId}`);
  };

  return (
    <PaperProvider>
      <SafeAreaView style={styles.container}>
        {page === "home" ? (
          <Home
            connect={connect}
            errMsg={errMsg}
            setErrMsg={setErrMsg}
            isLoading={isLoading}
            setIsLoading={setIsLoading}
          />
        ) : null}
        {page === "slots" ? <Slots /> : null}
      </SafeAreaView>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 50,
    paddingHorizontal: 10,
  },
});

AppRegistry.registerComponent("Booking-Bot-Management", () => App);
