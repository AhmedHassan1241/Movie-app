import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom'; // استيراد Link من react-router-dom

export const MovieSearchForm = () => {
  const [movieData, setMovieData] = useState(null);
  const location = useLocation();

  // استخراج الـ query params
  const getQueryParam = (param) => {
    return new URLSearchParams(location.search).get(param);
  };

  useEffect(() => {
    // استخراج الـ title من الـ query params
    const title = getQueryParam('title');
    if (title) {
      fetch(`http://localhost:8080/movies/search/movie?title=${title}`)
        .then((response) => response.json())
        .then((data) => {
          setMovieData(data); // تخزين بيانات الفيلم
          console.log('Fetched data:', data); // هنا يمكن عرض البيانات بعد استرجاعها
        })
        .catch((error) => console.error('Error:', error));
    } else {
      console.error('Error fetching movie Title');
    }
  }, [location.search]);

  // استخدام useEffect لمراقبة movieData
  useEffect(() => {
    if (movieData) {
      console.log('Movie data updated:', movieData);
    }
  }, [movieData]);

  // استخدام map بدلاً من for...of لعرض الكروت
  function cardsFilm() {
    if (!movieData || !Array.isArray(movieData)) {
      return <div style={{color:'#ccc',margin:"20px 0"}}>No data available.</div>;
    }
    return(
        <div className="container-fluid mt-5 box-shadoww rounded-1" style={{background:"#ede5e5",paddingTop:"1rem"}} > {/* تعيين خلفية بيضاء */}
      <h6 className="text-start fw-bold mt-0" style={{padding:"0 0 13px 4px",borderBottom:"1px solid #0000ff2b",color:"rgb(76, 15, 189"}}>Results of the search for {getQueryParam('title')}</h6> {/* عنوان القسم */}
        <div className="row justify-content-md-center gx-md-3" style={{gap:"2rem"}}> {/* شبكة الأفلام */}
         {movieData.map((movie) => (
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
    )
  }

  return <>{cardsFilm()}</>;
};
