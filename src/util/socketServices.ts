import io from "socket.io-client";

const SOCKET_URL = "http://34.151.211.219:3010/";

class WSService {
  constructor() {
    this.socket = null;
  }

  initializeSocket = async () => {
    try {
      this.socket = io(SOCKET_URL, {
        transports: ["websocket"],
      });
      console.log("initializing socket");

      this.socket.on("connect", (data) => {
        console.log("===socket on===");
      });

      this.socket.on("disconnect", () => {
        console.log("===socket disconnect===");
      });

      this.socket.on("error", (data) => {
        console.log("socket error", data);
      });
    } catch (error) {
      console.log("error in socket", error);
    }
  };

  emit(event, data, cb = {}) {
    if (this.socket) {
      this.socket.emit(event, data, cb);
    } else {
      console.error("Socket not initialized");
    }
  }

  on(event, cb = {}) {
    if (this.socket) {
      this.socket.on(event, cb);
    } else {
      console.error("Socket not initialized");
    }
  }

  remove(listenerName) {
    if (this.socket) {
      this.socket.off(listenerName);
    } else {
      console.error("Socket not initialized");
    }
  }
}

const socketServices = new WSService();

export default socketServices;
