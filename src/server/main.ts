import { monitor } from "@colyseus/monitor";
import { Server } from "colyseus";
import cors from "cors";
import express from "express";
import basicAuth from "express-basic-auth";
import http from "http";
import ArgentumArenaRoom from "./rooms/ArgentumArenaRoom";

const TAG = "[Main]";

require("dotenv").config();

const port = Number(process.env.PORT || 7666);
const app = express();

app.use(cors());
app.use(express.json());

const server = http.createServer(app);
const gameServer = new Server({
  server,
});

gameServer.define("argentum-arena", ArgentumArenaRoom);

const basicAuthMiddleware = basicAuth({
  users: {
    admin: process.env.MONITOR_ADMIN_PASSWORD || "password",
  },
  challenge: true,
});

// TODO: only in dev environment
app.use("/colyseus", basicAuthMiddleware, monitor());

gameServer.listen(port);

console.info(TAG, `Server listening on ws://localhost:${port}`);
