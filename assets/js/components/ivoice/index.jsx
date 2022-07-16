import React, {useEffect, useState} from "react";
import logo from './logo.png'
import {Link, Outlet} from "react-router-dom";
import { useParams } from "react-router-dom";


export default function Invoices() {
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
        <div style={{ display: "flex" }}>
            <nav
                style={{
                    borderRight: "solid 1px",
                    padding: "1rem"
                }}
            >
                {product.map(products => (
                    <Link
                        style={{ display: "block", margin: "1rem 0" }}
                        to={`${products.id}`}
                        key={products.id}
                    >
                        {products.nom}
                    </Link>
                ))}
            </nav>
            <Outlet />
        </div>
    );
}
