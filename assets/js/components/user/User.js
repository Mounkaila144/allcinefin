import React, {useEffect, useState} from 'react';
import axios from "axios";
import {createTheme, ThemeProvider} from "@mui/material";
import Typography from "@mui/material/Typography";

const User = () => {

    const theme = createTheme();

    theme.typography.h3 = {
        [theme.breakpoints.only('xs')]: {
            fontSize: '0.6rem',
            color:'black'
        },
        [theme.breakpoints.only('sm')]: {
            fontSize: '0.9rem',
            color:'red'
        },
        [theme.breakpoints.only('md')]: {
            fontSize: '1.5rem',
            color:'yellow'
        },
        [theme.breakpoints.only('lg')]: {
            fontSize: '2.4rem',
            color:'orange'
        },

    };




    return (

        <ThemeProvider theme={theme}>
            <Typography variant="h3">Responsive h3</Typography>
        </ThemeProvider>
    );
};

export default User;
