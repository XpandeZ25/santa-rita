require("dotenv").config();

const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const rateLimit = require("express-rate-limit");
const path = require("path");
const http = require("http");
const { Server } = require("socket.io");
const { setIo } = require("./utils/imageEvents");
const router = require("./routes");
const errorMiddleware = require("./middlewares/errorMiddleware");

const app = express();
const port = Number(process.env.PORT || 5000);

app.use(cors({
  origin: process.env.FRONTEND_URL || "http://localhost:5173",
  credentials: true
}));

app.use(morgan("dev"));
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

app.use("/api/admin/login", rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 20,
  standardHeaders: true,
  legacyHeaders: false
}));

app.use("/api", router);
app.use(errorMiddleware);

const server = http.createServer(app);
const io = new Server(server, { cors: { origin: process.env.FRONTEND_URL || "http://localhost:5173", credentials: true } });
setIo(io);

server.listen(port, () => {
  console.log(`Santa Rita API corriendo en http://localhost:${port}`);
});
