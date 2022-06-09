import React from 'react';
import { useParams } from "react-router-dom";

const Produit = () => {
    let params = useParams();
    return <h2>Invoice: {params.Id}</h2>;
};

export default Produit;
