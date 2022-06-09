import React, {useState} from 'react';
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import {pink} from "@mui/material/colors";
import DoneIcon from "@mui/icons-material/Done";
import {useCart} from "react-use-cart";
import {useIsAuthenticated} from "react-auth-kit";
import {useNavigate} from "react-router-dom";

function useToggle(initialValue = false) {
    const [value, setValue] = React.useState(initialValue);
    const toggle = React.useCallback(() => {
        setValue(v => !v);
    }, []);
    return [value, toggle];
}
const Buttondetail = ({genres,product}) => {
    const [isOn, toggleIsOn] = useToggle();
    const [c, setC] = useState(true);
    const {addItem, removeItem, inCart} = useCart();
    const auth = useIsAuthenticated()
    let navigate = useNavigate();

    if (auth()) {
        if (isOn) {
            inCart(genres.id) ? removeItem(genres.id) : addItem({
                'nom': `${product.name} : ${genres.name}`,
                'price': 500,
                'id': genres.id,
                'type': 'serie'
            })
        } else {
            removeItem(genres.id)
        }
    } else {
        navigate(`/login`)
    }
    return (
                <Button
                    variant="contained"
                    sx={{
                        marginLeft:1,
                        marginTop: 1,
                        backgroundColor: inCart(genres.id) ? "#1b5e20" : "#006064",
                    }}
                    onClick={toggleIsOn}
                >
                    <AddShoppingCartIcon
                        sx={{color: pink[500]}}
                    />{inCart(genres.id) ? <>{genres.name}<DoneIcon/></> : "Ajouter "+ genres.name}
                </Button>
    );
};

export default Buttondetail;