const events = require("events");
const EventName = require("./EventsNames");

function ClientEvents(broadcaster) {
  this.clientEmitter = new events.EventEmitter();
  this.clientEmitter.on(EventName.ON_PLAYER_CONNECT, (player) => {
    // console.log(player.playerID);
    // setInterval(() => {
    //   broadcaster.BroadcastSamePlayerUDP(player.playerID);
    // }, 1000);
  });
}

module.exports = ClientEvents;
