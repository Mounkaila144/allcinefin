import React, {useState} from 'react';
import {BrowserRouter, Route, Routes, useParams} from "react-router-dom";
import App from "./Page/App";
import Film from "./Page/Video/Film/Film";
import GenreFilm from "./Page/Video/Film/GenreFilm";
import Serie from "./Page/Video/Serie/Serie";
import GenreFilmIndex from "./Page/Video/Film/GenreIndex";
import GenreSerieIndex from "./Page/Video/Serie/GenreIndex";
import Detail from "./Page/Video/Detail";
import Recherche from "./Page/Video/Recherche";
import Original from "./Page/Materiel/Original";
import DetailMateriel from "./Page/Materiel/DetailMateriel";
import Panier from "./Page/Panier";
import Extrait from "./Page/Extrait";
import Login from "./Page/Login";
import {RequireAuth} from 'react-auth-kit'
import Menu from "./Page/Menu";
import GenreSerie from "./Page/Video/Serie/GenreSerie";
import Template from "./Page/Template";
import TemplateOut from "./Page/TemplateOut";


const RouteApp = () => {
    const [token, setToken] = useState([]);
    const k = [
        {"id": 28, "name": "Action"},
        {"id": 12, "name": "Adventure"},
        {"id": 16, "name": "Animation"},
        {"id": 35, "name": "Comedy"},
        {"id": 80, "name": "Crime"},
        {"id": 99, "name": "Documentary"},
        {"id": 18, "name": "Drama"},
        {"id": 10751, "name": "Family"},
        {"id": 14, "name": "Fantasy"},
        {"id": 36, "name": "History"},
        {"id": 27, "name": "Horror"},
        {"id": 10402, "name": "Music"},
        {"id": 9648, "name": "Mystery"},
        {"id": 10749, "name": "Romance"},
        {"id": 878, "name": "ScienceFiction"},
        {"id": 10770, "name": "TVMovie"},
        {"id": 53, "name": "Thriller"},
        {"id": 10752, "name": "War"},
        {"id": 37, "name": "Western"}
    ]
    const k2 = [
        {"id": 10759, "name": "Action&Adventure"},
        {"id": 16, "name": "Animation"},
        {"id": 35, "name": "Comedy"},
        {"id": 80, "name": "Crime"},
        {"id": 99, "name": "Documentary"},
        {"id": 18, "name": "Drama"},
        {"id": 10751, "name": "Family"},
        {"id": 10762, "name": "Kids"},
        {"id": 9648, "name": "Mystery"},
        {"id": 10763, "name": "News"},
        {"id": 10764, "name": "Reality"},
        {"id": 10765, "name": "Sci-Fi&Fantasy"},
        {"id": 10766, "name": "Soap"},
        {"id": 10767, "name": "Talk"},
        {"id": 10768, "name": "War&Politics"},
        {"id": 37, "name": "Western"}]
    let params = useParams();
    return (
        <BrowserRouter>
            <Routes>
                <Route path={"/*"} element={<App/>}/>
                <Route path={"/extrait"} element={<Template content={<Extrait/>}/>}/>
                <Route path="login" element={<Template content={<Login token={token} setToken={setToken}/>}/>}/>
                <Route path="film" element={<TemplateOut/>}>
                    <Route path={":id"} element={<Detail types={"movie"}/>}/>
                    <Route path={"genrelist"} element={<GenreFilmIndex/>}/>
                    <Route path={"recherche"} element={<Recherche types={"movie"}/>}/>
                    <Route path={"popular"} element={<Film types={"popular"} type={"movie"}/>}/>
                    <Route path={"top"} element={<Film types={"top_rated"} type={"movie"}/>}/>
                    <Route path={"new"} element={<Film types={"upcoming"} type={"movie"}/>}/>
                    {
                        k.map((genres) => (
                                <Route key={genres.id} path={"genre/" + genres.name.toLowerCase().replace(" ", "")}
                                       element={<GenreFilm genre={genres.id} type={"movie"}/>}/>
                            )
                        )
                    }
                </Route>
                <Route path="serie" element={<TemplateOut/>}>
                    <Route path={"recherche"} element={<Recherche types={"tv"}/>}/>
                    <Route path={":id"} element={<Detail types={"tv"}/>}/>
                    <Route path={"popular"} element={<Film types={"popular"} type={"tv"}/>}/>
                    <Route path={"top"} element={<Film types={"top_rated"} type={"tv"}/>}/>
                    <Route path={"new"} element={<Film types={"on_the_air"} type={"tv"}/>}/>
                    <Route path={"genrelist"} element={<GenreSerieIndex/>}/>
                    {
                        k2.map((genres) => (
                                <Route key={genres.id} path={"genre/" + genres.name.toLowerCase().replace(" ", "")}
                                       element={<GenreFilm type={"tv"} genre={genres.id}/>}/>
                            )
                        )
                    }
                </Route>
                <Route path="materiel" element={<TemplateOut/>}>
                    <Route path={"original"} element={<Original/>}/>
                    <Route path={":id"} element={<DetailMateriel/>}/>

                </Route>
                <Route path="menu" element={<App/>}/>
                <Route path={"panier"}
                       element={
                    <Template content={<RequireAuth loginPath={'login'}>
                                   <Panier token={token} setToken={setToken}/>
                               </RequireAuth>}/>
                       }/>

                           </Routes>
                           </BrowserRouter>
                           );
                       };

                export default RouteApp;
