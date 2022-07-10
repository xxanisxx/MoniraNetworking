const { v4: uuidv4 } = require("uuid");

function Player() {
  this.playerID = uuidv4();
  this.username = "username";
  this.position = { x: 0, y: 0, z: 0 };
  this.rotation = { x: 0, y: 0, z: 0 };
}

module.exports = Player;
