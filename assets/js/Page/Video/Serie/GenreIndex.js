import React from 'react';
import {Link, Route, useNavigate} from "react-router-dom";
import GenreSerie from "./GenreSerie";
import Button from "@mui/material/Button";
import {pink} from "@mui/material/colors";

const GenreSerieIndex = () => {
    const k = [
        {"name": "Action & Adventure", "id":10759,"path":"Action&Adventure"},
        {"name": "Animation", "id":16,"path":"Animation"},
        {"name": "Comédie", "id":35,"path":"Comedy"},
        {"name": "Crime", "id":80,"path":"Crime"},
        {"name": "Documentaire", "id":99,"path":"Documentary"},
        {"name": "Drame", "id":18,"path":"Drama"},
        {"name": "Familial", "id":10751,"path":"Family"},
        {"name": "Kids", "id":10762,"path":"Kids"},
        {"name": "Mystère", "id":9648,"path":"Mystery"},
        {"name": "News", "id":10763,"path":"News"},
        {"name": "Reality", "id":10764,"path":"Reality"},
        {"name": "Science-Fiction & Fantastique", "id":10765,"path":"Sci-Fi&Fantasy"},
        {"name": "Soap", "id":10766,"path":"Soap"},
        {"name": "Talk", "id":10767,"path":"Talk"},
        {"name": "War & Politics", "id":10768,"path":"War&Politics"},
        {"name": "Western", "id":37,"path":"Western"}
    ]
    let navigate = useNavigate();

    function handleClick()
    {
        navigate(`film/genre/action`)
    }

    return (
        k.map((genres) => (
                <Button
                    variant="contained"
                    sx={{
                        my: 2,
                        color: 'white',
                        display: 'block',
                        backgroundColor: pink[900],
                        marginLeft: 2
                    }}
                    onClick={() => {
                        navigate(`/serie/genre/${genres.path.toLowerCase().replace(" ", "")}`)
                    }}
                >
                    {genres.name}
                </Button>
            )
        )
    );
};

export default GenreSerieIndex;
