import React, { useEffect } from "react";
import { CartProvider, useCart } from "react-use-cart";


// redux mapping
import { useDispatch, useSelector } from "react-redux";
import { fetchItems, itemsSelector} from "../Cart/Data";

const ItemsPage = () => {

    const { addItem } = useCart();

    const products = [
        {
            id: 1,
            nom: "Malm",
            price: 9900,
            quantity: 1
        },
        {
            id: 2,
            nom: "Nordli",
            price: 16500,
            quantity: 5
        },
        {
            id: 3,
            nom: "Kullen",
            price: 4500,
            quantity: 1
        },
    ];

    return (
        <div>
            {products.map((p) => (
                <div key={p.id}>
                    <p>{p.nom}</p>
                    <button onClick={() => addItem(p)}>Add to cart</button>
                </div>
            ))}
        </div>
    );
}

export default ItemsPage;



