import React, {useEffect, useState} from 'react';
import ProductCard from "../../../components/card/ProductCard";
import axios from "axios";
import {Pagination} from "@mui/material";

const GenreSerie = ({genre}) => {

    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [product, setProduct] = useState([]);
    const [pagecount, setpagecount] = useState([]);
    const [page, setPage] = React.useState(1);

    const url = `https://api.themoviedb.org/3/discover/tv?api_key=7220ce44fed075da0c331991d5c64c0d&language=fr-FR&sort_by=popularity.desc&page=${page}&timezone=America%2FNew_York&with_genres=${genre}&include_null_first_air_dates=false&with_watch_monetization_types=flatrate&with_status=0&with_type=0`
    const getData = async () => {
        axios
            .get(url)
            .then(
                (res) => {
                    setIsLoaded(true);
                    setProduct(res.data['results']);
                    setpagecount(50)

                },
                (error) => {
                    setIsLoaded(true);
                    setError(error);
                }
            )
    }

    useEffect(() => {
        getData()
        window.scrollTo(0, 0);
    }, [page])

    const handleChange = (event, value) => {
        setPage(value);
    }
    return (
        <>
            {
                product.map((products) => (
                        <ProductCard title={products.title} img={`https://image.tmdb.org/t/p/w500${products.poster_path}`}/>
                    )
                )
            }

            <Pagination count={pagecount} page={page} onChange={handleChange} color="primary"/>

        </>
    )

};

export default GenreSerie;
