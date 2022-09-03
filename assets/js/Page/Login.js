import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import CssBaseline from '@mui/material/CssBaseline';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';import axios from 'axios'
import {useAuthUser, useIsAuthenticated, useSignIn} from 'react-auth-kit'
import {Alert, CardActions, Grid, InputAdornment, TextField} from "@mui/material";
import {AccountCircle} from "@mui/icons-material";
import Button from "@mui/material/Button";
import CardContent from "@mui/material/CardContent";
import { useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";

function Copyright(props) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <Link color="inherit" href="https://mui.com/">
                AllCiner
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const theme = createTheme();


export default function Login() {
    let navigate = useNavigate();
    const [aalert,setAlert]=useState(false)
    const [time,setTime]=useState(true)
    const [c,setC]=useState(0)

    const signIn = useSignIn()
    const [formData, setFormData] = React.useState({email: '', password: ''})

    const register=()=>{
        navigate('/register')
        location.reload()
    }
    const reset=()=>{
        navigate('/reset-password')
        location.reload()
    }

    const onSubmit = (e) => {
   setC(c+1)
        e.preventDefault()
        axios.post('https://127.0.0.1:8000/api/login_check', formData)
            .then((res) => {
                console.log(res.data.data.id)
                if (res.status === 200) {

                    localStorage.setItem('token', res.data.token)
                    if (signIn({
                        token: res.data.token,
                        expiresIn: 60,
                        tokenType: "Bearer",
                        authState: res.config.data
                    }))
                    {
                        navigate('menu')
                    }
                    else {

                    }
                }
                else{

                }
            }).catch(
            function () {
                setAlert(true)
                setTimeout(()=>{setAlert(false)},5000);
            }
        )



    }
    return (
        <Box sx={{bgcolor:'white', borderRadius:5}}>
            {aalert ?<Alert variant="filled" severity="error">
               Votre Mots de passe ou votre Adresse email est incorrect
            </Alert>:null}
        <ThemeProvider theme={theme} >
            <Container component="main" maxWidth="md">
                <CssBaseline />
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Se Connecter
                    </Typography>
                    <Box component="form" onSubmit={onSubmit} noValidate sx={{ mt: 1 }}>
                        <TextField
                            onChange={(e) => setFormData({...formData, email: e.target.value})}
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            autoFocus
                        />
                        <TextField
                            onChange={(e) => setFormData({...formData, password: e.target.value})}
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Mots de passe"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                        />
                        <FormControlLabel
                            control={<Checkbox value="remember" color="primary" />}
                            label="Se souvenir de moi"
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Connecté
                        </Button>
                        <Grid container>
                            <Grid item xs>
                                <Link href="#" onClick={reset}variant="body2">
                                    Mots de passe oublier?
                                </Link>
                            </Grid>
                            <Grid item>
                                <Link href={''} onClick={register} variant="body2">
                                    {"creé un compte"}
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
                <Copyright sx={{ mt: 8, mb: 4 }} />
            </Container>
        </ThemeProvider>
        </Box>

    )
}
