import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Harry from "./Harry.png"
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import {pink} from "@mui/material/colors";
import {createTheme, ThemeProvider} from "@mui/material";
export default function MovieCard({title,img}) {
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
    return (
        <Card sx={{
            maxWidth: 150,
            borderRadius: '4%',
        }}>
            <CardMedia sx={{
                maxWidth: 150,
                borderRadius: '4%',
            }}
                component="img"
                image={"https://image.tmdb.org/t/p/w500"+img}
                alt="green iguana"
            />
            <CardContent
            sx={{
                maxHeight:10
            }}
            >
                <ThemeProvider theme={theme}>
                <Typography component="h3">
                    {title}
                </Typography>
                </ThemeProvider>
            </CardContent>
            <CardActions>
                <AddShoppingCartIcon
                    sx={{ color: pink[500]}}
                />
            </CardActions>
        </Card>
    );
}
