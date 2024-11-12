const express = require("express");
const router = express.Router();
const MoviesController = require('../Controller/MoviesController')

router
  .route("/")
  .get(MoviesController.getAllMovies) // GET all movies
  .post(MoviesController.createMovie); // POST a movie

  router
  .route("/categories/")
  .get(MoviesController.getAllCategory) // for categories

router
  .route("/:id")
  .get(MoviesController.validationId,MoviesController.getMovieByID) // GET a movie by ID

  router
  .route("/category/:id") // GET a category by category
  .get(MoviesController.validationId,MoviesController.getMoviesByCategoryID) // GET a movies by category

  router
  .route("/rating/desc")
  .get(MoviesController.getMoviesByRatingDesc) // GET a Highest rating desc

  router
  .route("/mostliked/desc")
  .get(MoviesController.getMoviesByLikedDesc) // GET a Most Liked desc

  router
  .route("/recentlyadded/desc")
  .get(MoviesController.getRecentlyAddedDesc) // GET a recently added movie desc

router
  .route("/mostviews/desc")
  .get(MoviesController.getMostViewedDesc) // GET a Most viewed movie desc


  router
  .route('/search/movie')
  .get(MoviesController.searchMoviesByTitle);

router
  .route("/categoryname/:id")
  .get(MoviesController.validationId,MoviesController.getNameCategoryByID); // GET a movies by category name




module.exports = router;
