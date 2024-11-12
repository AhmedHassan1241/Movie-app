import  {RomanceFilm} from './RomanceFilm';
import  {DramaFilm} from './DramaFilm';
import  {ActionFilm} from './ActionFilm';
import { AnimeFilm } from "./AnimeFilm"
import {AdventureFilm} from "./AdventureFilm"
import {ComdeyFilm} from "./ComdeyFilm"
// import {HistoricalFilm} from "./HistoricalFilm"
import { ThrillerFilm } from './ThrillerFilm';
export function CardsFilm() {

  return (
    <>
    <ActionFilm />
    <DramaFilm />
    <AnimeFilm/>
    <ComdeyFilm/>
    <RomanceFilm/>
    <AdventureFilm/>
    <ThrillerFilm/>
    {/* <HistoricalFilm/> */}
    </>
  );
}
