import React, {useEffect, useState} from 'react';
import axios from "axios";
import {Backdrop, CircularProgress, createTheme, Grid} from "@mui/material";
import {useNavigate, useParams} from "react-router-dom";
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import {pink} from "@mui/material/colors";
import Moment from 'moment'
import Button from "@mui/material/Button";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import DoneIcon from "@mui/icons-material/Done";
import {useCart} from "react-use-cart";
import {useIsAuthenticated} from "react-auth-kit";


const Detail = ({types}) => {
    const {addItem, removeItem, inCart} = useCart();
    const auth = useIsAuthenticated()
    let navigate = useNavigate();



    let params = useParams();

    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [product, setProduct] = useState([]);
    const [pagecount, setpagecount] = useState([]);
    const [genre, setGenre] = useState([])
    const [saison, setSaison] = useState([])
    const url = `https://api.themoviedb.org/3/${types}/${params.id}?api_key=7220ce44fed075da0c331991d5c64c0d&language=fr-FR`
    const getData = async () => {
        axios
            .get(url)
            .then((res) => {
                setIsLoaded(true);
                setProduct(res.data);
                setGenre(res.data["genres"]);
                setSaison(res.data["seasons"]);
                setpagecount(50)

            }, (error) => {
                setIsLoaded(true);
                setError(error);
            })
    }

    useEffect(() => {
        getData()
    }, [])
    const handleChange = (event, value) => {


        setPage(value);
    }
    const a = (date) => {
        return Moment(date).format('DD-MM-YYYY')
    }
    if (error) {
        return <h1>Erreur de chargement veuiller recharger la page</h1>
    } else if (!isLoaded) {
        return (
            <Backdrop
                sx={{color: 'black', zIndex: (theme) => theme.zIndex.drawer + 1}}
                open={true}>
                <CircularProgress color="inherit"/>
            </Backdrop>
        )
    } else {
        return (<>
            <Grid container direction={"column"} alignContent={"center"} justifyContent={"center"}>
                <Grid item xs={6}>
                    <Box
                        sx={{display: {xs: 'flex', md: 'none'}, maxWidth: 500}}>
                        <Card sx={{
                            borderRadius: '4%',
                            boxShadow: 3
                        }}>
                            <CardMedia sx={{
                                borderRadius: '4%',
                            }}
                                       component="img"
                                       image={`https://image.tmdb.org/t/p/w300${product.poster_path}`}
                                       alt="green iguana"
                            />
                            {types === "movie" ? <CardContent
                                    sx={{}}
                                >
                                    <Box component="div" sx={{overflow: 'auto', fontSize: 20, color: pink[500]}}>
                                        {product.title}
                                    </Box><Box component="div" sx={{overflow: 'auto', marginTop: 3}}>
                                    {product.overview}
                                </Box>
                                    <Box component="div" sx={{overflow: 'auto', marginTop: 2, fontSize: 15}}>
                                        Date : du {a(product.first_air_date)} au {a(product.last_air_date)}
                                    </Box>
                                    <Box component="div" sx={{overflow: 'auto', marginTop: 2, fontSize: 15}}>
                                        Genre : {genre.map((genres) => (
                                        `${genres.name} `))}
                                    </Box>


                                </CardContent> :
                                <CardContent
                                    sx={{}}
                                >
                                    <Box component="div" sx={{overflow: 'auto', fontSize: 20, color: pink[500]}}>
                                        {product.name}
                                    </Box><Box component="div" sx={{overflow: 'auto', marginTop: 3}}>
                                    {product.overview}
                                </Box>
                                    <Box component="div" sx={{overflow: 'auto', marginTop: 2, fontSize: 15}}>
                                        Date : du {a(product.first_air_date)} au {a(product.last_air_date)}
                                    </Box>
                                    <Box component="div" sx={{overflow: 'auto', marginTop: 2, fontSize: 15}}>
                                        Genre : {genre.map((genres) => (
                                        `${genres.name} `))}
                                    </Box>
                                    <Box component="div" sx={{overflow: 'auto', marginTop: 2, fontSize: 15}}>
                                        Saison : {saison.map((genres) => (
                                        <Button

                                            variant="contained"
                                            sx={{
                                                marginLeft:1,
                                                marginTop: 1,
                                                backgroundColor: inCart(genres.id) ? "#1b5e20" : "#006064",
                                            }}
                                            onClick={() => {
                                                if (auth()) {
                                                        inCart(genres.id) ? removeItem(genres.id) : addItem({
                                                            'nom': `${product.name} : ${genres.name}`,
                                                            'price': 500,
                                                            'id': genres.id,
                                                            'type': 'serie'
                                                        })
                                                } else {
                                                    navigate(`/login`)
                                                }
                                            }}
                                        >
                                            <AddShoppingCartIcon
                                                sx={{color: pink[500]}}
                                            />{inCart(genres.id) ? <>{genres.name}<DoneIcon/></> : "Ajouter "+ genres.name}
                                        </Button>

                                    ))}
                                    </Box>

                                </CardContent>}


                        </Card>
                    </Box>

                    <Card sx={{display: {xs: 'none', md: 'flex'}, maxWidth: 1000,}}>
                        <Box sx={{display: 'flex', flexDirection: 'column'}}>
                            {types === "movie" ? <CardContent sx={{flex: '1 0 auto'}}>
                                    <Typography sx={{color: pink[400]}} component="div" variant="h3">
                                        {product.title}
                                    </Typography>
                                    <Box component="div" sx={{overflow: 'auto', marginTop: 5, fontSize: 15}}>
                                        {product.overview}
                                    </Box>
                                    <Box component="div" sx={{overflow: 'auto', marginTop: 5, fontSize: 20}}>
                                        Date : du {a(product.first_air_date)} au {a(product.last_air_date)}
                                    </Box>
                                    <Box component="div" sx={{overflow: 'auto', marginTop: 5, fontSize: 20}}>
                                        Genre : {genre.map((genres) => (
                                        `${genres.name} `))}
                                    </Box>
                                </CardContent> :

                                <CardContent sx={{flex: '1 0 auto'}}>
                                    <Typography sx={{color: pink[400]}} component="div" variant="h3">
                                        {product.name}
                                    </Typography>
                                    <Box component="div" sx={{overflow: 'auto', marginTop: 5, fontSize: 15}}>
                                        {product.overview}
                                    </Box>
                                    <Box component="div" sx={{overflow: 'auto', marginTop: 5, fontSize: 20}}>
                                        Date : du {a(product.first_air_date)} au {a(product.last_air_date)}
                                    </Box>
                                    <Box component="div" sx={{overflow: 'auto', marginTop: 5, fontSize: 20}}>
                                        Genre : {genre.map((genres) => (
                                        `${genres.name} `))}
                                    </Box>
                                    <Box component="div" sx={{overflow: 'auto', marginTop: 2, fontSize: 15}}>
                                        Saison : {saison.map((genres) => (
                                        <Button

                                            variant="contained"
                                            sx={{
                                                marginLeft:1,
                                                marginTop: 1,
                                                backgroundColor: inCart(genres.id) ? "#1b5e20" : "#006064",
                                            }}
                                            onClick={() => {
                                                if (auth()) {
                                                        inCart(genres.id) ? removeItem(genres.id) : addItem({
                                                            'nom': `${product.name} : ${genres.name}`,
                                                            'price': 500,
                                                            'id': genres.id,
                                                            'type': 'serie'
                                                        })
                                                } else {
                                                    navigate(`/login`)
                                                }
                                            }}
                                        >
                                            <AddShoppingCartIcon
                                                sx={{color: pink[500]}}
                                            />{inCart(genres.id) ? <>{genres.name}<DoneIcon/></> : "Ajouter "+ genres.name}
                                        </Button>

                                    ))}
                                    </Box>

                                </CardContent>}
                        </Box>
                        <CardMedia
                            component="img"
                            sx={{width: 300}}
                            image={`https://image.tmdb.org/t/p/w300${product.poster_path}`}
                            alt={product.title}
                        />
                    </Card>
                </Grid>
            </Grid>

        </>)
    }
};

export default Detail;
