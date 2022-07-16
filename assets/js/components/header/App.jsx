import * as React from 'react';
import List from '@mui/material/List';
import {useNavigate} from "react-router-dom";
import Btnderoulan from "../Btnderoulan";
import NestedList from "../BtnSidebar";
import NestedBtn from "../NestedBtn";
import HeaderDesing from "./HederDesing";
import Button from '@mui/material/Button';
import {orange, pink} from "@mui/material/colors";
import {useIsAuthenticated, useSignOut} from 'react-auth-kit'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Allcine from './logo7.png'
import Box from "@mui/material/Box";
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import jwt_decode from "jwt-decode";





export default function HeaderPhone() {
    const signOut = useSignOut()
    const auth = useIsAuthenticated()
    if (localStorage.getItem("token") === null) {
        console.log("Nulllll")
    }
    else {
        const token = localStorage.getItem('token')
        var decode=jwt_decode(token)
        console.log(decode)
    }
    let navigate = useNavigate();

    function handleClick() {
        navigate(`/Menu`)
    }

    function register() {
        navigate(`/register`)
        window.location.reload()
    }
 function admin() {
        navigate(`/admin`)
        window.location.reload()
    }

    return (<HeaderDesing
        logo={<img src={Allcine} width={151}/>}
        btnflexsm={<>
            <Button
                variant="contained"
                sx={{
                    my: 2, color: 'white', display: 'block', backgroundColor: pink[900], marginLeft: 2
                }}
                onClick={handleClick}

            >
                Tarifs
            </Button>
            <Btnderoulan
                name={"Film"}
                name1={"populair"} lien1={"/film/popular"}
                name2={"nouveauté"} lien2={"/film/new"}
                name3={"plus vues"} lien3={"/film/top"}
                name4={"Trier par genre"} lien4={"/filmlist"}
            />
            <Btnderoulan
                name={"Serie"}
                name1={"populair"} lien1={"/serie/popular"}
                name2={"nouveauté"} lien2={"/serie/new"}
                name3={"plus vues"} lien3={"/serie/top"}
                name4={"Trier par genre"} lien4={"/serielist"}
            />
            <Button
                variant="contained"
                sx={{
                    my: 2, color: 'white', display: 'block', backgroundColor: pink[900], marginLeft: 2,width:110
                }}
                onClick={() => navigate("/materiel/original")}

            >
                Materiel
            </Button>
            <Button
                variant="contained"
                sx={{
                    my: 2, color: 'white', display: 'block', backgroundColor: pink[900], marginLeft: 2,width:110
                }}
                onClick={() => navigate("/extrait")}

            >
                Extrait
            </Button>

        </>}
        search={
            <>
                <Box sx={{display: {xs: 'flex', md: 'none'}}}>
                    {auth() ?
                        <>
                            <Box sx={{display: {xs: 'flex', md: 'none'},width:150,height:45,marginTop:2}}>
                                { <img src={Allcine} width={150}/>}
                            </Box>
                            <Button
                                variant="contained"
                                sx={{
                                    my: 2, color: 'white', display: 'block', backgroundColor: pink[900], marginLeft: 3
                                }}
                                onClick={() => navigate(`/panier`)}

                            >
                                <ShoppingCartIcon/>
                            </Button>

                            {decode.roles.includes('ROLE_ADMIN') ||decode.roles.includes('ROLE_SUPER_ADMIN')?
                            <Button
                                variant="contained"
                                sx={{
                                    my: 2, color: 'white', display: 'block', backgroundColor: pink[900], marginLeft: 3
                                }}
                                onClick={admin}

                            >
                                <AdminPanelSettingsIcon/>
                            </Button>:null}

                        </> : <>
                            <Box sx={{display: {xs: 'flex', md: 'none'},width:130,height:35,marginTop:2}}>
                                { <img src={Allcine}/>}
                            </Box>
                            <Button
                                variant="contained"
                                sx={{
                                    my: 2, color: 'white', display: 'block', backgroundColor: pink[900], marginLeft: 2,width:110
                                }}
                                onClick={() => navigate(`/login `)}

                            >
                                Connexion
                            </Button>

                        </>
                    }
                </Box>
                <Box sx={{display: {xs: 'none', md: 'flex'}}}>
                    {auth() ?
                        <>
                            <Button
                                variant="contained"
                                sx={{
                                    my: 2, color: 'white', display: 'block', backgroundColor: pink[900], marginLeft: 2
                                }}
                                onClick={() => signOut()}

                            >
                                Deconnecter
                            </Button>
                            <Button
                                variant="contained"
                                sx={{
                                    my: 2, color: 'white', display: 'block', backgroundColor: pink[900], marginLeft: 2
                                }}
                                onClick={() => navigate(`/panier`)}

                            >
                                <ShoppingCartIcon/>
                            </Button>
                            {decode.roles.includes('ROLE_ADMIN') ||decode.roles.includes('ROLE_SUPER_ADMIN')?
                                <Button
                                    variant="contained"
                                    sx={{
                                        my: 2, color: 'white', display: 'block', backgroundColor: pink[900], marginLeft: 3
                                    }}
                                    onClick={admin}

                                >
                                    <AdminPanelSettingsIcon/>
                                </Button>:null}
                        </> : <>
                            <Button
                                variant="contained"
                                sx={{
                                    my: 2, color: 'white', display: 'block', backgroundColor: pink[900], marginLeft: 2
                                }}
                                onClick={register}

                            >
                                Inscription
                            </Button>
                            <Button
                                variant="contained"
                                sx={{
                                    my: 2, color: 'white', display: 'block', backgroundColor: pink[900], marginLeft: 2
                                }}
                                onClick={() => navigate(`/login`)}

                            >
                                Connexion
                            </Button>

                        </>
                    }
                </Box>
            </>
        }

    />);
}
