import * as React from 'react';
import Box from '@mui/material/Box';
import Header from "../components/header/index";
import {Grid} from "@mui/material";
import * as PropTypes from "prop-types";
import {pink} from "@mui/material/colors";
import {useEffect, useState} from "react";
import axios from "axios";
import ProductCard from "../components/card/ProductCard";


function Item(props) {
    return null;
}

Item.propTypes = {
    elevation: PropTypes.number,
    children: PropTypes.node
};



export default function Produis() {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [product, setProduct] = useState([]);

    // Remarque : le tableau vide de dépendances [] indique
    // que useEffect ne s’exécutera qu’une fois, un peu comme
    // componentDidMount()
    useEffect(() => {
        fetch("https://allcine227.com/api/articles.json")
            .then(res => res.json())
            .then(
                (result) => {
                    setIsLoaded(true);
                    setProduct(result);
                },
                // Remarque : il faut gérer les erreurs ici plutôt que dans
                // un bloc catch() afin que nous n’avalions pas les exceptions
                // dues à de véritables bugs dans les composants.
                (error) => {
                    setIsLoaded(true);
                    setError(error);
                }
            )
    }, [])
       return (
        <Box
            sx={{
                width: '100%',
                '& > .MuiBox-root > .MuiBox-root': {
                    p: 1,
                    borderRadius: 2,
                    fontSize: '0.875rem',
                    fontWeight: '700',
                },
            }}
        >
            <Box
                sx={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(1, 1fr)',
                    gap: 1,
                    gridTemplateRows: 'auto',
                    gridTemplateAreas: `"header header header header"
        "main main . sidebar"`,
                }}
            >
                <Box sx={{ gridArea: 'header' }}><Header/></Box>
                <Box sx={{
                    bgcolor:pink[800],
                    display: 'grid',
                    columnGap: 2,
                    rowGap: 1,
                    boxShadow: 6,
                    gridTemplateColumns: {
                        xs: '1fr 1fr' ,
                        sm: '1fr 1fr 1fr' ,
                        md: '1fr 1fr 1fr 1fr' ,
                        lg: '1fr 1fr 1fr 1fr 1fr'
                    },
                }}>{
                    product.map((products)=>(
                            <ProductCard title={products.nom}/>
                        )
                    )}



                </Box>
                <Box sx={{ gridArea: 'sidebar', bgcolor: 'error.main' }}>
                    <Box sx={{
                        bgcolor: pink[800],
                        display: 'grid',
                        columnGap: 2,
                        rowGap: 1,
                        gridTemplateColumns: {
                            xs: '0fr ' ,
                            sm: '1fr ' ,
                            md: '1fr 1fr',
                            lg: '1fr 1fr'
                        },
                    }}>

                    </Box>
                </Box>
            </Box>
        </Box>
    );
}
