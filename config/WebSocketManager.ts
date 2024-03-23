import { browserAccessibleBaseURL } from "@/constants/api";
import { io, Socket } from "socket.io-client";
 
const socket: Socket = io(`${browserAccessibleBaseURL}`);

socket.connect();

export default socket;
