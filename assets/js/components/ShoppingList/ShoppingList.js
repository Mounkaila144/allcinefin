const plantList = [
    {
        name: 'monstera',
        category: 'classique',
        id: '1ed',
        isBestSale: true
    },
]
import React from "react";

function ShoppingList() {
    return (
        <ul>
            {plantList.map((plant) => (
                <li key={`${plant}`}>{ plant }</li>
            ))}
        </ul>
    )
}

export default ShoppingList
