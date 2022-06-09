import React, {useEffect, useState} from 'react';
import axios from "axios";

const DetailMateriel = () => {
    const [product, setProduct] = useState([]);
    const url=`https://allcine227.com/api/articles.json`
    const getData =async () => {
        axios
            .get(url)
            .then(
                (res) => {
                    setProduct(res.data);
                })}
    useEffect(() => {
        getData()
    }, [])

        return (
            product.map((products) => (
                    <>
                <h3>{product[1].nom}</h3>
                <h3>{product[1].description}</h3>
            </>
                ))
        )
};
export default DetailMateriel;
