import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
export function RomanceFilm({limit=4,page=1}) {

  const [movies, setMovies] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:8080/movies/category/6708755c4d96e86e905c2e92?page=${page}&limit=${limit}`)
      .then(response => response.json())
      .then(data => setMovies(data.movies))
      .catch(error => console.error('Error fetching movies:', error));
  }, [page, limit]);
  // تصفية الأفلام الدرامية
  // const dramaMovies = movies.filter(movie => movie.genres.includes("Drama"));

  return (
    <div className="container-fluid mt-4 box-shadoww rounded-1" style={{ backgroundColor: "#fff" }}> {/* تعيين خلفية بيضاء */}
      <h6 className="text-start fw-bold mb-0" style={{padding:"12px 0 12px 4px",color:"rgb(76, 15, 189"}}>Romance Movies</h6> {/* عنوان القسم */}
      <div className="row"> {/* شبكة الأفلام */}
      {movies.map((movie) => (
        <div className="col-6 col-sm-4 col-lg-3" key={movie._id}> {/* كل عمود يحتوي على بوستر فيلم */}
            <Link to={`/movies/${movie._id}`} style={{ textDecoration: 'none' }}> 
            <div className="card mb-4" style={{ boxSizing: "border-box", borderRadius: "10px" }}>
              <img src={movie["poster_photo"]} className="card-img-top" alt={movie.title} style={{ width: "100%", height: "200px" }} />
              <div className="card-body p-0 pt-2">
                <h5 className="card-title" style={{ fontSize: "13px", color: "rgb(76, 15, 189)" }}>{movie.title}</h5>
              </div>
            </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
