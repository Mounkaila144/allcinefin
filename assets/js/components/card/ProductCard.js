import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import {Link, useNavigate, useOutletContext} from "react-router-dom";
import DoneIcon from '@mui/icons-material/Done';

import V4 from "./V4.jpg"
import {Paid} from "@mui/icons-material";
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import {grey, cyan, pink} from "@mui/material/colors";
import {createTheme, ThemeProvider} from "@mui/material";
import {useState} from "react";
import Box from "@mui/material/Box";
import {useCart} from "react-use-cart";
import {useIsAuthenticated} from "react-auth-kit";

function useStickyState(defaultValue, key) {
    const [value, setValue] = useState(() => {
        const stickyValue = localStorage.getItem(key);
        return stickyValue !== null
            ? JSON.parse(stickyValue)
            : defaultValue;
    });
    React.useEffect(() => {
        localStorage.setItem(key, JSON.stringify(value));
    }, [key, value]);
    return [value, setValue];
}

export default function ProductCard({products, type}) {
    const [c, setC] = useState(1);
    const [color, setColor] = useState("#006064");
    const [text, setText] = useState("Ajouter");
    const {addItem, removeItem, inCart} = useCart();
    const auth = useIsAuthenticated()
    let navigate = useNavigate();
    const theme = createTheme();

    theme.typography.h3 = {
        fontSize: '1.2rem',
        '@media (min-width:600px)': {
            fontSize: '1.5rem',
        },
        [theme.breakpoints.up('md')]: {
            fontSize: '6.4rem',
        },
    };


    const titre = (text) => {
        if (text.length <= 19) {
            return text
        } else {
            return text.substring(0, 18).trimEnd() + "..."
        }
    }

    return (
        <Card sx={{
            maxWidth: 170,
            borderRadius: '4%',
            boxShadow: 3
        }}>
            <Link to={type === "movie" ? `/film/${products.id}` : `/serie/${products.id}`}>
                <CardMedia sx={{
                    maxWidth: 170,
                    borderRadius: '4%',
                }}
                           component="img"
                           image={`https://image.tmdb.org/t/p/w300${products.poster_path}`}
                           alt="green iguana"
                />
            </Link>
            <CardContent
                sx={{}}
            >
                <Link to={type === "movie" ? `/film/${products.id}` : `/serie/${products.id}`}>
                    <Box component="div" sx={{overflow: 'auto', color: 'white'}}>
                    </Box>
                </Link>

                {type === "movie" ? <Button
                    variant="contained"
                    sx={{
                        marginTop: 1,
                        backgroundColor:inCart(products.id) ?"#1b5e20": pink[900]
                    }}
                    onClick={() => {
                        if (auth()) {
                                inCart(products.id) ? removeItem(products.id) : addItem({
                                    'nom': products.title,
                                    'price': 200,
                                    'id': products.id,
                                    'type':'film'
                                })
                        } else {
                            navigate(`/login`)
                        }
                    }}
                >
                    <AddShoppingCartIcon
                        sx={{color: pink[500]}}
                    />{inCart(products.id)?<DoneIcon/>: "Ajouter" }
                </Button>:
                    <Button
                        variant="contained"
                        sx={{
                            marginTop: 1,
                            backgroundColor:inCart(products.id) ?"#1b5e20": pink[900],
                        }}
                        onClick={() => {
                            if (auth()) {
                                navigate( `/serie/${products.id}`)
                            } else {
                                navigate(`login`)
                            }
                        }}
                    >
                        <AddShoppingCartIcon
                            sx={{color: pink[500]}}
                        />{inCart(products.id)?<DoneIcon/>: "Ajouter" }
                    </Button>}


            </CardContent>

        </Card>
    );
}
