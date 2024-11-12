import { Link } from 'react-router-dom'; // استيراد Link من react-router-dom
import { useState } from 'react'; // استيراد useState
import { MovieSearchForm } from "./SearchBar";

export function NavBar() {
  const [activeLink, setActiveLink] = useState(''); // تتبع الرابط النشط

  // دالة لتحديث الرابط النشط عند النقر
  const handleLinkClick = (link) => {
    setActiveLink(link);
  };

  return (
    <nav className="navbar navbar-expand-lg px-0 box-shadow position-fixed" style={{ left: "0", top: "0", right: "0", zIndex: "88888888", background: "rgb(76, 15, 189)" }}>
      <div className="container-fluid px-0 mx-0">
        <Link className="navbar-brand text-white fs-3 custome-simple-logo ms-2" to="/" style={{ marginRight: "auto" }}>
          Filmac
        </Link>
        <button
          className="navbar-toggler me-2"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse justify-content-end" id="navbarSupportedContent">
          <ul className="navbar-nav mb-0 mb-lg-0 align-items-center px-md-0 pe-lg-2 cutsome-toggle flex-column-sm px-2 me-lg-2" style={{ borderRadius: "4px", fontSize: '18px',background:"#0a0a33" }}>
            <li
              className={`nav-item links-nav fs-5 navigate-custome-style ml-10 w-mdd-100 ${activeLink === '/' ? 'active' : ''}`}
              onClick={() => handleLinkClick('/')}
            >
         <Link className="nav-link text-white text-start px-lg-3 py-md-1 text-s-91" to="/">
             <i className="bi bi-house-door fs-4"></i>
             </Link>
            </li>
          
            <li
              className={`nav-item links-nav navigate-custome-style w-mdd-100 ${activeLink === 'anime' ? 'active' : ''}`}
              onClick={() => handleLinkClick('anime')}
            >
            <Link className="nav-link text-white fs-20 text-start  py-2 text-s-91" to="/anime">          
             Anime
             </Link>
            </li>
            <li
              className={`nav-item links-nav navigate-custome-style w-mdd-100  ${activeLink === 'action' ? 'active' : ''}`}
              onClick={() => handleLinkClick('action')}
            >
       <Link className="nav-link text-white fs-20 text-start  py-2 text-s-91" to="/action">
             Action
       </Link>
            </li>
            <li
              className={`nav-item links-nav navigate-custome-style me-lg-2 w-mdd-100  ${activeLink === 'comedy' ? 'active' : ''}`}
              onClick={() => handleLinkClick('comedy')}
            >
        <Link className="nav-link text-white fs-20 text-start  py-2 text-s-91" to="/comdey">
             Comedy
             </Link>
            </li>
            
       <li className='my-lg-0 my-2 mb-3 w-mdd-100'>
       <MovieSearchForm />
       </li>

          </ul>
        
        </div>
      </div>
    </nav>
  );
}
