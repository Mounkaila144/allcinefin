import React from 'react';
import Button from "@mui/material/Button";
import PopupState, {bindMenu, bindTrigger} from "material-ui-popup-state";
import {Menu} from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import {pink} from "@mui/material/colors";
import {useNavigate} from "react-router-dom";


const Btnderoulan = (props) => {
    let navigate = useNavigate();
    let handclick1=(popupState)=>{
        navigate(`${props.lien1}`)
        popupState.close()
    };
     let handclick2=(popupState)=>{
        navigate(`${props.lien2}`)
        popupState.close()
    };
     let handclick3=(popupState)=>{
        navigate(`${props.lien3}`)
        popupState.close()
    };
    let handclick4 = (popupState) => {
        navigate(`${props.lien4}`)
        popupState.close()
    };


    return (
        <PopupState variant="popover" popupId="demo-popup-menu">
            {(popupState) => (
                <React.Fragment>
                    <Button
                        variant="contained"
                        sx={{
                            my: 2,
                            color: 'white',
                            display: 'block',
                            backgroundColor: pink[900],
                            marginLeft: 2
                        }}
                        {...bindTrigger(popupState)}>
                        {props.name}
                    </Button>
                    <Menu {...bindMenu(popupState)}>
                        <MenuItem onClick={() =>handclick1(popupState)}>{props.name1}</MenuItem>
                        <MenuItem onClick={() =>handclick2(popupState)}>{props.name2}</MenuItem>
                        <MenuItem onClick={() =>handclick3(popupState)}>{props.name3}</MenuItem>
                        {props.name4!==undefined ?
                            <MenuItem onClick={() => handclick4(popupState)}>{props.name4}</MenuItem> :null}
                    </Menu>
                </React.Fragment>
            )}
        </PopupState>
    );
};

export default Btnderoulan;
