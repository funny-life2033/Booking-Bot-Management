import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  bots: {},
};

const adiSlice = createSlice({
  name: "adi",
  initialState,
  reducers: {
    startBot: (state, { payload }) => {
      if (state.bots[payload]) state.bots[payload].isStarting = true;
    },
    stopBot: (state, { payload }) => {
      if (state.bots[payload]) state.bots[payload].isStopping = true;
    },
    startedBot: (state, { payload }) => {
      if (state.bots[payload]) {
        state.bots[payload].isWorking = true;
        state.bots[payload].isStarting = false;
      }
    },
    stoppedBot: (state, { payload }) => {
      if (state.bots[payload]) {
        state.bots[payload].isWorking = false;
        state.bots[payload].isStopping = false;
      }
    },
    setBots: (state, { payload }) => {
      for (botId of payload) {
        state.bots[botId] = { reservedSlots: [] };
      }
    },
    setReservedSlots: (state, { payload }) => {
      const { botId, reservedSlots } = payload;
      if (state.bots[botId]) {
        state.bots[botId].reservedSlots = reservedSlots;
      }
    },
    botConnected: (state, { payload }) => {
      state.bots[payload] = { reservedSlots: [] };
    },
    botDisconnected: (state, { payload }) => {
      delete state.bots[payload];
    },
    acceptSlot: (state, { payload }) => {
      const { botId, slot } = payload;
      if (state.bots[botId]) {
        state.bots[botId].acceptingSlot = slot;
      }
    },
    declineSlot: (state, { payload }) => {
      const { botId, slot } = payload;
      if (state.bots[botId]) {
        state.bots[botId].decliningSlot = slot;
      }
    },
    acceptedSlot: (state, { payload }) => {
      if (state.bots[payload]) {
        state.bots[payload].reservedSlots = state.bots[
          payload
        ].reservedSlots.filter(
          (slot) => slot !== state.bots[payload].acceptingSlot
        );
        state.bots[payload].acceptingSlot = null;
      }
    },
    declinedSlot: (state, { payload }) => {
      if (state.bots[payload]) {
        state.bots[payload].reservedSlots = state.bots[
          payload
        ].reservedSlots.filter(
          (slot) => slot !== state.bots[payload].decliningSlot
        );
        state.bots[payload].decliningSlot = null;
      }
    },
  },
});

export const {
  startBot,
  startedBot,
  stopBot,
  stoppedBot,
  setBots,
  setReservedSlots,
  acceptSlot,
  declineSlot,
  acceptedSlot,
  declinedSlot,
  botConnected,
  botDisconnected,
} = adiSlice.actions;
export default adiSlice.reducer;
