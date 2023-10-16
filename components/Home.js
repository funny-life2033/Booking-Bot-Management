import { useState } from "react";
import {
  Button,
  TextInput,
  Card,
  HelperText,
  ActivityIndicator,
} from "react-native-paper";
import { SafeAreaView, StyleSheet } from "react-native";

const Home = ({ connect, setErrMsg, errMsg, isLoading }) => {
  const [deviceId, setDeviceId] = useState("");

  const hasErrors = () => {
    return errMsg;
  };

  const deviceIdChange = (text) => {
    setErrMsg(null);
    setDeviceId(text);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Card>
        <Card.Cover
          style={styles.cover}
          source={require("../assets/home-back.png")}
        />
        <Card.Content style={styles.content}>
          <TextInput
            theme={{ colors: { primary: errMsg ? "red" : "green" } }}
            style={styles.input}
            value={deviceId}
            label="Device Id"
            onChangeText={deviceIdChange}
            mode="outlined"
            disabled={isLoading}
          />
          <HelperText type="error" visible={hasErrors()}>
            {errMsg}
          </HelperText>
          <Button
            theme={{ colors: { primary: "green" } }}
            mode="contained"
            disabled={isLoading}
            icon={
              isLoading
                ? () => (
                    <ActivityIndicator
                      size={17}
                      animating={true}
                      color="gray"
                    />
                  )
                : "connection"
            }
            onPressOut={() => connect(deviceId)}
          >
            {isLoading ? "Connecting" : "Connect the Device"}
          </Button>
        </Card.Content>
      </Card>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    height: "100%",
    width: "100%",
    justifyContent: "center",
  },
  input: {},
  content: {
    justifyContent: "center",
  },
  cover: {
    padding: 10,
    backgroundColor: "rgba(0,0,0,0)",
  },
});

export default Home;
