import { io } from "socket.io-client";
export const socket = io("https://pinterest.paindev.net/", {
  autoConnect: false,
});
