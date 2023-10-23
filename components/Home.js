import { useEffect } from "react";
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
import { connect } from "../store/authSlice";
import * as Notifications from "expo-notifications";

async function registerForPushNotificationsAsync() {
  let token;

  const { status: existingStatus } = await Notifications.getPermissionsAsync();
  let finalStatus = existingStatus;

  if (existingStatus !== "granted") {
    const { status } = await Notifications.requestPermissionsAsync();
    finalStatus = status;
  }
  if (finalStatus !== "granted") {
    alert("Failed to get push token for push notification!");
    return;
  }
  token = (await Notifications.getExpoPushTokenAsync()).data;
  console.log(token);

  return token;
}

const Home = ({ gotoBotsPage }) => {
  const dispatch = useDispatch();
  const { isLoading, error, isConnected } = useSelector((state) => state.user);

  useEffect(() => {
    registerForPushNotificationsAsync();
  }, []);

  useEffect(() => {
    console.log(isConnected);
    if (isConnected) {
      gotoBotsPage();
    }
  }, [isConnected]);

  const hasErrors = () => {
    return error;
  };

  const connectionSubmit = () => {
    dispatch(connect());
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
          <HelperText type="error" visible={hasErrors()}>
            {error}
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
            onPressOut={connectionSubmit}
          >
            {isLoading ? "Connecting.." : "Connect"}
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
    paddingHorizontal: 10,
  },
  content: {
    justifyContent: "center",
  },
  cover: {
    padding: 10,
    backgroundColor: "rgba(0,0,0,0)",
  },
});

export default Home;
