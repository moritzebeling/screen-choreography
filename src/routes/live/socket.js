import io from "socket.io-client";
import { PUBLIC_SOCKET } from '$env/static/public';

export const socket = io(PUBLIC_SOCKET + '/live');