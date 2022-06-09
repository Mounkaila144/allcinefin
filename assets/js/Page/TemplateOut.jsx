import * as React from 'react';
import * as PropTypes from "prop-types";
import {useEffect, useState} from "react";
import {Outlet, Link, UNSAFE_RouteContext} from "react-router-dom";
import ProductCard from "../components/card/ProductCard";
import HeaderPhone from "../components/header/App";
import Home from "../components/Home";
import {green, pink} from "@mui/material/colors";
import {bindTrigger} from "material-ui-popup-state";
import Button from "@mui/material/Button";
import {Pagination} from "@mui/material";
import Typography from "@mui/material/Typography";

export default function TemplateOut() {
    const [cart, updateCart] = useState([])
    const styles = (theme) => ({
        root: {
            padding: theme.spacing(1),
            [theme.breakpoints.down('md')]: {
                backgroundColor: theme.palette.secondary.main,
            },
            [theme.breakpoints.up('md')]: {
                backgroundColor: theme.palette.primary.main,
            },
            [theme.breakpoints.up('lg')]: {
                backgroundColor: green[500],
            },
        },
    });
    return (
        <Home
        top={<HeaderPhone/>}
        left={

            <Outlet/>
        }
        />
    );
}
