import { useState } from "react";
import {
  Button,
  TextInput,
  Card,
  HelperText,
  ActivityIndicator,
} from "react-native-paper";
import { SafeAreaView, StyleSheet } from "react-native";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { login } from "../store/authSlice";

const Home = (
  {
    // connect,
    // setErrMsg,
    // errMsg,
    // isLoading
  }
) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errMsg, setErrMsg] = useState(null);
  const [passwordVisible, setPasswordVisible] = useState(false);
  // const [deviceId, setDeviceId] = useState("");

  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.user.isLoading);

  const hasErrors = () => {
    return errMsg;
  };

  const loginSubmit = () => {
    if (username === "" || password === "") {
      setErrMsg("Username or password is required");
      return;
    }

    setErrMsg(null);
    dispatch(login({ username, password }));
  };

  // const deviceIdChange = (text) => {
  //   setErrMsg(null);
  //   setDeviceId(text);
  // };

  return (
    <SafeAreaView style={styles.container}>
      <Card>
        <Card.Cover
          style={styles.cover}
          source={require("../assets/home-back.png")}
        />
        <Card.Content style={styles.content}>
          {/* <TextInput
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
          </Button> */}
          <TextInput
            theme={{
              colors: { primary: errMsg ? "red" : "green", surface: "green" },
            }}
            style={styles.input}
            value={username}
            onChangeText={setUsername}
            label={"User name"}
            mode="outlined"
            disabled={isLoading}
          />
          <HelperText type="error" visible={hasErrors()}>
            {errMsg}
          </HelperText>

          <TextInput
            theme={{ colors: { primary: errMsg ? "red" : "green" } }}
            style={styles.input}
            value={password}
            onChangeText={setPassword}
            label={"Password"}
            mode="outlined"
            disabled={isLoading}
            secureTextEntry={!passwordVisible}
            textContentType="password"
            right={
              <TextInput.Icon
                onPress={() => setPasswordVisible((visible) => !visible)}
                icon={"eye"}
              />
            }
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
            onPressOut={loginSubmit}
          >
            {isLoading ? "Loading.." : "Log in"}
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
