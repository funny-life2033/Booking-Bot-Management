import { ScrollView, StyleSheet, View } from "react-native";
import { Appbar, Button, Surface, Text } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { disconnect } from "../store/authSlice";
import { useEffect, useState } from "react";
import {
  startBot as startAdiBot,
  stopBot as stopAdiBot,
} from "../store/adiSlice";

const Bots = ({ gotoLoginPage, gotoSlotsPage, gotoBotsPage }) => {
  const [expanded, setExpanded] = useState(true);

  const dispatch = useDispatch();
  const isConnected = useSelector((state) => state.user.isConnected);
  const adiBots = useSelector((state) => state.adi.bots);

  useEffect(() => {
    if (!isConnected) {
      gotoLoginPage();
    }
  }, [isConnected]);

  return (
    <SafeAreaView style={styles.container}>
      <Appbar.Header dark theme={{ colors: { surface: "green" } }}>
        <Appbar.BackAction onPress={() => dispatch(disconnect())} />
        <Appbar.Content title="Bots" />
        <Appbar.Action icon="robot" onPress={() => gotoBotsPage()} />
        <Appbar.Action icon="bookmark" onPress={() => gotoSlotsPage()} />
      </Appbar.Header>
      <Button
        icon="robot"
        mode="elevated"
        style={styles.subheader}
        onPress={() => setExpanded((expanded) => !expanded)}
      >
        ADI Bots
      </Button>
      <ScrollView>
        {Object.keys(adiBots).map((botId) => (
          <BotItem
            key={botId}
            bot={adiBots[botId]}
            start={() => dispatch(startAdiBot(botId))}
            stop={() => dispatch(stopAdiBot(botId))}
            gotoSlotsPage={() => gotoSlotsPage(botId)}
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const BotItem = ({ bot, start, stop, gotoSlotsPage }) => {
  return (
    <Surface style={styles.botItem}>
      <View
        style={{
          ...styles.statusIcon,
          backgroundColor: bot.isWorking ? "green" : "gray",
        }}
      />
      <Button
        style={styles.botButton}
        mode="contained"
        theme={{ colors: { primary: "green" } }}
        disabled={bot.isStarting || bot.isStopping}
        onPress={() => (bot.isWorking ? stop() : start())}
      >
        {bot.isStarting
          ? "Starting..."
          : bot.isStopping
          ? "Stopping..."
          : bot.isWorking
          ? "Stop"
          : "Start"}
      </Button>
      <Text onPress={gotoSlotsPage}>
        Reserved Slots: {bot.reservedSlots.length}
      </Text>
    </Surface>
  );
};

const styles = StyleSheet.create({
  container: {
    height: "100%",
  },
  subheader: {
    borderRadius: 10,
    marginVertical: 5,
  },
  statusIcon: {
    borderRadius: 10,
    width: 10,
    height: 10,
  },
  botItem: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    paddingHorizontal: 10,
    paddingVertical: 3,
    margin: 3,
  },
  botButton: {
    width: 130,
    borderRadius: 8,
  },
});

export default Bots;
