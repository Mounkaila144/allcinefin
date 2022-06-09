import React from 'react';
import CardMedia from "@mui/material/CardMedia";

const TEst = ({img}) => {
    return (
        <CardMedia
            component="img"
            sx={{width: 300}}
            image={require('../../../../public/image/article/'+img)}
        />
    );
};

export default TEst;
