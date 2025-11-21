
const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const v1Routes = require("./src/routes");
const { ServerConfig, Db } = require("./src/config");
const cors = require("cors");
console.log("MongoDB URL:", ServerConfig.MONGODB_URL);


Db.connect(ServerConfig.MONGODB_URL);


const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",   
    credentials: true,              
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);


app.use("/api", v1Routes);

app.listen(ServerConfig.PORT, () => console.log("Server running on port 4000"));
