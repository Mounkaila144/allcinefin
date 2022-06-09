import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import LocalMoviesIcon from '@mui/icons-material/LocalMovies';
import ListItemText from "@mui/material/ListItemText";
import * as React from "react";
import {useNavigate} from "react-router-dom";
import {pink} from "@mui/material/colors";

const NestedBtn = ({name, link,setOpen}) => {
    let navigate = useNavigate();
    const handleDrawerClose = () => {
        navigate(link)
        setOpen(false);
    };
    return (
        <ListItemButton
            sx={{pl: 4}}
           onClick={handleDrawerClose}
        >
            <ListItemIcon>
                <LocalMoviesIcon sx={{color:"blue"}}/>
            </ListItemIcon>
            <ListItemText primary={name}/>
        </ListItemButton>
    )
        ;
};

export default NestedBtn;
