import React, {useEffect, useState} from "react";
import ProductCard from "../card/ProductCard";
import {pink} from "@mui/material/colors";
import Button from "@mui/material/Button";
import ReactPaginate from "react-paginate";
import {Pagination} from "@mui/material";
import axios from "axios";
import {Route} from "react-router-dom";
import GenreFilm from "../../Page/Video/Film/GenreFilm";

const App = () => {
    const [name, setName] = useState("mkl");
    const handleChange=(e)=> {
        setName(e.target.value)
    }
    return (

        <div>
            <label>Nom :</label>
            <input type="text" value={name} onChange={handleChange} />
            <h1>{name}</h1>
        </div>

    )

};

export default App
