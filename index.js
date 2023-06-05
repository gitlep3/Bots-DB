const express = require("express");
const cors = require("cors");
const helmet = require("helmet");

const serversController = require("./controllers/serversController");

require("dotenv").config();

const app = express();

app.use(helmet());
app.use(cors());

app.use(express.json());
app.use("/servers", serversController);

app.get("/", (req, res) => {
  res.send("Which one of my discord bots is in your server???");
});

app.get("*", (req, res) => {
  res.status(404).send("Not found!");
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`🤖 Bots server is running on port ${PORT} 🤖`);
});
