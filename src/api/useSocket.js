/* eslint-disable react-hooks/rules-of-hooks */
import { io } from "socket.io-client";
const socketURL =
  process.env.NODE_ENV === "production"
    ? "https://creative-cookie.herokuapp.com"
    : "http://localhost:3030";
const socket = io(socketURL);
export const useSocket = () => {
  return socket;
};
