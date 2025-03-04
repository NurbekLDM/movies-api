const { v4: uuidv4 } = require("uuid");


//  Barcha filmlarni olish
const getAllMovies = async (req, res) => {
    try {
      const client = req.redisClient;

      const page = req.query.page || 1;
      const key = page == 1 ? "movies" : `movies${page}`;
      const moviesJSON = await client.call("JSON.GET", key, ".");
      
      
  
      if (!moviesJSON) {
        return res.json([]); 
      }
  
      res.json(JSON.parse(moviesJSON));
    } catch (error) {
      console.error("Xatolik:", error);
      res.status(500).json({ error: "Ichki server xatosi" });
    }
  };
  

// Bitta filmni ID bo‘yicha olish
const getMovieById = async (req, res) => {
    try {
      const client = req.redisClient;
      const keys = ["movies", "movies2", "movies3", "movies4", "movies5"]; 
  
      let foundMovie = null;
  
      for (const key of keys) {
        const moviesJSON = await client.call("JSON.GET", key, ".");
        if (moviesJSON) {
          const movies = JSON.parse(moviesJSON);
          foundMovie = movies.find((m) => m._id === req.params.id);
          if (foundMovie) break; 
        }
      }
  
      if (!foundMovie) {
        return res.status(404).json({ error: "Movie not found" });
      }
  
      res.json(foundMovie);
    } catch (error) {
      console.error("Xatolik:", error);
      res.status(500).json({ error: "Ichki server xatosi" });
    }
  };
  



module.exports = {
  getAllMovies,
  getMovieById
};
