const Player = require("../Models/PlayerModel");
const ClientEvents = require("../Events/ClientEvents");
const EventName = require("../Events/EventsNames");

function Client(broadcaster) {
  const player = new Player();
  const { clientEmitter } = new ClientEvents(broadcaster);

  clientEmitter.emit(EventName.ON_PLAYER_CONNECT, player);
}

module.exports = Client;
