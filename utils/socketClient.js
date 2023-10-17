import { io } from "socket.io-client";
import { WEB_SOCKET_HOST } from "./config";

export default class SocketClient {
  socket;

  connect() {
    this.socket = io(WEB_SOCKET_HOST);

    this.socket.on("error", (e) => {
      console.log("error: ", e);
    });

    this.socket.on("disconnect", (e) => {
      console.log("disconnected: ", e);
    });

    this.socket.on("connect", () => {
      console.log("connected");
    });
  }

  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
    }
  }

  emit(eventName, data) {
    if (this.socket) {
      this.socket.emit(eventName, data);
    }
  }

  on(eventName, func) {
    if (this.socket) {
      this.socket.on(eventName, func);
    }
  }
}
