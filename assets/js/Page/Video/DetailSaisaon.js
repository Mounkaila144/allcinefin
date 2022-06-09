import React, {useState} from 'react';
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import {pink} from "@mui/material/colors";
import DoneIcon from "@mui/icons-material/Done";
import {useCart} from "react-use-cart";
import {useIsAuthenticated} from "react-auth-kit";
import {useNavigate} from "react-router-dom";
import Buttondetail from "./Serie/buttonsaison";



const DetailSaison = ({product,saison}) => {

    return (
        <Box component="div" sx={{overflow: 'auto', marginTop: 2, fontSize: 15}}>

            Saison : {saison.map((genres) => (
               <Buttondetail genres={genres} product={product}/>

        ))}
        </Box>
    );
};

export default DetailSaison;