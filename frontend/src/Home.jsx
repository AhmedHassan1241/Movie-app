import "./App.css";
import "./style.css";
import { CardsFilm } from "./cardsFilm.jsx";
import "bootstrap/dist/css/bootstrap.min.css";

export function Home() {
  return (
    <div>
      <div className=" col-lg-12  m-lg-auto ">
        <CardsFilm />
      </div>
    </div>
  );
}
