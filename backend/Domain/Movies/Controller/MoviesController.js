const Movies = require("../Models/MoviesModel");
const Categories = require("../Models/CategoryModel");

const { check, validationResult } = require("express-validator");
const Category = require("../Models/CategoryModel");

//// for validation 'express-validator'
// const validationBody = [
//   check("title")
//     .notEmpty()
//     .withMessage("Title Not Provided")
//     .isLength({ min: 2 })
//     .withMessage("Length Of Title Should Be More Than 2 Character"),
//   check("release_date")
//     .notEmpty()
//     .withMessage("Date Release Can't Be Empty")
//     .isDate()
// ];

//// for validation 'express-validator'

const validationId = [
  check("id")
    .notEmpty()
    .isLength({ min: 24, max: 24 })
    .withMessage(
      "ID: input must be a 24 character hex string, 12 byte Uint8Array, or an integer"
    ),
];
/////////////////////////////////////

const getAllMovies = async (req, res) => {
  // Get page and limit from query parameters, with defaults
  const page = parseInt(req.query.page) || 1; // Default to page 1
  const limit = parseInt(req.query.limit) || 10; // Default to 10 movies per page

  const skip = (page - 1) * limit; // Calculate how many movies to skip

  try {
    const totalMovies = await Movies.countDocuments(); // Get total movie count
    const movies = await Movies.find().skip(skip).limit(limit); // Fetch movies with pagination

    res.status(200).json({
      totalMovies,
      totalPages: Math.ceil(totalMovies / limit),
      currentPage: page,
      movies,
    });
  } catch (error) {
    res.status(500).json({ message: "Error fetching movies", error });
  }
};

// Get Movie By ID
const getMovieByID = async (req, res) => {
  const { id } = req.params;

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array()[0].msg });
  }
  try {
    const getAllMoviID = await Movies.findById(id);
    if (getAllMoviID) {
      res.json(getAllMoviID);
    } else {
      res
        .status(404)
        .json({ message: `No movie found for this Id : (${id}).` });
    }
  } catch (error) {
    return res.status(404).json({ error: error.message });
  }
};

// create movie
const createMovie = async (req, res) => {
  try {
    const {
      title,
      release_date,
      rating,
      overview,
      poster_photo,
      categories, // array of category names
      genres, // array of genre names (directly strings, no lookup needed)
      vote_count,
      views,
      trailer,
      photo,
      link,
      Original_link
    } = req.body;

    const categoryIds = await Promise.all(
      categories.map(async (category_id) => {
        const category = await Categories.findOne({ _id: category_id });
        return category._id; // Return null if category doesn't exist
      })
    );

    const movie = new Movies({
      title,
      release_date,
      rating,
      overview,
      poster_photo,
      genres, // Array of genre strings (no lookup needed)
      categories: categoryIds, // use array of IDs
      vote_count,
      views,
      trailer,
      photo,
      link,
      Original_link
    });

    await movie.save();
    res.status(201).json(movie);
  } catch (error) {
    res.status(500).json({ message: "Error creating movie", error });
  }
};

const getMoviesByCategoryID = async (req, res) => {
  const { id } = req.params;
  const { page = 1, limit = 10 } = req.query; // Set default values for page and limit
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array()[0].msg });
  }
  try {
    // Make sure to convert categoryId to ObjectId if necessary
    const totalMovies = await Movies.find({ categories: id });
    const movies = await Movies.find({ categories: id }) // Fetch movies with pagination
      .limit(parseInt(limit)) // Limit number of results
      .skip((page - 1) * limit); // Skip results for pagenation

    if (totalMovies.length > 0) {
      res.json({
        totalMovies: totalMovies.length,
        totalPages: Math.ceil(totalMovies.length / limit),
        currentPage: parseInt(page),
        movies,
      });
    } else {
      res
        .status(404)
        .json({ message: `No movies found for this category Id : (${id}).` });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getAllCategory = async (req, res) => {
  const { page = 1, limit = 10 } = req.query; // Default values

  try {
    const totalMovies = await Movies.countDocuments();
    const movies = await Movies.find()
      .limit(parseInt(limit)) // Limit number of results
      .skip((page - 1) * limit);

    if (movies.length > 0) {
      res.json({
        totalMovies,
        totalPages: Math.ceil(totalMovies / limit),
        currentPage: parseInt(page),
        movies,
      });
    } else {
      res.status(404).json({ message: "No movies found for this category." });
    }
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const getNameCategoryByID = async (req, res) => {
  const { id } = req.params;
  const category = await Categories.findById(id);
  console.log(category.name);

  if (category) {
    res.json(category);
  } else {
    res.status(404).json({ message: "Category Not Found", error });
  }
};

const getMoviesByRatingDesc = async (req, res) => {
  const { page = 1, limit = 10 } = req.query; // Default values

  try {
    const totalMovies = await Movies.find()
      .sort({ rating: -1 })
      .countDocuments();
    const movies = await Movies.find()
      .sort({ rating: -1 }) // ترتيب تنازلي حسب التقييم
      .limit(parseInt(limit))
      .skip((page - 1) * limit);
    res.status(200).json({
      totalMovies,
      totalPages: Math.ceil(totalMovies / limit),
      currentPage: parseInt(page),
      movies,
    });
  } catch (error) {
    res.status(500).json({ message: "Error fetching movies", error });
  }
};

const getMoviesByLikedDesc = async (req, res) => {
  const { page = 1, limit = 10 } = req.query; // Default values

  try {
    const totalMovies = await Movies.find()
      .sort({ vote_count: -1 })
      .countDocuments();
    const movies = await Movies.find()
      .sort({ vote_count: -1 }) // ترتيب تنازلي حسب التقييم
      .limit(limit)
      .skip((page - 1) * limit);
    res.status(200).json({
      totalMovies,
      totalPages: Math.ceil(totalMovies / limit),
      currentPage: parseInt(page),
      movies,
    });
  } catch (error) {
    res.status(500).json({ message: "Error fetching movies", error });
  }
};

const getRecentlyAddedDesc = async (req, res) => {
  const { page = 1, limit = 10 } = req.query; //
  try {
    const totalMovies = await Movies.find()
      .sort({ release_date: -1 })
      .countDocuments();
    const movies = await Movies.find()
      .sort({ release_date: -1 }) // ترتيب تنازلي حسب التقييم
      .limit(limit)
      .skip((page - 1) * limit);
    res.status(200).json({
      totalMovies,
      totalPages: Math.ceil(totalMovies / limit),
      currentPage: parseInt(page),
      movies,
    });
  } catch (error) {
    res.status(500).json({ message: "Error fetching movies", error });
  }
};

const getMostViewedDesc = async (req, res) => {
  const { page = 1, limit = 10 } = req.query; // Set default values for page and limit
  try {
    const totalMovies = await Movies.find()
      .sort({ views: -1 })
      .countDocuments(); // Get total number of movies
    const movies = await Movies.find()
      .sort({ views: -1 }) // ترتيب تنازلي حسب التقييم
      .limit(limit)
      .skip((page - 1) * limit); // Skip results for pagenation
    res.status(200).json({
      totalMovies,
      totalPages: Math.ceil(totalMovies / limit),
      currentPage: parseInt(page),
      movies,
    });
  } catch (error) {
    res.status(500).json({ message: "Error fetching movies", error });
  }
};

const searchMoviesByTitle = async (req, res) => {
  const { title } = req.query; // Get title from query parameters

  if (!title) {
    return res
      .status(400)
      .json({ message: "Title query parameter is required." });
  }

  try {
    const movies = await Movies.find({
      title: { $regex: title, $options: "i" },
    }); // Case insensitive search
    if (movies.length > 0) {
      return res.status(200).json(movies);
    } else {
      return res
        .status(404)
        .json({ message: "No movies found for this title." });
    }
  } catch (error) {
    res.status(500).json({ message: "Error fetching movies", error });
  }
};

module.exports = {
  validationId,
  getAllMovies,
  createMovie,
  getMovieByID,
  getMoviesByCategoryID,
  getAllCategory,
  getMoviesByRatingDesc,
  getMoviesByLikedDesc,
  getRecentlyAddedDesc, //
  getMostViewedDesc, // most viewed movie in last 30 days,
  searchMoviesByTitle, // search movies by title, case insensitive
  getNameCategoryByID, // get category name by id
};
