import React, { useEffect, useState } from 'react'
import { ComdeyFilm } from './../ComdeyFilm';

const ComdeyPage = () => {
    const [pageN,setPageN] = useState({
        page:1,
        totalPages:1
    })
    

    useEffect(() => {
      fetch('http://localhost:8080/movies/category/670874a74d96e86e905c2e8a?limit=12')
      .then(response => response.json())
        .then(data => setPageN({...pageN,totalPages:data.totalPages}))
        .catch(error => console.error('Error fetching movies:', error));
    }, []);
  return (
    <>
<ComdeyFilm limit={12} page={pageN.page} totalPages={pageN.totalPages}/>
<div>
<nav aria-label="Page navigation" style={{backgroundColor:"white",borderRadius:"5px",margin:"10px 0",display:"flex",justifyContent:"center" ,alignItems:"center"}}>
  <ul className="pagination pagination-sm my-1" >
  {(pageN.totalPages > 1) ? (
              Array.from({ length: pageN.totalPages }, (_, index) => (
              <li
                key={index}
                className={`page-item ${
                  pageN.page === index + 1 ? "active" : ""
                }`}
                aria-current="page"
              >
                <button
                  className="page-link"
                  onClick={() => {
                    setPageN({ ...pageN, page: index + 1 });
                  }}
                >
                  {index + 1}
                </button>
              </li>
            ))):""}
  </ul>
</nav> 
</div>
    </>
  )
}

export default ComdeyPage
