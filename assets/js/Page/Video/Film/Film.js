import React, {useEffect, useRef, useState} from 'react';
import ProductCard from "../../../components/card/ProductCard";
import axios from "axios";
import {Backdrop, CircularProgress, Grid, Pagination} from "@mui/material";
import {Link, useNavigate, useOutletContext} from "react-router-dom";
import {pink} from "@mui/material/colors";
import Box from "@mui/material/Box";
import Search from "../../../components/header/Search";
import Button from "@mui/material/Button";
import GridVideo from "../../../components/grid/Grid";

const Film = ({types, type}) => {

    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [product, setProduct] = useState([]);
    const [pagecount, setpagecount] = useState([]);
    const [page, setPage] = React.useState(1);
    const [search, setsearch] = useState("");
    const initial =useRef(false);


    const url = `https://api.themoviedb.org/3/${type}/${types}?page=${page}&api_key=7220ce44fed075da0c331991d5c64c0d&language=fr-FR`
    const urls=`https://api.themoviedb.org/3/search/${type}?api_key=7220ce44fed075da0c331991d5c64c0d&language=fr-FR&query=${search}`

    const getData = async () => {
        axios
            .get(url)
            .then((res) => {
                setIsLoaded(true);
                setProduct(res.data['results']);
                setpagecount(50)

            }, (error) => {
                setIsLoaded(true);
                setError(error);
            })
    }

    const Searche = async () => {
        axios
            .get(urls)
            .then((res) => {
                setIsLoaded(true);
                setProduct(res.data['results']);
                setpagecount(5)

            }, (error) => {
                setIsLoaded(true);
                setError(error);
            })
    }

    useEffect(() => {
        if (initial.current){
            Searche()
            window.scrollTo(0, 0);
        }
        else {
initial.current=true
        }

    }, [search])

    useEffect(() => {
        getData()
        window.scrollTo(0, 0);

    }, [page, types, type])



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

            <Grid container spacing={{xs: 1, md: 1}} columns={{xs: 12, sm: 12, md: 12}}>
                <Grid item xs={8} sm={5} md={3} width={30}>

                   <Search setsearch={setsearch}/>

                </Grid>
            </Grid>
            <Grid container spacing={{xs: 1, md: 1}} columns={{xs: 12, sm: 12, md: 12}}>
                {product.slice(0,18).map((products) => (
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

export default Film;
