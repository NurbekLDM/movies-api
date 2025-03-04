require("dotenv").config();
const express = require("express");
const Redis = require("ioredis");
const movieRoutes = require("./routes/movies");
const app = express();
const PORT = 5000;


const redisClient = new Redis({
  host: process.env.REDIS_HOST,  
  port: process.env.REDIS_PORT,   
  password: process.env.REDIS_PASSWORD, 
});

redisClient.on("connect", () => console.log("✅ Redisga muvaffaqiyatli ulandi!"));
redisClient.on("error", (err) => console.error("❌ Redis xatosi:", err.message));


app.use((req, res, next) => {
  req.redisClient = redisClient;
  next();
});

app.use(express.json());

app.use("/api/movies", movieRoutes);

app.listen(PORT, () => {
  console.log(`🚀 Server ${PORT} portda ishga tushdi`);
});
