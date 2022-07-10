const { WebSocketServer } = require("ws");
const { createServer } = require("http");
const { parse } = require("url");
const Client = require("./Client/Client");
const Broadcaster = require("./Functions/Broadcaster");
const UdpServer = require("./UdpServer");

const TcpServer = createServer();
const io = new WebSocketServer({ noServer: true });
const PORT = process.env.PORT || 3000;
const authenticate = true;

io.on("connection", (ws, request) => {
  const { pathname } = parse(request.url);
  const broadcaster = new Broadcaster(io, ws);

  if (pathname === "/client") Client(broadcaster);
  const int = setInterval(() => {
    broadcaster.BroadcastSamePlayerUDP("hello");
  }, 100);

  ws.on("close", () => {
    clearInterval(int);
  });
});

TcpServer.on("upgrade", function upgrade(request, socket, head) {
  if (!authenticate) {
    console.log("kill socket");
    socket.write("HTTP/1.1 401 Unauthorized\r\n\r\n");
    socket.destroy();
    return;
  }

  io.handleUpgrade(request, socket, head, function done(ws) {
    io.emit("connection", ws, request);
  });
});

TcpServer.listen(PORT, "0.0.0.0", () =>
  console.log(`[+] listening to TCP Server on port ${PORT} `)
);
