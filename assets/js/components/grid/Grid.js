import React from 'react';
import {Grid} from "@mui/material";
import * as PropTypes from "prop-types";

function Item(props) {
    return null;
}

Item.propTypes = {children: PropTypes.node};
const GridVideo = ({children}) => {
    return (
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 1, md: 1 }}>
            {children}
        </Grid>
    );
};

export default GridVideo;
