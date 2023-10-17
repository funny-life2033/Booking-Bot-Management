import {
  setIsBotConnected,
  setReservedSlots,
  startedBot,
  stoppedBot,
} from "../store/adiSlice";
import { loggedIn, loginFailed } from "../store/authSlice";

export default function socketMiddleware(socket) {
  return (params) => (next) => (action) => {
    const { dispatch } = params;
    const { type, payload } = action;

    switch (type) {
      case "user/login": {
        socket.connect();

        socket.on("user login success", (data) => {
          dispatch(loggedIn(data));
        });

        socket.on("user login failed", () => {
          dispatch(loginFailed());
        });

        socket.on("adi bot connected", () => {
          dispatch(setIsBotConnected(true));
        });

        socket.on("adi bot disconnected", () => {
          dispatch(setIsBotConnected(false));
        });

        socket.on("adi bot started", () => {
          dispatch(startedBot());
        });

        socket.on("adi bot stopped", () => {
          dispatch(stoppedBot());
        });

        socket.on("reserved new slot", (slots) => {
          dispatch(setReservedSlots(slots));
        });

        socket.emit("new login", payload);

        break;
      }
      case "user/logout": {
        socket.disconnect();
        break;
      }
      case "adi/startBot": {
        socket.emit("adi bot start");
        break;
      }
      case "adi/stopBot": {
        socket.emit("adi bot stop");
        break;
      }
    }

    return next(action);
  };
}
