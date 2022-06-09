import React from 'react';
import MenuItem from "@mui/material/MenuItem";
import {useNavigate} from "react-router-dom";
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';


const BtnTop = (props) => {
    let navigate = useNavigate();
    return (
        <MenuItem onClick={() => {navigate(`${props.lien}`)}}>{props.name}</MenuItem>
    );
};

export default BtnTop;
