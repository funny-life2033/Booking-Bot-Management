import { StyleSheet } from "react-native";
import { Appbar } from "react-native-paper";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { disconnect } from "../store/authSlice";
import { useEffect } from "react";

const BOTTOM_APPBAR_HEIGHT = 60;

const Slots = ({ gotoLoginPage, gotoBotsPage }) => {
  const { bottom } = useSafeAreaInsets();
  const dispatch = useDispatch();
  const isConnected = useSelector((state) => state.user.isConnected);
  const adiBots = useSelector((state) => state.adi.bots);

  useEffect(() => {
    if (!isConnected) {
      gotoLoginPage();
    }
  }, [isConnected]);

  return (
    <Appbar
      style={[
        styles.bottom,
        {
          height: BOTTOM_APPBAR_HEIGHT + bottom,
          backgroundColor: "green",
        },
      ]}
    >
      <Appbar.Action
        icon="robot"
        color="white"
        onPress={() => gotoBotsPage()}
      />
      <Appbar.Action icon="bookmark" color="white" onPress={() => {}} />
      <Appbar.Action
        icon="logout"
        color="white"
        style={styles.logout}
        onPress={() => dispatch(disconnect())}
      />
    </Appbar>
  );
};

const styles = StyleSheet.create({
  bottom: {
    backgroundColor: "aquamarine",
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
  },
  logout: {
    paddingLeft: 100,
  },
});

export default Slots;
