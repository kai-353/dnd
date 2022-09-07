const express = require("express");
const colors = require("colors");
const path = require("path");
const axios = require("axios");
const fs = require("fs");
const dotenv = require("dotenv").config();
const connectDB = require("./config/db");

connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/users", require("./routes/users"));
app.use("/api/dnd", require("./routes/dnd"));

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/client/build")));

  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"))
  );
} else {
  app.get("/", (req, res) => res.send("Please set to production"));
}
// app.get("/dnd/:toggle", (req, res) => {
//   const { toggle } = req.params;
//   if (toggle !== "0" && toggle !== "1") {
//     res.status(400).json({ message: "invalid dnd status" });
//     return;
//   }
//   axios
//     .get(
//       `https://autoprov.gntel.nl/presence/dnd/${toggle}/f48eabf507d9f660a1d5c221ad43c45fea26c166/6310001301/?user=$active_user`
//     )
//     .then((res) => {
//       log(`${res.config.url} ${res.data} 301`);
//     }); //301
//   axios
//     .get(
//       `https://autoprov.gntel.nl/presence/dnd/${toggle}/85c087af125a59a8e3cda144ca05c94c561b3615/6310001302/?user=$active_user`
//     )
//     .then((res) => {
//       log(`${res.config.url} ${res.data} 302`);
//     }); //302
//   res.status(200).json({ message: "success" });
// });

const PORT = process.env.PORT || 8080;

app.listen(PORT, console.log(`Server started on ${PORT}`.underline.bold.blue));
