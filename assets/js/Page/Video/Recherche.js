import React, {useEffect, useState} from 'react';
import axios from "axios";
import {Autocomplete, Pagination, TextField} from "@mui/material";
import {Link} from "react-router-dom";
import {pink} from "@mui/material/colors";
import Box from "@mui/material/Box";
import ProductCard from "../../components/card/ProductCard";
import {useForm} from "react-hook-form";
import Search from "../../components/header/Search";

const Film = ({types}) => {

    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [product, setProduct] = useState([]);
    const [pagecount, setpagecount] = useState([]);
    const [search, setsearch] = useState("");
    const [page, setPage] = React.useState(1);

    const url=`https://api.themoviedb.org/3/search/${types}?api_key=7220ce44fed075da0c331991d5c64c0d&language=fr-FR&query=${search}`
    const getData =async () => {
        axios
            .get(url)
            .then(
                (res) => {
                    setIsLoaded(true);
                    setProduct(res.data['results']);

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
    }, [search,types])

    const handleChange = (event, value) => {
        setPage(value);
    }
    const  titre=(text)=> {
        let result=text.substr(0,15)
        if (text.length>15){
            return `${result}...`
    }
        else {
            return result
        }
    }
    const handleChange1=(e)=> {
        setsearch(e.target.value)
    }
    const { register, handleSubmit } = useForm();
    const handleRegistration = (data) => setsearch(data.name);

    return (
        <>
        <Box sx={{

            marginBottom:1,
            width:250
        }}
        >
        <Search setsearch={setsearch}/>
            <h1>{search}</h1>
                </Box>
                <Box sx={{
                    display: 'grid',
                    columnGap: 2,
                    rowGap: 1,
                    marginBottom:1,
                    gridTemplateColumns: {
                        xs: '1fr 1fr' ,
                        sm: '1fr 1fr 1fr' ,
                        md: '1fr 1fr 1fr 1fr' ,
                        lg: '1fr 1fr 1fr 1fr 1fr'
                    },
                }}>
                    {
                        product.map((products) => (
                                <Link to={types === "movie" ?`/film/${products.id}`:`/serie/${products.id}`} key={`${products.id}`}>
                                    <ProductCard sx={{boxShadow: 6,}}
                                                 title={types === "movie" ? products.title : products.name}
                                                 img={`https://image.tmdb.org/t/p/w500${products.poster_path}`}/>
                                </Link>
                            )
                        )
                    }
                </Box>


            </>
    )

};

export default Film;
