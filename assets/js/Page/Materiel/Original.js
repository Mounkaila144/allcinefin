import React, {useEffect, useState} from 'react';
import axios from "axios";
import {Grid, Pagination} from "@mui/material";
import ProductCard from "../../components/card/ProductCard";
import Button from "@mui/material/Button";
import {pink} from "@mui/material/colors";
import {Link} from "react-router-dom";
import MaterialCard from "../../components/card/MaterialCard";
import {SearchField} from "@react-spectrum/searchfield";
import Search from "../../components/header/Search";

const Original = () => {

    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [product, setProduct] = useState([]);
    const [pagecount, setpagecount] = useState(0);
    const [page, setPage] = React.useState(1);


    const url=`https://allcine227.com/api/articles.json?page=${page}`
    const getData =async () => {
        axios
            .get(url,{
                headers:{
                    "name":"",
                    "password":""
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

    const handleChange = (event, value) => {
        setPage(value);
    }
        return (
            <>
                <Grid container spacing={{xs: 1, md: 1}} columns={{xs: 12, sm: 12, md: 12}}>
                    <Grid item xs={8} sm={5} md={3} width={30}>

                        <Search/>

                    </Grid>
                </Grid>
                <Grid container spacing={{xs: 1, md: 1}} columns={{xs: 12, sm: 12, md: 12}}>
                    {product.map((products) => (
                        <Grid item xs={6} sm={4} md={2}>
                                <MaterialCard sx={{boxShadow: 6,}}
                                              products={products}
                                />
                        </Grid>

                    ))}
                </Grid>


                <Pagination count={pagecount} page={page} onChange={handleChange}  color="primary" />

            </>
    )

};

export default Original;
