const db = require("../db/dbConfig.js");

const getServerById = async (id) => {
  try {
    const server = await db.oneOrNone(
      ("SELECT * FROM servers WHERE id = $1", id)
    );
    return server;
  } catch (err) {
    return err;
  }
};

const addServer = async (serverData) => {
  try {
    const addServer = await db.one(
      "INSERT INTO servers (bot_id, bot_name, server_id, server_name, prefix) VALUES ($1, $2, $3, $4, $5) RETURNING *",
      [
        serverData.bot_id,
        serverData.bot_name,
        serverData.server_id,
        serverData.server_name,
        serverData.prefix,
      ]
    );
    return addServer;
  } catch (err) {
    return err;
  }
};

const updateServer = async (serverID, newPrefix) => {
  try {
    const updatedServer = await db.oneOrNone(
      "UPDATE servers SET prefix = $1 WHERE server_id = $2 RETURNING *",
      [newPrefix, serverID]
    );
    return updatedServer;
  } catch (err) {
    return err;
  }
};

const deleteServer = async (botID, serverID) => {
  try {
    const deletedServer = await db.oneOrNone(
      "DELETE FROM servers WHERE bot_id = $1 AND server_id = $2 RETURNING *",
      [botID, serverID]
    );
    return deletedServer;
  } catch (err) {
    return err;
  }
};

module.exports = {
  getServerById,
  addServer,
  updateServer,
  deleteServer,
};
