import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import {Link, useNavigate} from "react-router-dom";
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import {cyan, pink} from "@mui/material/colors";
import {createTheme, ThemeProvider} from "@mui/material";
import {Paid} from "@mui/icons-material";
import {useState} from "react";
import {useCart} from "react-use-cart";
import {useIsAuthenticated} from 'react-auth-kit'
import DoneIcon from "@mui/icons-material/Done";
export default function MaterialCard({products}) {
    const [c, setC] = useState(1);
    const {addItem, removeItem, inCart} = useCart();
    let navigate = useNavigate();
    const theme = createTheme();
    const auth=useIsAuthenticated()

    theme.typography.h3 = {
        fontSize: '1.2rem',
        '@media (min-width:600px)': {
            fontSize: '1.5rem',
        },
        [theme.breakpoints.up('md')]: {
            fontSize: '6.4rem',
        },
    };
    console.log(products)
    return (
        <Card sx={{
            maxWidth: 170,
            borderRadius: '4%',
        }}>
            <Link to={ `/materiel/${products.id}`}
                  key={`${products.id}`}>
            <CardMedia sx={{
                maxWidth: 170,
                maxHeight:200,
                borderRadius: '4%',
            }}
                       component="img"
                       image={`https://allcine227.com/image/article/${products.imageName}`}
                       alt="green iguana"
            />
            <CardContent
                sx={{
                }}
            >
                <ThemeProvider theme={theme}>
                    <Typography component="h3">
                        {products.nom}
                    </Typography>
                </ThemeProvider>
            </CardContent>
            </Link>
            <CardActions>
                <Button
                    variant="contained"
                    sx={{
                        marginTop: 1,
                        backgroundColor:inCart(products.id) ?"#1b5e20": pink[900],
                    }}
                    onClick={() => {
                        setC(c + 1)
                        if (auth()) {
                            if (c % 2 === 1) {
                                inCart(products.id) ? removeItem(products.id) : addItem({
                                    'nom': products.nom,
                                    'price':products.price,
                                    'id': products.id,
                                    'type':'materiel'
                                })
                            } else {
                                removeItem(products.id)
                            }
                        } else {
                            navigate(`/login`)
                        }
                    }}
                >
                    <AddShoppingCartIcon
                        sx={{color: pink[500]}}
                    />{inCart(products.id)?<DoneIcon/>: "Ajouter" }
                </Button>

            </CardActions>
        </Card>
    );
}
