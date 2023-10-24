import { StyleSheet } from "react-native";
import { Appbar, Button, DataTable, Dialog, Text } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { disconnect } from "../store/authSlice";
import {
  acceptSlot as acceptAdiSlot,
  declineSlot as declineAdiSlot,
} from "../store/adiSlice";
import { useEffect } from "react";
import { useState } from "react";

const Slots = ({ gotoLoginPage, gotoBotsPage, botId, gotoSlotsPage }) => {
  const dispatch = useDispatch();
  const isConnected = useSelector((state) => state.user.isConnected);
  const adiBots = useSelector((state) => state.adi.bots);

  const [adiSlots, setAdiSlots] = useState([]);
  const [dialogVisible, setDialogVisible] = useState(false);
  const [selectedSlot, selectSlot] = useState(null);

  useEffect(() => {
    if (adiBots[botId]) {
      let slots = adiBots[botId].reservedSlots.map((slot) => ({
        ...slot,
        botId,
      }));
      setAdiSlots(slots);
    } else {
      let slots = [];

      for (let id of Object.keys(adiBots)) {
        let slotsInBot = adiBots[id].reservedSlots.map((slot) => ({
          ...slot,
          botId: id,
        }));

        slots = [...slots, ...slotsInBot];
      }

      setAdiSlots(slots);
    }
  }, [botId, adiBots]);

  useEffect(() => {
    if (!isConnected) {
      gotoLoginPage();
    }
  }, [isConnected]);

  const rowClick = (slot) => {
    // console.log(slot);
    selectSlot(slot);

    setDialogVisible(true);
  };

  const AcceptSlot = () => {
    dispatch(acceptAdiSlot({ to: selectedSlot.botId, slot: selectedSlot }));
    setDialogVisible(false);
  };

  const DeclineSlot = () => {
    dispatch(declineAdiSlot({ to: selectedSlot.botId, slot: selectedSlot }));
    setDialogVisible(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Appbar.Header dark theme={{ colors: { surface: "green" } }}>
        <Appbar.BackAction onPress={() => dispatch(disconnect())} />
        <Appbar.Content title="Reserved Slots" />
        <Appbar.Action icon="robot" onPress={gotoBotsPage} />
        <Appbar.Action icon="bookmark" onPress={() => gotoSlotsPage()} />
      </Appbar.Header>
      <DataTable>
        <DataTable.Header>
          <DataTable.Title>Test Centre</DataTable.Title>
          <DataTable.Title>Slot Type</DataTable.Title>
          <DataTable.Title>Date Time</DataTable.Title>
        </DataTable.Header>
        {adiSlots.map((slot, index) => (
          <DataTable.Row key={index} onPress={() => rowClick(slot)}>
            <DataTable.Cell>{slot.testCentre}</DataTable.Cell>
            <DataTable.Cell>{slot.slotType}</DataTable.Cell>
            <DataTable.Cell>{slot.dateTime}</DataTable.Cell>
          </DataTable.Row>
        ))}
      </DataTable>
      <Dialog visible={dialogVisible}>
        <Dialog.Title>Information</Dialog.Title>
        <Dialog.Content>
          <Text variant="bodyMedium">Category: {selectedSlot?.category}</Text>
          <Text variant="bodyMedium">
            Test Centre: {selectedSlot?.testCentre}
          </Text>
          <Text variant="bodyMedium">Slot Type: {selectedSlot?.slotType}</Text>
          <Text variant="bodyMedium">Date Time: {selectedSlot?.dateTime}</Text>
        </Dialog.Content>
        <Dialog.Actions>
          <Button onPress={AcceptSlot}>Accept</Button>
          <Button onPress={DeclineSlot}>Decline</Button>
          <Button onPress={() => setDialogVisible(false)}>close</Button>
        </Dialog.Actions>
      </Dialog>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    height: "100%",
  },
});

export default Slots;
