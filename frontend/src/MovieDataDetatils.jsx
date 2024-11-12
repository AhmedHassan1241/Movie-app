import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./style.css";
import { VideoPlayer } from "./VideoPlayer";
import {
  FaStar,
  FaEye,
  FaCalendarAlt,
  FaThumbsUp,
  FaFilm,
} from "react-icons/fa"; // استيراد أيقونات من مكتبة Font Awesome
import { GrOverview } from "react-icons/gr";

export function MovieDataDetails() {
  const { id } = useParams(); // استخدم useParams لاستخراج الـ id من الـ URL
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    // جلب بيانات الفيلم باستخدام الـ id
    fetch(`http://localhost:8080/movies/${id}`)
      .then((response) => response.json())
      .then((data) => setMovie(data))
      .catch((error) => console.error("Error fetching movie details:", error));
  }, [id]);

  // تحقق مما إذا كانت البيانات تم جلبها
  if (!movie) {
    return <div style={{ color: "#ccc" }}>Loading movie details...</div>;
  }

  return (
    <div>
      <div
        className="movie-details rounded-1"
        style={{ background: "#e5e5e5" }}
      >
        <div>
          <div className="w-smm-100 d-lg-flex flex-lg-row d-flex flex-column-reverse justify-content-lg-between ">
            <div className="w-xll-50 w-smm-100">
              <h5 className="mt-4" style={{ color: "rgb(76, 15, 10)" }}>
                ( {movie.title} )
              </h5>
              <p
                className="text-start px-4 mt-4 d-flex align-items-center"
                style={{ color: "rgb(76, 15, 189)" }}
              >
                <span>
                  <strong>Rating:</strong> {movie.rating}
                </span>
                <FaStar className="ms-2" style={{ color: "yellow" }} />{" "}
              </p>
              <p
                className="text-start px-4 d-flex align-items-center"
                style={{ color: "rgb(76, 15, 189)" }}
              >
                <strong>Views: </strong>
                <span style={{ marginLeft: "5px" }}>{movie.views}</span>
                <FaEye className="ms-2" style={{ color: "#aaaaaa" }} />
              </p>
              <p
                className="text-start px-4 d-flex align-items-center"
                style={{ color: "rgb(76, 15, 189)" }}
              >
                <strong>Release Date: </strong>
                <span style={{ marginLeft: "3px" }}>
                  {" "}
                  {new Date(movie.release_date).toLocaleDateString()}
                </span>
                <FaCalendarAlt className="ms-2" style={{ color: "#000" }} />
              </p>
              <ul
                className="d-flex align-items-center px-4 list-unstyled "
                style={{ gap: "8px", color: "rgb(76, 15, 189)" }}
              >
                <strong>Type: </strong>[
                {movie.genres.map((tp, index) => (
                  <li key={index}>
                    {tp}
                    {movie.genres.length === index + 1 ? "" : ","}
                  </li>
                ))}
                ]
              </ul>
              <p
                className="text-start px-4 d-flex align-items-center"
                style={{ color: "rgb(76, 15, 189)" }}
              >
                <strong> Vote Count: </strong>
                <span style={{ marginLeft: "5px" }}>{movie.vote_count}</span>
                <FaThumbsUp className="ms-2" />
              </p>
              <p
                className="text-start px-4 d-flex align-items-center"
                style={{ color: "rgb(76, 15, 189)" }}
              >
                <FaFilm />{" "}
                <span>
                  <span>
                    <strong>
                      Overview <GrOverview style={{ color: "#666" }} /> :{" "}
                    </strong>
                  </span>{" "}
                  {movie.overview}
                </span>
              </p>
            </div>
            <div className="w-100 border-1">
              <img
                src={movie.poster_photo}
                alt={movie.title}
                className="mx-auto rounded-1 w-smm-100 "
              />
            </div>
          </div>
        </div>
      </div>
      <div className="mt-5">
        <VideoPlayer videoUrl={movie["trailer"]} />
      </div>
      <div
        className="rounded-1 py-3 mt-3"
        style={{ background: "#e5e5e5", color: "rgb(76, 15, 189)" }}
      >
        <div className="mb-2">
          <span>
            Click here to watch the full movie on{" "}
            <strong>Official website! </strong>:{" "}
          </span>
          <a href={movie["Original_link"]}>
            <button
              type="button"
              className="btn btn-sm btn-primary mt-sm-0 mt-3"
            >
              Watch Now
            </button>
          </a>
        </div>
        <div>
          <span>
            Click here to watch the full movie on <strong>Egybest! </strong>:{" "}
          </span>
          <a href={movie["link"]}>
            <button
              type="button"
              className="btn btn-sm  btn-secondary mt-sm-0 mt-3"
            >
              Watch Now
            </button>
          </a>
        </div>
      </div>
    </div>
  );
}
