const { OPEN } = require("ws");
const UdpServer = require("../UdpServer");

function Broadcaster(io, ws) {
  this.BroadcastSamePlayerTCP = function (eventName, data) {
    ws.send(JSON.stringify({ eventName, data: JSON.stringify(data) }));
  };
  this.BroadcastOtherPlayersTCP = function (eventName, data) {
    io.clients.forEach((client) => {
      if (client !== ws && client.readyState === OPEN) {
        client.send(JSON.stringify({ eventName, data: JSON.stringify(data) }));
      }
    });
  };
  this.BroadcastSamePlayerUDP = function (eventName, data) {
    UdpServer.send(
      JSON.stringify({ eventName, data: JSON.stringify(data) }),
      5600,
      ws._socket.remoteAddress
      //   "172.18.128.1"
    );
  };
}

module.exports = Broadcaster;
