import React, {useEffect, useState} from 'react';
import ProductCard from "../../../components/card/ProductCard";
import axios from "axios";
import {Backdrop, CircularProgress, Grid, Pagination} from "@mui/material";
import Button from "@mui/material/Button";
import {pink} from "@mui/material/colors";
import {useNavigate} from "react-router-dom";

const GenreFilm = ({genre,type}) => {

    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [product, setProduct] = useState([]);
    const [pagecount, setpagecount] = useState([]);
    const [page, setPage] = React.useState(1);

    const url = `https://api.themoviedb.org/3/discover/${type}?api_key=7220ce44fed075da0c331991d5c64c0d&language=fr-FR&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&with_genres=${genre}`
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
    }, [page, type])

    const handleChange = (event, value) => {
        setPage(value);
    }
    const titre = (text) => {
        let result = text.substr(0, 15)
        if (text.length > 15) {
            return `${result}...`
        } else {
            return result
        }
    }
    let navigate = useNavigate();

    function handleClick() {
        if (type === "movie") {
            navigate(`/film/recherche`)

        } else {
            navigate(`/serie/recherche`)
        }
    }

    if (error) {
        return <h1>Erreur de chargement veuiller recharger la page</h1>
    } else if (!isLoaded) {
        return (
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={true}>
                <CircularProgress color="inherit" />
            </Backdrop>
        )
    } else {
        return (<>
            <Button
                variant="contained"
                sx={{
                    my: 2, color: 'white', display: 'block', backgroundColor: pink[900], marginLeft: 2
                }}
                onClick={handleClick}

            >
                Rechercher une film
            </Button>
            <Grid container spacing={{xs: 1, md: 1}} columns={{xs: 12, sm: 12, md: 12}}>
                {product.map((products) => (
                    <Grid item xs={6} sm={4} md={2}>

                        <ProductCard sx={{boxShadow: 6,}}
                                     products={products}
                                     type={type}

                        />
                    </Grid>

                ))}
            </Grid>


            <Pagination count={pagecount} page={page} onChange={handleChange} color="primary"/>

        </>)

    }

};


export default GenreFilm;
