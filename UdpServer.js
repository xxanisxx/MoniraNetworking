const dgram = require("node:dgram");
const UdpServer = dgram.createSocket("udp4");

const PORT = process.env.PORT || 5500;

UdpServer.on("error", (error) => {
  console.log(`error on the server ${error.message}`);
});

UdpServer.on("listening", () => {
  const address = UdpServer.address();
  console.log(`[+] listening to UDP Server on port ${address.port} `);
});

UdpServer.on("message", (message, senderInfo) => {
  console.log(`UDP connection from ${senderInfo.address}`);
  //   UdpServer.send("hello", senderInfo.port, senderInfo.address, () => {
  //     console.log(
  //       `Message have been sent to ${senderInfo.address}:${senderInfo.port}`
  //     );
  //   });
});

UdpServer.bind(PORT);
module.exports = UdpServer;
