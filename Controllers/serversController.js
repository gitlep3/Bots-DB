const express = require("express");
const servers = express.Router();
const {
  getServerById,
  addServer,
  updateServer,
  deleteServer,
} = require("../Queries/serversQueries");

servers.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const server = await getServerById(id);
    if (server) {
      console.log(`=== GET: ${server} ===`);
      res.status(200).json(server);
    } else {
      res.status(404).send("Server not found.");
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error.");
  }
});

servers.post("/", async (req, res) => {
  try {
    const serverData = {
      bot_id: req.body.bot_id,
      bot_name: req.body.bot_name,
      server_id: req.body.server_id,
      server_name: req.body.server_name,
      prefix: req.body.prefix,
    };
    const server = await addServer(serverData);
    console.log(`=== POST: ${server} ===`);
    res.status(201).json(server);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error.");
  }
});

servers.put("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const newPrefix = req.body.prefix;
    const updatedServer = await updateServer(id, newPrefix);
    if (updatedServer) {
      console.log(`=== PUT: ${updatedServer} ===`);
      res.status(200).json(updatedServer);
    } else {
      res.status(404).send("Server not found.");
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error.");
  }
});

servers.delete("/:botID/:serverID", async (req, res) => {
  try {
    const botID = req.params.botID;
    const serverID = req.params.serverID;
    const deletedServer = await deleteServer(botID, serverID);
    if (deletedServer) {
      console.log(`=== DELETE: ${deletedServer} ===`);
      res.status(200).json(deletedServer);
    } else {
      res.status(404).send("Server not found.");
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error.");
  }
});

module.exports = servers;
