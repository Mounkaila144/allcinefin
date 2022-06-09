import React, {useEffect, useState} from 'react';
import ProductCard from "../../../components/card/ProductCard";
import axios from "axios";
import {Pagination} from "@mui/material";

const Serie = ({types}) => {

    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [product, setProduct] = useState([]);
    const [pagecount, setpagecount] = useState([]);
    const [page, setPage] = React.useState(1);

    const url=`https://api.themoviedb.org/3/tv/${types}?page=${page}&api_key=7220ce44fed075da0c331991d5c64c0d&language=fr-FR`
    const getData =async () => {
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
    }, [page,types])

    const handleChange = (event, value) => {
        setPage(value);
    }
    if (error){
        return <h1>eror</h1>
    }
    else if (!isLoaded){
        return <h1>chargement...</h1>
    }
    else{
    return (
        <>
            {
                product.map((products) => (
                        <ProductCard title={products.name} img={`https://image.tmdb.org/t/p/w500${products.poster_path}`}/>
                    )
                )
            }

            <Pagination count={pagecount} page={page} onChange={handleChange}  color="primary" />

        </>
    )
}
};

export default Serie;
