import React, {useEffect, useState} from 'react';
import {AudioCard, VideoCard} from 'material-ui-player'
import axios from "axios";
import {CardActions, Grid, Pagination} from "@mui/material";
import Search from "../components/header/Search";
import MaterialCard from "../components/card/MaterialCard";
import Plyr from 'plyr-react'
import 'plyr-react/dist/plyr.css'
import image from "../components/card/V4.jpg"
import {Link} from "react-router-dom";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import {pink} from "@mui/material/colors";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import DoneIcon from "@mui/icons-material/Done";
import Card from "@mui/material/Card";


const Extrait = () => {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [product, setProduct] = useState([]);
    const [pagecount, setpagecount] = useState(0);
    const [page, setPage] = React.useState(1);


    const url = `https://allcine227.com/api/pubs.json?page=${page}`
    const getData = async () => {
        axios
            .get(url, {
                headers: {
                    "name": "",
                    "password": ""
                }
            })
            .then(
                (res) => {
                    setIsLoaded(true);
                    setProduct(res.data);
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


    return (
        <Grid container spacing={{xs: 2, md: 2}} columns={{xs: 12, sm: 12, md: 12}}>
            {product.slice(0, 18).map((products) => (
                <Grid item xs={12} sm={12} md={12}>
                    <Card sx={{
                        borderRadius: '4%',
                        boxShadow: 3
                    }}>
                        <Plyr
                            source={{
                                type: 'video',
                                title: products.nom,
                                sources: [
                                    {
                                        src: `https://allcine227.com/video/${products.videoName}`,
                                        type: 'video/mp4',
                                        size: 360,
                                    },
                                ],
                                poster: `https://allcine227.com/image/video/${products.imageName}`,
                            }}
                        />
                        <CardActions
                            sx={{}}
                        >
                            <h3>{products.nom}</h3>

                        </CardActions>
                    </Card>
                </Grid>

            ))}
        </Grid>
    )

};
export default Extrait;