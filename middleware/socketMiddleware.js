import {
  acceptedSlot as adiAcceptedSlot,
  botConnected as adiBotConnected,
  botDisconnected as adiBotDisconnected,
  declinedSlot as adiDeclinedSlot,
  setBots as setAdiBots,
  setReservedSlots as setAdiReservedSlots,
  startedBot as startedAdiBot,
  stoppedBot as stoppedAdiBot,
  setIsWorking as adiSetIsWorking,
} from "../store/adiSlice";
import { connected, connectFailed } from "../store/authSlice";

export default function socketMiddleware(socket) {
  return (params) => (next) => (action) => {
    const { dispatch } = params;
    const { type, payload } = action;

    switch (type) {
      case "user/connect": {
        socket.connect();

        socket.on(
          "app connect success",
          ({ connectedAdiBots, connectedStudentBots }) => {
            dispatch(connected());
            dispatch(setAdiBots(connectedAdiBots));
          }
        );

        socket.on("app connect failed", (err) => {
          dispatch(connectFailed(err));
        });

        socket.on("adi bot connect", (botId) => {
          dispatch(adiBotConnected(botId));
        });

        socket.on("adi bot disconnect", (botId) => {
          dispatch(adiBotDisconnected(botId));
        });

        socket.on("adi bot started", (botId) => {
          dispatch(startedAdiBot(botId));
        });

        socket.on("adi bot stopped", (botId) => {
          dispatch(stoppedAdiBot(botId));
        });

        socket.on("adi accepted slot", (botId) => {
          dispatch(adiAcceptedSlot(botId));
        });

        socket.on("adi declined slot", (botId) => {
          dispatch(adiDeclinedSlot(botId));
        });

        socket.on(
          "adi bot reserved slots",
          ({ botId, isWorking, reservedSlots }) => {
            dispatch(adiSetIsWorking({ botId, isWorking }));
            dispatch(setAdiReservedSlots({ botId, reservedSlots }));
          }
        );

        socket.on("adi reserved new slot", (data) => {
          dispatch(setAdiReservedSlots(data));
        });

        socket.on("error alert", (data) => {
          console.log("error alert", data);
        });

        socket.on("alert", (data) => {
          console.log("alert", data);
        });

        socket.emit("app connect");

        break;
      }
      case "user/disconnect": {
        socket.disconnect();
        break;
      }
      case "adi/startBot": {
        console.log("adi/startBot: ", payload);
        socket.emit("message", "adi bot start", { to: payload });
        break;
      }
      case "adi/stopBot": {
        socket.emit("message", "adi bot stop", { to: payload });
        break;
      }
      case "adi/acceptSlot": {
        socket.emit("message", "adi accept slot", payload);
        break;
      }
      case "adi/declineSlot": {
        socket.emit("message", "adi decline slot", payload);
        break;
      }
    }

    return next(action);
  };
}
