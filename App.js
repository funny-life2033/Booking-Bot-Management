import { useState } from "react";
import { StyleSheet, View } from "react-native";
import Home from "./components/Home";

export default function App() {
  const [page, setPage] = useState("home");

  return (
    <View style={styles.container}>
      {page === "home" ? <Home /> : null}
      {page === "home" ? <Home /> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
