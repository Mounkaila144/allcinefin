import React, {useState} from 'react';
import {useCart} from "react-use-cart";
import axios from "axios";
import Button from "@mui/material/Button";
import {useAuthUser} from "react-auth-kit";
import Card from "@mui/material/Card";
import {Alert, AlertTitle, Badge, Grid, Stack} from "@mui/material";
import CardContent from "@mui/material/CardContent";
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import DeleteIcon from '@mui/icons-material/Delete';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import {styled} from "@mui/material/styles";
import {orange} from "@mui/material/colors";
import jwt_decode from "jwt-decode"


function Panier() {
    const auth = useAuthUser()
    const [aalert,setAlert]=useState(false)
    const [c, setC] = useState(0);
    const url = `https://allcine227.com/api/commandes`
    const token = localStorage.getItem('token')
    var decode=jwt_decode(token)
    console.log(decode)
    const headers = {
        'authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }

    const onSubmit = (e) => {
        e.preventDefault()
        axios
            .post(
                url,
                {"panier": {items, cartTotal}},
                {headers: headers}
            )
            .then((res) => {
                if (res.status === 201) {
                    emptyCart()
                    setAlert(true)
                    setTimeout(()=>{setAlert(false)},5000);
                } else {

                }
            }).catch(
            function () {

            })
    }
    const nb = (type) => {
        return Math.floor(items.reduce((acc, arr) => acc + (arr.type === type ? 1 : 0), 0) / 5) * 500
    }

    const StyledBadge = styled(Badge)(({theme}) => ({
        '& .MuiBadge-badge': {
            top: 5,
            border: `1px solid ${theme.palette.background.paper}`,
            padding: '0 4px',
        },
    }));
    const {
        emptyCart,
        isEmpty,
        totalUniqueItems,
        items,
        updateItemQuantity,
        removeItem,
        cartTotal,
    } = useCart();
    if (isEmpty) return  <Box component="div" sx={{overflow: 'auto', color: orange[900], fontSize: 22, marginBottom:2,marginTop:2}}>
        {aalert ?<Alert variant="filled" severity="success">
            <AlertTitle>Panier Envoyez avez succès</AlertTitle>
            Vous recevrais votre commande le plus vite possible
        </Alert>:null}
        Votre panier est vide
    </Box>;
    return (
        <Box bgcolor={"white"}>
            <Grid container spacing={{xs: 1, md: 1}} columns={{xs: 12, sm: 12, md: 12}} alignContent={"center"}
                  justifyContent={'center'}>
                <Grid item xs={12} sm={6} md={12}>
                    <h1>Reduction {nb("film")} CFA</h1>
                    <Box component="div" sx={{overflow: 'auto', color: orange[900], fontSize: 22, marginBottom:2,marginTop:2}}>
                        Prix Total {cartTotal} CFA
                    </Box>
                        <Button variant={"contained"} onClick={onSubmit}>envoyez la commande</Button>
                </Grid>
            </Grid>
            {items.map((item) => (
                <Card>
                    <CardContent
                        sx={{boxShadow: 3, bgcolor: 'grey.200', marginBottom: 2, justifyContent: 'center'}}>
                        <Box component="div" sx={{overflow: 'auto'}}>
                            <IconButton aria-label="cart">
                                <StyledBadge badgeContent={item.quantity} color="secondary">
                                    <ShoppingCartIcon fontSize={"large"}/>
                                </StyledBadge>
                            </IconButton> {item.nom}
                        </Box>
                        <Stack spacing={3} direction="row" sx={{marginLeft: 7, marginTop: 0}}>
                            <Box component="div"
                                 sx={{
                                     overflow: 'auto',
                                     fontSize: 14,
                                     color:orange[800],
                                 }}>
                                {item.type + ':' + item.price + " CFA"}</Box>
                            {item.type === 'materiel' ?
                                <><RemoveIcon onClick={() => updateItemQuantity(item.id, item.quantity - 1)}
                                              sx={{color: "blue", borderRadius: 3}}/>
                                    <AddIcon onClick={() => updateItemQuantity(item.id, item.quantity + 1)}
                                             sx={{color: "blue", borderRadius: 3}}/></>
                                : null}
                            <DeleteIcon onClick={() => removeItem(item.id)}
                                        sx={{color: "red", borderRadius: 3}}/>
                        </Stack>
                    </CardContent>

                </Card>
            ))}

        </Box>
    )
        ;
}


export default Panier
