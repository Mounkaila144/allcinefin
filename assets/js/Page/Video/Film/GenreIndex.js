import React from 'react';
import {Link, Route, useNavigate} from "react-router-dom";
import GenreFilm from "./GenreFilm";
import Button from "@mui/material/Button";
import {pink} from "@mui/material/colors";

const GenreFilmIndex = () => {
    const k = [
        {"path": "Action", "id": 28, "name": "Action"},
        {"path": "Adventure", "id": 12, "name": "Aventure"},
        {"path": "Animation", "id": 16, "name": "Animation"},
        {"path": "Comedy", "id": 35, "name": "Comédie"},
        {"path": "Crime", "id": 80, "name": "Crime"},
        {"path": "Documentary", "id": 99, "name": "Documentaire"},
        {"path": "Drama", "id": 18, "name": "Drame"},
        {"path": "Family", "id": 10751, "name": "Familial"},
        {"path": "Fantasy", "id": 14, "name": "Fantastique"},
        {"path": "History", "id": 36, "name": "Histoire"},
        {"path": "Horror", "id": 27, "name": "Horreur"},
        {"path": "Music", "id": 10402, "name": "Musique"},
        {"path": "Mystery", "id": 9648, "name": "Mystère"},
        {"path": "Romance", "id": 10749, "name": "Romance"},
        {"path": "ScienceFiction", "id": 878, "name": "Science-Fiction"},
        {"path": "TVMovie", "id": 10770, "name": "Téléfilm"},
        {"path": "Thriller", "id": 53, "name": "Thriller"},
        {"path": "War", "id": 10752, "name": "Guerre"},
        {"path": "Western", "id": 37, "name": "Western"}
    ]


    let navigate = useNavigate();

    function handleClick() {
        navigate(`film/genre/action`)
    }

    return (
        k.map((genres) => (
                <Button
                    color="info"
                    variant="contained"
                    sx={{
                        my: 2,
                        color: 'white',
                        display: 'block',
                        backgroundColor: pink[500],
                        marginLeft: 2
                    }}
                    onClick={() => {
                        navigate(`/film/genre/${genres.path.toLowerCase().replace(" ", "")}`)
                    }}
                >
                    {genres.name}
                </Button>
            )
        )
    );
};

export default GenreFilmIndex;
