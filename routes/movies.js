const express = require("express");
const { getAllMovies, getMovieById} = require("../controllers/moviesController");

const router = express.Router();

router.get("/all", getAllMovies); // Barcha filmlarni olish
router.get("/:id", getMovieById); // ID bo‘yicha filmni olish


module.exports = router;


