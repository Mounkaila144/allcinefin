import React from 'react';
import {styled} from "@mui/material/styles";
import {alpha, InputBase} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import {useForm} from "react-hook-form";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import {grey, pink} from "@mui/material/colors";


const Search = ({setsearch}) => {
    const Search = styled('div')(({theme}) => ({
        position: 'relative',
        borderRadius: 20,
        backgroundColor: alpha(grey[700], 0.7),
        '&:hover': {
            backgroundColor: grey[500],
        },
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(1),
            width: 'auto',
        },
    }));

    const StyledInputBase = styled(InputBase)(({theme}) => ({
        color: pink[900],
        '& .MuiInputBase-input': {
            padding: theme.spacing(1, 1, 1, 0),
            // vertical padding + font size from searchIcon
            paddingLeft: `calc(1em + ${theme.spacing(4)})`,
            transition: theme.transitions.create('width'),
            width: '100%',
            [theme.breakpoints.up('sm')]: {
                width: '12ch',
                '&:focus': {
                    width: '20ch',
                },
            },
        },
    }));
    const {register, handleSubmit} = useForm();
    const handleRegistration = (data) => setsearch(data.name);

    return (<Box sx={{

        marginBottom: 1,
        width: 300
    }}
    >
        <Search>

                <form onSubmit={handleSubmit(handleRegistration)}>
                    <StyledInputBase
                        placeholder="Recherche…"
                        inputProps={{'aria-label': 'Recherche'}}
                        name="name" {...register('name')}
                    />
                </form>

        </Search>
</Box>
    );
};

export default Search;
