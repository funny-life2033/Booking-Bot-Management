import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  reservedSlots: [],
  isBotWorking: false,
  isBotConnected: false,
  isBotStarting: false,
  isBotStopping: false,
};

const adiSlice = createSlice({
  name: "adi",
  initialState,
  reducers: {
    startBot: (state) => {
      state.isBotStarting = true;
    },
    stopBot: (state) => {
      state.isBotStopping = true;
    },
    startedBot: (state) => {
      state.isBotWorking = true;
      state.isBotStarting = false;
    },
    stoppedBot: (state) => {
      state.isBotWorking = false;
      state.isBotStopping = false;
    },
    setIsBotConnected: (state, { payload }) => {
      state.isBotConnected = payload;
    },
    setReservedSlots: (state, { payload }) => {
      state.reservedSlots = payload;
    },
    acceptSlot: (state, { payload }) => {},
    declineSlot: (state, { payload }) => {},
  },
});

export const {
  startBot,
  stopBot,
  startedBot,
  stoppedBot,
  setIsBotConnected,
  setReservedSlots,
  acceptSlot,
  declineSlot,
} = adiSlice.actions;
export default adiSlice.reducer;
