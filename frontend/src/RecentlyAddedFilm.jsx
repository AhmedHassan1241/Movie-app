import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaCalendarAlt } from "react-icons/fa";
export function RecentlyAddedFilm({limit=4,page=1}) {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:8080/movies/recentlyadded/desc?page=${page}&limit=${limit}`)
      .then(response => response.json())
      .then(data => setMovies(data.movies))
      .catch(error => console.error('Error fetching movies:', error));
  }, [page, limit]);
  // تصفية الأفلام الدرامية
  // const dramaMovies = movies.filter(movie => movie.genres.includes("Drama"));

  return (
    <div className="container-fluid mt-4 box-shadoww rounded-1" style={{ backgroundColor: "#fff" }}> {/* تعيين خلفية بيضاء */}
      <h6 className="text-start fw-bold mb-0" style={{padding:"12px 0 12px 4px",color:"rgb(76, 15, 189"}}>Most Rated Movies</h6> {/* عنوان القسم */}
      <div className="row"> {/* شبكة الأفلام */}
      {movies.map((movie) => (
        <div className="col-6 col-sm-4 col-lg-3" key={movie._id}> {/* كل عمود يحتوي على بوستر فيلم */}
            <Link to={`/movies/${movie._id}`} style={{ textDecoration: 'none' }}> 
            <div className="card mb-4" style={{ boxSizing: "border-box", borderRadius: "10px" ,position:"relative",display:"flex",alignItems:"center"}}>
            <div className="position-absolute top-0 start-0 p-2" style={{ backgroundColor: "rgba(0,0,0,0.6)", color: "#fff", fontSize: "12px",borderRadius:"25px" }}>
              {<strong>{movie.release_date.slice(0,10)}</strong>}<FaCalendarAlt style={{color:"yellowgreen",width:"20px",height:"15px"}}/>
            </div>
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
